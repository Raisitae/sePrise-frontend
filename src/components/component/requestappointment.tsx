/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xPh8yEcrXGq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  MobileTimePicker,
  MobileTimePickerProps,
} from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

import Link from "next/link";

export default function RequestAppointment() {
  const [requestAppointmentData, setRequestAppointmentData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    ssn: "",
    doctor: "",
    date: "",
    time: "",
  });

  const handleRequestAppointmentChange = (field, value) => {
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
      ssn: "",
      doctor: "",
      date: "",
      time: "",
    });
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mt-4">
            Request Appointment
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Fill out the form to request a new appointment.
          </p>
        </div>
        <Card>
          <CardContent>
            <form className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={requestAppointmentData.firstName}
                  onChange={(e) =>
                    handleRequestAppointmentChange("firstName", e.target.value)
                  }
                  className="col-span-3 w-full"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={requestAppointmentData.lastName}
                  onChange={(e) =>
                    handleRequestAppointmentChange("lastName", e.target.value)
                  }
                  className="col-span-3 w-full"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={requestAppointmentData.phone}
                  onChange={(e) =>
                    handleRequestAppointmentChange("phone", e.target.value)
                  }
                  className="col-span-3 w-full"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="ssn" className="text-right">
                  SSN
                </Label>
                <Input
                  id="ssn"
                  value={requestAppointmentData.ssn}
                  onChange={(e) =>
                    handleRequestAppointmentChange("ssn", e.target.value)
                  }
                  className="col-span-3 w-full"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker />
                </LocalizationProvider>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    defaultValue={dayjs("2022-04-17T15:30")}
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                  />
                </LocalizationProvider>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              onClick={handleRequestAppointmentSubmit}
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
              Submit
            </Button>
            <Link
              href="#"
              className="inline-flex items-center justify-center"
              prefetch={false}>
              <Link
                href="/home"
                className="text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800">
                Cancel
              </Link>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
