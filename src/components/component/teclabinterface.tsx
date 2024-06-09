/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LIH9bIaleJY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Teclabinterface() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      ssn: "123-45-6789",
      notes: "",
      appointmentStatus: "finished",
      testTicketGenerated: false,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      ssn: "987-65-4321",
      notes: "",
      appointmentStatus: "pending",
      testTicketGenerated: false,
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      ssn: "456-78-9012",
      notes: "",
      appointmentStatus: "finished",
      testTicketGenerated: false,
    },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const handleFinishAppointment = () => {
    if (selectedPatient) {
      setPatients(
        patients.map((patient) =>
          patient.id === selectedPatient.id
            ? {
                ...patient,
                appointmentStatus: "finished",
                testTicketGenerated: true,
              }
            : patient
        )
      );
    }
  };
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-100 dark:bg-gray-950">
      <header className="flex h-20 items-center justify-between px-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">Tech Lab Interface</h1>
        </div>
        <Button variant="outline">
          <Link href="/">Logout</Link>
        </Button>
      </header>
      <main className="flex-1 grid grid-cols-[300px_1fr] gap-6 p-6">
        <div className="bg-white p-4 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold">Patients of the Day</h2>
          <div className="space-y-2">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedPatient?.id === patient.id
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => {
                  setSelectedPatient(patient);
                }}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      patient.appointmentStatus === "finished"
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}>
                    {patient.appointmentStatus}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {patient.ssn}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedPatient ? (
          <div className="bg-white p-4 shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold">Patient Information</h2>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </div>
                <div className="text-lg font-medium">
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  SSN
                </div>
                <div className="text-lg font-medium">{selectedPatient.ssn}</div>
              </div>
              {selectedPatient.appointmentStatus !== "finished" && (
                <div className="flex justify-end">
                  <Button onClick={handleFinishAppointment}>
                    Finish Appointment
                  </Button>
                </div>
              )}
              {selectedPatient.testTicketGenerated && (
                <div>
                  <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Test Ticket
                  </div>
                  <div className="text-lg font-medium">
                    Your test ticket has been generated. Please pick up your
                    tests tomorrow.
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 shadow-sm dark:bg-gray-800 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">
              Please select a patient to view their information.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function MountainIcon(props) {
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
