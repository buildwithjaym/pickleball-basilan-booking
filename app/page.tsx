"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Dumbbell,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
  light?: boolean;
};

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const navigation = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Facilities",
    href: "#facilities",
  },
  {
    label: "Community",
    href: "#community",
  },
  
];

const communityFeatures: FeatureItem[] = [
  {
    title: "Beginner Friendly",
    description:
      "Start with confidence through welcoming sessions designed for new players.",
    icon: Smile,
  },
  {
    title: "Community Driven",
    description:
      "Meet people, build friendships, and enjoy a sport that brings Basilan together.",
    icon: Users,
  },
  {
    title: "Competitive Play",
    description:
      "Challenge your skills through organized matches, ladders, and tournaments.",
    icon: Trophy,
  },
  {
    title: "Fitness and Wellness",
    description:
      "Stay active through a fast, engaging sport that supports total-body movement.",
    icon: HeartPulse,
  },
];

const benefits: FeatureItem[] = [
  {
    title: "Easy to Learn",
    description:
      "Simple rules and an approachable playing style make it easy to begin.",
    icon: Sparkles,
  },
  {
    title: "Fun for Every Age",
    description:
      "A flexible sport that can be enjoyed by young players, adults, and families.",
    icon: Users,
  },
  {
    title: "A Better Workout",
    description:
      "Improve movement, coordination, balance, and cardiovascular endurance.",
    icon: Dumbbell,
  },
  {
    title: "Naturally Social",
    description:
      "Every rally creates opportunities to connect, communicate, and belong.",
    icon: MessageCircle,
  },
];

const facilities: FeatureItem[] = [
  {
    title: "Quality Playing Courts",
    description:
      "Play in a structured environment designed for enjoyable and organized matches.",
    icon: Target,
  },
  {
    title: "Equipment Access",
    description:
      "New players can begin without immediately investing in complete equipment.",
    icon: ShieldCheck,
  },
  {
    title: "Coaching Sessions",
    description:
      "Improve your fundamentals, positioning, strategy, and match confidence.",
    icon: Zap,
  },
  {
    title: "Tournament Events",
    description:
      "Experience friendly competition and organized play for different skill levels.",
    icon: Trophy,
  },
  {
    title: "Community Space",
    description:
      "Relax, watch matches, meet other players, and become part of the local community.",
    icon: Users,
  },
  {
    title: "Organized Scheduling",
    description:
      "View planned sessions and future court availability before visiting.",
    icon: CalendarDays,
  },
];

const reservationSteps = [
  {
    number: "01",
    title: "Choose your date",
    description:
      "Select the day that works best for your group or playing schedule.",
  },
  {
    number: "02",
    title: "Select a time",
    description:
      "Review available court slots and choose your preferred playing period.",
  },
  {
    number: "03",
    title: "Confirm your slot",
    description:
      "Submit your details and receive a clear summary of your reservation.",
  },
];

const scheduleSlots = [
  {
    time: "6:00 AM",
    label: "Morning Play",
    status: "Available",
    statusClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    time: "9:00 AM",
    label: "Beginner Session",
    status: "Available",
    statusClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    time: "4:00 PM",
    label: "Community Match",
    status: "Limited",
    statusClass:
      "border-amber-200 bg-amber-50 text-amber-700",
  },
  {
    time: "7:00 PM",
    label: "Competitive Play",
    status: "Occupied",
    statusClass:
      "border-red-200 bg-red-50 text-red-700",
  },
];

const communityEvents = [
  {
    title: "Beginner Discovery Session",
    schedule: "Selected weekends",
    description:
      "A welcoming introduction covering grip, serve, scoring, movement, and court safety.",
    icon: Sparkles,
  },
  {
    title: "Community Open Play",
    schedule: "Weekly sessions",
    description:
      "Casual organized games where players can rotate, compete, and meet new partners.",
    icon: Users,
  },
  {
    title: "Skills and Strategy Clinic",
    schedule: "Scheduled training",
    description:
      "Focused instruction for players who want better control, placement, and decision-making.",
    icon: Target,
  },
  {
    title: "Local Tournament Series",
    schedule: "Special events",
    description:
      "Structured competition that celebrates progress, sportsmanship, and local talent.",
    icon: Trophy,
  },
];

