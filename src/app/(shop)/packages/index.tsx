import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

type Vegetable = {
  name: string;
  weight: number;
};

type Package = {
  id: string;
  price: number;
  vegetables: Vegetable[];
  servings: number;
};

const packages: Package[] = [
  {
    id: 'p1',
    price: 249,
    servings: 2,
    vegetables: [
      { name: 'Tomatoes', weight: 200 },
      { name: 'Green Chilies', weight: 50 },
      { name: 'Onions', weight: 150 },
      { name: 'Curry Leaves', weight: 20 },
      { name: 'Carrots', weight: 100 },
    ],
  },
  {
    id: 'p2',
    price: 449,
    servings: 4,
    vegetables: [
      { name: 'Tomatoes', weight: 400 },
      { name: 'Green Chilies', weight: 100 },
      { name: 'Onions', weight: 300 },
      { name: 'Curry Leaves', weight: 40 },
      { name: 'Carrots', weight: 200 },
      { name: 'Potatoes', weight: 300 },
    ],
  },
  {
    id: 'p3',
    price: 649,
    servings: 6,
    vegetables: [
      { name: 'Tomatoes', weight: 600 },
      { name: 'Green Chilies', weight: 150 },
      { name: 'Onions', weight: 450 },
      { name: 'Curry Leaves', weight: 60 },
      { name: 'Carrots', weight: 300 },
      { name: 'Potatoes', weight: 450 },
      { name: 'Beans', weight: 200 },
    ],
  },
  {
    id: 'p4',
    price: 849,
    servings: 8,
    vegetables: [
      { name: 'Tomatoes', weight: 800 },
      { name: 'Green Chilies', weight: 200 },
      { name: 'Onions', weight: 600 },
      { name: 'Curry Leaves', weight: 80 },
      { name: 'Carrots', weight: 400 },
      { name: 'Potatoes', weight: 600 },
      { name: 'Beans', weight: 300 },
      { name: 'Eggplants', weight: 300 },
    ],
  },
  {
    id: 'p5',
    price: 999,
    servings: 10,
    vegetables: [
      { name: 'Tomatoes', weight: 1000 },
      { name: 'Green Chilies', weight: 250 },
      { name: 'Onions', weight: 750 },
      { name: 'Curry Leaves', weight: 100 },
      { name: 'Carrots', weight: 500 },
      { name: 'Potatoes', weight: 750 },
      { name: 'Beans', weight: 400 },
      { name: 'Eggplants', weight: 400 },
      { name: 'Pumpkin', weight: 300 },
    ],
  },
];

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGE32oQsQOoDHJXJFavHwrf0_61V_MISEICUJ39kigENkLKG6SUf2Ucai-2jOIsoGU/exec'; // <-- Replace with your URL

export default function PackagesScreen() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  const openOrderModal = (pack: Package) => {
    setSelectedPackage(pack);
    setModalVisible(true);
  };

  const handleOrder = async () => {
    if (!userName || !userPhone || !userEmail || !userAddress || !deliveryDate || !deliveryTime) {
      Alert.alert('Oops!', 'Please fill all details.');
      return;
    }

    setLoading(true);

    const orderData = {
      name: userName,
      phone: userPhone,
      email: userEmail,
      address: userAddress,
      date: deliveryDate,
      time: deliveryTime,
      packageId: selectedPackage?.id,
      price: selectedPackage?.price,
      servings: selectedPackage?.servings,
      vegetables: selectedPackage?.vegetables.map(v => `${v.name} (${v.weight}g)`).join(', '),
      payment: 'Cash on Delivery',
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const text = await response.text();

      const result = JSON.parse(text);

      if (result.success) {
        setModalVisible(false);
        setThankYouVisible(true);
        setTimeout(() => setThankYouVisible(false), 3000);

        setUserName('');
        setUserPhone('');
        setUserEmail('');
        setUserAddress('');
        setDeliveryDate('');
        setDeliveryTime('');
        setSelectedPackage(null);
      } else {
        Alert.alert('Error', 'Something went wrong. Try again later.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const renderPackage = ({ item }: { item: Package }) => {
    const totalWeight = item.vegetables.reduce((sum, veg) => sum + veg.weight, 0);

    return (
      <TouchableOpacity style={styles.card} onPress={() => openOrderModal(item)} activeOpacity={0.85}>
        <View style={styles.headerRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <View style={styles.servingBadge}>
            <Text style={styles.servingText}>{item.servings} Servings</Text>
          </View>
        </View>
        <View style={styles.vegList}>
          {item.vegetables.map((veg) => (
            <View key={veg.name} style={styles.vegItem}>
              <Text style={styles.vegName}>{veg.name}</Text>
              <Text style={styles.vegWeight}>{veg.weight}g</Text>
            </View>
          ))}
        </View>
        <Text style={styles.totalWeight}>Total: {totalWeight}g</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={renderPackage}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Your Details</Text>
            <Text style={styles.modalSubTitle}>
              Package ₹{selectedPackage?.price} — {selectedPackage?.servings} servings
            </Text>

            <TextInput placeholder="Name" style={styles.input} value={userName} onChangeText={setUserName} />
            <TextInput placeholder="Phone" style={styles.input} value={userPhone} onChangeText={setUserPhone} keyboardType="phone-pad" />
            <TextInput placeholder="Gmail" style={styles.input} value={userEmail} onChangeText={setUserEmail} keyboardType="email-address" />
            <TextInput placeholder="Address" style={[styles.input, { height: 70 }]} value={userAddress} onChangeText={setUserAddress} multiline />
            <TextInput placeholder="Delivery Date (e.g., 2025-06-05)" style={styles.input} value={deliveryDate} onChangeText={setDeliveryDate} />
            <TextInput placeholder="Delivery Time (e.g., 10:00 AM)" style={styles.input} value={deliveryTime} onChangeText={setDeliveryTime} />

            <Text style={{ fontSize: 16, fontWeight: '600', marginVertical: 10 }}>Payment Method: Cash on Delivery</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#EF474F" style={{ marginVertical: 10 }} />
            ) : (
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.orderBtn]} onPress={handleOrder}>
                  <Text style={styles.btnText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Thank You Screen */}
      <Modal visible={thankYouVisible} transparent animationType="fade">
        <View style={styles.thankYouOverlay}>
          <View style={styles.thankYouContainer}>
            <Text style={styles.thankYouText}>🎉 Thank you for your order!</Text>
            <Text style={{ textAlign: 'center' }}>We'll deliver it on time!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3D3D3D',
  },
  servingBadge: {
    backgroundColor: '#FFCACA',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  servingText: {
    fontWeight: '600',
    color: '#A72626',
  },
  vegList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vegItem: {
    backgroundColor: '#FDEEEE',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  vegName: {
    fontWeight: '600',
    color: '#D8331A',
    fontSize: 14,
  },
  vegWeight: {
    fontWeight: '400',
    fontSize: 12,
    color: '#7B7B7B',
  },
  totalWeight: {
    marginTop: 10,
    fontWeight: '600',
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(60, 60, 60, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#DDD',
  },
  orderBtn: {
    backgroundColor: '#EF474F',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  thankYouOverlay: {
    flex: 1,
    backgroundColor: 'rgba(60, 60, 60, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  thankYouContainer: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 18,
    maxWidth: 320,
  },
  thankYouText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#28A745',
  },
});
