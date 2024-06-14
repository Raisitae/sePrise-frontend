"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

import getMedicos from "@/utils/getMedicos";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { NextApiResponse } from "next";

export default function RequestAppointment() {
  const [medicos, setMedicos] = useState<any[]>([]);

  const fetchMedicos = async () => {
    try {
      const result = await getMedicos(); // Assuming getMedicos() returns a Promise<string[]>
      setMedicos(result);
    } catch (error) {
      console.error("Error fetching medicos:", error);
    }
  };

  useEffect(() => {
    fetchMedicos(); // Fetch data when the component mounts (empty dependency array)
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  console.log(medicos); // This will log the medicos array after it has been updated

  const [requestAppointmentData, setRequestAppointmentData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dni: "",
    doctor: "",
    date: "",
    time: "",
  });

  const handleRequestAppointmentChange = (field: any, value: any) => {
    setRequestAppointmentData({
      ...requestAppointmentData,
      [field]: value,
    });
  };

  const handleRequestAppointmentSubmit = () => {
    setRequestAppointmentData({
      firstName: "",
      lastName: "",
      phone: "",
      dni: "",
      doctor: "",
      date: "",
      time: "",
    });
    console.log(requestAppointmentData);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mt-4">
            Solicitar turno
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Completa el formulario para solicitar un turno.
          </p>
        </div>
        <Card>
          <CardContent>
            <FormControl className=" w-full gap-5 my-10">
              <TextField
                value={requestAppointmentData.firstName}
                onChange={(e) =>
                  handleRequestAppointmentChange("firstName", e.target.value)
                }
                label={"Nombre"}></TextField>
              <TextField
                value={requestAppointmentData.lastName}
                onChange={(e) =>
                  handleRequestAppointmentChange("lastName", e.target.value)
                }
                label={"Apellido"}></TextField>
              <TextField
                value={requestAppointmentData.phone}
                type="number"
                onChange={(e) =>
                  handleRequestAppointmentChange("phone", e.target.value)
                }
                label={"Número de Teléfono"}></TextField>
              <TextField
                value={requestAppointmentData.dni}
                type="number"
                onChange={(e) =>
                  handleRequestAppointmentChange("dni", e.target.value)
                }
                label={"DNI"}></TextField>
              <>
                <Label htmlFor="doctor" className="text-left">
                  Médico
                </Label>
                <Select
                  labelId="doctor-label"
                  value={requestAppointmentData.doctor} // Selected doctor's dni
                  onChange={(e) =>
                    handleRequestAppointmentChange("doctor", e.target.value)
                  }>
                  {medicos.length !== 0 ? (
                    medicos.map((medico, index) => (
                      <MenuItem key={medico.id} value={medico.dni}>
                        {`${medico.especialidad} - ${medico.apellido}, ${medico.nombre}`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay médicos disponibles</MenuItem>
                  )}
                </Select>
              </>
              <div className="flex flex-col align-center justify-center">
                <Label htmlFor="date" className="text-left mb-5">
                  Fecha
                </Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker className="" />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col align-center justify-center">
                <Label htmlFor="time" className="text-left mb-5">
                  Hora
                </Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    defaultValue={dayjs("2022-04-17T15:30")}
                    className=""
                  />
                </LocalizationProvider>
              </div>
              <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button
                  onClick={handleRequestAppointmentSubmit}
                  variant="contained"
                  size="large">
                  Enviar
                </Button>
                <Button
                  onClick={handleRequestAppointmentSubmit}
                  variant="outlined"
                  size="large"
                  href="/home">
                  Cancelar
                </Button>
              </Stack>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
