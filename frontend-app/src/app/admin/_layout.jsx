import AdminHeader from "../../components/adminHeader";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import { SplashScreen,useRouter, usePathname } from "expo-router";
import { useEffect } from "react";
import { Drawer } from "expo-router/drawer";


export default function layout() {
  const pathname = usePathname();

  const showHeader = pathname !== "/admin/login";
  
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
       drawerStyle: showHeader
          ? { backgroundColor: "#B89A59", width: 300 }
          : { display: "none" },
        headerRight: showHeader ? () => <AdminHeader /> : undefined,
        headerShown: showHeader,
        drawerLabelStyle: {
          color: "white",
          fontSize: 28,
          paddingBlock: 15,
          fontFamily: "Nunito_400Regular",
        },
        drawerActiveBackgroundColor: "#c5b083ff",
        drawerActiveTintColor: "#c5b083ff",
        headerRight: () => <AdminHeader />,
        drawerType: "permanent"
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
