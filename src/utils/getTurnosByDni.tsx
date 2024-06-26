import axios from "axios";
import { url } from "./url";

interface Turno {
  estado: Promise<any>;
  id: number;
  tipo_turno: number;
  cancelado: boolean;
  dni_medico?: number | null;
  // Add other properties if any
}

async function getData(
  dni: number,
  tipo_turno: number,
  cancelado: boolean
): Promise<any> {
  try {
    const response = await axios.get(url + `/turnos/dni/${dni}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        tipo_turno: tipo_turno,
        cancelado: cancelado,
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default async function getTurnosByDni(
  dni: number,
  tipo_turno: number,
  cancelado: boolean
): Promise<Turno[]> {
  try {
    const response = await getData(dni, tipo_turno, cancelado);
    const filteredData = response.data.filter(
      (turno: Turno) =>
        turno.tipo_turno === tipo_turno && turno.cancelado === cancelado
    );
    console.log(filteredData);
    return filteredData;
  } catch (error) {
    console.error("Error fetching turnos:", error);
    throw error;
  }
}
