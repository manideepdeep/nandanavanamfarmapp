import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';

type Transaction = {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
};

const paymentTypes = [
  { id: 'upi', name: 'UPI', logo: require('../../../../assets/payment-logos/upi.png') },
  { id: 'paytm', name: 'Paytm', logo: require('../../../../assets/payment-logos/paytm.png') },
  { id: 'phonepe', name: 'PhonePe', logo: require('../../../../assets/payment-logos/phonepe.png') },
  { id: 'gpay', name: 'GPay', logo: require('../../../../assets/payment-logos/gpay.png') },
  { id: 'creditcard', name: 'Credit Card', logo: require('../../../../assets/payment-logos/creditcard.png') },
  { id: 'debitcard', name: 'Debit Card', logo: require('../../../../assets/payment-logos/debitcard.png') },
];

export default function WalletScreen() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load empty transactions and set balance 0
  const loadTransactions = () => {
    setTransactions([]);      // Empty transactions
    setWalletBalance(0);      // Balance always 0
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadTransactions();
      setRefreshing(false);
    }, 1500);
  }, []);

  const addMoney = () => {
    Alert.alert('Add Money', 'Feature coming soon!');
  };

  const renderTransaction = useCallback(
    ({ item }: { item: Transaction }) => {
      // This won't render because transactions are always empty
      const isCredit = item.type === 'credit';
      return (
        <View
          style={[
            styles.transactionItem,
            { borderColor: isCredit ? '#00704A' : '#E53935' },
          ]}
        >
          <Text
            style={[
              styles.transactionType,
              { color: isCredit ? '#00704A' : '#E53935' },
            ]}
          >
            {isCredit ? '+' : '-'}₹{item.amount.toFixed(2)}
          </Text>
          <View style={styles.transactionTextContainer}>
            <Text style={styles.transactionDesc}>{item.description}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        </View>
      );
    },
    []
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={renderTransaction}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        paddingBottom: 110,
        paddingTop: 25,
        paddingHorizontal: 20,
      }}
      ListHeaderComponent={
        <View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>₹{walletBalance.toFixed(2)}</Text>
            <Text style={styles.discountNote}>
              Get 5% discount on every purchase using wallet balance
            </Text>
          </View>

          <View style={styles.paymentCard}>
            <Text style={styles.paymentTitle}>Available Payment Types</Text>
            <View style={styles.paymentTypesRow}>
              {paymentTypes.map((p) => (
                <View
                  key={p.id}
                  style={styles.paymentType}
                  accessible
                  accessibilityLabel={`Payment method: ${p.name}`}
                >
                  <Image
                    source={p.logo}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.paymentName}>{p.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.addMoneyBtn}
            onPress={addMoney}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Add money to wallet"
          >
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.length === 0 && (
            <View style={styles.noTransactions}>
              <Text style={styles.noTransactionsText}>No transactions yet</Text>
            </View>
          )}
        </View>
      }
    />
  );
}

const { width } = Dimensions.get('window');
const paymentTypeWidth = (width - 80) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#A62F2E',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  balanceLabel: {
    fontSize: 16,
    color: '#A62F2E',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: '#555',
    marginVertical: 8,
  },
  discountNote: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0A2A1',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  paymentTypesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentType: {
    width: paymentTypeWidth,
    alignItems: 'center',
    marginBottom: 22,
  },
  paymentLogo: {
    width: 48,
    height: 32,
  },
  paymentName: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
    textAlign: 'center',
  },
  addMoneyBtn: {
    backgroundColor: '#A62F2E',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#A62F2E',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  addMoneyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  noTransactions: {
    alignItems: 'center',
    marginTop: 40,
  },
  noTransactionsText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: '700',
    width: 90,
    textAlign: 'center',
  },
  transactionTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  transactionDesc: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  transactionDate: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
