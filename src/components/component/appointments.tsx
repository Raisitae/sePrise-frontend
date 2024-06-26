"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import getAgendaHoy from "@/utils/getAgendaHoy";
import { getDateOnly, localTime } from "@/utils/parseTime";
import getPaciente from "@/utils/getPaciente";
import getTurnosById from "@/utils/getTurnosById";
import { Chip, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";

interface MergedData {
  id: number;
  fecha_turno: string;
  notas: string | null;
  tipo_turno: number;
  estado: number;
  dni_paciente: number;
  cancelado: boolean;
  nombre: string;
  apellido: string;
  num_Telefono: number;
  medico: boolean;
}

interface appointmentProps {
  type: string;
}
export default function Appointments({ type }: appointmentProps) {
  let text: string = type;
  let now = getDateOnly(new Date().toISOString());
  let tipo_turno: number;
  type === "doctor" ? (tipo_turno = 1) : (tipo_turno = 2);
  const [patients, setPatients] = useState<MergedData[]>([]);

  const handleLoadAgenda = async () => {
    const turnos: any[] = [];
    const pacientes: any[] = [];

    try {
      // Fetch the agenda for today
      const agenda = await getAgendaHoy(now);
      console.log(agenda);

      // Process each item in the agenda
      for (let i = 0; i < agenda.length; i++) {
        switch (text) {
          case "doctor":
            // Only process if medico is true
            if (agenda[i].medico === true) {
              const turno = await getTurnosById(agenda[i].id_turno);
              if (turno) {
                turnos.push({ ...turno, estado: agenda[i].estado });
              }
            }
            break;
          case "laboratory":
            if (agenda[i].medico === false) {
              const turno = await getTurnosById(agenda[i].id_turno);
              if (turno) {
                turnos.push({ ...turno, estado: agenda[i].estado });
              }
            }
            break;
        }
      }

      // Fetch the paciente details for each filtered turno
      for (let i = 0; i < turnos.length; i++) {
        if (turnos[i].dni_paciente) {
          const pacienteResponse = await getPaciente(turnos[i].dni_paciente);
          if (pacienteResponse.data) {
            pacientes.push(pacienteResponse.data);
          }
        }
      }

      // Merge the turno and paciente data
      const mergedData: MergedData[] = turnos.map((turno) => {
        const paciente = pacientes.find((p) => p.dni === turno.dni_paciente);
        return {
          ...turno,
          nombre: paciente?.nombre || "",
          apellido: paciente?.apellido || "",
          num_Telefono: paciente?.num_Telefono || 0,
        };
      });

      for (let i = 0; i < mergedData.length; i++) {
        mergedData[i].fecha_turno = localTime(mergedData[i].fecha_turno);
      }

      // Update the state with the merged data
      setPatients(mergedData);
      console.log(mergedData);
    } catch (error) {
      console.error("Error in handleMedicoSubmit:", error);
    }
  };

  useEffect(() => {
    handleLoadAgenda();
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="text-center">
          <div className="flex flex-col items-center justify-between">
            <Link
              id={text}
              className="flex items-center gap-2 text-lg font-semibold"
              href="/home">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Atrás</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-4">
              Sistema del {text === "laboratory" ? "laboratorio" : "hospital"}
            </h1>
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Administra los turnos del{" "}
            {text === "laboratory" ? "laboratorio" : "hospital"}
          </p>
        </div>
        <div className="flex flex-row max-md:flex-col gap-3">
          <Card className="w-9/12">
            <CardHeader className="flex flex-row align-middle">
              <BadgeAlertIcon className="mr-2" />
              <CardTitle>Gestión de turnos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  className="w-full"
                  variant="contained"
                  href={type === "doctor" ? "/apmtformdoc" : "/apmtformlab"}>
                  Solicitar turno
                </Button>
                <Button
                  className="w-full"
                  variant="outlined"
                  href={
                    type === "doctor" ? "/apmtmanagedoc" : "/apmtmanagelab"
                  }>
                  Administrar turnos *
                </Button>
                <p className=" text-gray-500">* Confirmar o cancelar turnos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-9/12">
            <CardHeader>
              <CardTitle className="mb-5">Agenda del día</CardTitle>
              {patients &&
                patients.map((p, key) => {
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {p.nombre} {p.apellido}
                        </p>

                        <p className="text-gray-500 dark:text-gray-400">
                          {p.fecha_turno}
                        </p>
                      </div>
                      <Chip
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          p.estado === 1
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                            : p.estado === 2
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : p.estado === 3
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                            : p.estado === 4
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : ""
                        }`}
                        label={
                          p.estado === 1
                            ? "No confirmado"
                            : p.estado === 2
                            ? "Confirmado"
                            : p.estado === 3
                            ? "En curso"
                            : p.estado === 4
                            ? "Finalizado"
                            : ""
                        }></Chip>
                    </div>
                  );
                })}
              <div className="space-y-4">
                {patients.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No hay turnos hoy.
                  </p>
                )}
                <Button
                  className="w-full mt-5"
                  variant="outlined"
                  href={type === "doctor" ? "/doc" : "/lab"}>
                  Administrar agenda del día
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
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

function BadgeAlertIcon(props: any) {
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
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
