
import { Shirt, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MerchandiseCardProps {
  item: any;
  onBuy: () => void;
}

const MerchandiseCard = ({ item, onBuy }: MerchandiseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="relative">
          <div 
            className="h-32 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: item.team?.primary_color || '#f3f4f6' }}
          >
            <Shirt className="h-16 w-16 text-white opacity-80" />
          </div>
          {item.stock_quantity < 10 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Only {item.stock_quantity} left
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
        
        {item.team && (
          <p className="text-sm text-gray-600 mb-2">{item.team.name}</p>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">Sizes:</span>
          {item.sizes.slice(0, 3).map((size: string) => (
            <Badge key={size} variant="outline" className="text-xs">
              {size}
            </Badge>
          ))}
          {item.sizes.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.sizes.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-green-600">
            ₹{item.price}
          </span>
          <Button 
            onClick={onBuy}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchandiseCard;
