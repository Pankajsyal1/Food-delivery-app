import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { API_BASE_URL } from '../src/config';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/restaurants`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Food Delivery</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.cuisine} • {item.deliveryTimeMinutes} min</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No restaurants available.</Text>}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  card: { padding: 14, marginBottom: 12, borderRadius: 10, backgroundColor: '#f5f5f5' },
  name: { fontSize: 18, fontWeight: '600' },
  meta: { marginTop: 4, color: '#555' }
});
