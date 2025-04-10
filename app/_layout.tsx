import {Stack} from "expo-router";
import 'expo-dev-client';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
      options={{headerShown: false}}
      />
        <Stack.Screen name="home"
        options={{headerShown: false}}
        />

        <Stack.Screen name="NoteCard"
        options={{headerShown: false}}
        />


    </Stack>
  );
}
