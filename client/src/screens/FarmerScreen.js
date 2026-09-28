import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { PRODUCE_PRESETS, FARM_LOCATION_PRESETS } from '../mockData';
import Toast from '../components/Toast';

export default function FarmerScreen({ listings = [], onAddListing, activeFarmerName }) {
  const [farmerName, setFarmerName] = useState(activeFarmerName || 'John Miller (Highland Acres)');
  const [produceType, setProduceType] = useState('Roma Tomatoes');
  const [quantity, setQuantity] = useState('150');
  const [price, setPrice] = useState('1.75');
  const [selectedLocation, setSelectedLocation] = useState(FARM_LOCATION_PRESETS[0]);
  const [description, setDescription] = useState('Fresh morning harvest surplus, prime grade.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  // Toast State
  const [toastConfig, setToastConfig] = useState({ visible: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToastConfig({ visible: true, message, type });
  };

  const handleSelectPreset = (index) => {
    setSelectedPresetIndex(index);
    const preset = PRODUCE_PRESETS[index];
    setProduceType(preset.name);
    setPrice(preset.defaultPrice.toString());
  };

  const handleSubmit = async () => {
    if (!farmerName.trim() || !produceType.trim() || !quantity || !price) {
      triggerToast('Please fill out produce type, quantity, and price', 'warning');
      return;
    }

    setIsSubmitting(true);

    const presetObj = PRODUCE_PRESETS.find(
      p => p.name.toLowerCase() === produceType.toLowerCase()
    );

    const newListingData = {
      farmerName,
      produceType,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      location: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        address: selectedLocation.address,
      },
      description,
      imageUrl: presetObj ? presetObj.imageUrl : 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    };

    try {
      await onAddListing(newListingData);
      setQuantity('100');
      triggerToast('Surplus produce batch published to marketplace!', 'success');
    } catch (err) {
      console.error(err);
      triggerToast('Error listing produce. Check backend connection.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCount = listings.filter(l => l.status === 'Available').length;
  const claimedCount = listings.filter(l => l.status === 'Claimed').length;
  const totalWeight = listings.reduce((acc, l) => acc + (l.quantity || 0), 0);
  const totalRevenue = listings.reduce((acc, l) => acc + ((l.quantity || 0) * (l.price || 0)), 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Custom Toast Notification */}
      <Toast
        visible={toastConfig.visible}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToastConfig(prev => ({ ...prev, visible: false }))}
      />

      {/* 21st.dev Bento Grid Dashboard Summary Banner */}
      <View style={styles.dashBanner}>
        <View style={styles.dashHeaderRow}>
          <Text style={styles.dashTitle}>🌾 Organic Producer Dashboard</Text>
          <View style={styles.farmerBadge}>
            <Text style={styles.farmerBadgeText}>SELLER DASHBOARD</Text>
          </View>
        </View>

        {/* Bento Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{activeCount}</Text>
            <Text style={styles.statLbl}>Active Batches</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: '#D97706' }]}>{claimedCount}</Text>
            <Text style={styles.statLbl}>Batches Sold</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statVal}>{totalWeight} kg</Text>
            <Text style={styles.statLbl}>Surplus Listed</Text>
          </View>

          <View style={[styles.statCard, styles.statCardHighlight]}>
            <Text style={[styles.statVal, { color: '#059669' }]}>
              ${totalRevenue.toFixed(0)}
            </Text>
            <Text style={styles.statLbl}>Recovered Value</Text>
          </View>
        </View>
      </View>

      {/* Upload Surplus Inventory Form Card */}
      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderTitle}>📦 Upload Surplus Inventory</Text>
          <Text style={styles.formHeaderSub}>
            Directly connect your harvest surplus to nearby commercial food businesses.
          </Text>
        </View>

        {/* Quick Produce Preset Selector */}
        <Text style={styles.fieldHeader}>SELECT PRODUCE PRESET OR TYPE CUSTOM</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
          {PRODUCE_PRESETS.map((preset, idx) => (
            <TouchableOpacity
              key={preset.name}
              style={[
                styles.presetChip,
                selectedPresetIndex === idx && styles.presetChipActive
              ]}
              onPress={() => handleSelectPreset(idx)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.presetChipText,
                  selectedPresetIndex === idx && styles.presetChipTextActive
                ]}
              >
                {preset.name} (${preset.defaultPrice}/kg)
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Form Input Fields */}
        <View style={styles.inputBox}>
          <Text style={styles.fieldHeader}>FARM / PRODUCER NAME</Text>
          <TextInput
            style={styles.inputField}
            value={farmerName}
            onChangeText={setFarmerName}
            placeholder="Highland Acres Farm"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.rowTwoCol}>
          <View style={[styles.inputBox, { flex: 1 }]}>
            <Text style={styles.fieldHeader}>PRODUCE TYPE</Text>
            <TextInput
              style={styles.inputField}
              value={produceType}
              onChangeText={setProduceType}
              placeholder="e.g. Roma Tomatoes"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={[styles.inputBox, { flex: 1 }]}>
            <Text style={styles.fieldHeader}>QUANTITY (KG)</Text>
            <TextInput
              style={styles.inputField}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="150"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        <View style={styles.rowTwoCol}>
          <View style={[styles.inputBox, { flex: 1 }]}>
            <Text style={styles.fieldHeader}>PRICE PER KG ($)</Text>
            <TextInput
              style={styles.inputField}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="1.75"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={[styles.inputBox, { flex: 1 }]}>
            <Text style={styles.fieldHeader}>ESTIMATED BATCH TOTAL</Text>
            <View style={styles.calcDisplay}>
              <Text style={styles.calcValue}>
                ${((parseFloat(quantity) || 0) * (parseFloat(price) || 0)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Farm Location Selection */}
        <View style={styles.inputBox}>
          <Text style={styles.fieldHeader}>FARM LOCATION (GEOLOCATION RADAR)</Text>
          <View style={styles.locList}>
            {FARM_LOCATION_PRESETS.map((loc) => (
              <TouchableOpacity
                key={loc.label}
                style={[
                  styles.locItem,
                  selectedLocation.label === loc.label && styles.locItemActive
                ]}
                onPress={() => setSelectedLocation(loc)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.locItemText,
                    selectedLocation.label === loc.label && styles.locItemTextActive
                  ]}
                >
                  📍 {loc.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Batch Description Notes */}
        <View style={styles.inputBox}>
          <Text style={styles.fieldHeader}>CROP DESCRIPTION & QUALITY NOTES</Text>
          <TextInput
            style={[styles.inputField, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholder="Describe harvest date, grade, packaging details..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* CTA List Button */}
        <TouchableOpacity
          style={[styles.publishBtn, isSubmitting && styles.btnDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.85}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.publishBtnText}>🌱 List Surplus Produce Batch →</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Active Inventory Card */}
      <View style={styles.inventoryCard}>
        <Text style={styles.inventoryTitle}>📋 Your Active Inventory Batches ({listings.length})</Text>

        {listings.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyMsg}>No listings posted yet. Publish a new batch above!</Text>
          </View>
        ) : (
          listings.map((item) => (
            <View key={item._id || item.createdAt} style={styles.itemRowCard}>
              <View style={styles.itemColLeft}>
                <Text style={styles.itemTitle}>{item.produceType}</Text>
                <Text style={styles.itemSubDetails}>
                  {item.quantity} kg @ ${item.price.toFixed(2)}/kg • Total: ${((item.quantity * item.price)).toFixed(2)}
                </Text>
                <Text style={styles.itemLocText}>📍 {item.location?.address || 'Local Farm'}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  item.status === 'Available' ? styles.statusGreen : styles.statusAmber
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    item.status === 'Available' ? styles.statusBadgeTextGreen : styles.statusBadgeTextAmber
                  ]}
                >
                  {item.status === 'Available' ? 'Available' : 'Claimed'}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
  },
  dashBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
  },
  dashHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dashTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
  },
  farmerBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  farmerBadgeText: {
    color: '#047857',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statCardHighlight: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  statVal: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 2,
  },
  statLbl: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
  },
  formHeader: {
    marginBottom: 16,
  },
  formHeaderTitle: {
    color: '#059669',
    fontSize: 20,
    fontWeight: '900',
  },
  formHeaderSub: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 2,
  },
  fieldHeader: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  presetScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  presetChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  presetChipActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  presetChipText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  presetChipTextActive: {
    color: '#047857',
    fontWeight: '800',
  },
  inputBox: {
    marginBottom: 14,
  },
  rowTwoCol: {
    flexDirection: 'row',
    gap: 12,
  },
  inputField: {
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  calcDisplay: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcValue: {
    color: '#047857',
    fontSize: 18,
    fontWeight: '900',
  },
  locList: {
    gap: 8,
  },
  locItem: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locItemActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
  },
  locItemText: {
    color: '#64748B',
    fontSize: 12,
  },
  locItemTextActive: {
    color: '#D97706',
    fontWeight: '800',
  },
  publishBtn: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  inventoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
  },
  inventoryTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  emptyBox: {
    padding: 20,
    alignItems: 'center',
  },
  emptyMsg: {
    color: '#94A3B8',
    fontSize: 13,
  },
  itemRowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemColLeft: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  itemSubDetails: {
    color: '#059669',
    fontSize: 13,
    marginVertical: 2,
    fontWeight: '700',
  },
  itemLocText: {
    color: '#64748B',
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusGreen: {
    backgroundColor: '#ECFDF5',
  },
  statusAmber: {
    backgroundColor: '#FFFBEB',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statusBadgeTextGreen: {
    color: '#047857',
  },
  statusBadgeTextAmber: {
    color: '#D97706',
  },
});
