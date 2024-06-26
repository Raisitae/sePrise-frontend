"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import getMedicos from "@/utils/getMedicos";
import createTurno from "@/utils/crearTurno";
import postAgenda from "@/utils/postAgenda";

import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { getDateOnly } from "@/utils/parseTime";
import getAgendaDiaMedico from "@/utils/getAgendaDiaMedico";
import getPaciente from "@/utils/getPaciente";
import postPaciente from "@/utils/postPaciente";

import { Dayjs } from "dayjs";
import { ToastContainer } from "react-toastify";

export default function RequestAppointmentDoc() {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [disabledDays, setDisabledDays] = useState("");
  const [isMedicoSet, setIsMedicoSet] = useState(false);
  const [isDiaSet, setIsDiaSet] = useState(false);
  const [medicoDni, setMedicoDni] = useState(0);
  const [turnos, setTurnos] = useState(false);
  const [stringTurnos, setStringTurnos] = useState("");

  const handleDayChosen = async (fecha: string, dni: number) => {
    setIsDiaSet(false);
    const result = await getAgendaDiaMedico(dni, fecha);

    // Extract only the time part from each turno.fecha_agenda

    let timeOnlyAgendaDia = result.map((turno: any) => {
      let res: Date = new Date(turno.fecha_agenda);
      let local: string = res.toLocaleTimeString();
      local = local.split(" ")[0];
      local = local.slice(0, -3);
      return local;
    });

    let arrayTurnos = [];

    arrayTurnos.push("Los turnos no disponibles del doctor son:");

    if (timeOnlyAgendaDia.length > 0) {
      const truncatedDisabledTimes = timeOnlyAgendaDia.map((time: string) =>
        time.slice(0, 5)
      );
      for (let i: number = 0; i < truncatedDisabledTimes.length; i++) {
        const timeFloatString = truncatedDisabledTimes[i].replace(":", ".");
        const timeFloat = parseFloat(timeFloatString);
        const newTime = (timeFloat + 0.15)
          .toFixed(2)
          .toString()
          .slice(0, 5)
          .replace(".", ":");
        arrayTurnos.push(
          `\n` + truncatedDisabledTimes[i] + " hasta " + newTime
        );
      }

      setTurnos(true);
      setStringTurnos(arrayTurnos.join(" "));
    } else {
      setTurnos(false);
      setStringTurnos(""); // Clear stringTurnos if no agendas are available
    }

    setIsDiaSet(true);
  };

  const handleMedicoChoosen = (doctor: any) => {
    setStringTurnos("");
    handleRequestAppointmentChange("doctor", doctor), setIsMedicoSet(true);
    setMedicoDni(doctor);
  };

  async function fetchMedicos() {
    const result = await getMedicos();
    setMedicos(result);
  }

  let today: number | string = Date.now();
  today = today.toString();
  useEffect(() => {
    fetchMedicos(); // Fetch data when the component mounts (empty dependency array)
  }, [turnos]);
  // revisar si ese va vacio o con medicos

  const [requestAppointmentData, setRequestAppointmentData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dni: "",
    doctor: "",
    date: "",
    time: "",
    cancelado: false,
  });

  const handleRequestAppointmentChange = async (field: any, value: any) => {
    setRequestAppointmentData({
      ...requestAppointmentData,
      [field]: value,
    });
  };

  const handleRequestAppointmentSubmit = async () => {
    setRequestAppointmentData({
      firstName: "",
      lastName: "",
      phone: "",
      dni: "",
      doctor: "",
      date: "",
      time: "",
      cancelado: false,
    });
    console.log();

    try {
      const paciente = await getPaciente(parseInt(requestAppointmentData.dni));
      console.log(paciente);
    } catch (error) {
      if ((error = 404)) {
        const pacienteProp = {
          dni: parseInt(requestAppointmentData.dni),
          nombre: requestAppointmentData.firstName,
          apellido: requestAppointmentData.lastName,
          telefono: parseInt(requestAppointmentData.phone),
        };
        console.log("el paciente ingresado no existe");
        console.log("creando paciente...");
        const paciente = await postPaciente(pacienteProp);
        console.log(paciente);
      }
      throw error;
    } finally {
      const turnoProps = {
        dni_paciente: parseInt(requestAppointmentData.dni),
        dni_medico: parseInt(requestAppointmentData.doctor),
        tipo_turno: 1,
        fecha_turno:
          requestAppointmentData.date + " " + requestAppointmentData.time,
        cancelado: false,
      };
      console.log("creando turno...");
      const turno = await createTurno(turnoProps);
      console.log(turno);

      const agendaProps = {
        dni_medico: parseInt(requestAppointmentData.doctor),
        tipo_turno: 1,
        id_turno: turno.id,
        medico: true,
        estado: 1,
        fecha_agenda:
          requestAppointmentData.date + " " + requestAppointmentData.time,
      };

      const agenda = await postAgenda(agendaProps);
      console.log(agenda);
    }
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
                required
                value={requestAppointmentData.firstName}
                onChange={(e) =>
                  handleRequestAppointmentChange("firstName", e.target.value)
                }
                label={"Nombre"}></TextField>
              <TextField
                required
                value={requestAppointmentData.lastName}
                onChange={(e) =>
                  handleRequestAppointmentChange("lastName", e.target.value)
                }
                label={"Apellido"}></TextField>
              <TextField
                required
                value={requestAppointmentData.phone}
                type="number"
                onChange={(e) =>
                  handleRequestAppointmentChange("phone", e.target.value)
                }
                label={"Número de Teléfono"}></TextField>
              <TextField
                required
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
                  required
                  labelId="doctor-label"
                  value={requestAppointmentData.doctor}
                  onChange={(e) => handleMedicoChoosen(e.target.value)}>
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
                  <MobileDatePicker
                    disabled={isMedicoSet === true ? false : true}
                    disablePast
                    onChange={(date) =>
                      date !== null
                        ? (handleRequestAppointmentChange(
                            "date",
                            getDateOnly(date.toISOString())
                          ),
                          handleDayChosen(
                            getDateOnly(date.toISOString()),
                            medicoDni
                          ),
                          setIsDiaSet(true))
                        : console.error("Date is undefined")
                    }
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col align-center justify-center">
                <Label htmlFor="time" className="text-left mb-5">
                  Hora
                </Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    disabled={isDiaSet === true ? false : true}
                    slotProps={{ field: { clearable: true } }}
                    onChange={(time: Dayjs | null) => {
                      if (time !== null) {
                        let thisTime = time.toISOString();
                        let adjustedTime: Date = new Date(thisTime);
                        let adjustedTimeLocal: string;
                        adjustedTimeLocal = adjustedTime.toLocaleTimeString();
                        adjustedTimeLocal = adjustedTimeLocal.concat(".000Z");
                        adjustedTimeLocal = adjustedTimeLocal.split(" ")[0];
                        handleRequestAppointmentChange(
                          "time",
                          adjustedTimeLocal
                        );
                      } else {
                        console.error("Time is undefined");
                      }
                    }}
                  />
                </LocalizationProvider>
                <div>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {turnos ? `${stringTurnos}` : ""}
                  </div>
                </div>
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
                  href="/doctor">
                  Cancelar
                </Button>
              </Stack>
            </FormControl>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
