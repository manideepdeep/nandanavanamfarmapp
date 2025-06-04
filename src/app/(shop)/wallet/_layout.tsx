import { Stack } from 'expo-router';

export default function WalletLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Wallet',
          headerStyle: { backgroundColor: '#A62F2E' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
