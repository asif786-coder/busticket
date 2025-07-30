
import { useState } from 'react';
import { CreditCard, Lock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentForm = ({ amount, onPaymentComplete }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    // Mock promo code validation with Indian offers
    if (promoCode === 'SAVE50') {
      setDiscount(50);
    } else if (promoCode === 'FIRSTRIDE') {
      setDiscount(Math.min(100, amount * 0.2));
    } else if (promoCode === 'STUDENT10') {
      setDiscount(amount * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const finalAmount = Math.max(0, amount - discount);

  const handlePayment = () => {
    // Mock payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Promo Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-green-600" />
            Apply Promo Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline" onClick={handleApplyPromo}>
              Apply
            </Button>
          </div>
          {discount > 0 && (
            <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-800">
              🎉 Promo applied! You saved ₹{discount}
            </div>
          )}
          <div className="mt-3 space-y-1">
            <Badge variant="outline" className="mr-2">SAVE50 - ₹50 off</Badge>
            <Badge variant="outline" className="mr-2">FIRSTRIDE - 20% off first booking</Badge>
            <Badge variant="outline">STUDENT10 - 10% off</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi">UPI (Recommended)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking">Net Banking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet">Digital Wallet</Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'upi' && (
            <div className="mt-4">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm / yourname@phonepe"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="Name as on card"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start">
                SBI Net Banking
              </Button>
              <Button variant="outline" className="w-full justify-start">
                HDFC Bank
              </Button>
              <Button variant="outline" className="w-full justify-start">
                ICICI Bank
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Other Banks
              </Button>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Paytm Wallet
              </Button>
              <Button variant="outline" className="w-full justify-start">
                PhonePe
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Google Pay
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Amazon Pay
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Summary & Action */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{amount}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{finalAmount}</span>
            </div>
          </div>

          <Button 
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <Lock className="h-4 w-4 mr-2" />
            Pay ₹{finalAmount} Securely
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Your payment information is encrypted and secure
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
