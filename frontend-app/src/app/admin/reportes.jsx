import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import Styles from "../../styles/reportesStyles";
import { Dropdown } from "react-native-element-dropdown";
import {
  Nunito_900Black,
  Nunito_400Regular,
  useFonts,
} from "@expo-google-fonts/nunito";
import { SplashScreen } from "expo-router";
import ReporteOrdenes from "../../components/reporteOrdenes";
import ReporteVentas from "../../components/reporteVentas";
import ReporteProductos from "../../components/reporteProductos";
import ReporteHoraPico from "../../components/reporteHoraPico";
import ReportFooter from "../../components/reportFooter";
import {
  getReportOrder,
  ventasReport,
  masVendidosReport,
  horasPicoReport,
} from "../../../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";

// Selector de fecha solo para web
const WebDateInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const date = e.target.value; 
    onChange(date);
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      style={{
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
      }}
    />
  );
};

export default function Home() {
  const [loaded, error] = useFonts({ Nunito_900Black, Nunito_400Regular });
  const reportTypes = ["Órdenes", "Ventas", "Productos", "Hora Pico"];
  const [reportType, setReportType] = useState("");
  const stateTypes = ["Completada", "En preparación", "Cancelada", "Entregada"];
  const [stateType, setStateType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  useEffect(() => {
    setReportData(null);
    setErrorMsg("");
  }, [reportType]);

  if (!loaded && !error) return null;

  const handleFilter = async () => {
    if (!fromDate || !toDate || !reportType) {
      setErrorMsg("Seleccione tipo de reporte y rango de fechas");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      let data;
      switch (reportType) {
        case "Órdenes":
          data = await getReportOrder(fromDate, toDate);
          if (data.orders && Array.isArray(data.orders)) {
            const mappedOrders = data.orders.map((o) => ({
              idOrden: o.order_id || o.numero_orden,
              idUser: o.user_id || o.id_usuario,
              email: o.email || o.correo_institucional,
              updateDate: o.fecha_actualizacion || o.fecha,
              estado: o.estado,
              total: o.total,
              idPersonal: o.personal_id || o.id_personal,
              idPago: o.payment_id || o.id_pago,
            }));
            data.orders = mappedOrders;
          }
          if (stateType && data.orders) {
            data.orders = data.orders.filter(
              (order) => order.estado === stateType
            );
          }
          break;
        case "Ventas":
          data = await ventasReport(fromDate, toDate);
          break;
        case "Productos":
          data = await masVendidosReport(fromDate, toDate);
          break;
        case "Hora Pico":
          data = await horasPicoReport(fromDate, toDate);
          break;
        default:
          data = null;
      }
      setReportData(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error al obtener datos del reporte");
    } finally {
      setLoading(false);
    }
  };

  const reportTable = () => {
    if (loading) return <ActivityIndicator size="large" color="#000" />;
    if (errorMsg) return <Text style={Styles.error}>{errorMsg}</Text>;
    if (!reportType || !reportData)
      return <Text style={Styles.text}>Seleccione un tipo de reporte</Text>;

    switch (reportType) {
      case "Órdenes":
        return <ReporteOrdenes data={reportData.orders} />;
      case "Ventas":
  return (
    <ReporteVentas
      fromDate={fromDate}
      toDate={toDate}
      data={reportData.daily_sales}
      total={reportData.total_sales}
    />
  );

      case "Productos":
        return <ReporteProductos data={reportData.top_products} />;
      case "Hora Pico":
        return (
          <ReporteHoraPico
            data={reportData.horas_pico}
            mostActive={reportData.most_active_hour}
          />
        );
      default:
        return <Text style={Styles.text}>Seleccione un tipo de reporte</Text>;
    }
  };

  const filterOpts = () => {
    if (reportType === "Órdenes") {
      return (
        <View style={Styles.menuRows}>
          <Text style={Styles.label}>Estado:</Text>
          <Dropdown
            style={Styles.dropdown}
            data={stateTypes.map((type) => ({ label: type, value: type }))}
            placeholder="Tipo de estado"
            labelField={"label"}
            valueField={"value"}
            value={stateType}
            onChange={(item) => setStateType(item.value)}
          />
        </View>
      );
    } else return <View style={Styles.menuRows} />;
  };

  return (
    <View style={Styles.background}>
      <View style={Styles.page}>
        <Text style={Styles.title}>Reportes</Text>
        <View style={Styles.separator} />
        <View style={Styles.container}>
          <View style={Styles.containerRows}>
            <View style={Styles.containerCols}>
              <View style={Styles.menuRows}>
                <Text style={Styles.label}>Tipo:</Text>
                <Dropdown
                  style={Styles.dropdown}
                  data={reportTypes.map((type) => ({ label: type, value: type }))}
                  placeholder="Tipo de reporte"
                  labelField={"label"}
                  valueField={"value"}
                  value={reportType}
                  onChange={(item) => setReportType(item.value)}
                />
              </View>
            </View>

            {/*  Campos de Fecha (diferente en web o móvil) */}
            <View style={Styles.containerCols}>
              <View style={Styles.menuRows}>
                <Text style={Styles.label}>Desde:</Text>
                {Platform.OS === "web" ? (
                  <WebDateInput value={fromDate} onChange={setFromDate} />
                ) : (
                  <TextInput
                    style={Styles.dropdown}
                    placeholder="YYYY-MM-DD"
                    value={fromDate}
                    onChangeText={setFromDate}
                  />
                )}
              </View>
              <View style={Styles.menuRows}>
                <Text style={Styles.label}>Hasta:</Text>
                {Platform.OS === "web" ? (
                  <WebDateInput value={toDate} onChange={setToDate} />
                ) : (
                  <TextInput
                    style={Styles.dropdown}
                    placeholder="YYYY-MM-DD"
                    value={toDate}
                    onChangeText={setToDate}
                  />
                )}
              </View>
            </View>

            <View style={Styles.containerCols}>{filterOpts()}</View>

            <View style={Styles.containerCols}>
              <TouchableOpacity onPress={handleFilter}>
                <Text style={Styles.filter}>Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {reportTable()}
          {reportType === "" ? <></> : <ReportFooter />}
        </View>
      </View>
    </View>
  );
}
