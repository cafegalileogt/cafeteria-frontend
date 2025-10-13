import { Platform, View } from "react-native";
import { useRootNavigationState, useRouter, Slot } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  if (Platform.OS === "web") {
    setTimeout(() => {
      router.replace("/admin/login");
    }, 1);
  } else if (Platform.OS === "android") {
    setTimeout(() => {
      router.replace("/user/login");
    }, 1);
  }
  return <View />;
}
