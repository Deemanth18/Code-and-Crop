const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    default: 'Green Valley Regional Farm, Zone 4',
  },
}, { _id: false });

const ListingSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: [true, 'Farmer name is required'],
    trim: true,
  },
  produceType: {
    type: String,
    required: [true, 'Produce type is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity in kg is required'],
    min: [0.1, 'Quantity must be greater than 0'],
  },
  price: {
    type: Number,
    required: [true, 'Price per kg is required'],
    min: [0.01, 'Price must be greater than 0'],
  },
  location: {
    type: LocationSchema,
    required: [true, 'Location coordinates are required'],
  },
  status: {
    type: String,
    enum: ['Available', 'Claimed'],
    default: 'Available',
  },
  description: {
    type: String,
    default: 'Freshly harvested local surplus produce ready for immediate enterprise pickup.',
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  },
  claimedBy: {
    type: String,
    default: null,
  },
  claimedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Listing', ListingSchema);
