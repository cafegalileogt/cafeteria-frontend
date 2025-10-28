import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import Styles from "../../styles/gestionarMenuStyle";
import { Nunito_900Black, Nunito_400Regular, useFonts } from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { Overlay } from "react-native-elements";
import { getMenu, getCategoryNames, updateProduct, createProduct,createCategory,updateCategory,uploadImageToCloudinary } from "../../../services/api";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [loaded, error] = useFonts({ Nunito_900Black, Nunito_400Regular });

  const [productVisible, setProductVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleProductOverlay = () => setProductVisible(!productVisible);
  const toggleCategoryOverlay = () => setCategoryVisible(!categoryVisible);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await getMenu();
        const categoriesResponse = await getCategoryNames();
        const categoryList = categoriesResponse.data.result || [];

        const updatedMenu = menuResponse.data.map((item) => {
          const categoria = categoryList.find((cat) => cat.id_categoria === item.id_categoria);
          return { ...item, categoria: categoria ? categoria.nombre : "Sin categoría" };
        });

        setMenuData(updatedMenu);
        setCategories(categoryList);
      } catch (err) {
        console.error("Error cargando menú:", err);
      }
    };
    fetchData();
  }, []);

  if (!loaded && !error) return null;


  const handleSaveProduct = async (product) => {
    if (!product) return;
    try {
      const payload = {
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        estado: true,
        imagen_producto: product.imagen_producto || "ruta/imagen.jpg",
      };

      if (product.id_producto) {
        await updateProduct(product.id_producto, payload);
        setMenuData((prev) =>
          prev.map((p) => (p.id_producto === product.id_producto ? { ...p, ...payload } : p))
        );
      } else {
        if (!product.id_categoria) {
          Alert.alert("Error", "Seleccione una categoría antes de guardar.");
          return;
        }
        const response = await createProduct(product.id_categoria, payload);
        if (response?.data) {
          setMenuData((prev) => [...prev, response.data]);
        }
      }

      setProductVisible(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  const handleDeleteProduct = async (id_producto) => {
  const proceed = typeof window !== "undefined" 
    ? window.confirm("Este producto será desactivado. ¿Desea continuar?")
    : await new Promise((resolve) => {
        Alert.alert(
          "Confirmar eliminación",
          "Este producto será desactivado. ¿Desea continuar?",
          [
            { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
            { text: "Sí, eliminar", onPress: () => resolve(true) },
          ],
          { cancelable: true }
        );
      });

  if (!proceed) return;

  try {
    const product = menuData.find((p) => p.id_producto === id_producto);
    if (!product) return;

    const payload = { ...product, estado: false };
    await updateProduct(id_producto, payload);

    setMenuData((prev) =>
      prev.map((p) => (p.id_producto === id_producto ? { ...p, estado: false } : p))
    );
  } catch (err) {
    console.error("Error desactivando producto:", err);
  }
};

 const handleSaveCategory = async () => {
  try {
    // Validación de horario
    if (selectedCategory.desde && selectedCategory.hasta) {
      const [desdeH, desdeM] = selectedCategory.desde.split(":").map(Number);
      const [hastaH, hastaM] = selectedCategory.hasta.split(":").map(Number);

      if (desdeH > hastaH || (desdeH === hastaH && desdeM >= hastaM)) {
        window.alert("La hora 'Desde' debe ser menor que la hora 'Hasta'.");
        return; // Detener guardado
      }
    }

    const payload = {
      nombre: selectedCategory.nombre,
      estado: true,
      horario: selectedCategory.desde && selectedCategory.hasta
        ? `${selectedCategory.desde} - ${selectedCategory.hasta}`
        : "",
      imagen_categoria: selectedCategory.imagen_categoria || "ruta/imagen_categoria.jpg",
    };

    if (selectedCategory.id_categoria) {
      await updateCategory(selectedCategory.id_categoria, payload);
      setCategories((prev) =>
        prev.map((c) =>
          c.id_categoria === selectedCategory.id_categoria ? { ...c, ...payload } : c
        )
      );
    } else {
      const response = await createCategory(payload);
      if (response?.data) {
        setCategories((prev) => [...prev, response.data]);
      }
    }

    setCategoryVisible(false);
    setSelectedCategory(null);
  } catch (error) {
    console.error("Error guardando categoría:", error);
  }
};

  const handleDeleteCategory = async (id_categoria) => {
  const proceed = typeof window !== "undefined"
    ? window.confirm("Esta categoría será desactivada. ¿Desea continuar?")
    : await new Promise((resolve) => {
        Alert.alert(
          "Confirmar eliminación",
          "Esta categoría será desactivada. ¿Desea continuar?",
          [
            { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
            { text: "Sí, eliminar", onPress: () => resolve(true) },
          ],
          { cancelable: true }
        );
      });

  if (!proceed) return;

  try {
    const category = categories.find((c) => c.id_categoria === id_categoria);
    if (!category) return;

    const payload = { ...category, estado: false };
    await updateCategory(id_categoria, payload);

    setCategories((prev) =>
      prev.map((c) => (c.id_categoria === id_categoria ? { ...c, estado: false } : c))
    );
  } catch (err) {
    console.error("Error desactivando categoría:", err);
  }
};

const generarOpcionesHorario = () => {
  const opciones = [];
  for (let hora = 6; hora <= 22; hora++) { 
    for (let min of [0, 30]) {
      const hh = hora.toString().padStart(2, "0");
      const mm = min.toString().padStart(2, "0");
      opciones.push(`${hh}:${mm}`);
    }
  }
  return opciones;
};

const opcionesHorario = generarOpcionesHorario();


const handleSelectImage = async (tipo) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      const data = await uploadImageToCloudinary(imageUri);
      const url = data?.imageUrl || imageUri;

      console.log("✅ URL subida:", url);

      // 🔹Actualizar el producto o categoría según 'tipo'
      if (tipo === "producto" && selectedProduct) {
        setSelectedProduct((prev) => ({ ...prev, imagen_producto: url }));
      } else if (tipo === "categoria" && selectedCategory) {
        setSelectedCategory((prev) => ({ ...prev, imagen_categoria: url }));
      }
    } else {
      console.log("❌Selección cancelada por el usuario");
    }
  } catch (error) {
    console.error("❌ Error seleccionando imagen:", error);
  }
};

  // Renderizado de productos
  const renderItem = ({ item }) => (
    <View style={Styles.row}>
      <View style={[Styles.cell, Styles.nameCell, { width: "20%", flexDirection: "row", alignItems: "center" }]}>
        <Image source={{ uri: item.imagen_producto }} style={Styles.iconImage} />
        <Text style={Styles.cellText} numberOfLines={1}>{item.nombre}</Text>
      </View>
      <Text style={[Styles.cellText, { width: "15%" }]}>{item.categoria}</Text>
      <Text style={[Styles.cellText, { width: "10%" }]}>Q{item.precio}</Text>
      <Text style={[Styles.cellText, { width: "40%" }]} numberOfLines={1}>{item.descripcion}</Text>
      <View style={[Styles.actions, { width: "15%" }]}>
        <TouchableOpacity
          style={Styles.icons}
          onPress={() => {
            setSelectedProduct(item);
            setProductVisible(true);
          }}
        >
          <Ionicons name="create-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.icons} onPress={() => handleDeleteProduct(item.id_producto)}>
          <Ionicons name="trash" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

 // 🔹 Renderizado de categorías
const renderCategoryItem = ({ item }) => (
  <View style={Styles.row}>
    <View style={[Styles.cell, { width: "30%", flexDirection: "row", alignItems: "center" }]}>
      <Image source={{ uri: item.imagen_categoria }} style={Styles.iconImage} />
      <Text style={Styles.cellText} numberOfLines={1}>{item.nombre}</Text>
    </View>
    <Text style={[Styles.cellText, { width: "40%" }]}>{item.horario || "Sin horario"}</Text>
    <View style={[Styles.actions, { width: "30%" }]}>
      <TouchableOpacity
        style={Styles.icons}
        onPress={() => {
          // Extraer horario si existe en formato "08:00 - 18:00"
          const [desde, hasta] = item.horario ? item.horario.split(" - ") : ["", ""];
          setSelectedCategory({
            id_categoria: item.id_categoria,
            nombre: item.nombre,
            desde: desde || "",
            hasta: hasta || "",
            imagen_categoria: item.imagen_categoria || "",
          });
          setCategoryVisible(true);
        }}
      >
        <Ionicons name="create-outline" size={18} />
      </TouchableOpacity>

      <TouchableOpacity
        style={Styles.icons}
        onPress={() => handleDeleteCategory(item.id_categoria)}
      >
        <Ionicons name="trash" size={18} />
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <View style={Styles.background}>
      <View style={Styles.page}>
        <View style={Styles.titleBar}>
          <Text style={Styles.title}>{activeTab === "menu" ? "Gestionar Menú" : "Gestionar Categorías"}</Text>
          <View style={Styles.switchButtons}>
            <TouchableOpacity
              style={activeTab === "menu" ? Styles.activeTab : Styles.inactiveTab}
              onPress={() => setActiveTab("menu")}
            >
              <Text style={activeTab === "menu" ? Styles.activeText : Styles.inactiveText}>Menú</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={activeTab === "categoria" ? Styles.activeTab : Styles.inactiveTab}
              onPress={() => setActiveTab("categoria")}
            >
              <Text style={activeTab === "categoria" ? Styles.activeText : Styles.inactiveText}>Categoría</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.separator} />

        <View style={Styles.container}>
          <ScrollView>
            {activeTab === "menu" ? (
              <View style={Styles.tabla}>
                <View style={Styles.header}>
                  <Text style={[Styles.headerText, { width: "20%" }]}>Nombre</Text>
                  <Text style={[Styles.headerText, { width: "15%" }]}>Categoría</Text>
                  <Text style={[Styles.headerText, { width: "10%" }]}>Precio</Text>
                  <Text style={[Styles.headerText, { width: "40%" }]}>Descripción</Text>
                  <Text style={[Styles.headerText, { width: "15%" }]}>Acciones</Text>
                </View>
                <FlatList
                  data={menuData.filter((p) => p.estado !== false)}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id_producto.toString()}
                />
              </View>
            ) : (
              <View style={Styles.tabla}>
                <View style={Styles.header}>
                  <Text style={[Styles.headerText, { width: "30%" }]}>Categoría</Text>
                  <Text style={[Styles.headerText, { width: "40%" }]}>Horario</Text>
                  <Text style={[Styles.headerText, { width: "30%" }]}>Acciones</Text>
                </View>
                <FlatList
                  data={categories}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item.id_categoria.toString()}
                />
              </View>
            )}
          </ScrollView>

          {/* Botón inferior */}
          <View style={Styles.bar}>
            <TouchableOpacity
              style={Styles.button}
              onPress={() => {
                if (activeTab === "menu") {
                  setSelectedProduct({
                    id_categoria: null,
                    nombre: "",
                    descripcion: "",
                    precio: "",
                    imagen_producto: "",
                    estado: true,
                  });
                  setProductVisible(true);
                } else {
                  setSelectedCategory({ nombre: "", desde: "", hasta: "", imagen_categoria: "" });
                  setCategoryVisible(true);
                }
              }}
            >
              <Text style={Styles.btnText}>
                {activeTab === "menu" ? "Agregar producto" : "Agregar categoría"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔹 Modal de producto */}
<Overlay
  isVisible={productVisible}
  onBackdropPress={() => setProductVisible(false)}
  overlayStyle={{ width: "60%", maxHeight: "90%", padding: 20, borderRadius: 10 }}
>
  <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setProductVisible(false)}>
    <Ionicons name="close" size={24} color="#333" />
  </TouchableOpacity>

  <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>
    {selectedProduct?.id_producto ? "Editar producto" : "Agregar producto"}
  </Text>
  <View style={{ height: 1, backgroundColor: "#ccc", marginBottom: 15 }} />

  <ScrollView>
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
      {/* Columna izquierda */}
      <View style={{ flex: 1.1 }}>
        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Categoría</Text>
        <Dropdown
          style={[Styles.input, { width: "80%" }]}
          data={categories.map((c) => ({ label: c.nombre, value: c.id_categoria }))}
          labelField="label"
          valueField="value"
          placeholder="Selecciona categoría"
          value={selectedProduct?.id_categoria || null}
          onChange={(item) => setSelectedProduct({ ...selectedProduct, id_categoria: item.value })}
        />

        <Text style={{ marginTop: 15, marginBottom: 5, fontWeight: "bold" }}>Descripción</Text>
        <TextInput
          style={[Styles.input, { height: 80, width: "80%" }]}
          multiline
          value={selectedProduct?.descripcion || ""}
          onChangeText={(text) => setSelectedProduct({ ...selectedProduct, descripcion: text })}
          placeholder="Escribe la descripción"
        />

        <Text style={{ marginTop: 15, marginBottom: 5, fontWeight: "bold" }}>Precio</Text>
        <TextInput
          style={[Styles.input, { width: "80%" }]}
          keyboardType="numeric"
          value={selectedProduct?.precio?.toString() || ""}
          onChangeText={(text) => setSelectedProduct({ ...selectedProduct, precio: parseFloat(text) || 0 })}
          placeholder="Q0"
        />
      </View>

      {/* Columna derecha */}
      <View style={{ flex: 1.1 }}>
        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Producto</Text>
        <TextInput
          style={[Styles.input, { width: "80%" }]}
          value={selectedProduct?.nombre || ""}
          onChangeText={(text) => setSelectedProduct({ ...selectedProduct, nombre: text })}
          placeholder="Nombre del producto"
        />

        <Text style={{ marginTop: 15, marginBottom: 5, fontWeight: "bold" }}>Imagen</Text>
