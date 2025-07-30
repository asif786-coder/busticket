
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MatchCardProps {
  match: any;
  onBookTicket: () => void;
}

const MatchCard = ({ match, onBookTicket }: MatchCardProps) => {
  const matchDate = new Date(match.match_date);
  const formattedDate = matchDate.toLocaleDateString('en-IN');
  const formattedTime = matchDate.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary">{match.match_type}</Badge>
          <Badge variant="outline">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDate}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
              style={{ backgroundColor: match.team1.primary_color }}
            >
              {match.team1.short_name}
            </div>
            <p className="text-xs text-gray-600">{match.team1.name}</p>
          </div>
          
          <div className="text-center px-4">
            <div className="text-lg font-bold text-gray-800">VS</div>
            <div className="text-sm text-gray-500">{formattedTime}</div>
          </div>
          
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
              style={{ backgroundColor: match.team2.primary_color }}
            >
              {match.team2.short_name}
            </div>
            <p className="text-xs text-gray-600">{match.team2.name}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {match.venue.name}, {match.venue.city}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-green-600">
            From ₹{match.base_price}
          </span>
          <Button onClick={onBookTicket} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Book Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
