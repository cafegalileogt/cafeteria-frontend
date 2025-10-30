import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/header";
import styles from "../../styles/favoritosStyle";
import { getAllFavoritesById } from "../../../services/api";
import { useUser } from "../../../services/userContext";
import { useCart } from "../../../services/cartContext";

const ProductCard = React.memo(
  ({ item, qty, onIncrease, onDecrease, onAdd }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.imagen_producto }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name} numberOfLines={2}>
          {item.nombre}
        </Text>
        <Text style={styles.price}>
          Q{isNaN(Number(item.precio)) ? item.precio : Number(item.precio).toFixed(2)}
        </Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => onDecrease(item.id_producto)}>
            <Ionicons name="remove-circle-outline" size={26} color="#B89A59" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity onPress={() => onIncrease(item.id_producto)}>
            <Ionicons name="add-circle-outline" size={26} color="#B89A59" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => onAdd(item)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) => prevProps.qty === nextProps.qty
);

export default function FavoritosGrid() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [counts, setCounts] = useState({});
    const { addToCart } = useCart();
  

  useEffect(() => {
    const fetchFavorite = async () => {
      if (!user?.userId) return;
      try {
        setLoading(true);
        const favoritos = await getAllFavoritesById();
        console.log("Favoritos obtenidos:", favoritos.result);
        setFavoriteItems(favoritos.result || []);

        const initCounts = {};
        (favoritos.result || []).forEach((p) => {
          initCounts[p.id_producto] = 0; 
        });
        setCounts(initCounts);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorite();
  }, [user]);

  const aumentar = useCallback((id) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const disminuir = useCallback((id) => {
    setCounts((prev) => {
      const current = prev[id] || 1;
      return { ...prev, [id]: current > 0 ? current - 1 : 1 };
    });
  }, []);

 const handleAddToCart = useCallback(
  (item) => {
    const cantidad = counts[item.id_producto] || 0;

    if (cantidad > 0) {
      addToCart({
        id_producto: item.id_producto,
        name: item.nombre,
        price: item.precio,
        cantidad: cantidad,
        count: cantidad,
        precio_unitario: parseFloat(item.precio), 
      });

      Alert.alert("Info", "Producto agregado al carrito");

      setCounts((prev) => ({ ...prev, [item.id_producto]: 0 }));
    } else {
      Alert.alert("Aviso", "Debes agregar al menos 1 producto.");
    }
  },
  [counts, addToCart]
);

  const renderCard = ({ item }) => (
    <ProductCard
      item={item}
      qty={counts[item.id_producto] || 0}
      onIncrease={aumentar}
      onDecrease={disminuir}
      onAdd={handleAddToCart}
    />
  );

  if (loading)
    return (
      <View
        style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Favoritos</Text>

      {favoriteItems.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Aún no tienes productos en favoritos 
        </Text>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item, index) => `${item.id_producto}-${index}`} 
          renderItem={renderCard}
          numColumns={2} 
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}