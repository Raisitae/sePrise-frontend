"use client";
import { useState, useEffect, MouseEventHandler } from "react";
import { TextField, Button, Stack, Chip } from "@mui/material";
import { getDateOnly } from "@/utils/parseTime";
import getTurnosById from "@/utils/getTurnosById";
import getPaciente from "@/utils/getPaciente";
import { updateAgenda } from "@/utils/updateAgenda";
import getAgendaId from "@/utils/getAgendaId";
import { updateTurno } from "@/utils/updateTurno";
import getAgendaHoy from "@/utils/getAgendaHoy";
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
}

export default function Docinterface() {
  const [selectedPatient, setSelectedPatient] = useState<MergedData | null>(
    null
  );
  const [selectedPatientNotes, setSelectedPatientNotes] = useState("");
  const [medico, setMedico] = useState("");
  const [patients, setPatients] = useState<MergedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); // New state for refresh

  let now = getDateOnly(new Date().toISOString());

  const handlePatientNoteChange = (dni_paciente: number, notas: string) => {
    setSelectedPatientNotes(notas);
  };

  const handleSaveNotes = async () => {
    if (selectedPatient) {
      const notas = await updateTurno(selectedPatient.id, {
        notas: selectedPatientNotes,
      });
      setSelectedPatientNotes("");
      setRefresh((prev) => !prev); // Trigger refresh
    }
    setLoading(true);
  };

  const handleChangeState = async (estado: number) => {
    if (selectedPatient) {
      const idAgenda = await getAgendaId(selectedPatient.id);
      await updateAgenda(idAgenda.id_agenda, estado);
      setRefresh((prev) => !prev); // Trigger refresh
    }
  };

  const handleSubmitBegin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    handleChangeState(3);
    setLoading(true);
  };

  const handleSubmitFinish: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    handleChangeState(4);
    setLoading(true);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const turnos: any[] = [];
      const pacientes: any[] = [];

      try {
        const agenda = await getAgendaHoy(now);
        console.log(agenda);
        for (let i = 0; i < agenda.length; i++) {
          const turno = await getTurnosById(agenda[i].id_turno);
          if (turno?.dni_medico === null) {
            // Filter where dni_medico is null
            turnos.push({ ...turno, estado: agenda[i].estado });
          }
        }

        for (let i = 0; i < turnos.length; i++) {
          const pacienteResponse = await getPaciente(turnos[i].dni_paciente);
          if (pacienteResponse.data) {
            pacientes.push(pacienteResponse.data);
          }
        }

        const mergedData: MergedData[] = turnos.map((turno) => {
          const paciente = pacientes.find((p) => p.dni === turno.dni_paciente);
          return {
            ...turno,
            nombre: paciente?.nombre || "",
            apellido: paciente?.apellido || "",
            num_Telefono: paciente?.num_Telefono || 0,
          };
        });

        setPatients(mergedData);
        console.log(patients);
      } catch (error) {
        console.error("Error in fetchPatients:", error);
      }
    };

    fetchPatients();
  }, [refresh]);

  useEffect(() => {
    if (selectedPatient) {
      const updatedPatient = patients.find(
        (patient) => patient.id === selectedPatient.id
      );
      if (updatedPatient) {
        setSelectedPatient(updatedPatient);
      }
    }
  }, [patients]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-100 dark:bg-gray-950">
      <header className="flex h-20 items-center justify-between px-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">Técnicos del Laboratorio</h1>
        </div>
        <div className="flex flex-row gap-3">
          <Button variant="outlined" href="/laboratory">
            Volver
          </Button>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-[300px_1fr] gap-6 p-6">
        <div className="bg-white p-4 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold">Pacientes del día</h2>
          <div className="space-y-2">
            {patients.map((patient, key) => (
              <div
                key={key}
                className={`cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedPatient?.id === patient.id
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => {
                  setSelectedPatientNotes("");
                  setSelectedPatient(patient);
                }}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {patient.nombre} {patient.apellido}
                  </div>
                  <Chip
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      patient.estado === 1
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                        : patient.estado === 2
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        : patient.estado === 3
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                        : patient.estado === 4
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        : ""
                    }`}
                    label={
                      patient.estado === 1
                        ? "No confirmado"
                        : patient.estado === 2
                        ? "Confirmado"
                        : patient.estado === 3
                        ? "En curso"
                        : patient.estado === 4
                        ? "Finalizado"
                        : ""
                    }
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {patient.dni_paciente}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedPatient ? (
          <div className="bg-white p-4 shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold">Información del paciente</h2>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nombre
                </div>
                <div className="text-lg font-medium">
                  {selectedPatient.nombre} {selectedPatient.apellido}
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  DNI
                </div>
                <div className="text-lg font-medium">
                  {selectedPatient.dni_paciente}
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Notas del turno
                </div>
                <TextField
                  multiline
                  rows={8}
                  fullWidth
                  placeholder={selectedPatient?.notas ?? ""}
                  onChange={(e) => setSelectedPatientNotes(e.target.value)}
                  className="min-h-[100px]"
                  value={selectedPatientNotes}
                />
              </div>
            </div>
            <Stack className="mt-6 flex flex-row justify-end gap-2">
              {selectedPatient.estado === 2 && (
                <Button variant="outlined" onClick={handleSubmitBegin}>
                  Comenzar Turno
                </Button>
              )}

              {selectedPatient.estado !== 4 && (
                <>
                  <Button onClick={handleSaveNotes} variant="contained">
                    Guardar notas
                  </Button>
                  <Button variant="outlined" onClick={handleSubmitFinish}>
                    Finalizar turno
                  </Button>
                </>
              )}
            </Stack>
          </div>
        ) : (
          <div className="bg-white p-4 shadow-sm dark:bg-gray-800 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">
              Seleccione un paciente para ver más información sobre ellos.
            </div>
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
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
      strokeLinejoin="round"
      className="mr-2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
