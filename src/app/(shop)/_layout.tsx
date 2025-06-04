import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Feather icons for clean modern UI
import { useAuth } from '../../providers/auth-provider';

function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
  return <Feather size={26} style={{ marginBottom: -2 }} {...props} />;
}

const TabsLayout = () => {
  const { session, mounting } = useAuth();

  if (mounting) return <ActivityIndicator />;
  if (!session) return <Redirect href="/auth" />;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#A62F2E',
          tabBarInactiveTintColor: '#999999',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: (props) => <TabBarIcon {...props} name="home" />,
          }}
        />
        <Tabs.Screen
          name="packages"
          options={{
            title: 'Packages',
            tabBarIcon: (props) => <TabBarIcon {...props} name="box" />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: (props) => <TabBarIcon {...props} name="list" />,
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarIcon: (props) => <TabBarIcon {...props} name="credit-card" />,
          }}
        />
                <Tabs.Screen
          name="contact"
          options={{
            title: 'Contact',
            tabBarIcon: (props) => <TabBarIcon {...props} name="message-circle" />,
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
    backgroundColor: '#F7F9FA',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 0,
  },
});