<TouchableOpacity
  style={Styles.square}
  onPress={() => handleSelectImage("producto")}
>
  {selectedProduct?.imagen_producto ? (
    <Image
      source={{ uri: selectedProduct.imagen_producto }}
      style={{ width: "100%", height: "100%", borderRadius: 10 }}
      resizeMode="cover"
    />
  ) : (
    <>
      <Ionicons name="image-outline" size={30} color="#333" />
      <Text style={{ marginTop: 5 }}>Selecciona un archivo</Text>
    </>
  )}
</TouchableOpacity>
      </View>
    </View>

    <TouchableOpacity
      style={[Styles.button, { marginTop: 20, alignSelf: "center" }]}
      onPress={() => handleSaveProduct(selectedProduct)}
    >
      <Text style={Styles.btnText}>Guardar</Text>
    </TouchableOpacity>
  </ScrollView>
</Overlay>

{/* 🔹 Modal de categoría */}
<Overlay
  isVisible={categoryVisible}
  onBackdropPress={() => setCategoryVisible(false)}
  overlayStyle={{ width: "60%", maxHeight: "80%", padding: 20, borderRadius: 10 }}
>
  <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => setCategoryVisible(false)}>
    <Ionicons name="close" size={24} color="#333" />
  </TouchableOpacity>

  <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>
    {selectedCategory?.id_categoria ? "Editar categoría" : "Agregar categoría"}
  </Text>
  <View style={{ height: 1, backgroundColor: "#ccc", marginBottom: 15 }} />

  <ScrollView>
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
      {/* Columna izquierda */}
      <View style={{ flex: 1.1 }}>
        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Nombre de categoría</Text>
        <TextInput
          style={[Styles.input, { width: "80%" }]}
          value={selectedCategory?.nombre || ""}
          onChangeText={(text) => setSelectedCategory({ ...selectedCategory, nombre: text })}
          placeholder="Ej. Desayunos"
        />

        {/* 🔹 Bloque de horario */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Horario</Text>

          {/* Checkbox Todo el Día */}
          <TouchableOpacity
            onPress={() =>
              setSelectedCategory((prev) => ({
                ...prev,
                todoDia: !prev?.todoDia,
                desde: "",
                hasta: "",
              }))
            }
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
          >
            <Ionicons
              name={selectedCategory?.todoDia ? "checkbox-outline" : "square-outline"}
              size={22}
              color="#333"
            />
            <Text style={{ marginLeft: 8 }}>Todo el día</Text>
          </TouchableOpacity>

          {/* Dropdown Desde */}
          <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Desde</Text>
          <Dropdown
            style={[Styles.input, { width: "80%", opacity: selectedCategory?.todoDia ? 0.5 : 1 }]}
            data={opcionesHorario.map((h) => ({ label: h, value: h }))}
            labelField="label"
            valueField="value"
            placeholder="Selecciona hora"
            value={selectedCategory?.desde || null}
            onChange={(item) => setSelectedCategory({ ...selectedCategory, desde: item.value })}
            disable={selectedCategory?.todoDia}
          />

          {/* Dropdown Hasta */}
          <Text style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}>Hasta</Text>
          <Dropdown
            style={[Styles.input, { width: "80%", opacity: selectedCategory?.todoDia ? 0.5 : 1 }]}
            data={opcionesHorario.map((h) => ({ label: h, value: h }))}
            labelField="label"
            valueField="value"
            placeholder="Selecciona hora"
            value={selectedCategory?.hasta || null}
            onChange={(item) => setSelectedCategory({ ...selectedCategory, hasta: item.value })}
            disable={selectedCategory?.todoDia}
          />
        </View>
      </View>

      {/* Columna derecha */}
<View style={{ flex: 1.1 }}>
  <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Imagen</Text>
  <TouchableOpacity
    style={Styles.square}
    onPress={() => handleSelectImage("categoria")}
  >
    {selectedCategory?.imagen_categoria ? (
      <Image
        source={{ uri: selectedCategory.imagen_categoria }}
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
        resizeMode="cover"
      />
    ) : (
      <>
        <Ionicons name="image-outline" size={30} color="#333" />
        <Text style={{ marginTop: 5 }}>Selecciona un archivo</Text>
      </>
    )}
  </TouchableOpacity>
</View>
    </View>

    <TouchableOpacity
      style={[Styles.button, { marginTop: 20, alignSelf: "center" }]}
      onPress={handleSaveCategory}
    >
      <Text style={Styles.btnText}>
        {selectedCategory?.id_categoria ? "Guardar cambios" : "Guardar categoría"}
      </Text>
    </TouchableOpacity>
  </ScrollView>
</Overlay>

      </View>
    </View>
  );
}
