import React from 'react';
import { Image, Pressable, View, Text, StyleSheet } from 'react-native';
import { formatPrice } from '../data/properties';

export default function PropertyCard({ item, isFavorite, onPress, onToggleFavorite }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.sub}>{item.address}</Text>
          <Text style={styles.meta}>
            {item.beds} bd • {item.baths} ba • {item.sqft} sqft
          </Text>
        </View>
        <Pressable onPress={onToggleFavorite} style={[styles.favBtn, isFavorite && styles.favActive]}>
          <Text style={styles.favText}>{isFavorite ? '♥' : '♡'}</Text>
        </Pressable>
      </View>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#eee'
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4
  },
  sub: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4
  },
  meta: {
    fontSize: 12,
    color: '#777'
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a7',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 6
  },
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
  favActive: {
    borderColor: '#f66',
    backgroundColor: '#fee'
  },
  favText: {
    fontSize: 18,
    color: '#e44'
  }
});