import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Calendar, MapPin, Clock, Star, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RouteCard from '@/components/RouteCard';
import SearchForm from '@/components/SearchForm';
import OffersSection from '@/components/OffersSection';

// Expanded mock data for Indian bus routes
const mockRoutes = [
  {
    id: '1',
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
    rating: 4.5,
    amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
    seatsAvailable: 12,
    totalSeats: 40
  },
  {
    id: '2',
    operatorName: 'VRL Travels',
    from: 'Bangalore',
    to: 'Mumbai',
    departureTime: '20:30',
    arrivalTime: '10:00',
    duration: '13h 30m',
    busType: 'AC Sleeper',
    price: 1200,
    originalPrice: 1350,
    discount: 11,
    rating: 4.3,
    amenities: ['WiFi', 'Charging Point', 'Meals', 'Blanket', 'Entertainment'],
    seatsAvailable: 8,
    totalSeats: 50
  },
  {
    id: '3',
    operatorName: 'Redbus Express',
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '08:15',
    arrivalTime: '13:45',
    duration: '5h 30m',
    busType: 'AC Seater',
    price: 650,
    originalPrice: 700,
    discount: 7,
    rating: 4.1,
    amenities: ['WiFi', 'Charging Point', 'Snacks'],
    seatsAvailable: 15,
    totalSeats: 45
  },
  {
    id: '4',
    operatorName: 'SRS Travels',
    from: 'Chennai',
    to: 'Bangalore',
    departureTime: '22:00',
    arrivalTime: '04:30',
    duration: '6h 30m',
    busType: 'AC Sleeper',
    price: 850,
    originalPrice: 950,
    discount: 11,
    rating: 4.4,
    amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
    seatsAvailable: 6,
    totalSeats: 40
  },
  {
    id: '5',
    operatorName: 'Parveen Travels',
    from: 'Hyderabad',
    to: 'Pune',
    departureTime: '07:30',
    arrivalTime: '18:00',
    duration: '10h 30m',
    busType: 'AC Sleeper',
    price: 1100,
    originalPrice: 1200,
    discount: 8,
    rating: 4.2,
    amenities: ['WiFi', 'Charging Point', 'Meals', 'Blanket'],
    seatsAvailable: 10,
    totalSeats: 42
  },
  {
    id: '6',
    operatorName: 'Kallada Travels',
    from: 'Kochi',
    to: 'Bangalore',
    departureTime: '21:30',
    arrivalTime: '08:00',
    duration: '10h 30m',
    busType: 'AC Sleeper',
    price: 950,
    originalPrice: 1050,
    discount: 10,
    rating: 4.6,
    amenities: ['WiFi', 'Charging Point', 'Entertainment', 'Blanket', 'Snacks'],
    seatsAvailable: 4,
    totalSeats: 48
  },
  {
    id: '7',
    operatorName: 'Neeta Travels',
    from: 'Pune',
    to: 'Goa',
    departureTime: '09:00',
    arrivalTime: '18:30',
    duration: '9h 30m',
    busType: 'AC Seater',
    price: 750,
    originalPrice: 800,
    discount: 6,
    rating: 4.0,
    amenities: ['WiFi', 'Charging Point', 'Water Bottle'],
    seatsAvailable: 20,
    totalSeats: 50
  },
  {
    id: '8',
    operatorName: 'Raj National Express',
    from: 'Ahmedabad',
    to: 'Mumbai',
    departureTime: '14:30',
    arrivalTime: '22:00',
    duration: '7h 30m',
    busType: 'AC Sleeper',
    price: 600,
    originalPrice: 650,
    discount: 8,
    rating: 4.3,
    amenities: ['WiFi', 'Charging Point', 'Snacks', 'Blanket'],
    seatsAvailable: 14,
    totalSeats: 40
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState(mockRoutes);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (searchData: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockRoutes);
      setIsLoading(false);
    }, 1000);
  };

  const handleBookRoute = (routeId: string) => {
    navigate(`/booking/${routeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BusGo</h1>
                <p className="text-sm text-gray-500">Private Bus Travel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                My Bookings
              </Button>
              <Button variant="ghost" size="sm">
                Help
              </Button>
              <Button size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Perfect Bus Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Travel in comfort with our premium bus services. Choose from AC/Non-AC, 
            Sleeper/Seater options with the best prices and exclusive offers.
          </p>
          
          {/* Search Form */}
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Offers Section */}
      <OffersSection />

      {/* Search Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Available Routes
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  onBook={() => handleBookRoute(route.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose BusGo?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-content">
                <Bus className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Premium Fleet</h4>
              <p className="text-gray-600">
                Modern buses with AC, comfortable seating, and premium amenities
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Percent className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Best Offers</h4>
              <p className="text-gray-600">
                Exclusive discounts and cashback offers on every booking
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Trusted Service</h4>
              <p className="text-gray-600">
                Rated 4.5+ stars by thousands of satisfied customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-6 w-6" />
                <span className="text-xl font-bold">BusGo</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for comfortable bus travel across the country.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Routes</li>
                <li>Offers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Cancellation</li>
                <li>Refund Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <p className="text-gray-400">
                Email: support@busgo.com<br />
                Phone: 1-800-BUSGO-1<br />
                24/7 Customer Support
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BusGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
