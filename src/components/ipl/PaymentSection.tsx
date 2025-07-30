
import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentSectionProps {
  amount: number;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const PaymentSection = ({ amount, onPaymentComplete, onBack }: PaymentSectionProps) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">₹{amount}</span>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Select Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                <Smartphone className="h-4 w-4 text-green-600" />
                UPI Payment (Recommended)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4 text-blue-600" />
                Credit/Debit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
                <Building className="h-4 w-4 text-purple-600" />
                Net Banking
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@paytm / yourname@phonepe"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div>
            <Label htmlFor="bank">Select Bank</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-3"
        >
          {processing ? 'Processing Payment...' : `Pay ₹${amount}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Your payment is secure and encrypted. By proceeding, you agree to our terms and conditions.
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