const testimonials = [
  {
    quote:
      "Pickleball creates the right mix of exercise, competition, and community. It is easy to enjoy from the first game.",
    name: "Community Player",
    role: "Recreational player",
    initials: "CP",
  },
  {
    quote:
      "The best part is how quickly new players feel included. You can learn, play, and meet people in one session.",
    name: "New Player",
    role: "Beginner participant",
    initials: "NP",
  },
  {
    quote:
      "Organized schedules and clear court availability will make it easier for groups to plan matches ahead of time.",
    name: "Club Member",
    role: "Regular participant",
    initials: "CM",
  },
];

const footerLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Facilities",
    href: "#facilities",
  },
  {
    label: "Community",
    href: "#community",
  },
  {
    label: "Schedule",
    href: "/schedule",
  },
  {
    label: "Reservation",
    href: "/reservation",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <Badge
        className={
          light
            ? "mb-5 border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-lime-300 hover:bg-white/10"
            : "mb-5 border-brand-purple-200 bg-brand-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple-700 hover:bg-brand-purple-50"
        }
      >
        {eyebrow}
      </Badge>

      <h2
        className={`font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-5 text-base leading-8 sm:text-lg ${
          light ? "text-white/65" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-black/75 text-white backdrop-blur-xl">
        <div className="site-container flex h-20 items-center justify-between gap-6">
          <Link
            href="#home"
            aria-label="Paddle Ground Zamboanga home"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-40 items-center justify-center overflow-hidden rounded-xl bg-white px-3 shadow-lg sm:w-48">
              <Image
                src="/paddle.jpg"
                alt="Paddle Ground Zamboanga"
                width={80}
                height={80}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/schedule">
                View schedule
              </Link>
            </Button>

            <Button
              asChild
              className="lime-button rounded-full px-6 font-bold"
            >
              <Link href="/reservation">
                Reserve a slot
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Open navigation menu"
                className="rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white lg:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] max-w-sm border-l border-white/10 bg-brand-black p-0 text-white"
            >
              <SheetHeader className="border-b border-white/10 p-5 text-left">
                <SheetTitle className="sr-only">
                  Mobile navigation
                </SheetTitle>

                <div className="flex h-14 w-48 items-center justify-center overflow-hidden rounded-xl bg-white px-3">
                  <Image
                    src="/paddle.jpg"
                    alt="Paddle Ground Zamboanga"
                    width={220}
                    height={80}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </SheetHeader>

              <div className="flex h-full flex-col p-5">
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-2"
                >
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-base font-semibold text-white/75 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                      >
                        {item.label}
                        <ArrowRight className="size-4 text-brand-lime-400" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-8 grid gap-3">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href="/schedule">
                        View schedule
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button
                      asChild
                      className="lime-button h-12 rounded-full font-bold"
                    >
                      <Link href="/reservation">
                        Reserve a slot
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>

                <div className="mt-auto border-t border-white/10 pb-8 pt-6 text-sm text-white/50">
                  Play. Compete. Connect.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section
  id="home"
  className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-brand-black pb-16 pt-24 sm:pt-28 lg:pt-32 text-white"
>
  {/* BACKGROUND (UNCHANGED) */}
  <Image
    src="/hero_pic.jpg"
    alt="Pickleball players enjoying a match"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* OVERLAYS (UNCHANGED) */}
  <div className="absolute inset-0 bg-black/50" />
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(151,212,20,0.22),transparent_30%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(135,53,245,0.34),transparent_32%)]" />

  {/* FLOAT ANIMATION (UNCHANGED) */}
  <motion.div
    aria-hidden="true"
    animate={{
      y: [0, -18, 0],
      rotate: [0, 3, 0],
    }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
    className="absolute right-[7%] top-[17%] hidden size-48 rounded-full bg-brand-lime-400/15 blur-3xl lg:block"
  />

  {/* RESPONSIVE GRID FIX ONLY */}
  <div className="
    site-container relative z-10
    grid items-center gap-10 lg:gap-14
    lg:grid-cols-[1.08fr_0.92fr]
  ">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-4xl"
    >
      {/* BADGE (RESPONSIVE TEXT ONLY) */}
      <Badge className="
        mb-5 sm:mb-6
        border-brand-lime-300/30
        bg-brand-lime-400/10
        px-3 sm:px-4 py-2
        text-[10px] sm:text-xs
        font-bold uppercase tracking-[0.2em]
        text-brand-lime-300
      ">
        Zamboanga&apos;s growing pickleball community
      </Badge>

      {/* TITLE (FIX MOBILE OVERFLOW ONLY) */}
      <h1 className="
        font-display font-bold tracking-tight leading-[0.98]
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem]
      ">
        Where Zamboanga
        <span className="mt-1 sm:mt-2 block text-brand-lime-400">
          comes to play.
        </span>
      </h1>

      {/* DESCRIPTION (BETTER MOBILE READABILITY ONLY) */}
      <p className="
        mt-5 sm:mt-7
        max-w-2xl
        text-sm sm:text-base lg:text-xl
        leading-7 sm:leading-8
        text-white/70
      ">
        Discover a faster, friendlier, and more exciting way to stay active.
        Learn the game, challenge your skills, and become part of a community
        built around every rally.
      </p>

      {/* CTA (MOBILE-FIRST FIX ONLY) */}
      <div className="
        mt-7 sm:mt-9
        flex flex-col sm:flex-row
        gap-3
      ">

        <Button
          asChild
          size="lg"
          className="
            h-12 sm:h-14
            w-full sm:w-auto
            rounded-full px-6 sm:px-8
            text-base font-bold
            lime-button
          "
        >
          <Link href="/reservation">
            Reserve your court
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="
            h-12 sm:h-14
            w-full sm:w-auto
            rounded-full px-6 sm:px-8
            border-white/25 bg-white/5
            text-white font-bold
            backdrop-blur-md
            hover:bg-white/10
          "
        >
          <Link href="/schedule">
            <CalendarDays className="mr-2 size-5" />
            Explore the schedule
          </Link>
        </Button>

      </div>

      {/* STATS (MOBILE WRAP FIX ONLY) */}
      <div className="
        mt-8 sm:mt-10
        grid grid-cols-3 gap-2 sm:gap-3
        max-w-2xl
        border-t border-white/15 pt-6
      ">
        <div>
          <div className="font-display text-xl sm:text-3xl font-bold">All</div>
          <p className="text-[10px] sm:text-sm text-white/50">
            Skill levels welcome
          </p>
        </div>

        <div>
          <div className="font-display text-xl sm:text-3xl font-bold">Weekly</div>
          <p className="text-[10px] sm:text-sm text-white/50">
            Community play
          </p>
        </div>

        <div>
          <div className="font-display text-xl sm:text-3xl font-bold">Local</div>
          <p className="text-[10px] sm:text-sm text-white/50">
            Basilan community
          </p>
        </div>
      </div>
    </motion.div>

    {/* RIGHT PANEL (RESPONSIVE FIX ONLY - NO DESIGN CHANGE) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
      className="relative hidden lg:block"
    >
      {/*
        KEEP ENTIRE RIGHT PANEL EXACTLY SAME
        ONLY VISIBILITY CHANGED (lg-only safe)
      */}

      <div className="glass-panel relative ml-auto max-w-md overflow-hidden rounded-[2rem] p-7">
        {/* unchanged content */}
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime-300">
              Upcoming community play
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold">
              Weekend Open Court
            </h2>
          </div>

          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-lime-400 text-brand-black">
            <CalendarDays className="size-6" />
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <Clock3 className="size-5 text-brand-lime-300" />
            <div>
              <p className="text-xs text-white/45">Playing time</p>
              <p className="mt-1 font-semibold">Saturday, 5:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <MapPin className="size-5 text-brand-lime-300" />
            <div>
              <p className="text-xs text-white/45">Location</p>
              <p className="mt-1 font-semibold">
                Zamboanga City
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FLOAT ELEMENT (UNCHANGED) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 rounded-3xl border border-white/15 bg-brand-purple-600/90 p-5 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
            <Trophy className="size-6 text-brand-lime-300" />
          </div>

          <div>
            <p className="text-xs text-white/55">More than a sport</p>
            <p className="font-bold">A community experience</p>
          </div>
        </div>
      </motion.div>
    </motion.div>

  </div>
</section>

        <section className="border-b border-border bg-white">
          <div className="site-container grid grid-cols-2 gap-y-6 py-7 sm:grid-cols-4">
            {[
              "Play together",
              "Learn faster",
              "Compete better",
              "Build community",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 px-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-brand-charcoal sm:text-sm"
              >
                <CheckCircle2 className="size-4 shrink-0 text-brand-lime-600" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-24 bg-background py-20 sm:py-28"
        >
          <div className="site-container">
            <Reveal>
              <SectionHeading
                eyebrow="Built around the game"
                title="More than a court. A place to belong."
                description="Paddle Ground Zamboanga is designed to make the sport approachable, organized, and meaningful for every kind of player—from first-time beginners to competitive regulars."
                centered
              />
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {communityFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <Reveal
                    key={feature.title}
                    delay={index * 0.08}
                  >
                    <article className="sport-card h-full rounded-[1.75rem] p-7">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-purple-100 text-brand-purple-700">
                        <Icon className="size-7" />
                      </div>

                      <h3 className="mt-6 font-display text-2xl font-bold">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {feature.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand-black py-20 text-white sm:py-28">
          <div className="absolute inset-0 brand-grid opacity-40" />
          <div className="purple-orb absolute -left-40 top-20 size-96" />
          <div className="lime-orb absolute -right-40 bottom-0 size-96" />

          <div className="site-container relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Why pickleball"
                title="Simple to start. Difficult to stop playing."
                description="Pickleball combines quick rallies, strategic decisions, physical movement, and social interaction in one accessible sport."
                light
              />

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Accessible",
                  "Energetic",
                  "Strategic",
                  "Social",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <Reveal
                    key={benefit.title}
                    delay={index * 0.08}
                  >
                    <article className="h-full rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition hover:-translate-y-1 hover:border-brand-lime-400/30 hover:bg-white/[0.09]">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-lime-400 text-brand-black">
                        <Icon className="size-6" />
                      </div>

                      <h3 className="mt-5 font-display text-2xl font-bold">
                        {benefit.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/55">
                        {benefit.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="facilities"
          className="scroll-mt-24 bg-white py-20 sm:py-28"
        >
          <div className="site-container">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <SectionHeading
                  eyebrow="The playing experience"
                  title="Everything needed for a better day on court."
                  description="A complete pickleball experience should make playing easier, learning faster, and joining the community more enjoyable."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-brand-purple-200 px-6 font-bold text-brand-purple-700 hover:bg-brand-purple-50 hover:text-brand-purple-800"
                >
                  <Link href="/reservation">
                    Plan your next game
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {facilities.map((facility, index) => {
                const Icon = facility.icon;

                return (
                  <Reveal
                    key={facility.title}
                    delay={(index % 3) * 0.08}
                  >
                    <article className="group h-full overflow-hidden rounded-[1.75rem] border border-border bg-brand-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-purple-200 hover:bg-white hover:shadow-xl">
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-purple-600 text-white shadow-lg shadow-brand-purple-600/20 transition group-hover:bg-brand-lime-400 group-hover:text-brand-black">
                          <Icon className="size-7" />
                        </div>

                        <ArrowRight className="size-5 -rotate-45 text-muted-foreground transition group-hover:rotate-0 group-hover:text-brand-purple-600" />
                      </div>

                      <h3 className="mt-7 font-display text-2xl font-bold">
                        {facility.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {facility.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-brand-purple-700 py-20 text-white sm:py-28">
          <div className="site-container">
            <Reveal>
              <SectionHeading
                eyebrow="Simple reservation process"
                title="From planning to playing in three clear steps."
                description="The future reservation experience is designed to reduce uncertainty and make court planning easier for individuals and groups."
                centered
                light
              />
            </Reveal>

            <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
              <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-white/20 lg:block" />

              {reservationSteps.map((step, index) => (
                <Reveal
                  key={step.number}
                  delay={index * 0.1}
                >
                  <article className="relative h-full rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-7 backdrop-blur-sm">
                    <div className="relative z-10 flex size-20 items-center justify-center rounded-full border-8 border-brand-purple-700 bg-brand-lime-400 font-display text-2xl font-bold text-brand-black shadow-xl">
                      {step.number}
                    </div>

                    <h3 className="mt-7 font-display text-3xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/65">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={0.2}
              className="mt-10 flex justify-center"
            >
              <Button
                asChild
                size="lg"
                className="lime-button h-14 rounded-full px-8 text-base font-bold"
              >
                <Link href="/reservation">
                  Try the reservation demo
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="bg-background py-20 sm:py-28">
          <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Court availability"
                title="Know when to play before you arrive."
                description="The schedule page will provide a clear view of available, occupied, and unavailable court periods across the week."
              />

              <div className="mt-8 rounded-3xl border border-brand-purple-100 bg-brand-purple-50 p-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-purple-700" />

                  <p className="text-sm leading-7 text-brand-purple-900">
                    This schedule preview uses demonstration data and is
                    designed to show how future court availability may be
                    displayed.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="brand-button mt-8 h-12 rounded-full px-7 font-bold"
              >
                <Link href="/schedule">
                  View full schedule
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-2xl shadow-brand-purple-900/10">
                <div className="flex flex-col gap-4 border-b border-border bg-brand-black p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime-300">
                      Sample availability
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold">
                      Saturday Court Schedule
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/55">
                    <CalendarDays className="size-4 text-brand-lime-300" />
                    Weekly preview
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {scheduleSlots.map((slot) => (
                    <div
                      key={slot.time}
                      className="grid gap-4 p-5 transition hover:bg-brand-surface sm:grid-cols-[120px_1fr_auto] sm:items-center"
                    >
                      <div className="font-display text-xl font-bold text-brand-purple-700">
                        {slot.time}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {slot.label}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Paddle Ground Zamboanga Court
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold ${slot.statusClass}`}
                      >
                        {slot.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="community"
          className="scroll-mt-24 bg-white py-20 sm:py-28"
        >
          <div className="site-container">
            <Reveal>
              <SectionHeading
                eyebrow="Community experiences"
                title="There is always another reason to step onto the court."
                description="From beginner introductions to competitive events, every session is an opportunity to improve, connect, and enjoy the game."
                centered
              />
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {communityEvents.map((event, index) => {
                const Icon = event.icon;

                return (
                  <Reveal
                    key={event.title}
                    delay={(index % 2) * 0.08}
                  >
                    <article className="group flex h-full flex-col gap-6 rounded-[1.75rem] border border-border bg-background p-7 transition hover:border-brand-purple-200 hover:shadow-xl sm:flex-row">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-lime-400 text-brand-black">
                        <Icon className="size-7" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl font-bold">
                            {event.title}
                          </h3>

                          <Badge
                            variant="outline"
                            className="border-brand-purple-200 bg-brand-purple-50 text-brand-purple-700"
                          >
                            {event.schedule}
                          </Badge>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand-surface py-20 sm:py-28">
          <div className="site-container">
            <Reveal>
              <SectionHeading
                eyebrow="Community perspective"
                title="A sport people can enjoy together."
                description="The strongest pickleball experiences are built around welcoming players, organized sessions, and meaningful connections."
                centered
              />
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal
                  key={testimonial.name}
                  delay={index * 0.08}
                >
                  <article className="sport-card flex h-full flex-col rounded-[1.75rem] p-7">
                    <div className="flex gap-1 text-brand-lime-600">
                      {Array.from({
                        length: 5,
                      }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="size-4 fill-current"
                        />
                      ))}
                    </div>

                    <blockquote className="mt-6 flex-1 text-base leading-8 text-brand-charcoal">
                      “{testimonial.quote}”
                    </blockquote>

                    <div className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                      <div className="flex size-12 items-center justify-center rounded-full bg-brand-purple-700 text-sm font-bold text-white">
                        {testimonial.initials}
                      </div>

                      <div>
                        <p className="font-bold">
                          {testimonial.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="site-container">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-brand-black px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20 lg:px-20">
                <div className="absolute inset-0 brand-grid opacity-35" />
                <div className="purple-orb absolute -left-32 -top-32 size-80" />
                <div className="lime-orb absolute -bottom-40 -right-24 size-96" />

                <div className="relative z-10 mx-auto max-w-4xl">
                  <Badge className="border-brand-lime-300/25 bg-brand-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-lime-300 hover:bg-brand-lime-400/10">
                    Your next rally starts here
                  </Badge>

                  <h2 className="mt-7 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-7xl">
                    Ready to join the
                    <span className="block text-brand-lime-400">
                      Paddle Ground Zamboanga community?
                    </span>
                  </h2>

                  <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                    Find your preferred playing time, invite your group,
                    and experience a sport built for movement,
                    competition, and connection.
                  </p>

                  <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="lime-button h-14 rounded-full px-8 text-base font-bold"
                    >
                      <Link href="/reservation">
                        Reserve your slot
                        <ArrowRight className="ml-2 size-5" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-base font-bold text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href="/schedule">
                        Check court availability
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="scroll-mt-24 border-t border-white/10 bg-brand-black text-white"
      >
        <div className="site-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_0.8fr]">
          <div>
            <div className="flex h-16 w-56 items-center justify-center overflow-hidden rounded-xl bg-white px-4">
              <Image
                src="/paddle.jpg"
                alt="Paddle Ground Zamboanga"
                width={260}
                height={100}
                className="h-auto w-full object-contain"
              />
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
              Building a more active, connected, and welcoming
              pickleball community in Zamboanga through organized play,
              learning, and friendly competition.
            </p>

            <div className="mt-7 flex gap-3">
              <Link
                href="#"
                aria-label="Pickleball Facebook"
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 transition hover:border-brand-lime-400/40 hover:bg-brand-lime-400 hover:text-brand-black"
              >
                <FaFacebookF className="size-5" />
              </Link>

              <Link
                href="#"
                aria-label="Pickleball Instagram"
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 transition hover:border-brand-lime-400/40 hover:bg-brand-lime-400 hover:text-brand-black"
              >
                <FaInstagram className="size-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold">
              Quick links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/50 transition hover:text-brand-lime-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold">
              Contact
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-white/50">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-lime-300" />
                <span>Zamboanga City, Philippines</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-lime-300" />
                <span>Contact number to be added</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-lime-300" />
                <span>Email address to be added</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold">
              Court hours
            </h3>

            <div className="mt-5 grid gap-4 text-sm text-white/50">
              <div>
                <p className="font-semibold text-white/75">
                  Monday to Friday
                </p>
                <p className="mt-1">
                  5:00 PM – 9:00 PM
                </p>
              </div>

              <div>
                <p className="font-semibold text-white/75">
                  Saturday and Sunday
                </p>
                <p className="mt-1">
                  5:00 PM– 9:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
              {/* DEVELOPER CREDIT SECTION */}
<div className="site-container border-t border-white/10 pt-10 pb-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-white/50">

    <p>
      Developed by{" "}
      <span className="text-white font-semibold">
        Jaymar Maruji
      </span>
    </p>

    <Link
      href="https://jaymmaruji.online"
      target="_blank"
      className="
        inline-flex items-center gap-2
        text-brand-lime-300 font-semibold
        hover:text-brand-lime-200 transition
      "
    >
      View Portfolio →
    </Link>

  </div>
</div>
        <div className="border-t border-white/10">
          <div className="site-container flex flex-col gap-4 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Paddle Ground Zamboanga. All
              rights reserved.
            </p>

            <p>
              Landing page and reservation system prototype
            </p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}