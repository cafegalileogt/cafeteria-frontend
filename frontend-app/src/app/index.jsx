import { Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === "web") {
        return router.replace("/admin/login");
      } else if (Platform.OS === "android"|| Platform.OS === "ios") {
        return router.replace("/user/login");
      }
    }, 100);
  }, []);

  return (
    <View></View>
  );
}
