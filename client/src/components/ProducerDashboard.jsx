import React, { useState } from 'react';
import { 
  Tractor, 
  PackageCheck, 
  DollarSign, 
  Scale, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Tag,
  AlertCircle,
  FileText
} from 'lucide-react';

const PRODUCE_PRESETS = [
  { name: 'Roma Tomatoes', defaultPrice: 1.85, category: 'Vegetables', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sweet Baby Carrots', defaultPrice: 1.40, category: 'Root Crops', img: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=800&q=80' },
  { name: 'Crisp Bell Peppers', defaultPrice: 2.10, category: 'Vegetables', img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80' },
  { name: 'Organic Baby Spinach', defaultPrice: 3.20, category: 'Greens', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hass Avocados', defaultPrice: 2.80, category: 'Fruits', img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fresh Sweet Basil', defaultPrice: 4.50, category: 'Herbs', img: 'https://images.unsplash.com/photo-1608683267713-399026a7e097?auto=format&fit=crop&w=800&q=80' },
];

const FARM_LOCATIONS = [
  { label: 'Highland Organic Farm (Sector 12, CA)', lat: 37.7749, lng: -122.4194 },
  { label: 'Verde Valley Plot #4 (CA)', lat: 37.7833, lng: -122.4167 },
  { label: 'Golden Field Hub, Warehouse B (CA)', lat: 37.7650, lng: -122.4312 },
  { label: 'Heritage Orchard Block 9 (CA)', lat: 37.7400, lng: -122.4100 },
];

export default function ProducerDashboard({ listings = [], onAddListing, activeFarmerName }) {
  const [farmerName, setFarmerName] = useState(activeFarmerName || 'Green Valley Organic Farms');
  const [produceType, setProduceType] = useState('Roma Tomatoes');
  const [quantity, setQuantity] = useState('150');
  const [price, setPrice] = useState('1.85');
  const [category, setCategory] = useState('Vegetables');
  const [grade, setGrade] = useState('Grade A Organic');
  const [selectedLocIndex, setSelectedLocIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(PRODUCE_PRESETS[0].img);
  const [description, setDescription] = useState('Harvested fresh this morning. Prime grade organic harvest ready for kitchen delivery.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const activeCount = listings.filter(l => l.status === 'Available').length;
  const claimedCount = listings.filter(l => l.status === 'Claimed').length;
  const totalWeight = listings.reduce((acc, l) => acc + (l.quantity || 0), 0);
  const totalRevenue = listings.reduce((acc, l) => acc + ((l.quantity || 0) * (l.price || 0)), 0);

  const handleSelectPreset = (index) => {
    setSelectedPresetIndex(index);
    const p = PRODUCE_PRESETS[index];
    setProduceType(p.name);
    setPrice(p.defaultPrice.toString());
    setCategory(p.category);
    setImageUrl(p.img);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!farmerName || !produceType || !quantity || !price) return;

    setIsSubmitting(true);
    const locObj = FARM_LOCATIONS[selectedLocIndex];

    const newListing = {
      farmerName,
      produceType,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      category,
      grade,
      location: {
        latitude: locObj.lat,
        longitude: locObj.lng,
        address: locObj.label,
      },
      description,
      imageUrl: imageUrl || PRODUCE_PRESETS[0].img,
    };

    try {
      await onAddListing(newListing);
      setQuantity('100');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 mb-12">
      
      {/* Bento Grid Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#091f14] rounded-3xl p-5 border border-slate-200 dark:border-[#143823] shadow-lg">
          <div className="flex items-center justify-between text-slate-500 dark:text-emerald-400/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Batches</span>
            <PackageCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{activeCount}</p>
          <p className="text-xs text-emerald-600 dark:text-[#34d399] font-semibold mt-1">Ready for marketplace claim</p>
        </div>

        <div className="bg-white dark:bg-[#091f14] rounded-3xl p-5 border border-slate-200 dark:border-[#143823] shadow-lg">
          <div className="flex items-center justify-between text-slate-500 dark:text-amber-400/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Batches Sold</span>
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{claimedCount}</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">Claimed & delivered</p>
        </div>

        <div className="bg-white dark:bg-[#091f14] rounded-3xl p-5 border border-slate-200 dark:border-[#143823] shadow-lg">
          <div className="flex items-center justify-between text-slate-500 dark:text-emerald-400/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Surplus (kg)</span>
            <Scale className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalWeight} kg</p>
          <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-semibold mt-1">Harvest volume listed</p>
        </div>

        <div className="bg-emerald-600 dark:bg-[#059669] text-white rounded-3xl p-5 shadow-xl shadow-emerald-600/20 border border-emerald-500 dark:border-emerald-400">
          <div className="flex items-center justify-between text-emerald-100 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Recovered Value</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black">${totalRevenue.toFixed(0)}</p>
          <p className="text-xs text-emerald-100 font-semibold mt-1">Direct producer income</p>
        </div>

      </div>

      {/* Inventory Upload Form Card */}
      <div className="bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl p-6 sm:p-8">
        
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-[#143823]">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-[#34d399] flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Publish Surplus Produce Batch</h2>
            <p className="text-xs text-slate-500 dark:text-emerald-300/70">List your harvest directly to commercial food kitchens & buyers</p>
          </div>
        </div>

        {/* Quick Produce Preset Chips */}
        <div className="mb-6">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-emerald-300/80 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets (Click to Auto-fill):
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PRODUCE_PRESETS.map((p, idx) => (
              <button
                type="button"
                key={p.name}
                onClick={() => handleSelectPreset(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedPresetIndex === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25'
                    : 'bg-slate-50 dark:bg-[#06170e] text-slate-700 dark:text-emerald-200 border-slate-200 dark:border-[#143823] hover:border-emerald-500'
                }`}
              >
                {p.name} (${p.defaultPrice}/kg)
              </button>
            ))}
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Producer / Farm Name
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                placeholder="Highland Acres Organic Farm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Produce Crop Name
              </label>
              <input
                type="text"
                value={produceType}
                onChange={(e) => setProduceType(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                placeholder="Roma Tomatoes"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Quantity (kg)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                placeholder="150"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Price per kg ($)
              </label>
              <input
                type="number"
                step="0.05"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                placeholder="1.85"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Calculated Batch Value
              </label>
              <div className="px-4 py-2.5 bg-emerald-50 dark:bg-[#06170e] border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-[#34d399] font-black text-sm flex items-center justify-between">
                <span>Total:</span>
                <span>${((parseFloat(quantity) || 0) * (parseFloat(price) || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Crop Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Root Crops">Root Crops</option>
                <option value="Greens">Greens</option>
                <option value="Fruits">Fruits</option>
                <option value="Herbs">Herbs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
                Quality Grade Tag
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              >
                <option value="Grade A Organic">Grade A Organic</option>
                <option value="Grade A Certified">Grade A Certified</option>
                <option value="Grade A Prime">Grade A Prime</option>
                <option value="Surplus Batch Standard">Surplus Batch Standard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
              Farm GPS Location Address
            </label>
            <select
              value={selectedLocIndex}
              onChange={(e) => setSelectedLocIndex(Number(e.target.value))}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            >
              {FARM_LOCATIONS.map((loc, i) => (
                <option key={i} value={i}>📍 {loc.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 mb-1">
              Crop Quality Notes & Packaging Details
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#06170e] border border-slate-200 dark:border-[#143823] rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white resize-none"
              placeholder="Describe harvest date, packaging details, temperature recommendations..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Publishing Batch...' : '🌱 Publish Surplus Batch to Marketplace →'}
          </button>

        </form>
      </div>

      {/* Active Inventory Data Table */}
      <div className="bg-white dark:bg-[#091f14] rounded-3xl border border-slate-200 dark:border-[#143823] shadow-xl overflow-hidden p-6">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          📋 Your Active Farm Inventory ({listings.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#143823] text-slate-400 dark:text-emerald-400/80 font-bold uppercase tracking-wider">
                <th className="pb-3 px-2">Crop</th>
                <th className="pb-3 px-2">Quantity</th>
                <th className="pb-3 px-2">Rate</th>
                <th className="pb-3 px-2">Batch Total</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#143823]">
              {listings.map((item) => (
                <tr key={item._id || item.createdAt} className="hover:bg-slate-50 dark:hover:bg-[#06170e]">
                  <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">{item.produceType}</td>
                  <td className="py-3 px-2 text-slate-600 dark:text-emerald-200 font-semibold">{item.quantity} kg</td>
                  <td className="py-3 px-2 text-emerald-600 dark:text-[#34d399] font-bold">${(Number(item.price) || 0).toFixed(2)}/kg</td>
                  <td className="py-3 px-2 font-black text-slate-900 dark:text-white">${((Number(item.quantity) || 0) * (Number(item.price) || 0)).toFixed(2)}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      item.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-[#34d399]'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
