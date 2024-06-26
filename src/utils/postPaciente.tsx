import axios from "axios";
import { url } from "./url";
import { toast } from "react-toastify";

interface pacienteProps {
  dni: number;
  nombre: string;
  apellido: string;
  telefono: number;
}

async function postData(pacienteProps: pacienteProps): Promise<any> {
  try {
    const response = await axios.post(`${url}/pacientes`, pacienteProps, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default async function createTurno(
  pacienteProps: pacienteProps
): Promise<any> {
  try {
    const response = await postData(pacienteProps);
    console.log(response.data);
    toast.success("Paciente creado exitosamente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return response.data; // Return the data from the response
  } catch (error) {
    toast.error("Ocurrió un error en la creación del paciente", {
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
