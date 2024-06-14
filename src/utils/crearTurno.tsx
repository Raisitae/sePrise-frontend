import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { fecha_turno, tipo_turno, dni_paciente, dni_medico, notas } =
      req.query;

    if (
      !fecha_turno ||
      !tipo_turno ||
      !dni_paciente ||
      !dni_medico ||
      typeof fecha_turno !== "string" ||
      typeof tipo_turno !== "string" ||
      typeof dni_paciente !== "string" ||
      typeof dni_medico !== "string"
    ) {
      return res.status(400).json({ error: "Invalid or missing parameters" });
    }

    const result = await postData(
      new Date(fecha_turno),
      notas as string,
      parseInt(tipo_turno),
      parseInt(dni_paciente),
      parseInt(dni_medico)
    );
    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to load data" });
  }
}

const postData = async (
  fecha_turno: Date,
  notas: string,
  tipo_turno: number,
  dni_paciente: number,
  dni_medico: number
): Promise<string> => {
  try {
    const bodyData = {
      fecha_turno: fecha_turno.toISOString(),
      notas: notas,
      tipo_turno: tipo_turno,
      dni_paciente: dni_paciente,
      dni_medico: dni_medico,
    };

    const response = await axios.post(
      "https://localhost:3000/turnos",
      bodyData,
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );

    return response.data.data.token; // Assuming the response will be JSON
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
