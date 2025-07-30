
import { CheckCircle, Download, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const BookingConfirmation = () => {
  const bookingDetails = {
    bookingId: 'OT12345678',
    route: 'Mumbai → Pune',
    date: new Date().toLocaleDateString('en-IN'),
    time: '06:00 - 09:30',
    operator: 'Orange Tours & Travels',
    busType: 'AC Sleeper',
    seats: ['A5', 'A6'],
    passengerName: 'Rajesh Kumar',
    totalAmount: 945,
    status: 'Confirmed'
  };

  const handleDownloadTicket = () => {
    // Create ticket content
    const ticketContent = `
ORANGE TOURS & TRAVELS
Bus Ticket Confirmation

Booking ID: ${bookingDetails.bookingId}
Route: ${bookingDetails.route}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Bus Type: ${bookingDetails.busType}
Seats: ${bookingDetails.seats.join(', ')}
Passenger: ${bookingDetails.passengerName}
Total Amount: ₹${bookingDetails.totalAmount}
Status: ${bookingDetails.status}

Important Instructions:
• Please reach the boarding point 15 minutes before departure
• Carry a valid government ID for verification
• Face mask is recommended while traveling

Contact: +91 98765 43210
Email: support@orangetours.com
    `;

    // Create and download file
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ticket_${bookingDetails.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Ticket Downloaded",
      description: "Your ticket has been downloaded successfully",
    });
  };

  const handleEmailTicket = () => {
    const subject = `Bus Ticket - ${bookingDetails.bookingId}`;
    const body = `Dear ${bookingDetails.passengerName},

Your bus ticket has been confirmed. Here are your booking details:

Booking ID: ${bookingDetails.bookingId}
Route: ${bookingDetails.route}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Bus Type: ${bookingDetails.busType}
Seats: ${bookingDetails.seats.join(', ')}
Total Amount: ₹${bookingDetails.totalAmount}

Important Instructions:
• Please reach the boarding point 15 minutes before departure
• Carry a valid government ID for verification
• Face mask is recommended while traveling

For any queries, contact us at +91 98765 43210

Thank you for choosing Orange Tours & Travels!

Best regards,
Orange Tours & Travels Team`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');

    toast({
      title: "Email Client Opened",
      description: "Your email client has been opened with the ticket details",
    });
  };

  const handleContactSupport = () => {
    const phoneNumber = '+919876543210';
    const message = `Hi, I need help with my booking ${bookingDetails.bookingId}. Route: ${bookingDetails.route} on ${bookingDetails.date}`;
    
    // Try WhatsApp first, then fallback to phone
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.open(whatsappUrl, '_blank');
    } else {
      // For desktop, show contact options
      const contactText = `
Contact Support:
Phone: ${phoneNumber}
WhatsApp: Click to open WhatsApp Web
Email: support@orangetours.com

Booking ID: ${bookingDetails.bookingId}
      `;
      
      if (confirm(contactText + '\n\nClick OK to open WhatsApp Web or Cancel to copy phone number')) {
        window.open(whatsappUrl, '_blank');
      } else {
        navigator.clipboard.writeText(phoneNumber);
        toast({
          title: "Phone Number Copied",
          description: "Support phone number has been copied to clipboard",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Your bus ticket has been booked successfully
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-6">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center justify-between">
                <span>Booking Details</span>
                <Badge className="bg-green-100 text-green-800">
                  {bookingDetails.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Booking ID</span>
                    <div className="font-mono font-semibold text-lg">
                      {bookingDetails.bookingId}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Route</span>
                    <div className="font-semibold">{bookingDetails.route}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Travel Date</span>
                    <div className="font-semibold">{bookingDetails.date}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Time</span>
                    <div className="font-semibold">{bookingDetails.time}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Operator</span>
                    <div className="font-semibold">{bookingDetails.operator}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Bus Type</span>
                    <div className="font-semibold">{bookingDetails.busType}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Seats</span>
                    <div className="flex gap-2">
                      {bookingDetails.seats.map(seat => (
                        <Badge key={seat} variant="outline">{seat}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <div className="font-bold text-lg text-green-600">
                      ₹{bookingDetails.totalAmount}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Please reach the boarding point 15 minutes before departure time</li>
                <li>• Carry a valid government ID (Aadhar Card/PAN Card/Driving License) for verification</li>
                <li>• Your ticket has been sent to your registered email address and mobile number</li>
                <li>• For any changes or cancellation, contact customer support</li>
                <li>• Refund will be processed according to our cancellation policy</li>
                <li>• Face mask is recommended while traveling</li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Button 
              className="flex items-center gap-2" 
              variant="outline"
              onClick={handleDownloadTicket}
            >
              <Download className="h-4 w-4" />
              Download Ticket
            </Button>
            <Button 
              className="flex items-center gap-2" 
              variant="outline"
              onClick={handleEmailTicket}
            >
              <Mail className="h-4 w-4" />
              Email Ticket
            </Button>
            <Button 
              className="flex items-center gap-2" 
              variant="outline"
              onClick={handleContactSupport}
            >
              <Phone className="h-4 w-4" />
              Contact Support
            </Button>
          </div>

          {/* Navigation */}
          <div className="text-center space-y-4">
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Another Trip
            </Button>
            <div>
              <Button variant="link" onClick={() => window.location.href = '/my-bookings'}>
                View All Bookings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
