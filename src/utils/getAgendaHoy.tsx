import axios from "axios";
import { url } from "./url";

async function getData(fecha: string): Promise<any> {
  try {
    const response = await axios.get(url + `/agendasDias/hoy/${fecha}`, {
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

export default async function getAgendaHoy(fecha: string): Promise<any> {
  try {
    const response = await getData(fecha);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    // agregar acá un toastify con el error
    throw error;
  }
}
