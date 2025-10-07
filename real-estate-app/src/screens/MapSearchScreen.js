import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { DUBAI_PROPERTIES } from '../data/properties_dubai';
import { formatPrice } from '../data/properties';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const DUBAI_LAT = 25.2048;
const DUBAI_LNG = 55.2708;

export default function MapSearchScreen({ navigation, favorites, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const priceCap = Number(maxPrice);
    return DUBAI_PROPERTIES.filter(p => {
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
      const matchesPrice = !priceCap || p.price <= priceCap;
      return matchesQ && matchesPrice;
    });
  }, [query, maxPrice]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: DUBAI_LAT,
          longitude: DUBAI_LNG,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12 * ASPECT_RATIO
        }}
      >
        {items.map(p => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lng }}
            title={p.title}
            description={formatPrice(p.price)}
          >
            <Callout onPress={() => navigation.navigate('PropertyDetail', { id: p.id })}>
              <View style={{ maxWidth: 260 }}>
                <Text style={{ fontWeight: '700' }}>{p.title}</Text>
                <Text style={{ color: '#666', marginTop: 2 }}>{p.address}</Text>
                <Text style={{ color: '#0a7', marginTop: 4 }}>{formatPrice(p.price)}</Text>
                <Pressable
                  onPress={() => onToggleFavorite(p.id)}
                  style={[styles.favBtn, favorites.has(p.id) && styles.favActive]}
                >
                  <Text style={styles.favText}>{favorites.has(p.id) ? '♥ Saved' : '♡ Save'}</Text>
                </Pressable>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Dubai (title or address)"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <TextInput
          placeholder="Max price"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
          style={[styles.input, { width: 120 }]}
        />
        <Pressable style={styles.clearBtn} onPress={() => { setQuery(''); setMaxPrice(''); }}>
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    flexDirection: 'row',
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5'
  },
  clearBtn: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  clearText: { color: '#333', fontWeight: '600' },
  favBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  favActive: { borderColor: '#f66', backgroundColor: '#fee' },
  favText: { color: '#e44', fontWeight: '600' }
});