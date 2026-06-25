"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type ReservationForm = {
  date: string;
  court: string;
  time: string;
  fullName: string;
  email: string;
  contactNumber: string;
  players: number;
  skillLevel: string;
  notes: string;
};

const initialForm: ReservationForm = {
  date: "",
  court: "",
  time: "",
  fullName: "",
  email: "",
  contactNumber: "",
  players: 2,
  skillLevel: "",
  notes: "",
};

const steps = [
  {
    number: 1,
    label: "Schedule",
  },
  {
    number: 2,
    label: "Player details",
  },
  {
    number: 3,
    label: "Review",
  },
];

const courts = [
  {
    value: "Court 1",
    label: "Court 1",
    description: "Main playing court",
  },
  {
    value: "Court 2",
    label: "Court 2",
    description: "Community playing court",
  },
  {
    value: "Court 3",
    label: "Court 3",
    description: "Amazing playing court",
  },
  {
    value: "Court 4",
    label: "Court 4",
    description: "Community playing court",
  },
];

const timeSlots = [
  {
    value: "6:00 AM – 7:00 AM",
    time: "6:00 AM",
    period: "Morning",
    available: true,
  },
  {
    value: "7:00 AM – 8:00 AM",
    time: "7:00 AM",
    period: "Morning",
    available: true,
  },
  {
    value: "8:00 AM – 9:00 AM",
    time: "8:00 AM",
    period: "Morning",
    available: false,
  },
  {
    value: "9:00 AM – 10:00 AM",
    time: "9:00 AM",
    period: "Morning",
    available: true,
  },
  {
    value: "3:00 PM – 4:00 PM",
    time: "3:00 PM",
    period: "Afternoon",
    available: true,
  },
  {
    value: "4:00 PM – 5:00 PM",
    time: "4:00 PM",
    period: "Afternoon",
    available: true,
  },
  {
    value: "5:00 PM – 6:00 PM",
    time: "5:00 PM",
    period: "Evening",
    available: false,
  },
  {
    value: "6:00 PM – 7:00 PM",
    time: "6:00 PM",
    period: "Evening",
    available: true,
  },
  {
    value: "7:00 PM – 8:00 PM",
    time: "7:00 PM",
    period: "Evening",
    available: true,
  },
];

const reservationBenefits = [
  {
    icon: CalendarDays,
    title: "Choose your schedule",
    description:
      "Select your preferred date, court, and available playing time.",
  },
  {
    icon: Users,
    title: "Add your group",
    description:
      "Enter the number of players and your current skill level.",
  },
  {
    icon: CheckCircle2,
    title: "Review and confirm",
    description:
      "Check your reservation details before submitting the request.",
  },
];

