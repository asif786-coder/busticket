
import { Clock, MapPin, Star, Wifi, Zap, Droplets, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Route {
  id: string;
  operatorName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  busType: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  amenities: string[];
  seatsAvailable: number;
  totalSeats: number;
}

interface RouteCardProps {
  route: Route;
  onBook: () => void;
}

const RouteCard = ({ route, onBook }: RouteCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-3 w-3" />;
      case 'charging point':
        return <Zap className="h-3 w-3" />;
      case 'water bottle':
        return <Droplets className="h-3 w-3" />;
      default:
        return <Shield className="h-3 w-3" />;
    }
  };

  const getBusTypeColor = (busType: string) => {
    if (busType.includes('AC')) {
      return busType.includes('Sleeper') ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Operator & Route Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{route.operatorName}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{route.rating}</span>
              </div>
              <Badge className={getBusTypeColor(route.busType)}>
                {route.busType}
              </Badge>
            </div>

            <div className="flex items-center gap-8 mb-4">
              {/* Departure */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{route.departureTime}</div>
                <div className="text-sm text-gray-600">{route.from}</div>
              </div>

              {/* Duration */}
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <div className="text-sm text-gray-600">{route.duration}</div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{route.arrivalTime}</div>
                <div className="text-sm text-gray-600">{route.to}</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-3">
              {route.amenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {route.amenities.length > 4 && (
                <span className="text-xs text-gray-500">+{route.amenities.length - 4} more</span>
              )}
            </div>
          </div>

          {/* Right Section - Pricing & Booking */}
          <div className="text-right ml-8">
            <div className="mb-2">
              <div className="flex items-center gap-2 justify-end">
                {route.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">${route.originalPrice}</span>
                )}
                <span className="text-2xl font-bold text-gray-900">${route.price}</span>
              </div>
              {route.discount > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  {route.discount}% OFF
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-4">
              {route.seatsAvailable} seats left
            </div>

            <Button 
              onClick={onBook}
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Select Seats
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
