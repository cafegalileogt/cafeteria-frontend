import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getToken, removeToken } from "./storage";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        removeToken();      
        router.replace("admin/login"); 
      } else {
        setLoading(false);   
      }
    };
    checkAuth();
  }, [router]);

  return loading;
};