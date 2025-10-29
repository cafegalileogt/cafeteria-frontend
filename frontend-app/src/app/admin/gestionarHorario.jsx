import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { getSchedule } from "../../../services/api";

export default function Home() {

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        
        //Acá está la respuesta del horario
        const horario = await getSchedule();
        console.log("Horario obtenido:", horario);
      } catch (error) {
        console.error("Error al obtener el horario:", error);
      }
    };

    //Obtener la respuesta de actualización de un dia de la semana
    // updateSchedule(dia, open_time, close_time, is_closed)

    // createException()

    fetchSchedule();
  }, []);

  return (
    <View>
      <Text>Bienvenido a gestionar horario</Text>
    </View>
  );
}