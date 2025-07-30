
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface SeatSelectionProps {
  onSeatSelect: (seats: string[]) => void;
  selectedSeats: string[];
  maxSeats?: number;
}

const SeatSelection = ({ onSeatSelect, selectedSeats, maxSeats = 4 }: SeatSelectionProps) => {
  // Generate seats for a typical bus layout (10 rows, 10 seats per row)
  const generateSeats = () => {
    const seats = [];
    const rows = 10;
    const seatsPerRow = 10;
    
    // Pre-booked seats (mock data)
    const bookedSeats = ['1A', '1B', '2C', '3E', '4F', '5H', '6A', '7D', '8G', '9I'];
    
    for (let row = 1; row <= rows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        const seatLetter = String.fromCharCode(65 + col); // A, B, C, D, E, F, G, H, I, J
        const seatNumber = `${row}${seatLetter}`;
        seats.push({
          id: seatNumber,
          row: row,
          position: col,
          isBooked: bookedSeats.includes(seatNumber),
          isSelected: selectedSeats.includes(seatNumber)
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.isBooked) return;

    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      newSelectedSeats = selectedSeats.filter(s => s !== seatId);
    } else {
      // Select seat (check max limit)
      if (selectedSeats.length >= maxSeats) {
        return; // Don't allow more than max seats
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }
    onSeatSelect(newSelectedSeats);
  };

  const getSeatStyle = (seat: any) => {
    if (seat.isBooked) {
      return 'bg-red-200 text-red-800 cursor-not-allowed border-red-300';
    }
    if (seat.isSelected) {
      return 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700';
    }
    return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 cursor-pointer';
  };

  // Group seats by row for rendering
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<number, typeof seats>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Select Your Seats ({selectedSeats.length}/{maxSeats} selected)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 border border-blue-600 rounded"></div>
            <span className="text-sm text-white">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-200 border border-red-300 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Bus Layout */}
        <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
          {/* Driver Section */}
          <div className="flex items-center justify-center mb-4 pb-4 border-b border-gray-300">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🚗</span>
            </div>
            <span className="ml-2 text-sm text-gray-600">Driver</span>
          </div>

          {/* Seats Grid */}
          <div className="space-y-2">
            {Object.keys(seatsByRow)
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map(rowNum => {
                const rowSeats = seatsByRow[parseInt(rowNum)];
                return (
                  <div key={rowNum} className="flex items-center justify-center gap-1">
                    {/* Left side seats (A, B) */}
                    <div className="flex gap-1">
                      {rowSeats.slice(0, 2).map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          className={`w-8 h-8 rounded text-xs font-medium border transition-all duration-200 ${getSeatStyle(seat)}`}
                          disabled={seat.isBooked}
                          title={`Seat ${seat.id} - ${seat.isBooked ? 'Booked' : seat.isSelected ? 'Selected' : 'Available'}`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>

                    {/* Aisle */}
                    <div className="w-6 flex justify-center">
                      <div className="w-px h-6 bg-gray-300"></div>
                    </div>

                    {/* Middle seats (C, D, E, F) */}
                    <div className="flex gap-1">
                      {rowSeats.slice(2, 6).map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          className={`w-8 h-8 rounded text-xs font-medium border transition-all duration-200 ${getSeatStyle(seat)}`}
                          disabled={seat.isBooked}
                          title={`Seat ${seat.id} - ${seat.isBooked ? 'Booked' : seat.isSelected ? 'Selected' : 'Available'}`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>

                    {/* Aisle */}
                    <div className="w-6 flex justify-center">
                      <div className="w-px h-6 bg-gray-300"></div>
                    </div>

                    {/* Right side seats (G, H, I, J) */}
                    <div className="flex gap-1">
                      {rowSeats.slice(6, 10).map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          className={`w-8 h-8 rounded text-xs font-medium border transition-all duration-200 ${getSeatStyle(seat)}`}
                          disabled={seat.isBooked}
                          title={`Seat ${seat.id} - ${seat.isBooked ? 'Booked' : seat.isSelected ? 'Selected' : 'Available'}`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Selected Seats Info */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Selected Seats:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seat => (
                <Badge key={seat} className="bg-blue-100 text-blue-800">
                  {seat}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-2">
              {maxSeats - selectedSeats.length} more seat{maxSeats - selectedSeats.length !== 1 ? 's' : ''} can be selected
            </p>
          </div>
        )}

        {selectedSeats.length === 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              Please select at least one seat to continue with your booking.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeatSelection;
