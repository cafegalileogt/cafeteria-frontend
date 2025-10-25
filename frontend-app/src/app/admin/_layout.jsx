import AdminHeader from "../../components/adminHeader";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Drawer } from "expo-router/drawer";

export default function layout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#B89A59",
          width: 320,
        },
        drawerLabelStyle: {
          color: "white",
          fontSize: 28,
          paddingBlock: 15,
          fontFamily: "Nunito_400Regular",
        },
        drawerActiveBackgroundColor: "#998049",
        drawerActiveTintColor: "#998049",
        headerRight: () => <AdminHeader />,
      }}
    >
      <Drawer.Screen
        name="login"
        hidden="true"
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="ordenes"
        options={{
          drawerLabel: "Órdenes",
          title: "Órdenes",
          headerTitleStyle: {
            fontFamily: "Nunito_400Regular",
            fontSize: 22,
          },
        }}
      />
      <Drawer.Screen
        name="buscarOrdenes"
        options={{
          drawerLabel: "Buscar órdenes",
          title: "Buscar órdenes",
          headerTitleStyle: {
            fontFamily: "Nunito_400Regular",
            fontSize: 22,
          },
        }}
      />
      <Drawer.Screen
        name="gestionarMenu"
        options={{
          drawerLabel: "Gestionar Menú",
          title: "Gestionar Menú",
          headerTitleStyle: {
            fontFamily: "Nunito_400Regular",
            fontSize: 22,
          },
        }}
      />
      <Drawer.Screen
        name="gestionarHorario"
        options={{
          drawerLabel: "Gestionar Horario",
          title: "Gestionar Horario",
          headerTitleStyle: {
            fontFamily: "Nunito_400Regular",
            fontSize: 22,
          },
        }}
      />
      <Drawer.Screen
        name="reportes"
        options={{
          drawerLabel: "Reportes",
          title: "Reportes",
          headerTitleStyle: {
            fontFamily: "Nunito_400Regular",
            fontSize: 22,
          },
        }}
      />
    </Drawer>
  );
}
