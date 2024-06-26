# Clinica SePrise Frontend

Repositorio frontend del sistema integral de gestión de turnos para laboratorio y hospital de la Clinica SePrise.

## Vistas

La app cuenta con un total de X vistas:

- `/` -> Vista de inicio de sesión.
- `/home` -> Vista principal, a partir de allí se puede navegar a la gestión de turnos del laboratorio o del hospital.
- `/doctor` -> Gestión del sistema del hospital. A partir de esta podemos navegar a:
  - `/apmtformdoc` -> Formulario desde el que se solicitan turnos. Se ingresa la información del paciente, si el paciente no existe en la DB, es creado.
  - `/apmtmanagedoc` -> Vista desde la cual se confirman o cancelan los turnos del paciente ingresado a partir de su dni (id).
  - `/doc` -> Vista desde la cual los doctores pueden administrar su agenda del día (turnos para ese día), tras ingresar su dni. En esta vista pueden cambiar el estado de los turnos (de confirmado -> en curso -> finalizado)
- `/laboratory` -> Gestión del sistema del laboratorio. A partir de esta podemos navegar a:
  - `/apmtformlab` -> Formulario desde el que se solicitan turnos. Se ingresa la información del paciente, si el paciente no existe en la DB, es creado.
  - `/apmtmanagelab` -> Vista desde la cual se confirman o cancelan los turnos del paciente ingresado a partir de su dni (id).
  - `/lab` -> Vista desde la cual los tecnicos pueden administrar su agenda del día (turnos para ese día). En esta vista pueden cambiar el estado de los turnos (de confirmado -> en curso -> finalizado)

## Tecnologías

La app se encuentra desarrollada en Next Js (typescript). También usa las librerías de axios para el manejo de requests al backend, react-toastify para el manejo de errores y notificaciones al usuario. Las librerías de estilo utilizadas son Material UI (especialmente el timepicker y el datepicker), y tailwind.

## Instrucciones de Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/clinica-seprise-frontend.git
   ```
2. Navegar al directorio del proyecto:
   ```sh
   cd clinica-seprise-frontend
   ```
3. Instalar las dependencias:
   ```sh
   npm install
   ```
4. Ejecutar el proyecto localmente:
   ```sh
   npm run dev
   ```

## Frontend y DB

El repositorio backend se encuentra en el siguiente link:
https://github.com/Raisitae/sePrise-backend
El repositorio con la base de datos se encuentra en el siguiente link:
https://github.com/Raisitae/seprise-db
