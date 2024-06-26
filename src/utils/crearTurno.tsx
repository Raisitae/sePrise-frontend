import axios from "axios";
import { url } from "./url"; // Assuming you have a url.ts file with base URL defined
import { toast } from "react-toastify";

interface turnosDataProps {
  fecha_turno: string;
  tipo_turno: number;
  dni_paciente: number;
  dni_medico: number | null;
  notas?: string;
  cancelado: boolean;
}

async function postData(turnoData: turnosDataProps): Promise<any> {
  try {
    const response = await axios.post(`${url}/turnos`, turnoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Turno creado exitosamente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    return response;
  } catch (error) {
    toast.error("Ocurrió un error en la creación del turno", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error("Error:", error);
    throw error;
  }
}

export default async function createTurno(
  turnoData: turnosDataProps
): Promise<any> {
  try {
    const response = await postData(turnoData);
    console.log(response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error:", error);
    // You can handle errors here (e.g., show a toast notification)
    throw error;
  }
}
