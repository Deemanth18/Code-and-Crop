const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Sample seed data for rapid demo initialization
const SEED_LISTINGS = [
  {
    farmerName: 'John Miller (Highland Acres)',
    produceType: 'Roma Tomatoes',
    quantity: 120,
    price: 1.85,
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Highland Farm, Sector 12, Valley'
    },
    status: 'Available',
    description: 'Vine-ripened organic Roma tomatoes, harvested this morning. High yield batch ready for sauce or salads.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 1000 * 60 * 15) // 15 mins ago
  },
  {
    farmerName: 'Maria Santos (Verde Organics)',
    produceType: 'Sweet Baby Carrots',
    quantity: 85,
    price: 1.40,
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      address: 'Verde Valley Plot #4, East County'
    },
    status: 'Available',
    description: 'Crisp, washed baby carrots packed in 10kg crates. Grade A quality surplus.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 1000 * 60 * 45) // 45 mins ago
  },
  {
    farmerName: 'David Chen (Golden Field Co-op)',
    produceType: 'Crisp Bell Peppers',
    quantity: 200,
    price: 2.10,
    location: {
      latitude: 37.7650,
      longitude: -122.4312,
      address: 'Golden Field Hub, Warehouse B'
    },
    status: 'Available',
    description: 'Assorted red & yellow bell peppers. Perfect for roasting or bulk kitchen processing.',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 1000 * 60 * 90) // 1.5 hours ago
  },
  {
    farmerName: 'Sarah Jenkins (Oak Ridge Orchard)',
    produceType: 'Organic Baby Spinach',
    quantity: 45,
    price: 3.20,
    location: {
      latitude: 37.7580,
      longitude: -122.4050,
      address: 'Oak Ridge Farms, Gate 2'
    },
    status: 'Available',
    description: 'Pre-washed, tender baby spinach leaves. Harvest surplus surplus available immediately.',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  }
];

// @route   POST /api/listings
// @desc    Upload a new batch of surplus inventory
router.post('/listings', async (req, res) => {
  try {
    const { farmerName, produceType, quantity, price, location, description, imageUrl } = req.body;

    if (!farmerName || !produceType || !quantity || !price || !location) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: farmerName, produceType, quantity, price, location'
      });
    }

    const newListing = new Listing({
      farmerName,
      produceType,
      quantity: Number(quantity),
      price: Number(price),
      location: {
        latitude: Number(location.latitude) || 37.7749,
        longitude: Number(location.longitude) || -122.4194,
        address: location.address || 'Local Farm Hub'
      },
      description: description || 'Fresh farm surplus available for local enterprise pickup.',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      status: 'Available'
    });

    const savedListing = await newListing.save();

    res.status(201).json({
      success: true,
      data: savedListing
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error while creating listing'
    });
  }
});

// @route   GET /api/listings
// @desc    Fetch and browse available listings, sorted by newest first
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find({ status: 'Available' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching listings'
    });
  }
});

// @route   GET /api/listings/all
// @desc    Fetch all listings (including claimed ones for history view)
router.get('/listings/all', async (req, res) => {
  try {
    const listings = await Listing.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @route   PUT /api/listings/:id/claim
// @desc    Updates a listing status to 'Claimed' when a buyer purchases it
router.put('/listings/:id/claim', async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerName } = req.body || {};

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found'
      });
    }

    if (listing.status === 'Claimed') {
      return res.status(400).json({
        success: false,
        error: 'Listing has already been claimed by another enterprise'
      });
    }

    listing.status = 'Claimed';
    listing.claimedBy = buyerName || 'Local Bistro & Kitchen';
    listing.claimedAt = new Date();

    const updatedListing = await listing.save();

    res.status(200).json({
      success: true,
      message: 'Listing successfully claimed!',
      data: updatedListing
    });
  } catch (error) {
    console.error('Error claiming listing:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while claiming listing'
    });
  }
});

// @route   POST /api/seed
// @desc    Seed database with sample listings for presentation demo
router.post('/seed', async (req, res) => {
  try {
    await Listing.deleteMany({});
    const createdListings = await Listing.insertMany(SEED_LISTINGS);

    res.status(201).json({
      success: true,
      message: `Database seeded with ${createdListings.length} initial listings`,
      data: createdListings
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to seed database'
    });
  }
});

module.exports = router;
