import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../providers/auth-provider';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={19} {...props} />;
}

const TabsLayout = () => {
  const { session, mounting } = useAuth();

  if (mounting) return <ActivityIndicator />;
  if (!session) return <Redirect href='/auth' />;
  
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#A62F2E', // Active tab color
          tabBarInactiveTintColor: '#555555',
          tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' },
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: (props) => <TabBarIcon {...props} name="shopping-cart" />,
          }}
        />
        <Tabs.Screen
          name="subscription"
          options={{
            title: 'Subscription',
            tabBarIcon: (props) => <TabBarIcon {...props} name="shopping-basket" />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: (props) => <TabBarIcon {...props} name="list-alt" />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FA', // Light gray background
  },
  tabBar: {
    position: 'absolute',
    bottom: 0, // Added space at the bottom
    left: 10,
    right: 10,
    height: 80, // Increased height for better spacing
    backgroundColor: 'white',
    borderRadius: 20, // Soft rounded corners
    paddingTop: 15, // More space on top
    paddingBottom: 15, // More space at the bottom
    shadowColor: 'transparent',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 5, // Shadow for Android
  },
});