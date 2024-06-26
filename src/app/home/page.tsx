import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@mui/material";

export default function Landpage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="mx-auto  space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Bienvenido a la Clinica SePrise
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Elija entre Hospital o Laboratorio para solicitar y administrar
            turnos
          </p>
        </div>
        <div className="flex flex-row max-md:flex col gap-4">
          <Card className="w-10/12">
            <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
              <TestTubeIcon className="h-12 w-12" />
              <div className="text-center">
                <h3 className="text-xl font-semibold">Laboratorio</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Acceso al sistema del laboratorio
                </p>
              </div>
              <Button href="/laboratory" variant="contained">
                Ir al laboratorio
              </Button>
            </CardContent>
          </Card>
          <Card className="w-10/12">
            <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
              <HospitalIcon className="h-12 w-12" />
              <div className="text-center">
                <h3 className="text-xl font-semibold">Hospital</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Acceso al sistema del hospital
                </p>
              </div>
              <Button href="/doctor" variant="contained">
                Ir al hospital
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function HospitalIcon(props: any) {
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
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  );
}

function TestTubeIcon(props: any) {
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
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}
