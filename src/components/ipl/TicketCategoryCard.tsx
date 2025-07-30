
import { Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TicketCategoryCardProps {
  category: any;
  isSelected: boolean;
  onSelect: () => void;
}

const TicketCategoryCard = ({ category, isSelected, onSelect }: TicketCategoryCardProps) => {
  const getTicketTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'hospitality': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected 
          ? 'ring-2 ring-blue-600 border-blue-600' 
          : 'hover:shadow-md border-gray-200'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-900">{category.category_name}</h4>
            {category.section_name && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {category.section_name}
              </p>
            )}
          </div>
          <Badge className={getTicketTypeColor(category.ticket_type)}>
            {category.ticket_type.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-green-600">
              ₹{category.price}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{category.available_seats} seats left</span>
            </div>
          </div>
          
          {isSelected && (
            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCategoryCard;
