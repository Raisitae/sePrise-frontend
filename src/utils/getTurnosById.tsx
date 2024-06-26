import axios from "axios";
import { url } from "./url";

interface Turno {
  id: number;
  tipo_turno: number;
  cancelado: boolean;
  dni_medico?: number | null;
}

async function getData(id: number): Promise<any> {
  try {
    const response = await axios.get(url + `/turnos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default async function getTurnosById(
  id: number
): Promise<Turno[] | null> {
  try {
    const response = await getData(id);
    if (response.data.cancelado === false) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching turno:", error);
    throw error;
  }
}
