import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import { API_BASE_URL } from '../src/config';

const SORTS = [
  { key: 'deliveryTime', label: 'Fastest' },
  { key: 'rating', label: 'Top rated' },
  { key: 'deliveryFee', label: 'Lowest fee' }
];

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState('deliveryTime');

  const [favorites, setFavorites] = useState({});
  const [cart, setCart] = useState({});

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (selectedCuisine !== 'All') params.append('cuisine', selectedCuisine);
      if (openNow) params.append('openNow', 'true');
      params.append('sortBy', sortBy);

      const [restaurantsRes, featuredRes] = await Promise.all([
        fetch(`${API_BASE_URL}/restaurants?${params.toString()}`),
        fetch(`${API_BASE_URL}/restaurants/featured`)
      ]);

      setRestaurants(await restaurantsRes.json());
      setFeatured(await featuredRes.json());
    } catch {
      setRestaurants([]);
      setFeatured([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortBy, selectedCuisine, openNow]);

  const cuisines = useMemo(() => ['All', ...new Set(restaurants.map((r) => r.cuisine))], [restaurants]);
  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  const toggleFavorite = (id) => setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  const addToCart = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Food Delivery Pro</Text>
      <Text style={styles.subtitle}>Cart: {totalItems} item(s)</Text>

      <TextInput
        placeholder="Search restaurants"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={() => fetchData()}
        style={styles.input}
      />

      <View style={styles.row}>
        <Text style={styles.filterLabel}>Open now</Text>
        <Switch value={openNow} onValueChange={setOpenNow} />
      </View>

      <FlatList
        horizontal
        data={SORTS}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.chipsRow}
        renderItem={({ item }) => (
          <Pressable style={[styles.chip, sortBy === item.key && styles.chipActive]} onPress={() => setSortBy(item.key)}>
            <Text style={sortBy === item.key ? styles.chipTextActive : styles.chipText}>{item.label}</Text>
          </Pressable>
        )}
      />

      <FlatList
        horizontal
        data={cuisines}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.chipsRow}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.chip, selectedCuisine === item && styles.chipActive]}
            onPress={() => setSelectedCuisine(item)}
          >
            <Text style={selectedCuisine === item ? styles.chipTextActive : styles.chipText}>{item}</Text>
          </Pressable>
        )}
      />

      <Text style={styles.sectionTitle}>Featured deals</Text>
      <FlatList
        horizontal
        data={featured}
        keyExtractor={(item) => `featured-${item.id}`}
        contentContainerStyle={styles.featuredRow}
        renderItem={({ item }) => (
          <View style={styles.featuredCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.promoPercent}% OFF</Text>
          </View>
        )}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => String(item.id)}
          onRefresh={() => fetchData(true)}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Pressable onPress={() => toggleFavorite(item.id)}>
                  <Text>{favorites[item.id] ? '❤️' : '🤍'}</Text>
                </Pressable>
              </View>
              <Text style={styles.meta}>
                {item.cuisine} • ⭐ {item.rating} • {item.deliveryTimeMinutes} min • ${item.deliveryFee}
              </Text>
              <Text style={[styles.status, { color: item.isOpen ? '#0a7f3f' : '#b42318' }]}>
                {item.isOpen ? 'Open' : 'Closed'}
              </Text>
              <Pressable style={styles.button} onPress={() => addToCart(item.id)}>
                <Text style={styles.buttonText}>Add to cart</Text>
              </Pressable>
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
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { marginBottom: 12, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  filterLabel: { fontSize: 15, fontWeight: '600' },
  chipsRow: { paddingBottom: 10, gap: 8 },
  chip: { backgroundColor: '#f2f4f7', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  chipActive: { backgroundColor: '#111827' },
  chipText: { color: '#111827' },
  chipTextActive: { color: '#fff' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  featuredRow: { gap: 10, marginBottom: 12 },
  featuredCard: { backgroundColor: '#fff7ed', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#fed7aa' },
  card: { padding: 14, marginBottom: 12, borderRadius: 10, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#eaecf0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '600' },
  meta: { marginTop: 4, color: '#555' },
  status: { marginTop: 6, fontWeight: '600' },
  button: { marginTop: 10, backgroundColor: '#111827', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
