import axios from "axios";
import { url } from "./url";

async function getData(id_turno: number): Promise<any> {
  try {
    const response = await axios.get(url + `/agendasDias/turno/${id_turno}`, {
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

export default async function getAgendaId(id_turno: number): Promise<any> {
  try {
    const response = await getData(id_turno);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    // agregar acá un toastify con el error
    throw error;
  }
}
