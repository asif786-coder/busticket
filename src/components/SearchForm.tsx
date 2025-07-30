
import { useState } from 'react';
import { Calendar, MapPin, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface SearchFormProps {
  onSearch: (searchData: any) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchData, setSearchData] = useState({
    from: 'Mumbai',
    to: 'Pune',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const swapLocations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-5 gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Departure city"
                  value={searchData.from}
                  onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={swapLocations}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Destination city"
                  value={searchData.to}
                  onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Search Button */}
            <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
              Search Buses
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
