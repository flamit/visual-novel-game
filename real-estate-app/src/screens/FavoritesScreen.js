import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES } from '../data/properties';

export default function FavoritesScreen({ navigation, favorites, onToggleFavorite }) {
  const items = useMemo(() => PROPERTIES.filter(p => favorites.has(p.id)), [favorites]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        renderItem={({ item }) => (
          <PropertyCard
            item={item}
            isFavorite={true}
            onToggleFavorite={() => onToggleFavorite(item.id)}
            onPress={() => navigation.navigate('PropertyDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: 24 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>No saved homes yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' }
});