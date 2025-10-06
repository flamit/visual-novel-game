import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import PropertyDetailScreen from './src/screens/PropertyDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const favSet = useMemo(() => new Set(favorites), [favorites]);

  function toggleFavorite(id) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return Array.from(next);
    });
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: 'Discover Homes' }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              favorites={favSet}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="PropertyDetail"
          options={{ title: 'Listing' }}
        >
          {(props) => (
            <PropertyDetailScreen
              {...props}
              favorites={favSet}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Favorites"
          options={{ title: 'Saved' }}
        >
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favSet}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}