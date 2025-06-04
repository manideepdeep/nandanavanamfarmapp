// Cart.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useCartStore } from '../store/cart-store';
import { StatusBar } from 'expo-status-bar';
import { createOrder, createOrderItem } from '../api/api';

type CartItemType = {
  id: number;
  title: string;
  heroImage: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

const CartItem = ({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.heroImage }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onDecrement(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onIncrement(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Cart() {
  const {
    items,
    removeItem,
    incrementItem,
    decrementItem,
    getTotalPrice,
    resetCart,
  } = useCartStore();

  const { mutateAsync: createSupabaseOrder } = createOrder();
  const { mutateAsync: createSupabaseOrderItem } = createOrderItem();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  const [form, setForm] = useState({
    name: '',
    gmail: '',
    mobile: '',
    address: '',
    date: '',
    time: '',
    paymentMethod: 'COD',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      gmail: '',
      mobile: '',
      address: '',
      date: '',
      time: '',
      paymentMethod: 'COD',
    });
  };

  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.gmail.trim() ||
      !form.mobile.trim() ||
      !form.address.trim() ||
      !form.date.trim() ||
      !form.time.trim()
    ) {
      alert('Please fill all the fields');
      return false;
    }
    if (!form.gmail.includes('@')) {
      alert('Please enter a valid Gmail address');
      return false;
    }
    if (form.mobile.length < 6) {
      alert('Please enter a valid mobile number');
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const totalPrice = parseFloat(getTotalPrice());

    try {
      const orderData = await createSupabaseOrder({ totalPrice });
      await createSupabaseOrderItem(
        items.map((item) => ({
          orderId: orderData.id,
          productId: item.id,
          quantity: item.quantity,
        }))
      );

      const sheetPayload = {
        orderId: orderData.id,
        totalPrice: totalPrice.toFixed(2),
        name: form.name,
        gmail: form.gmail,
        mobile: form.mobile,
        address: form.address,
        date: form.date,
        time: form.time,
        paymentMethod: form.paymentMethod,
        items: items
          .map(
            (i) =>
              `${i.title} (Qty: ${i.quantity}, Price: ₹${(
                i.price * i.quantity
              ).toFixed(2)})`
          )
          .join(' | '),
      };

      await fetch('https://script.google.com/macros/s/AKfycbxSioRZJ338DxvxMggNwqsyy2__GaZdJwWYJ6GhMOAm7iZyD-gmSpVn-RmJEtE04uEw/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetPayload),
      });

      setLoading(false);
      setThankYouVisible(true);
      resetCart();
      resetForm();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('An error occurred while processing your order.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
          />
        )}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
        <TouchableOpacity
          onPress={() => {
            if (items.length === 0) {
              alert('Add items to cart before checkout.');
              return;
            }
            setModalVisible(true);
          }}
          style={[styles.checkoutButton, items.length === 0 && { opacity: 0.6 }]}
          disabled={items.length === 0}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Checkout Modal */}
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.modalTitle}>Enter Your Details</Text>

            {(['name', 'gmail', 'mobile', 'address', 'date', 'time'] as (keyof typeof form)[]).map((field) => (
              <View key={field} style={styles.inputGroup}>
                <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter your ${field}`}
                  keyboardType={
                    field === 'mobile'
                      ? 'phone-pad'
                      : field === 'gmail'
                      ? 'email-address'
                      : 'default'
                  }
                  value={form[field]}
                  onChangeText={(text) => handleChange(field, text)}
                />
              </View>
            ))}

            {/* Payment */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Payment Method</Text>
              <TouchableOpacity
                style={[styles.radioButton, form.paymentMethod === 'COD' && styles.radioSelected]}
                onPress={() => handleChange('paymentMethod', 'COD')}
              >
                <Text style={[styles.radioText, form.paymentMethod === 'COD' && styles.radioTextSelected]}>
                  Cash on Delivery (COD)
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleCheckout} style={styles.submitButton} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Place Order</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Thank You Modal */}
      <Modal visible={thankYouVisible} transparent animationType="fade">
        <View style={styles.thankYouContainer}>
          <View style={styles.thankYouBox}>
            <Text style={styles.thankYouText}>Thank you for your order!</Text>
            <TouchableOpacity style={styles.thankYouButton} onPress={() => setThankYouVisible(false)}>
              <Text style={styles.thankYouButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  cartList: { paddingVertical: 16 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 18, color: '#888' },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 16 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, color: '#888' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold' },
  itemQuantity: { fontSize: 14, color: '#666' },
  removeButton: { padding: 8, backgroundColor: '#ff5252', borderRadius: 8 },
  removeButtonText: { color: '#fff', fontSize: 14 },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    alignItems: 'center',
  },
  totalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  checkoutButton: {
    backgroundColor: '#A62F2E',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  checkoutButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalContent: { padding: 24 },
  modalTitle: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  radioButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    marginTop: 6,
  },
  radioSelected: { backgroundColor: '#A62F2E', borderColor: '#A62F2E' },
  radioText: { color: '#555', fontWeight: '600' },
  radioTextSelected: { color: '#fff' },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#A62F2E',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelButton: { marginTop: 16, alignItems: 'center' },
  cancelButtonText: { color: '#ff5252', fontSize: 16 },
  thankYouContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  thankYouText: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  thankYouButton: {
    backgroundColor: '#A62F2E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  thankYouButtonText: { color: '#fff', fontWeight: 'bold' },
});
