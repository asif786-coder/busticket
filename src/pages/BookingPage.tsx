
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, Shield, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import PaymentForm from '@/components/PaymentForm';
import SeatSelection from '@/components/SeatSelection';

const BookingPage = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    age: ''
  });

  // Mock route data with Indian cities and operators
  const route = {
    id: routeId,
    operatorName: 'Orange Tours & Travels',
    from: 'Mumbai',
    to: 'Pune',
    departureTime: '06:00',
    arrivalTime: '09:30',
    duration: '3h 30m',
    busType: 'AC Sleeper',
    price: 450,
    originalPrice: 500,
    discount: 10,
    date: new Date().toLocaleDateString('en-IN')
  };

  const steps = [
    { id: 1, title: 'Select Seats', icon: <MapPin className="h-4 w-4" /> },
    { id: 2, title: 'Passenger Details', icon: <User className="h-4 w-4" /> },
    { id: 3, title: 'Payment', icon: <CreditCard className="h-4 w-4" /> }
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const totalAmount = selectedSeats.length * route.price;
  const convenienceFee = Math.round(totalAmount * 0.05);
  const finalAmount = totalAmount + convenienceFee;

  const canProceedToNext = () => {
    if (currentStep === 1) return selectedSeats.length > 0;
    if (currentStep === 2) return passengerDetails.name && passengerDetails.email && passengerDetails.phone && passengerDetails.age;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {route.from} → {route.to}
              </h1>
              <p className="text-sm text-gray-600">
                {route.operatorName} • {route.departureTime} - {route.arrivalTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.icon}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px ml-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <SeatSelection
                onSeatSelect={handleSeatSelect}
                selectedSeats={selectedSeats}
                maxSeats={4}
              />
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        value={passengerDetails.name}
                        onChange={(e) => setPassengerDetails(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={passengerDetails.age}
                        onChange={(e) => setPassengerDetails(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={passengerDetails.email}
                      onChange={(e) => setPassengerDetails(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={passengerDetails.phone}
                      onChange={(e) => setPassengerDetails(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <PaymentForm 
                amount={finalAmount}
                onPaymentComplete={() => navigate('/booking-confirmation')}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!canProceedToNext() || currentStep === 3}
              >
                {currentStep === 3 ? 'Pay Now' : 'Next'}
              </Button>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trip Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium">{route.from} → {route.to}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{route.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{route.departureTime} - {route.arrivalTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bus Type</span>
                    <Badge variant="secondary">{route.busType}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Seats</span>
                    <span className="font-medium">
                      {selectedSeats.length > 0 ? `${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''}` : 'No seats selected'}
                    </span>
                  </div>
                  {selectedSeats.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Seat Numbers</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedSeats.map(seat => (
                          <Badge key={seat} variant="outline" className="text-xs">
                            {seat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <hr />

                {/* Price Breakdown */}
                {selectedSeats.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Convenience Fee</span>
                      <span>₹{convenienceFee}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{finalAmount}</span>
                    </div>
                  </div>
                )}

                {route.discount > 0 && selectedSeats.length > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-800">
                      🎉 You saved ₹{(route.originalPrice - route.price) * selectedSeats.length} with {route.discount}% discount!
                    </div>
                  </div>
                )}

                {selectedSeats.length === 0 && (
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm text-yellow-800">
                      Please select seats to see pricing details
                    </div>
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

export default BookingPage;
