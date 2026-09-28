// Mock Data & Geolocation Utilities for AgriGrid Demo

export const MOCK_BUYER_LOCATION = {
  name: 'Central District Commercial Kitchen Hub',
  latitude: 37.7739,
  longitude: -122.4149,
};

export const FARM_LOCATION_PRESETS = [
  {
    label: 'Highland Acres Organic Farm',
    address: 'Highland Ridge Rd, Sector 12 (1.8 km away)',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    label: 'Verde Organics Co-op',
    address: 'Verde Valley Plot #4, North Gate (2.5 km away)',
    latitude: 37.7833,
    longitude: -122.4167,
  },
  {
    label: 'Golden Field Produce Hub',
    address: 'Golden Field Hub, Warehouse B (3.1 km away)',
    latitude: 37.7650,
    longitude: -122.4312,
  },
  {
    label: 'Oak Ridge Hydroponic Farm',
    address: 'Oak Ridge Farm, Gate 2 (4.2 km away)',
    latitude: 37.7580,
    longitude: -122.4050,
  }
];

export const PRODUCE_PRESETS = [
  {
    name: 'Roma Tomatoes',
    category: 'Vegetables',
    defaultPrice: 1.85,
    wholesaleRate: 2.90,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sweet Baby Carrots',
    category: 'Root Crops',
    defaultPrice: 1.40,
    wholesaleRate: 2.20,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Crisp Bell Peppers',
    category: 'Vegetables',
    defaultPrice: 2.10,
    wholesaleRate: 3.50,
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Organic Baby Spinach',
    category: 'Greens',
    defaultPrice: 3.20,
    wholesaleRate: 5.00,
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fresh Hydroponic Basil',
    category: 'Herbs',
    defaultPrice: 4.50,
    wholesaleRate: 7.80,
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Hass Avocados (Grade A Surplus)',
    category: 'Fruits',
    defaultPrice: 2.80,
    wholesaleRate: 4.60,
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
  }
];

/**
 * Calculates distance in kilometers between two GPS coordinates using Haversine formula
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return '1.5 km';
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return `${distance.toFixed(1)} km`;
};

/**
 * Calculate estimated discount percentage vs estimated market price
 */
export const calculateDiscount = (pricePerKg, produceName) => {
  const match = PRODUCE_PRESETS.find(p => p.name.toLowerCase() === (produceName || '').toLowerCase());
  const benchmark = match ? match.wholesaleRate : pricePerKg * 1.5;
  const discount = Math.round(((benchmark - pricePerKg) / benchmark) * 100);
  return discount > 0 ? `${discount}% OFF Market Rate` : 'Discount Surplus';
};
