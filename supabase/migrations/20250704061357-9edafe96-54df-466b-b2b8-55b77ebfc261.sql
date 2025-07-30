
-- Create enum for match status
CREATE TYPE match_status AS ENUM ('upcoming', 'live', 'completed', 'cancelled');

-- Create enum for ticket types
CREATE TYPE ticket_type AS ENUM ('general', 'premium', 'vip', 'hospitality');

-- Create venues table for IPL stadiums
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  city TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team1_id UUID REFERENCES teams(id) NOT NULL,
  team2_id UUID REFERENCES teams(id) NOT NULL,
  venue_id UUID REFERENCES venues(id) NOT NULL,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  match_type TEXT NOT NULL DEFAULT 'League',
  status match_status DEFAULT 'upcoming',
  base_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ticket_categories table
CREATE TABLE ticket_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  category_name TEXT NOT NULL,
  ticket_type ticket_type NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  section_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create merchandise table for t-shirts
CREATE TABLE merchandise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'jersey',
  price DECIMAL(10,2) NOT NULL,
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  match_id UUID REFERENCES matches(id),
  ticket_category_id UUID REFERENCES ticket_categories(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  booking_reference TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create merchandise_orders table
CREATE TABLE merchandise_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  merchandise_id UUID REFERENCES merchandise(id),
  quantity INTEGER NOT NULL,
  size TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  order_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to venues, teams, matches, ticket_categories, merchandise
CREATE POLICY "Anyone can view venues" ON venues FOR SELECT USING (true);
CREATE POLICY "Anyone can view teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Anyone can view matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Anyone can view ticket categories" ON ticket_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view merchandise" ON merchandise FOR SELECT USING (true);

-- Create policies for bookings (users can only see their own bookings)
CREATE POLICY "Users can view their own bookings" ON bookings 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON bookings 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON bookings 
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for merchandise orders (users can only see their own orders)
CREATE POLICY "Users can view their own merchandise orders" ON merchandise_orders 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own merchandise orders" ON merchandise_orders 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own merchandise orders" ON merchandise_orders 
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample IPL teams
INSERT INTO teams (name, short_name, city, primary_color, secondary_color) VALUES
('Mumbai Indians', 'MI', 'Mumbai', '#004BA0', '#D4AF37'),
('Chennai Super Kings', 'CSK', 'Chennai', '#FFFF3C', '#00008B'),
('Royal Challengers Bangalore', 'RCB', 'Bangalore', '#FF0000', '#FFD700'),
('Kolkata Knight Riders', 'KKR', 'Kolkata', '#3A225D', '#B3A123'),
('Delhi Capitals', 'DC', 'Delhi', '#17479E', '#EF1B23'),
('Punjab Kings', 'PBKS', 'Mohali', '#DD1F2D', '#FFD200'),
('Rajasthan Royals', 'RR', 'Jaipur', '#E91C7A', '#FFD200'),
('Sunrisers Hyderabad', 'SRH', 'Hyderabad', '#FF822A', '#000000'),
('Gujarat Titans', 'GT', 'Ahmedabad', '#1B2951', '#FFD200'),
('Lucknow Super Giants', 'LSG', 'Lucknow', '#E04F16', '#4CC3F0');

-- Insert sample IPL venues
INSERT INTO venues (name, city, state, capacity, address) VALUES
('Wankhede Stadium', 'Mumbai', 'Maharashtra', 33108, 'Churchgate, Mumbai'),
('M. A. Chidambaram Stadium', 'Chennai', 'Tamil Nadu', 50000, 'Chepauk, Chennai'),
('M. Chinnaswamy Stadium', 'Bangalore', 'Karnataka', 40000, 'Cubbon Park, Bangalore'),
('Eden Gardens', 'Kolkata', 'West Bengal', 68000, 'Maidan, Kolkata'),
('Arun Jaitley Stadium', 'Delhi', 'Delhi', 41842, 'Feroz Shah Kotla, Delhi'),
('PCA Stadium', 'Mohali', 'Punjab', 26950, 'Mohali, Punjab'),
('Sawai Mansingh Stadium', 'Jaipur', 'Rajasthan', 30000, 'Jaipur, Rajasthan'),
('Rajiv Gandhi International Stadium', 'Hyderabad', 'Telangana', 55000, 'Uppal, Hyderabad'),
('Narendra Modi Stadium', 'Ahmedabad', 'Gujarat', 132000, 'Motera, Ahmedabad'),
('Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium', 'Lucknow', 'Uttar Pradesh', 50000, 'Lucknow, Uttar Pradesh');
