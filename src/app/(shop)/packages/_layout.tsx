import { Stack } from 'expo-router';

export default function PackagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Our Packages',
          headerStyle: { backgroundColor: '#A62F2E' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
