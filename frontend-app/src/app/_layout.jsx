import { Slot } from "expo-router";
import { CartProvider } from "../../services/cartContext"; 

export default function RootLayout() {
  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}