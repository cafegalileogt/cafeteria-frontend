import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useCart } from "../../services/cartContext";


// import styles from "./styles/homeStyle";

import { Ionicons } from "@expo/vector-icons";
import Styles from "../styles/productoStyle";
import { useState } from "react";
import { push } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router";

export default function Producto({name,price,imagen,descripcion,id_producto}) {
  const router = useRouter(); 
  const { addToCart } = useCart();


  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    if (!(count == 0)) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const showAlert = () =>
    Alert.alert("Info", "Tu producto se ha agregado al carrito");

const handleAdd = () => {
  if (count > 0) {
    addToCart({ id_producto, name, price, count });
    Alert.alert("Info", "Producto agregado al carrito");
  } else {
    Alert.alert("Info", "Debes agregar al menos 1 producto");
  }
};

  return (
    <View style={Styles.container}>
      <View style={Styles.box}>
         <Image
            source={{ uri: imagen }} 
            style={Styles.image}
          />
      </View>
      <Text style={Styles.title}>{name}</Text>
      <Text style={Styles.text}>
        {descripcion}
      </Text>
      <Text style={Styles.price}>{price}</Text>
      <View style={Styles.rectangle}>
        <TouchableOpacity style={Styles.element} onPress={decrementCount}>
          <Ionicons name="remove-circle-outline" size={48} />
        </TouchableOpacity>
        <TextInput
          style={Styles.input}
          value={String(count)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={Styles.element} onPress={incrementCount}>
          <Ionicons name="add-circle-outline" size={48} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={handleAdd}>
          <Text style={Styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}