export default function ReservationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [minimumDate, setMinimumDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const localDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60_000,
    );

    setMinimumDate(localDate.toISOString().split("T")[0]);
  }, []);

  const selectedCourt = courts.find(
    (court) => court.value === form.court,
  );

  const selectedTime = timeSlots.find(
    (slot) => slot.value === form.time,
  );

  const formattedDate = useMemo(() => {
    if (!form.date) {
      return "Not selected";
    }

    return new Intl.DateTimeFormat("en-PH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${form.date}T00:00:00`));
  }, [form.date]);

  const stepOneComplete = Boolean(
    form.date && form.court && form.time,
  );

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    form.email,
  );

  const stepTwoComplete = Boolean(
    form.fullName.trim().length >= 2 &&
      emailIsValid &&
      form.contactNumber.trim().length >= 7 &&
      form.skillLevel,
  );

  const canContinue =
    step === 1 ? stepOneComplete : stepTwoComplete;

  function updateField<K extends keyof ReservationForm>(
    field: K,
    value: ReservationForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetReservation() {
    setStep(1);
    setForm(initialForm);
    setIsSuccess(false);
    setReferenceNumber("");
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (!open && isSuccess) {
      resetReservation();
    }
  }

  function handleNext() {
    if (!canContinue) {
      return;
    }

    setStep((current) => Math.min(current + 1, 3));
  }

  function handleBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const reference = `PB-${Date.now()
      .toString()
      .slice(-6)}`;

    setReferenceNumber(reference);
    setIsSuccess(true);
  }

  function handleNewReservation() {
    resetReservation();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="site-container flex h-20 items-center justify-between gap-5">
          <Link
            href="/"
            aria-label="Return to Pickleball Basilan home"
            className="flex items-center"
          >
            <div className="flex h-12 w-44 items-center justify-center overflow-hidden rounded-xl bg-white px-3 shadow-sm ring-1 ring-black/5 sm:w-52">
              <Image
                src="/pickleball-basilan-logo-cropped.webp"
                alt="Pickleball Basilan"
                width={240}
                height={90}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="ghost"
              className="hidden rounded-full sm:inline-flex"
            >
              <Link href="/schedule">
                View schedule
              </Link>
            </Button>

            <Button
              onClick={() => setIsOpen(true)}
              className="brand-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 rounded-full px-5 font-bold sm:px-6"
            >
              Reserve now
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-brand-black py-20 text-white sm:py-28 lg:py-32">
          <div className="absolute inset-0 brand-grid opacity-35" />
          <div className="purple-orb absolute -left-44 top-10 size-[30rem]" />
          <div className="lime-orb absolute -right-40 bottom-0 size-[28rem]" />

          <div className="site-container relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <Button
                asChild
                variant="ghost"
                className="-ml-4 mb-7 rounded-full text-white/65 hover:bg-white/10 hover:text-white"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 size-4" />
                  Back to home
                </Link>
              </Button>

              <Badge className="border-brand-lime-300/25 bg-brand-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-lime-300 hover:bg-brand-lime-400/10">
                Court reservation demo
              </Badge>

              <h1 className="mt-7 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Your next game
                <span className="block text-brand-lime-400">
                  starts with a slot.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                Choose your preferred date, select an available court
                time, and complete your player details through a simple
                guided reservation experience.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => setIsOpen(true)}
                  className="lime-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 h-14 rounded-full px-8 text-base font-bold"
                >
                  Start reservation
                  <ChevronRight className="ml-2 size-5" />
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-base font-bold text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/schedule">
                    <CalendarDays className="mr-2 size-5" />
                    Check availability
                  </Link>
                </Button>
              </div>

              <div className="mt-9 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/55 backdrop-blur-sm">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-lime-300" />
                <p className="leading-6">
                  This is a demonstration reservation system. No
                  payment is collected and no actual court booking is
                  created.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 35,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 0.15,
              }}
              className="relative"
            >
              <div className="glass-panel overflow-hidden rounded-[2rem]">
                <div className="border-b border-white/10 p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime-300">
                        Reservation preview
                      </p>

                      <h2 className="mt-3 font-display text-3xl font-bold">
                        Plan your court time
                      </h2>
                    </div>

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-lime-400 text-brand-black">
                      <CalendarDays className="size-6" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-7">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-brand-purple-500/25 text-brand-purple-200">
                        <CalendarDays className="size-5" />
                      </div>

                      <div>
                        <p className="text-xs text-white/40">
                          Preferred date
                        </p>
                        <p className="mt-1 font-semibold">
                          Choose your playing day
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-brand-purple-500/25 text-brand-purple-200">
                        <Clock3 className="size-5" />
                      </div>

                      <div>
                        <p className="text-xs text-white/40">
                          Playing time
                        </p>
                        <p className="mt-1 font-semibold">
                          Select an available slot
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-brand-purple-500/25 text-brand-purple-200">
                        <Users className="size-5" />
                      </div>

                      <div>
                        <p className="text-xs text-white/40">
                          Player information
                        </p>
                        <p className="mt-1 font-semibold">
                          Add your group details
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/[0.03] p-7">
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="lime-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 h-13 w-full rounded-full font-bold"
                  >
                    Open reservation form
                    <ChevronRight className="ml-2 size-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="border-brand-purple-200 bg-brand-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple-700 hover:bg-brand-purple-50">
                How it works
              </Badge>

              <h2 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl">
                A simple process from schedule to confirmation.
              </h2>

              <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
                The reservation demo guides players through the
                important booking details without making the process
                feel complicated.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {reservationBenefits.map(
                (benefit, index) => {
                  const Icon = benefit.icon;

                  return (
                    <motion.article
                      key={benefit.title}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="sport-card rounded-[1.75rem] p-7"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-purple-100 text-brand-purple-700">
                          <Icon className="size-7" />
                        </div>

                        <span className="font-display text-4xl font-bold text-brand-purple-100">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-7 font-display text-2xl font-bold">
                        {benefit.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {benefit.description}
                      </p>
                    </motion.article>
                  );
                },
              )}
            </div>
          </div>
        </section>

        <section className="bg-brand-surface py-20">
          <div className="site-container">
            <div className="flex flex-col items-center justify-between gap-8 rounded-[2rem] bg-brand-purple-700 px-7 py-12 text-center text-white sm:px-12 lg:flex-row lg:text-left">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime-300">
                  Ready to play?
                </p>

                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  Find a time that works for your group.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                  Start the reservation demo and experience how future
                  online booking may work for Pickleball Basilan.
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => setIsOpen(true)}
                className="lime-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 h-14 shrink-0 rounded-full px-8 text-base font-bold"
              >
                Reserve a court
                <ChevronRight className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white">
        <div className="site-container flex flex-col gap-4 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Pickleball Basilan
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="transition hover:text-brand-purple-700"
            >
              Home
            </Link>

            <Link
              href="/schedule"
              className="transition hover:text-brand-purple-700"
            >
              Schedule
            </Link>
          </div>
        </div>
      </footer>

      <Dialog
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <DialogContent className="max-h-[94svh] overflow-y-auto border-0 p-0 sm:max-w-5xl">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                className="p-6 sm:p-10"
              >
                <div className="mx-auto max-w-2xl text-center">
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -20,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 13,
                    }}
                    className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-lime-400 text-brand-black shadow-xl shadow-brand-lime-500/25"
                  >
                    <Check className="size-10 stroke-[3]" />
                  </motion.div>

                  <Badge className="mt-7 border-brand-purple-200 bg-brand-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-purple-700 hover:bg-brand-purple-50">
                    Reservation demo completed
                  </Badge>

                  <DialogHeader className="mt-5">
                    <DialogTitle className="text-center font-display text-4xl font-bold sm:text-5xl">
                      Your request looks ready.
                    </DialogTitle>

                    <DialogDescription className="mx-auto mt-4 max-w-xl text-center text-base leading-7">
                      Thank you for trying the Pickleball Basilan
                      reservation demo. This prototype demonstrates how
                      future online reservations may work.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-brand-surface text-left">
                    <div className="flex items-center justify-between gap-4 border-b border-border bg-brand-black px-6 py-5 text-white">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                          Demo reference
                        </p>

                        <p className="mt-1 font-display text-2xl font-bold text-brand-lime-300">
                          {referenceNumber}
                        </p>
                      </div>

                      <CheckCircle2 className="size-7 text-brand-lime-300" />
                    </div>

                    <div className="grid gap-5 p-6 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Player
                        </p>

                        <p className="mt-2 font-semibold">
                          {form.fullName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Date
                        </p>

                        <p className="mt-2 font-semibold">
                          {formattedDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Court
                        </p>

                        <p className="mt-2 font-semibold">
                          {form.court}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Time
                        </p>

                        <p className="mt-2 font-semibold">
                          {form.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Players
                        </p>

                        <p className="mt-2 font-semibold">
                          {form.players} players
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Skill level
                        </p>

                        <p className="mt-2 font-semibold capitalize">
                          {form.skillLevel}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-800">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0" />

                    <p className="leading-6">
                      This is not an actual confirmed reservation. No
                      information has been sent to a database and no
                      payment has been processed.
                    </p>
                  </div>

                  <DialogFooter className="mt-8 flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                      variant="outline"
                      onClick={handleNewReservation}
                      className="h-12 rounded-full px-7 font-bold"
                    >
                      Make another reservation
                    </Button>

                    <Button
                      asChild
                      className="brand-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 h-12 rounded-full px-7 font-bold"
                    >
                      <Link href="/schedule">
                        View court schedule
                        <ChevronRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </DialogFooter>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <div className="bg-brand-black px-6 py-7 text-white sm:px-8">
                  <DialogHeader>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Badge className="border-brand-lime-300/25 bg-brand-lime-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-lime-300 hover:bg-brand-lime-400/10">
                          Reservation demo
                        </Badge>

                        <DialogTitle className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                          Reserve your court
                        </DialogTitle>

                        <DialogDescription className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                          Complete the three steps below to create a
                          sample Pickleball Basilan reservation.
                        </DialogDescription>
                      </div>

                      <div className="flex items-center gap-2">
                        {steps.map((item) => (
                          <div
                            key={item.number}
                            className="flex items-center gap-2"
                          >
                            <div
                              className={`flex size-9 items-center justify-center rounded-full text-sm font-bold transition ${
                                step > item.number
                                  ? "bg-brand-lime-400 text-brand-black"
                                  : step === item.number
                                    ? "bg-brand-purple-500 text-white ring-4 ring-brand-purple-500/20"
                                    : "bg-white/10 text-white/40"
                              }`}
                            >
                              {step > item.number ? (
                                <Check className="size-4 stroke-[3]" />
                              ) : (
                                item.number
                              )}
                            </div>

                            {item.number < steps.length && (
                              <div
                                className={`hidden h-px w-5 sm:block ${
                                  step > item.number
                                    ? "bg-brand-lime-400"
                                    : "bg-white/15"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogHeader>
                </div>

                <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
                  <div className="min-w-0 p-6 sm:p-8">
                    <div className="mb-7">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple-700">
                        Step {step} of 3
                      </p>

                      <h3 className="mt-2 font-display text-3xl font-bold">
                        {step === 1 && "Choose your court schedule"}
                        {step === 2 && "Tell us about your group"}
                        {step === 3 && "Review your reservation"}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step === 1 &&
                          "Select a preferred date, court, and available playing time."}

                        {step === 2 &&
                          "Enter the primary player information and group details."}

                        {step === 3 &&
                          "Check every detail before submitting the demonstration request."}
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step-one"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -20,
                          }}
                          className="space-y-7"
                        >
                          <div className="space-y-2.5">
                            <Label
                              htmlFor="reservation-date"
                              className="font-semibold"
                            >
                              Preferred date
                            </Label>

                            <div className="relative">
                              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                              <Input
                                id="reservation-date"
                                type="date"
                                min={minimumDate}
                                value={form.date}
                                onChange={(event) =>
                                  updateField(
                                    "date",
                                    event.target.value,
                                  )
                                }
                                className="h-13 rounded-xl pl-12"
                              />
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            <Label
                              htmlFor="court"
                              className="font-semibold"
                            >
                              Select court
                            </Label>

                            <Select
                              value={form.court}
                              onValueChange={(value) => {
                                updateField("court", value);
                                updateField("time", "");
                              }}
                            >
                              <SelectTrigger
                                id="court"
                                className="h-13 w-full rounded-xl"
                              >
                                <SelectValue placeholder="Choose a court" />
                              </SelectTrigger>

                              <SelectContent>
                                {courts.map((court) => (
                                  <SelectItem
                                    key={court.value}
                                    value={court.value}
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {court.label}
                                      </p>

                                      <p className="text-xs text-muted-foreground">
                                        {court.description}
                                      </p>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                              <Label className="font-semibold">
                                Available time
                              </Label>

                              <span className="text-xs text-muted-foreground">
                                1-hour session
                              </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              {timeSlots.map((slot) => {
                                const isSelected =
                                  form.time === slot.value;

                                return (
                                  <button
                                    key={slot.value}
                                    type="button"
                                    disabled={!slot.available}
                                    aria-pressed={isSelected}
                                    onClick={() =>
                                      updateField(
                                        "time",
                                        slot.value,
                                      )
                                    }
                                    className={`rounded-2xl border p-4 text-left transition ${
                                      !slot.available
                                        ? "cursor-not-allowed border-border bg-muted/60 opacity-55"
                                        : isSelected
                                          ? "border-brand-purple-600 bg-brand-purple-50 ring-2 ring-brand-purple-600/15"
                                          : "border-border bg-white hover:border-brand-purple-300 hover:bg-brand-purple-50/40"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <Clock3
                                        className={`size-5 ${
                                          isSelected
                                            ? "text-brand-purple-700"
                                            : "text-muted-foreground"
                                        }`}
                                      />

                                      <span
                                        className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                          slot.available
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-red-50 text-red-600"
                                        }`}
                                      >
                                        {slot.available
                                          ? "Available"
                                          : "Occupied"}
                                      </span>
                                    </div>

                                    <p className="mt-4 font-display text-xl font-bold">
                                      {slot.time}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                      {slot.period}
                                    </p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-two"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -20,
                          }}
                          className="space-y-6"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2.5 sm:col-span-2">
                              <Label
                                htmlFor="full-name"
                                className="font-semibold"
                              >
                                Full name
                              </Label>

                              <div className="relative">
                                <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                  id="full-name"
                                  value={form.fullName}
                                  onChange={(event) =>
                                    updateField(
                                      "fullName",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="Enter your complete name"
                                  autoComplete="name"
                                  className="h-13 rounded-xl pl-12"
                                />
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              <Label
                                htmlFor="email"
                                className="font-semibold"
                              >
                                Email address
                              </Label>

                              <div className="relative">
                                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                  id="email"
                                  type="email"
                                  value={form.email}
                                  onChange={(event) =>
                                    updateField(
                                      "email",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="name@email.com"
                                  autoComplete="email"
                                  className="h-13 rounded-xl pl-12"
                                />
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              <Label
                                htmlFor="contact-number"
                                className="font-semibold"
                              >
                                Contact number
                              </Label>

                              <div className="relative">
                                <Phone className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                  id="contact-number"
                                  type="tel"
                                  value={form.contactNumber}
                                  onChange={(event) =>
                                    updateField(
                                      "contactNumber",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="09XX XXX XXXX"
                                  autoComplete="tel"
                                  className="h-13 rounded-xl pl-12"
                                />
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              <Label
                                htmlFor="skill-level"
                                className="font-semibold"
                              >
                                Skill level
                              </Label>

                              <Select
                                value={form.skillLevel}
                                onValueChange={(value) =>
                                  updateField(
                                    "skillLevel",
                                    value,
                                  )
                                }
                              >
                                <SelectTrigger
                                  id="skill-level"
                                  className="h-13 w-full rounded-xl"
                                >
                                  <SelectValue placeholder="Choose skill level" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectItem value="beginner">
                                    Beginner
                                  </SelectItem>

                                  <SelectItem value="intermediate">
                                    Intermediate
                                  </SelectItem>

                                  <SelectItem value="advanced">
                                    Advanced
                                  </SelectItem>

                                  <SelectItem value="mixed group">
                                    Mixed group
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2.5">
                              <Label className="font-semibold">
                                Number of players
                              </Label>

                              <div className="flex h-13 items-center justify-between rounded-xl border border-input bg-background px-3">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  aria-label="Decrease player count"
                                  disabled={form.players <= 1}
                                  onClick={() =>
                                    updateField(
                                      "players",
                                      Math.max(
                                        1,
                                        form.players - 1,
                                      ),
                                    )
                                  }
                                  className="size-9 rounded-full"
                                >
                                  <Minus className="size-4" />
                                </Button>

                                <div className="text-center">
                                  <p className="font-display text-xl font-bold">
                                    {form.players}
                                  </p>

                                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                    Players
                                  </p>
                                </div>

                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  aria-label="Increase player count"
                                  disabled={form.players >= 12}
                                  onClick={() =>
                                    updateField(
                                      "players",
                                      Math.min(
                                        12,
                                        form.players + 1,
                                      ),
                                    )
                                  }
                                  className="size-9 rounded-full"
                                >
                                  <Plus className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-brand-purple-100 bg-brand-purple-50 p-5">
                            <div className="flex gap-3">
                              <Sparkles className="mt-0.5 size-5 shrink-0 text-brand-purple-700" />

                              <div>
                                <p className="font-semibold text-brand-purple-900">
                                  New to pickleball?
                                </p>

                                <p className="mt-1 text-sm leading-6 text-brand-purple-800/70">
                                  Choose beginner as your skill level so
                                  future staff can recommend an
                                  appropriate playing session.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step-three"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -20,
                          }}
                          className="space-y-6"
                        >
                          <div className="overflow-hidden rounded-[1.5rem] border border-border">
                            <div className="grid gap-5 bg-brand-surface p-5 sm:grid-cols-2">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Date
                                </p>

                                <p className="mt-2 font-semibold">
                                  {formattedDate}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Playing time
                                </p>

                                <p className="mt-2 font-semibold">
                                  {form.time}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Court
                                </p>

                                <p className="mt-2 font-semibold">
                                  {form.court}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Group size
                                </p>

                                <p className="mt-2 font-semibold">
                                  {form.players} players
                                </p>
                              </div>
                            </div>

                            <Separator />

                            <div className="grid gap-5 p-5 sm:grid-cols-2">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Primary player
                                </p>

                                <p className="mt-2 font-semibold">
                                  {form.fullName}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Skill level
                                </p>

                                <p className="mt-2 font-semibold capitalize">
                                  {form.skillLevel}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Email
                                </p>

                                <p className="mt-2 break-all font-semibold">
                                  {form.email}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                  Contact
                                </p>

                                <p className="mt-2 font-semibold">
                                  {form.contactNumber}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            <Label
                              htmlFor="special-notes"
                              className="font-semibold"
                            >
                              Special notes
                              <span className="ml-2 font-normal text-muted-foreground">
                                Optional
                              </span>
                            </Label>

                            <Textarea
                              id="special-notes"
                              value={form.notes}
                              onChange={(event) =>
                                updateField(
                                  "notes",
                                  event.target.value,
                                )
                              }
                              placeholder="Add equipment requests, accessibility needs, or other information..."
                              className="min-h-28 resize-none rounded-xl"
                            />
                          </div>

                          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                            <ShieldCheck className="mt-0.5 size-5 shrink-0" />

                            <p className="leading-6">
                              Submitting this form only completes the
                              prototype flow. It will not create an
                              actual reservation.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <aside className="border-t border-border bg-brand-surface p-6 lg:border-l lg:border-t-0 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple-700">
                      Reservation summary
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-bold">
                      Your court plan
                    </h3>

                    <div className="mt-7 space-y-5">
                      <div className="flex gap-3">
                        <CalendarDays className="mt-0.5 size-5 shrink-0 text-brand-purple-700" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Date
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {formattedDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <MapPin className="mt-0.5 size-5 shrink-0 text-brand-purple-700" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Court
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {selectedCourt?.label ||
                              "Not selected"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Clock3 className="mt-0.5 size-5 shrink-0 text-brand-purple-700" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Time
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {selectedTime?.value ||
                              "Not selected"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Users className="mt-0.5 size-5 shrink-0 text-brand-purple-700" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Group
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {form.players} players
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-7" />

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-lime-700" />

                        <div>
                          <p className="font-semibold">
                            Demonstration only
                          </p>

                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Rates, payment, and final approval will be
                            added when the real reservation system is
                            developed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>

                <DialogFooter className="flex-row items-center justify-between gap-3 border-t border-border bg-white px-6 py-5 sm:px-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="rounded-full"
                  >
                    <ChevronLeft className="mr-2 size-4" />
                    Back
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canContinue}
                      className="brand-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 rounded-full px-7 font-bold"
                    >
                      Continue
                      <ChevronRight className="ml-2 size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="lime-button min-h-[48px] text-base font-semibold shadow-md hover:shadow-lg active:scale-95 rounded-full px-7 font-bold"
                    >
                      Submit reservation
                      <Check className="ml-2 size-4" />
                    </Button>
                  )}
                </DialogFooter>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}