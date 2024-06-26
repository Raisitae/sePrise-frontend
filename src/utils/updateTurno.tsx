import axios from "axios";
import { url } from "./url";
import { toast } from "react-toastify";

interface UpdateTurnoDto {
  notas?: string;
  cancelado?: boolean;
  // Add other properties if necessary
}

async function handleUpdateTurno(
  id: number,
  updateTurnoDto: UpdateTurnoDto
): Promise<any> {
  try {
    const response = await axios.patch(`${url}/turnos/${id}`, updateTurnoDto);

    toast.success("Turno actualizao exitosamente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return response.data;
  } catch (error) {
    toast.success("Hubo un error actualizando el turno", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    throw error;
  }
}

export async function updateTurno(id: number, UpdateTurnoDto: UpdateTurnoDto) {
  try {
    await handleUpdateTurno(id, UpdateTurnoDto);
    console.log("Turno updated:" + UpdateTurnoDto.cancelado);
    // Handle success or update state as needed
  } catch (error) {
    console.error("Error updating turno:", error);
    // Handle error gracefully
  }
}
