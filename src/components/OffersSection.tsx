
import { Percent, Gift, Clock, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      title: 'First Ride Free',
      description: 'Get up to $20 off on your first booking',
      code: 'FIRST20',
      discount: '$20 OFF',
      icon: <Gift className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Weekend Special',
      description: '15% off on weekend bookings',
      code: 'WEEKEND15',
      discount: '15% OFF',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Card Cashback',
      description: 'Extra 10% cashback with credit card',
      code: 'CARD10',
      discount: '10% Cashback',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Percent className="h-6 w-6 text-orange-500" />
          <h3 className="text-2xl font-semibold text-gray-900">Exclusive Offers</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                <div className={`${offer.color} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-white/20 rounded-lg">
                      {offer.icon}
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {offer.discount}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{offer.title}</h4>
                  <p className="text-sm text-white/90">{offer.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">Use code:</span>
                      <div className="font-mono font-semibold text-gray-900">{offer.code}</div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Copy Code
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
