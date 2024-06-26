import axios from "axios";
import { url } from "./url";
import { toast } from "react-toastify";

async function handleUpdateAgenda(id: number, estado: number): Promise<any> {
  try {
    const response = await axios.patch(`${url}/agendasDias/${id}`, {
      estado: estado,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating turno:", error);
    throw error;
  }
}

export async function updateAgenda(id: number, estado: number) {
  try {
    await handleUpdateAgenda(id, estado);
    toast.success("Agenda actualizada exitosamente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    toast.error("Hubo un error actualizando la agenda", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.error("Error updating agenda:", error);
    // Handle error gracefully
  }
}
