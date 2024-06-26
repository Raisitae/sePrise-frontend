import axios from "axios";
import { url } from "./url";

async function getData(dni: number): Promise<any> {
  try {
    const response = await axios.get(url + `/medicos/${dni}`, {
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

export default async function getMedicosByDni(dni: number): Promise<any> {
  try {
    const response = await getData(dni);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    // agregar acá un toastify con el error
    throw error;
  }
}
