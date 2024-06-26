import axios from "axios";
import { url } from "./url";

async function getData(dni: number): Promise<any> {
  try {
    const response = await axios.get(url + `/pacientes/${dni}`, {
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

export default async function getPaciente(dni: number): Promise<any> {
  try {
    const response = await getData(dni);
    return response;
  } catch (error) {
    console.error("Error:", error);
    // agregar acá un toastify con el error
    throw error;
  }
}
