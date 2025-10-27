import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../styles/adminHeaderStyle";
import { useRouter } from "expo-router";
import { logOutUser } from "../../services/api";
import { useUser } from "../../services/userContext";


export default function AdminHeader() {
  const {user} = useUser();
  const router = useRouter();
  const correo = user?.result?.[0]?.correo_institucional;


  const logout = () => {
    logOutUser(correo);
    router.push("/admin/login");
  };

  return (
    <View style={Styles.header}>
      <View style={Styles.circle}>
        <Image
          source={require("../../assets/image-placeholder.svg")}
          style={Styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={Styles.container}>
        <Text style={Styles.userText}>Nombre Usuario</Text>
        <Text style={Styles.emailText}>Correo Electronico</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <Ionicons name="exit" size={48} />
      </TouchableOpacity>
    </View>
  );
}
