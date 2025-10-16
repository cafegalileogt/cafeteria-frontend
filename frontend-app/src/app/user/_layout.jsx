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
        },
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
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" />,
        }}
      />
    </Tabs>
  );
}
