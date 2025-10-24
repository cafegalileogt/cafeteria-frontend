import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import Styles from "../styles/productoStyle";
import { useCart } from "../../services/cartContext";

export default function Producto({ name, price, imagen, descripcion, id_producto }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prevCount) => prevCount + 1);

  const decrementCount = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  const handleAdd = () => {
    if (count > 0) {
      addToCart({
        id_producto,      
        name,             
        price,            
        cantidad: count,  
        count,            
        precio_unitario: parseFloat(price.replace("Q", "").trim()), 
      });
      Alert.alert("Info", "Producto agregado al carrito");
      setCount(0);
    } else {
      Alert.alert("Aviso", "Debes agregar al menos 1 producto.");
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.box}>
        <Image source={{ uri: imagen }} style={Styles.image} />
      </View>

      <Text style={Styles.title}>{name}</Text>
      <Text style={Styles.text}>{descripcion}</Text>
      <Text style={Styles.price}>{price}</Text>

      <View style={Styles.rectangle}>
        <TouchableOpacity style={Styles.element} onPress={decrementCount}>
          <Ionicons name="remove-circle-outline" size={48} color="#B89A59" />
        </TouchableOpacity>

        <TextInput
          style={Styles.input}
          value={String(count)}
          keyboardType="numeric"
          editable={false}
        />

        <TouchableOpacity style={Styles.element} onPress={incrementCount}>
          <Ionicons name="add-circle-outline" size={48} color="#B89A59" />
        </TouchableOpacity>

        <TouchableOpacity style={Styles.button} onPress={handleAdd}>
          <Text style={Styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
