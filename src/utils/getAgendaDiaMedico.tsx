import axios from "axios";
import { url } from "./url";

async function getData(dni: number | null, fecha: string): Promise<any> {
  try {
    const response = await axios.get(
      url + `/agendasDias/medico/${dni}/${fecha}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default async function getAgendaDiaMedico(
  dni: number | null,
  fecha: string
): Promise<any> {
  try {
    const response = await getData(dni, fecha);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    // agregar acá un toastify con el error
    throw error;
  }
}
