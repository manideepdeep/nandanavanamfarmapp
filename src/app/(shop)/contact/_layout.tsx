import { Stack } from 'expo-router';

export default function ContactLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Contact Us',
          headerStyle: { backgroundColor: '#A62F2E' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
