import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function ContactScreen() {
  const callPhone = (number: string) => Linking.openURL(`tel:${number}`);
  const sendEmail = (email: string) => Linking.openURL(`mailto:${email}`);
  const openWhatsApp = (number: string) => {
    const url = `https://wa.me/${number.replace(/[^0-9]/g, '')}`;
    Linking.openURL(url);
  };
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Phone Section */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Feather name="phone" size={20} color="#A62F2E" />
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Phone</Text>
          <TouchableOpacity onPress={() => callPhone('+919032638388')}>
            <Text style={styles.link}>+91-9032638388</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => callPhone('+919032579388')}>
            <Text style={[styles.link, { marginTop: 6 }]}>+91-9032579388</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Email Section */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Feather name="mail" size={20} color="#A62F2E" />
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Email</Text>
          <TouchableOpacity onPress={() => sendEmail('enquiry@nandanavanamfarms.in')}>
            <Text style={styles.link}>enquiry@nandanavanamfarms.in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Store Addresses */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#A62F2E" />
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Store Address - 1</Text>
          <Text style={styles.text}>Hayathnagar, Hyderabad, Telangana, India</Text>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Store Address - 2</Text>
          <Text style={styles.text}>
            Sahabhavana Apartments, Anand Nagar, Bandlaguda, Nagole, Hyderabad - 500068, Telangana,
            INDIA
          </Text>
        </View>
      </View>

      {/* Social Media Section */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Feather name="share-2" size={20} color="#A62F2E" />
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Connect with us</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              onPress={() => openWhatsApp('+919032638388')}
              style={[styles.socialIcon, { backgroundColor: '#25D366' }]}
            >
              <FontAwesome name="whatsapp" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('https://facebook.com/nandanavanamfarms')}
              style={[styles.socialIcon, { backgroundColor: '#3b5998' }]}
            >
              <FontAwesome name="facebook" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('https://instagram.com/nandanavanamfarms')}
              style={[styles.socialIcon, { backgroundColor: '#C13584' }]}
            >
              <FontAwesome name="instagram" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('https://twitter.com/nandanavanamfarm')}
              style={[styles.socialIcon, { backgroundColor: '#1DA1F2' }]}
            >
              <FontAwesome name="twitter" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Nandanavanam Farms Team</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    flexGrow: 1,
    paddingBottom: 80, // extra bottom padding for scroll
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#A62F2E',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FDEDEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  link: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#000',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
