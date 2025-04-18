import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";
import LandingPageNavbar from "@/components/shared/LandingPageNavbar";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  CircuitBoard,
  CodeXml,
  Database,
  File,
  Fingerprint,
  NotebookPen,
  Shield,
  TabletSmartphone,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { AnimatedList } from "@/components/magicui/animated-list";
import Footer from "@/components/shared/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Item = {
  name: string;
  description: string;
  icon: string | React.ReactNode;
  color: string;
  time: string;
};

export default function Home() {
  const files = [
    {
      name: "Lecture-3.pptx",
      body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
      name: "Assignment.pdf",
      body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
      name: "Practical-codes.txt",
      body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
    },
    {
      name: "Lecture-notes.docx",
      body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
  ];

  let notifications = [
    {
      name: "Jane Doe",
      description: "Attended Lecture 1 - Database Management System",
      time: "15m ago",
      icon: <Database className="text-white" />,
      color: "#00C9A7",
    },
    {
      name: "Alice",
      description: "Attended Lecture 4 - Electronic Circuits",
      time: "10m ago",
      icon: <CircuitBoard className="text-white" />,
      color: "#FFB800",
    },
    {
      name: "Bob",
      description: "Attended Lecture 2 - Introduction to Cryptography",
      time: "5m ago",
      icon: <Shield className="text-white" />,
      color: "#FF3D71",
    },
    {
      name: "John doe",
      description: "Attended Lecture 3 - Fundamentals of Programming",
      time: "2m ago",
      icon: <CodeXml className="text-white" />,
      color: "#1E86FF",
    },
  ];

  notifications = Array.from({ length: 10 }, () => notifications).flat();

  const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          // animation styles
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          // light styles
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          // dark styles
          "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]",
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: color,
            }}
          >
            <span className="text-lg">{icon}</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
              <span className="text-sm sm:text-lg">{name}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-gray-500">{time}</span>
            </figcaption>
            <p className="text-sm font-normal dark:text-white/60">
              {description}
            </p>
          </div>
        </div>
      </figure>
    );
  };

  return (
    <>
      <LandingPageNavbar />
      <section className="from-primary-950 via-primary-500 bg-gradient-to-b from-10% via-50% to-transparent to-80% px-8 pt-48 md:px-16 lg:px-32">
        <h1
          data-testid="hero"
          className="font-jakarta w-full text-5xl font-extrabold tracking-tight text-white/90 md:w-6/7 md:text-6xl lg:w-5/6 lg:max-w-[1000px] lg:text-7xl"
        >
          All-in-One{" "}
          <FlipWords
            duration={2000}
            className="z-10 text-white/90"
            words={["School", "College", "Course"]}
          />{" "}
          Management, Simplified.
        </h1>
        <p className="mt-6 mb-8 w-full text-sm text-white/70 md:w-4/5 md:text-lg lg:w-3/5">
          A smart ecosystem built for schools, with seamless subject and
          attendance management — all with lightning-fast performance and a
          beautifully intuitive interface.
        </p>
        <Link
          href="/sign-up"
          className="text-primary-900 rounded-lg bg-white/90 px-8 py-3 font-semibold duration-200 hover:bg-white"
        >
          Get Started
        </Link>
        <Image
          className="mt-16 rounded-xl"
          src="/images/dashboard.png"
          width={3318}
          height={1616}
          priority={true}
          alt="Dashboard"
        />
      </section>
      <section id="features" className="mt-16 px-8 py-16 md:px-16 lg:px-32">
        <TextGenerateEffect
          className="font-jakarta max-w-[1200px] text-4xl leading-snug font-extrabold tracking-tight md:text-6xl"
          words="Designed for Educators 🧑‍🏫, Loved by Administrators 👨‍💻"
        />
        <p className="mt-4 text-xl opacity-60 lg:w-3/5">
          Penwwws is packed with everything you need to handle the day-to-day,
          all in one intuitive platform.
        </p>
        <div className="mt-8">
          <BentoGrid>
            <BentoCard
              Icon={File}
              name="File Sharing"
              description="Share lecture notes, assignments, and other files with students."
              className="col-span-3 lg:col-span-2"
              background={
                <Marquee
                  pauseOnHover
                  className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
                >
                  {files.map((f, idx) => (
                    <figure
                      key={idx}
                      className={cn(
                        "relative h-64 w-44 cursor-pointer overflow-hidden rounded-xl border p-4",
                        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                        "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                      )}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col">
                          <figcaption className="text-sm font-medium dark:text-white">
                            {f.name}
                          </figcaption>
                        </div>
                      </div>
                    </figure>
                  ))}
                </Marquee>
              }
            />
            <BentoCard
              Icon={TabletSmartphone}
              name="Responsive UI"
              description="Responsive design for all devices, from mobile to desktop."
              background={
                <div className="absolute flex h-full w-full items-center justify-center duration-200 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] hover:scale-110">
                  <Iphone15Pro
                    className="h-72 w-64"
                    src="/images/dashboard-mobile.png"
                  />
                </div>
              }
              className="col-span-3 lg:col-span-1"
            />
            <BentoCard
              Icon={NotebookPen}
              name="Grade Management"
              description="Marks and grades management for students, with easy access to all data."
              background={
                <div className="absolute flex h-full w-full items-center duration-200 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] hover:scale-110">
                  <div className="absolute mx-8 flex w-full -translate-y-10 flex-col rounded-lg bg-neutral-100 py-1 lg:right-20 lg:m-0 lg:translate-x-1/2">
                    <h1 className="p-2 px-4 font-medium">John Doe's Grade</h1>
                    <div className="border-t border-neutral-300 p-2 px-4">
                      <div className="flex w-50 justify-between">
                        Homework 1<p>0/10</p>
                      </div>
                    </div>
                    <div className="border-t border-neutral-300 p-2 px-4">
                      <div className="flex w-50 justify-between">
                        Homework 2<p>0/10</p>
                      </div>
                    </div>
                    <div className="border-t border-neutral-300 p-2 px-4">
                      <div className="flex w-50 justify-between">
                        Homework Average<p>0/10</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              className="col-span-3 lg:col-span-1"
            />
            <BentoCard
              Icon={Fingerprint}
              name="Attendance Tracking"
              description="Track attendance with ease using biometric recognition."
              background={
                <>
                  <AnimatedList
                    delay={1500}
                    className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90"
                  >
                    {notifications.map((item, idx) => (
                      <Notification {...item} key={idx} />
                    ))}
                  </AnimatedList>
                </>
              }
              className="col-span-3 lg:col-span-2"
            />
          </BentoGrid>
        </div>
      </section>
      <section
        id="faq"
        className="flex flex-col justify-between gap-8 p-8 py-16 pt-32 md:flex-row md:px-16 lg:px-32"
      >
        <h1 className="font-jakarta text-5xl font-bold md:text-7xl">Q&A</h1>
        <div>
          <Accordion
            className="border-b md:w-[500px]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold">
                What is Penwwws?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-7">
                Penwwws is an all-in-one platform to manage students, staff,
                classes, and school operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            className="border-b md:w-[500px]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold">
                Is it free?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-7">
                Penwwws has a free plan to explore and get started.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            className="border-b md:w-[500px]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold">
                Is it easy to use?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-7">
                Penwwws is designed to be user-friendly and intuitive, making it
                easy for anyone to use.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="p-8 text-white md:px-16">
        <div className="bg-primary-900 rounded-xl p-8 md:p-16">
          <h2 className="font-jakarta text-xl font-bold sm:text-4xl sm:leading-12 md:text-6xl md:leading-16 lg:w-1/2">
            Ready to Run Your School Smarter?
          </h2>
          <p className="mb-4 text-sm sm:mt-6 sm:text-lg md:mb-8 lg:w-1/2">
            From enrollment to attendance, get everything set up quickly and
            start managing with confidence.
          </p>
          <Link
            href="/sign-in"
            className="text-primary-900 rounded-md bg-white p-2 px-3 text-sm font-semibold duration-200 hover:opacity-90 md:p-3 md:px-5 md:text-base"
          >
            Get Started
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
