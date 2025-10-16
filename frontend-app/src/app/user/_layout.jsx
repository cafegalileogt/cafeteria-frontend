import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSegments } from "expo-router";

export default function layout() {
  const segment = useSegments();
  const page = segment[segment.length - 1];
  const hidePages = ["login"];
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: hidePages.includes(page) ? "none" : "flex",
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#B89A59",
        tabBarInactiveTintColor: "#CCCCCC",
      }}
    >
      <Tabs.Screen
        name="login"
        hidden="true"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size * 1.3} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size * 1.3} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size * 1.3} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size * 1.3} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}
