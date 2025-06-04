import { Link } from 'expo-router';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCartStore } from '../store/cart-store';
import { supabase } from '../lib/supabase';
import { Tables } from '../types/database.types';

export const ListHeader = ({
  categories,
}: {
  categories: Tables<'category'>[];
}) => {
  const { getItemCount } = useCartStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.headerContainer}>
      {/* Updated Header Top UI */}
      <View style={styles.headerTop}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/daialpqkv/image/upload/v1744703266/Add_a_heading_iah0dc.png',
            }}
            style={styles.avatarImage}
          />
          <Text style={styles.avatarText}>Hey there!</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Link href='/cart' asChild>
            <Pressable style={styles.cartButton}>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name='shopping-cart'
                    size={25}
                    color='#555'
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                  {getItemCount() > 0 && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{getItemCount()}</Text>
                    </View>
                  )}
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <FontAwesome name='sign-out' size={25} color='#A62F2E' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={require('../../assets/Hero Banner/Hero Banner 1.png')}
          style={styles.heroImage}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 11,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 11,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    padding: 10,
    marginRight: 10,
  },
  signOutButton: {
    padding: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#1BC464',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroContainer: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 21,
    textAlign: 'center',
    color: '#A62F2E',
    textTransform: 'capitalize',
    textShadowColor: '#888',
    textShadowOffset: { width: 1, height: 1 },
  },
  category: {
    width: 100,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});

