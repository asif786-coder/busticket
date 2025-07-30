
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Trophy, Shirt, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import AuthSection from '@/components/ipl/AuthSection';
import MatchCard from '@/components/ipl/MatchCard';
import MerchandiseCard from '@/components/ipl/MerchandiseCard';

const IPL = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch matches with teams and venues
  const { data: matches = [], isLoading: matchesLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id(name, short_name, primary_color),
          team2:team2_id(name, short_name, primary_color),
          venue:venue_id(name, city, state)
        `)
        .eq('status', 'upcoming')
        .order('match_date', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  // Fetch merchandise (t-shirts)
  const { data: merchandise = [], isLoading: merchandiseLoading } = useQuery({
    queryKey: ['merchandise'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('merchandise')
        .select(`
          *,
          team:team_id(name, short_name, primary_color)
        `)
        .gt('stock_quantity', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleBookTicket = (matchId: string) => {
    if (!user) {
      alert('Please sign in to book tickets');
      return;
    }
    navigate(`/match/${matchId}/booking`);
  };

  const handleBuyMerchandise = (itemId: string) => {
    if (!user) {
      alert('Please sign in to buy merchandise');
      return;
    }
    navigate(`/merchandise/${itemId}/order`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IPL Tickets
                </h1>
                <p className="text-sm text-gray-500">Indian Premier League 2024</p>
              </div>
            </div>
            
            <AuthSection user={user} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Experience the Thrill of IPL 2024
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Book your tickets for the most exciting cricket tournament in the world. 
            Watch your favorite teams battle it out in India's premier cricket stadiums.
          </p>
        </section>

        {/* Upcoming Matches */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Upcoming Matches</h3>
          </div>

          {matchesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : matches.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No upcoming matches found. Check back soon!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onBookTicket={() => handleBookTicket(match.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Team Merchandise */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shirt className="h-6 w-6 text-purple-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Team Merchandise</h3>
          </div>

          {merchandiseLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : merchandise.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No merchandise available right now. Check back soon!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {merchandise.map((item) => (
                <MerchandiseCard
                  key={item.id}
                  item={item}
                  onBuy={() => handleBuyMerchandise(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default IPL;
