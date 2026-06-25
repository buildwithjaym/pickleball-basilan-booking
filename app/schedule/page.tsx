"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Check,
  XCircle,
  AlertTriangle,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "available" | "booked" | "maintenance";

type Slot = {
  time: string;
  status: Status;
};

type Court = {
  id: number;
  name: string;
  slots: Slot[];
};

const TIMES = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

function buildSlots(): Slot[] {
  return TIMES.map((t, i) => {
    let status: Status = "available";
    if (i === 3 || i === 10) status = "booked";
    if (i === 14) status = "maintenance";
    return { time: t, status };
  });
}

const COURTS: Court[] = [
  { id: 1, name: "Court 1", slots: buildSlots() },
  { id: 2, name: "Court 2", slots: buildSlots() },
  { id: 3, name: "Court 3", slots: buildSlots() },
  { id: 4, name: "Court 4", slots: buildSlots() },
];

export default function SchedulePage() {
  const router = useRouter();

  const [date, setDate] = useState("today");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<{
    court: string;
    time: string;
  } | null>(null);

  const courts = useMemo(() => {
    if (filter === "all") return COURTS;
    return COURTS.filter((c) => c.id === Number(filter));
  }, [filter]);

  function selectSlot(court: Court, slot: Slot) {
    if (slot.status !== "available") {
      toast.error("Slot not available");
      return;
    }

    setSelected({
      court: court.name,
      time: slot.time,
    });

    toast.success("Slot selected", {
      description: `${court.name} • ${slot.time}`,
    });
  }

  function confirm() {
    if (!selected) {
      toast.error("No slot selected");
      return;
    }

    toast.success("Reservation ready", {
      description: `${selected.court} • ${selected.time}`,
    });
  }

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

            <Button
              variant="ghost"
              onClick={() => router.push("/reservation")}
              className="rounded-full text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="hidden sm:block overflow-hidden rounded-full">
              <Image
                src="/pickleball-mark.jpg"
                alt="logo"
                width={84}
                height={84}
                className="object-contain"
            priority
              />
            </div>

            <Button
              onClick={confirm}
              className="rounded-full bg-lime-400 px-5 font-bold text-black hover:bg-lime-300"
            >
              Confirm
            </Button>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
          <Badge className="border-white/10 bg-white/5 text-white">
            Court Reservation System
          </Badge>

          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">
            Select your court schedule
          </h1>

          <p className="mt-3 max-w-2xl text-white/60">
            Real-time availability across 4 courts. Click an open slot to reserve a playing time.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger className="w-full rounded-full border-white/10 bg-white/5 sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full rounded-full border-white/10 bg-white/5 sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courts</SelectItem>
                <SelectItem value="1">Court 1</SelectItem>
                <SelectItem value="2">Court 2</SelectItem>
                <SelectItem value="3">Court 3</SelectItem>
                <SelectItem value="4">Court 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded bg-emerald-400" />
              Available
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded bg-red-500" />
              Booked
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded bg-gray-500" />
              Maintenance
            </div>
          </div>
        </section>

        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 lg:grid-cols-[1fr_340px] sm:px-6">

          <div className="space-y-6">
            {courts.map((court) => (
              <div
                key={court.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">{court.name}</h2>
                  <Badge className="bg-white/10 text-white">
                    16 slots
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                  {court.slots.map((slot) => {
                    const active =
                      selected?.court === court.name &&
                      selected?.time === slot.time;

                    return (
                      <button
                        key={slot.time}
                        onClick={() => selectSlot(court, slot)}
                        className={`rounded-xl border p-3 text-left transition ${
                          slot.status === "available"
                            ? "border-white/10 bg-emerald-500/10 hover:border-emerald-400"
                            : slot.status === "booked"
                            ? "cursor-not-allowed bg-red-500/10 opacity-60"
                            : "cursor-not-allowed bg-white/5 opacity-40"
                        } ${
                          active ? "ring-2 ring-lime-400" : ""
                        }`}
                      >
                        <div className="flex justify-between text-xs">
                          <Clock className="h-3 w-3" />
                          {slot.status === "available" && (
                            <Check className="h-3 w-3 text-emerald-400" />
                          )}
                          {slot.status === "booked" && (
                            <XCircle className="h-3 w-3 text-red-400" />
                          )}
                          {slot.status === "maintenance" && (
                            <AlertTriangle className="h-3 w-3 text-gray-400" />
                          )}
                        </div>

                        <p className="mt-2 text-sm font-semibold">
                          {slot.time}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5 lg:sticky lg:top-24">
            <h3 className="text-lg font-bold">Your Selection</h3>

            {selected ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4" />
                  {selected.court}
                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="h-4 w-4" />
                  {selected.time}
                </div>

                <Button
                  onClick={confirm}
                  className="mt-4 w-full rounded-full bg-lime-400 font-bold text-black"
                >
                  Confirm selection
                </Button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/50">
                No slot selected yet
              </p>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}