"use client";

import { FormControl, TextField, Button, Stack, Chip } from "@mui/material";
import { CardContent, Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { MouseEventHandler } from "react";
import Link from "next/link";
import getTurnosByDni from "@/utils/getTurnosByDni";
import getMedicosByDni from "@/utils/getMedicosByDni";
import { updateTurno } from "@/utils/updateTurno";
import getAgendaId from "@/utils/getAgendaId";
import { updateAgenda } from "@/utils/updateAgenda";
import { ToastContainer } from "react-toastify";

interface appointmentProps {
  type: string;
}

export function Searchappointment({ type }: appointmentProps) {
  let tipoTurno: number = type == "doctor" ? 1 : 2;
  const [confirmAppointmentData, setConfirmAppointmentData] = useState({
    dni: "",
  });

  const [medicoDatos, setMedicoDatos] = useState<any>([]);

  const [appointments, setAppointments] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmAppointmentChange = (field: any, value: any) => {
    setConfirmAppointmentData({
      ...confirmAppointmentData,
      [field]: value,
    });
  };

  async function getTurnos() {
    const result = await getTurnosByDni(
      parseInt(confirmAppointmentData.dni),
      tipoTurno,
      false
    );
    setAppointments(result);
    return result;
  }

  async function getMedicos(appointments: any) {
    const uniqueMedicos: Set<number> = new Set(
      appointments.map((appointment: any) => appointment.dni_medico)
    );
    let medicosData = [];

    for (let dni_medico of uniqueMedicos) {
      try {
        const result = await getMedicosByDni(dni_medico);
        medicosData.push(result);
      } catch (error) {
        console.error(
          `Error fetching data for dni_medico ${dni_medico}:`,
          error
        );
      }
    }
    setMedicoDatos(medicosData);
    return medicosData;
  }

  useEffect(() => {
    if (appointments.length > 0 && tipoTurno === 1) {
      getMedicos(appointments);
    }
  }, [appointments]);

  const getTurnosInfo = async () => {
    setLoading(true);
    setShowResults(false);

    try {
      const turnos = await getTurnos();
      // Obtener el estado de la agenda para cada turno filtrado
      for (let i = 0; i < turnos.length; i++) {
        const agenda = await getAgendaId(turnos[i].id);
        turnos[i] = { ...turnos[i], estado: agenda.estado };
      }

      // Simular una operación que involucra otros turnos
      // En este ejemplo, el ciclo for está incompleto y debería ajustarse según tus necesidades

      console.log(turnos.length);

      // Simular un retardo antes de actualizar el estado
      setTimeout(() => {
        setAppointments(turnos);
        setShowResults(true);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error en getTurnosInfo:", error);
      setLoading(false);
    }
  };

  const handleConfirmAppointmentSubmit: MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();
    getTurnosInfo();
  };

  const handleCancelarTurno = async (id: number) => {
    const cancelar = { cancelado: true };
    await updateTurno(id, cancelar);
    getTurnosInfo();
  };

  const handleConfirmarTurno = async (id: number) => {
    const response = await getAgendaId(id);
    const idAgenda = response.id_agenda;
    await updateAgenda(idAgenda, 2);
    getTurnosInfo();
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-4xl space-y-6 text-center">
        <div className="flex flex-col items-center justify-between">
          <Link
            id={type}
            className="flex items-center gap-2 text-lg font-semibold"
            href={tipoTurno === 1 ? "doctor" : "laboratory"}>
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Volver</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-4">
            Administrar turnos
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Ingrese su DNI y administre sus turnos
          </p>
        </div>
        <Card className="mx-auto w-10/12">
          <CardContent>
            <form className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-[1fr_auto] gap-4">
                <div className="relative">
                  <FormControl className=" w-full gap-5 my-10">
                    <SearchIcon className="absolute right-2.5 top-5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <TextField
                      id="dni"
                      label={"DNI"}
                      type="number"
                      placeholder={"Ingrese su DNI"}
                      value={confirmAppointmentData.dni}
                      onChange={(e) =>
                        handleConfirmAppointmentChange("dni", e.target.value)
                      }
                      className="w-full"
                    />
                  </FormControl>
                </div>
                <Button
                  onClick={handleConfirmAppointmentSubmit}
                  variant="contained"
                  size="large">
                  Enviar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {loading && (
          <div className="mx-auto w-10/12 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p> Cargando turnos... </p>
              </div>
            </div>
          </div>
        )}
        {showResults && (
          <div className="mx-auto w-10/12 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="mx-auto space-y-6">
                  <Card>
                    <CardContent>
                      <div className="space-y-4 py-5">
                        <h2 className="text-2xl font-bold mt-2">Sus turnos</h2>
                        {appointments.length > 0 ? (
                          <div className="space-y-2">
                            {appointments.map((appointment) => {
                              const doctor = medicoDatos.find(
                                (medico: any) =>
                                  medico.dni === appointment.dni_medico
                              );
                              return (
                                <div
                                  key={appointment.id}
                                  className="flex flex-row justify-between my-2 dark:bg-gray-900 p-5 rounded-md">
                                  <div className="flex flex-col justify-center align-middle rounded-md">
                                    <div className="flex flex-row ">
                                      <p className="font-medium text-left">
                                        {new Date(
                                          appointment.fecha_turno
                                        ).toLocaleString()}
                                      </p>
                                      <Chip
                                        className={`rounded-full px-2 py-1 mx-3 text-xs font-medium ${
                                          appointment.estado === 1
                                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                            : appointment.estado === 2
                                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                            : appointment.estado === 3
                                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                                            : appointment.estado === 4
                                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                            : ""
                                        }`}
                                        label={
                                          appointment.estado === 1
                                            ? "No confirmado"
                                            : appointment.estado === 2
                                            ? "Confirmado"
                                            : appointment.estado === 3
                                            ? "En curso"
                                            : appointment.estado === 4
                                            ? "Finalizado"
                                            : ""
                                        }
                                      />
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400 text-start">
                                      {type === "doctor" && doctor
                                        ? doctor.nombre +
                                          " " +
                                          doctor.apellido +
                                          " - " +
                                          doctor.especialidad
                                        : "No tiene médico asignado"}
                                    </div>
                                  </div>
                                  <Stack className="flex flex-row gap-4">
                                    {appointment && appointment.estado !== 2 ? (
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          handleConfirmarTurno(appointment.id)
                                        }>
                                        Confirmar
                                      </Button>
                                    ) : (
                                      <></>
                                    )}

                                    <Button
                                      variant="contained"
                                      onClick={() =>
                                        handleCancelarTurno(appointment.id)
                                      }>
                                      Cancelar
                                    </Button>
                                  </Stack>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p>No tiene turnos registrados</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
