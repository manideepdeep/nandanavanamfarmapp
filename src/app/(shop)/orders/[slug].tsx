import { Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getMyOrder } from '../../../api/api';
import { format } from 'date-fns';

const OrderDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data: order, error, isLoading } = getMyOrder(slug);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (error || !order) return <Text>Error: {error?.message || 'Order not found'}</Text>;

  // Prepare items with needed info
  const orderItems = order.order_items.map((orderItem: any) => ({
    id: orderItem.id,
    title: orderItem.products.title,
    heroImage: orderItem.products.heroImage,
    price: orderItem.products.price,
    quantity: orderItem.quantity,
    subtotal: orderItem.products.price * orderItem.quantity,
  }));

  // Calculate total price from items (fallback if order.total_price not present)
  const totalPrice =
    order.totalPrice ??
    orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${order.slug}` }} />

      <Text style={styles.item}>{order.slug}</Text>
      <Text style={styles.details}>{order.description}</Text>

      <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>

      <Text style={styles.date}>
        {format(new Date(order.created_at), 'MMM dd, yyyy')}
      </Text>

      <Text style={styles.itemsTitle}>Items Ordered:</Text>

      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={{ uri: item.heroImage }} style={styles.heroImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>
                ₹{item.price.toFixed(2)} × {item.quantity} = ₹
                {item.subtotal.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ₹{totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 110,
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusBadge_Pending: {
    backgroundColor: 'orange',
  },
  statusBadge_Completed: {
    backgroundColor: 'green',
  },
  statusBadge_Shipped: {
    backgroundColor: 'blue',
  },
  statusBadge_InTransit: {
    backgroundColor: 'purple',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 16,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  itemInfo: {
    flexShrink: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
    color: '#444',
  },
  totalContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#FCFAF8',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A62F2E',
  },
});
