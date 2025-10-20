import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
// import styles from "./styles/homeStyle";

import { Ionicons } from "@expo/vector-icons";
import Styles from "../styles/productoStyle";
import { useState } from "react";

export default function Producto({name,price,imagen,descripcion}) {
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
        <TouchableOpacity style={Styles.button} onPress={showAlert}>
          <Text style={Styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}