import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@mui/material";

export function Signin() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Inicie sesión en el sistema del hospital
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Ingrese su usuario y contraseña
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <Label>Usuario</Label>
            <Input required />
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input
              id="password"
              placeholder="••••••••"
              required
              type="password"
            />
          </div>
          <Button
            variant="contained"
            href="/home"
            className="w-full"
            type="submit">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
