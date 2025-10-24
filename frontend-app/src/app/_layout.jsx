import { Slot } from "expo-router";
import { CartProvider } from "../../services/cartContext"; 
import { UserProvider } from "../../services/userContext"

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <Slot />
      </CartProvider>
    </UserProvider>
  );
}