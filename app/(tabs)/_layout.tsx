import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#1c7ed6ff',
      // headerStyle: { backgroundColor: '#cfe1ffff' }
      // headerShadowVisible: false
    }} >
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color} />
        )
      }} />
      <Tabs.Screen name="camera" options={{
        title: "Camera",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "camera" : "camera-outline"} size={24} color={color} />
        ),
        headerShown: false
      }} />
    </Tabs>
  );
}
