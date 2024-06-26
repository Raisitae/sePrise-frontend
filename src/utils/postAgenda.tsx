import axios from "axios";
import { url } from "./url"; // Assuming you have a url.ts file with base URL defined

interface agendaProps {
  fecha_agenda: string;
  estado: number;
  id_turno: number;
  dni_medico: number | null;
  medico: boolean;
}

async function postData(agendaProps: agendaProps): Promise<any> {
  try {
    const response = await axios.post(`${url}/agendasDias`, agendaProps, {
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

export default async function postAgenda(
  agendaProps: agendaProps
): Promise<any> {
  try {
    const response = await postData(agendaProps);
    console.log(response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error:", error);
    // You can handle errors here (e.g., show a toast notification)
    throw error;
  }
}
