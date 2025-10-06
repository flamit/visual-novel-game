import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES } from '../data/properties';

export default function HomeScreen({ navigation, favorites, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filtered = useMemo(() => {
    return PROPERTIES.filter(p => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
      const priceCap = Number(maxPrice);
      const matchesPrice = !priceCap || p.price <= priceCap;
      return matchesQ && matchesPrice;
    });
  }, [query, maxPrice]);

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <TextInput
          placeholder="Search by title or address"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <TextInput
          placeholder="Max price (USD)"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
          style={styles.input}
        />
        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.buttonText}>Saved</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.secondary]} onPress={() => { setQuery(''); setMaxPrice(''); }}>
            <Text style={[styles.buttonText, styles.secondaryText]}>Clear</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <PropertyCard
            item={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={() => onToggleFavorite(item.id)}
            onPress={() => navigation.navigate('PropertyDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: 24 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>No results. Try adjusting filters.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  filters: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  input: {
    height: 44,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9e9e9'
  },
  actions: { flexDirection: 'row', gap: 12 },
  button: {
    backgroundColor: '#0a7',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  secondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  secondaryText: { color: '#333' }
});