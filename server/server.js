const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');
const listingRoutes = require('./routes/listingRoutes');
const Listing = require('./models/Listing');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', listingRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'AgriGrid B2B Marketplace API',
    version: '1.0.0',
    endpoints: {
      postListing: 'POST /api/listings',
      getListings: 'GET /api/listings',
      claimListing: 'PUT /api/listings/:id/claim',
      seedDatabase: 'POST /api/seed'
    }
  });
});

// Database Connection
async function connectDB() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrigrid';

  try {
    console.log(`📡 Connecting to MongoDB at: ${mongoURI} (2s timeout check)...`);
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ Connected to local MongoDB successfully!');
    await seedIfEmpty();
  } catch (err) {
    console.log('⚡ Local MongoDB not active. Falling back to In-Memory MongoDB for zero-config run...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('✅ Connected to In-Memory MongoDB successfully!');
      await seedIfEmpty();
    } catch (memErr) {
      console.error('❌ In-memory MongoDB error:', memErr.message);
    }
  }
}

async function seedIfEmpty() {
  try {
    const count = await Listing.countDocuments();
    if (count === 0) {
      console.log('🌱 Database empty. Seeding initial AgriGrid produce listings...');
      const seedData = [
        {
          farmerName: 'John Miller (Highland Acres)',
          produceType: 'Roma Tomatoes',
          quantity: 120,
          price: 1.85,
          location: { latitude: 37.7749, longitude: -122.4194, address: 'Highland Farm, Sector 12' },
          status: 'Available',
          description: 'Vine-ripened organic Roma tomatoes harvested this morning.',
          imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
        },
        {
          farmerName: 'Maria Santos (Verde Organics)',
          produceType: 'Sweet Baby Carrots',
          quantity: 85,
          price: 1.40,
          location: { latitude: 37.7833, longitude: -122.4167, address: 'Verde Valley Plot #4' },
          status: 'Available',
          description: 'Crisp, washed baby carrots packed in 10kg crates.',
          imageUrl: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=600&q=80'
        },
        {
          farmerName: 'David Chen (Golden Field Co-op)',
          produceType: 'Crisp Bell Peppers',
          quantity: 200,
          price: 2.10,
          location: { latitude: 37.7650, longitude: -122.4312, address: 'Golden Field Hub, Warehouse B' },
          status: 'Available',
          description: 'Assorted red & yellow bell peppers surplus.',
          imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80'
        }
      ];
      await Listing.insertMany(seedData);
      console.log('✨ Demo produce data seeded successfully!');
    }
  } catch (seedErr) {
    console.error('Seed error:', seedErr.message);
  }
}

// Start Server with Graceful Port Fallback
console.log('\n🚀 Launching AgriGrid B2B Marketplace Backend Server...');
const server = app.listen(PORT, async () => {
  console.log(`==================================================`);
  console.log(`🌐 AgriGrid Server online at: http://localhost:${PORT}`);
  console.log(`==================================================`);
  await connectDB();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = Number(PORT) + 1;
    console.log(`⚠️ Port ${PORT} busy. Retrying on fallback port ${nextPort}...`);
    app.listen(nextPort, async () => {
      console.log(`==================================================`);
      console.log(`🌐 AgriGrid Server online at: http://localhost:${nextPort}`);
      console.log(`==================================================`);
      await connectDB();
    });
  } else {
    console.error('❌ Server error:', err);
  }
});

