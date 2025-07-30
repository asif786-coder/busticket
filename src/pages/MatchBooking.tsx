
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import TicketCategoryCard from '@/components/ipl/TicketCategoryCard';
import PaymentSection from '@/components/ipl/PaymentSection';

const MatchBooking = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);

  // Fetch match details
  const { data: match, isLoading: matchLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          team1:teams!matches_team1_id_fkey(name, short_name, primary_color),
          team2:teams!matches_team2_id_fkey(name, short_name, primary_color),
          venue:venues!matches_venue_id_fkey(name, city, state, capacity)
        `)
        .eq('id', matchId)
        .single();

      if (error) throw error;
      return data;
    }
  });

  // Fetch ticket categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['ticket-categories', matchId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticket_categories')
        .select('*')
        .eq('match_id', matchId)
        .gt('available_seats', 0)
        .order('price', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const totalAmount = selectedCategory ? selectedCategory.price * quantity : 0;

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setQuantity(1);
  };

  const handleProceedToPayment = () => {
    if (!selectedCategory) {
      toast({
        title: "Please select a ticket category",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handleBookingComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const bookingReference = `IPL${Date.now()}`;
      
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          match_id: matchId,
          ticket_category_id: selectedCategory.id,
          quantity,
          total_amount: totalAmount,
          booking_reference: bookingReference,
          booking_status: 'confirmed',
          payment_status: 'completed'
        });

      if (error) throw error;

      // Update available seats
      await supabase
        .from('ticket_categories')
        .update({ 
          available_seats: selectedCategory.available_seats - quantity 
        })
        .eq('id', selectedCategory.id);

      toast({
        title: "Booking Confirmed!",
        description: `Your booking reference is ${bookingReference}`,
      });

      navigate('/my-bookings');
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (matchLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading match details...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Match not found</p>
          <Button onClick={() => navigate('/ipl')}>Back to IPL</Button>
        </div>
      </div>
    );
  }

  const matchDate = new Date(match.match_date);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/ipl')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Book Tickets</h1>
              <p className="text-sm text-gray-600">
                {match.team1.name} vs {match.team2.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Match Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Match Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-2"
                      style={{ backgroundColor: match.team1.primary_color }}
                    >
                      {match.team1.short_name}
                    </div>
                    <p className="text-sm font-medium">{match.team1.name}</p>
                  </div>
                  
                  <div className="text-center px-6">
                    <div className="text-2xl font-bold text-gray-800 mb-1">VS</div>
                    <Badge variant="outline">{match.match_type}</Badge>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-2"
                      style={{ backgroundColor: match.team2.primary_color }}
                    >
                      {match.team2.short_name}
                    </div>
                    <p className="text-sm font-medium">{match.team2.name}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {matchDate.toLocaleDateString('en-IN')} at {matchDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {match.venue.name}, {match.venue.city}, {match.venue.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Capacity: {match.venue.capacity.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Categories or Payment */}
            {!showPayment ? (
              <Card>
                <CardHeader>
                  <CardTitle>Select Ticket Category</CardTitle>
                </CardHeader>
                <CardContent>
                  {categories.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      No tickets available for this match.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {categories.map((category) => (
                        <TicketCategoryCard
                          key={category.id}
                          category={category}
                          isSelected={selectedCategory?.id === category.id}
                          onSelect={() => handleCategorySelect(category)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <PaymentSection
                amount={totalAmount}
                onPaymentComplete={handleBookingComplete}
                onBack={() => setShowPayment(false)}
              />
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCategory ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{selectedCategory.category_name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Section</span>
                        <span className="font-medium">{selectedCategory.section_name || 'General'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price per ticket</span>
                        <span className="font-medium">₹{selectedCategory.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quantity</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="font-medium">{quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setQuantity(Math.min(selectedCategory.available_seats, quantity + 1))}
                            disabled={quantity >= selectedCategory.available_seats}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>

                    {!showPayment && (
                      <Button
                        onClick={handleProceedToPayment}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Proceed to Payment
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    Select a ticket category to see pricing
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchBooking;
