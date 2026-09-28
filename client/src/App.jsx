import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import AuthModal from './components/AuthModal.jsx';
import HeroSection from './components/HeroSection.jsx';
import MarketplaceFeed from './components/MarketplaceFeed.jsx';
import MapRadarVisualizer from './components/MapRadarVisualizer.jsx';
import ProducerDashboard from './components/ProducerDashboard.jsx';
import PasscodeModal from './components/PasscodeModal.jsx';
import ToastNotification from './components/ToastNotification.jsx';
import { 
  fetchAllListings, 
  createProduceListing, 
  claimProduceListing, 
  triggerSeedDemo 
} from './services/api.js';
import { Sprout, ShieldCheck } from 'lucide-react';

export default function App() {
  // Restore logged-in user session if available, else start unauthenticated (null)
  const [activeUser, setActiveUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agrigrid_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentTab, setCurrentTab] = useState(() => {
    if (!activeUser) return 'landing';
    return activeUser.role === 'farmer' ? 'farmer' : 'buyer';
  });

  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark theme for vibrant modern design

  // Modals & Notifications
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState('buyer');
  const [claimedModalItem, setClaimedModalItem] = useState(null);
  const [selectedMapItem, setSelectedMapItem] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  // Toggle Dark Mode Theme
  const handleToggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Fetch Produce Listings
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllListings();
      setListings(data);
    } catch (err) {
      console.error(err);
      triggerToast('Error loading produce listings', 'warning');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Farmer Adding Produce
  const handleAddListing = async (newListingData) => {
    try {
      const created = await createProduceListing(newListingData);
      setListings(prev => [created, ...prev]);
      triggerToast('Surplus produce batch published to marketplace!', 'success');
      return created;
    } catch (err) {
      console.error(err);
      triggerToast('Could not post listing. Try again.', 'warning');
      throw err;
    }
  };

  // Handle Buyer Claiming Produce
  const handleClaimListing = async (item) => {
    if (!activeUser) {
      openAuthModal('buyer');
      return;
    }
    try {
      const result = await claimProduceListing(item._id, activeUser.name);
      setListings(prev => prev.filter(l => l._id !== item._id));
      setClaimedModalItem(item);
      triggerToast(`Order Claimed! Passcode generated for ${item.produceType}`, 'success');
    } catch (err) {
      console.error(err);
      triggerToast('Error claiming listing', 'warning');
    }
  };

  // Trigger Seeding
  const handleSeed = async () => {
    setIsLoading(true);
    try {
      await triggerSeedDemo();
      await loadData();
      triggerToast('Fresh produce demo data seeded!', 'success');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Open Auth Modal
  const openAuthModal = (role = 'buyer') => {
    setAuthInitialRole(role);
    setShowAuthModal(true);
  };

  // Handle Successful Sign In / Registration
  const handleAuthSuccess = (user) => {
    setActiveUser(user);
    try {
      localStorage.setItem('agrigrid_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save session to localStorage', e);
    }
    setShowAuthModal(false);
    setCurrentTab(user.role === 'farmer' ? 'farmer' : 'buyer');
    triggerToast(`Authenticated as ${user.name} (${user.role === 'farmer' ? 'Seller' : 'Buyer'})`, 'success');
  };

  // Handle Sign Out / Logout
  const handleSignOut = () => {
    setActiveUser(null);
    try {
      localStorage.removeItem('agrigrid_user');
    } catch (e) {
      console.warn('Error clearing localStorage', e);
    }
    setCurrentTab('landing');
    triggerToast('Signed out of AgriGrid B2B Exchange', 'info');
  };

  // Filter listings by search and category
  const filteredListings = (Array.isArray(listings) ? listings : []).filter(item => {
    if (!item) return false;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const produceTypeStr = (item.produceType || '').toLowerCase();
    const farmerNameStr = (item.farmerName || '').toLowerCase();
    const searchStr = (searchTerm || '').toLowerCase();
    const matchesSearch = !searchStr || produceTypeStr.includes(searchStr) || farmerNameStr.includes(searchStr);
    return matchesCategory && matchesSearch;
  });

  const totalWeight = (Array.isArray(listings) ? listings : []).reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0);
  const avgPrice = (Array.isArray(listings) && listings.length > 0)
    ? listings.reduce((acc, item) => acc + (Number(item?.price) || 0), 0) / listings.length 
    : 1.85;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040d08] text-slate-900 dark:text-[#f0fdf4] flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      
      {/* Toast Notification Banner */}
      <ToastNotification 
        toast={toast} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />

      {/* Main Glass Header Navigation */}
      <Navbar
        activeUser={activeUser}
        onSignOut={handleSignOut}
        onOpenAuth={openAuthModal}
        onRefresh={loadData}
        onSeed={handleSeed}
        currentTab={currentTab}
        onTabChange={(tab) => {
          // Strictly lock tabs based on activeUser role
          if (activeUser?.role === 'farmer') {
            setCurrentTab('farmer');
          } else if (activeUser?.role === 'buyer') {
            setCurrentTab(tab === 'farmer' ? 'buyer' : tab);
          }
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* VIEW 0: UNAUTHENTICATED PUBLIC LANDING PAGE */}
      {!activeUser ? (
        <LandingPage
          onOpenAuth={openAuthModal}
          onExploreClick={() => openAuthModal('buyer')}
        />
      ) : (
        /* AUTHENTICATED ROLE VIEWS */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* VIEW 1: BUYER MARKETPLACE (Only accessible to logged-in Buyers) */}
          {activeUser.role === 'buyer' && currentTab === 'buyer' && (
            <div>
              <HeroSection 
                listingsCount={listings.length}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                totalWeight={totalWeight}
                averagePrice={avgPrice}
              />

              {/* Geolocation Radar */}
              <MapRadarVisualizer
                listings={filteredListings}
                selectedItem={selectedMapItem}
                onSelectItem={(item) => setSelectedMapItem(item)}
                onClaimItem={handleClaimListing}
              />

              {/* Marketplace Feed Product Cards */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  🛒 Available Surplus Harvest ({filteredListings.length})
                </h2>
              </div>

              <MarketplaceFeed
                listings={filteredListings}
                onClaimListing={handleClaimListing}
                isLoading={isLoading}
                activeBuyerName={activeUser.name}
              />
            </div>
          )}

          {/* VIEW 2: GPS RADAR MAP (Only accessible to logged-in Buyers) */}
          {activeUser.role === 'buyer' && currentTab === 'radar' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-black text-white">
                  📡 Hyperlocal Logistics & Geolocation Radar
                </h1>
                <p className="text-sm text-slate-400">
                  Live radar map matching nearby farm producers with local commercial kitchens within 5 km.
                </p>
              </div>

              <MapRadarVisualizer
                listings={listings}
                selectedItem={selectedMapItem}
                onSelectItem={(item) => setSelectedMapItem(item)}
                onClaimItem={handleClaimListing}
              />

              <MarketplaceFeed
                listings={listings}
                onClaimListing={handleClaimListing}
                isLoading={isLoading}
                activeBuyerName={activeUser.name}
              />
            </div>
          )}

          {/* VIEW 3: SELLER DASHBOARD (Strictly locked to logged-in Sellers) */}
          {activeUser.role === 'farmer' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-black text-white">
                  🚜 Organic Producer Dashboard
                </h1>
                <p className="text-sm text-slate-400">
                  Manage your harvest inventory, list surplus produce, and track direct B2B revenue.
                </p>
              </div>

              <ProducerDashboard
                listings={listings}
                onAddListing={handleAddListing}
                activeFarmerName={activeUser.name}
              />
            </div>
          )}

        </main>
      )}

      {/* Authentication & Pickup Passcode Modals */}
      <AuthModal
        isOpen={showAuthModal}
        initialRole={authInitialRole}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <PasscodeModal
        claimedItem={claimedModalItem}
        onClose={() => setClaimedModalItem(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-white">AgriGrid B2B Marketplace</span>
            <span>• Direct Farm-to-Kitchen Exchange</span>
          </div>

          <div className="flex items-center gap-4 font-bold">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> API Connected (MongoDB Server)
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
