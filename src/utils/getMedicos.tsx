import axios from "axios";
import { url } from "./url";

async function getData(): Promise<any> {
  try {
    const response = await axios.get(url + "/medicos", {
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

export default async function getMedicos(): Promise<any> {
  try {
    const response = await getData();
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
