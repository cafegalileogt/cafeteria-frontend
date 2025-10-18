import { Text, Image, TouchableOpacity, View, TextInput } from "react-native";
import { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../styles/productoStyle";
import { useState } from "react";

export default function Producto() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    if (!(count == 0)) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.box}>
        <Image
          style={Styles.image}
          source={require("../../assets/image-placeholder.svg")}
          resizeMode="contain"
        />
      </View>
      <Text style={Styles.title}>Torito</Text>
      <Text style={Styles.text}>
        Delicioso pan de hamburguesa, dorado con mangequilla, 1 torta de nuestra
        mejor carne, 1 huevo estrellado, con nuestro aderezo de la casa, tomate,
        cebolla y lechuga. Todos nuestros desayunos están acompañados de papas
        fritas, café o jugo.
      </Text>
      <Text style={Styles.price}>Q35.95</Text>
      <View style={Styles.rectangle}>
        <TouchableOpacity style={Styles.element} onPress={decrementCount}>
          <Ionicons name="remove-circle-outline" size={"48px"} />
        </TouchableOpacity>
        <TextInput
          style={Styles.input}
          value={String(count)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={Styles.element} onPress={incrementCount}>
          <Ionicons name="add-circle-outline" size={"48px"} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button}>
          <Text style={Styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
