import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { PROPERTIES, formatPrice } from '../data/properties';

export default function PropertyDetailScreen({ route, navigation, favorites, onToggleFavorite }) {
  const { id } = route.params || {};
  const property = useMemo(() => PROPERTIES.find(p => p.id === id), [id]);

  if (!property) {
    return (
      <View style={styles.center}>
        <Text>Listing not found.</Text>
      </View>
    );
  }

  const isFav = favorites.has(property.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.address}>{property.address}</Text>
        </View>
        <Pressable
          onPress={() => onToggleFavorite(property.id)}
          style={[styles.favBtn, isFav && styles.favActive]}
        >
          <Text style={styles.favText}>{isFav ? '♥' : '♡'}</Text>
        </Pressable>
      </View>

      <Text style={styles.price}>{formatPrice(property.price)}</Text>

      <View style={styles.stats}>
        <Stat label="Beds" value={property.beds} />
        <Stat label="Baths" value={property.baths} />
        <Stat label="Sqft" value={property.sqft} />
      </View>

      <View style={styles.actions}>
        <Pressable style={[styles.cta, styles.primary]} onPress={() => {}}>
          <Text style={styles.ctaText}>Contact Agent</Text>
        </Pressable>
        <Pressable style={[styles.cta, styles.secondary]} onPress={() => navigation.goBack()}>
          <Text style={[styles.ctaText, styles.secondaryText]}>Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 240, backgroundColor: '#eee' },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center'
  },
  title: { fontSize: 20, fontWeight: '700', color: '#222' },
  address: { color: '#666', marginTop: 4 },
  price: { fontSize: 22, fontWeight: '800', color: '#0a7', paddingHorizontal: 16, paddingTop: 12 },
  stats: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginTop: 10 },
  stat: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  statLabel: { fontSize: 12, color: '#777' },
  statValue: { fontSize: 16, fontWeight: '700', color: '#333', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 16 },
  cta: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: { backgroundColor: '#0a7' },
  secondary: { borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  ctaText: { color: '#fff', fontWeight: '700' },
  secondaryText: { color: '#333' },
  favBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  favActive: { borderColor: '#f66', backgroundColor: '#fee' },
  favText: { fontSize: 18, color: '#e44' }
});