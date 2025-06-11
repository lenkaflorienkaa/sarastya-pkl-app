import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Assuming these Icons are available. We will wrap them if they don't accept className.
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/cube-leg.png";
import Image from "next/image";
import { JSX } from "react";

interface BusinessUnitProps {
  title: string;
  description: string;
  icon: JSX.Element; // The icon itself is still a JSX.Element
}

const businessUnitList: BusinessUnitProps[] = [
  {
    title: "Sarastya Agility",
    description:
      "Specializing in agile transformation and project management, we empower organizations to adapt swiftly, optimize workflows, and deliver innovative solutions with speed and precision.",
    // Removed className directly from ChartIcon; it will be applied to the wrapper div
    icon: <ChartIcon />,
  },
  {
    title: "Sarastya Technology",
    description:
      "Driving innovation through cutting-edge technology solutions, we build robust platforms, leverage emerging tech, and provide foundational digital infrastructure for a future-ready enterprise.",
    // Removed className directly from MagnifierIcon; it will be applied to the wrapper div
    icon: <MagnifierIcon />,
  },
  {
    title: "Sarastya Appslings",
    description:
      "Crafting intuitive and powerful applications for web and mobile, Sarastya Appslings transforms ideas into engaging digital experiences that are user-centric and performance-driven.",
    // Removed className directly from WalletIcon; it will be applied to the wrapper div
    icon: <WalletIcon />,
  },
];

export const Services = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 place-items-center">
          {/* Content */}
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
              Our{" "}
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Business
              </span>{" "}
              Units
            </h2>

            <p className="text-muted-foreground text-xl mt-4 mb-8 text-center lg:text-left">
              At Sarastya, our diverse expertise is structured across specialized units, each dedicated to driving innovation and delivering exceptional value in their domain.
            </p>

            <div className="flex flex-col gap-6">
              {businessUnitList.map(({ icon, title, description }: BusinessUnitProps) => (
                <Card
                  key={title}
                  className="p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <CardHeader className="flex flex-row items-start gap-4 p-0">
                    <div className="mt-1 bg-primary/20 p-2 rounded-2xl">
                      {/* FIX: Wrapped the icon in a div to apply the hover class */}
                      <div className="transition-transform duration-300 hover:scale-110">
                        {icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription className="text-md mt-2">
                        {description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src={cubeLeg}
              alt="Sarastya Business Units"
              className="object-contain max-w-[300px] md:max-w-[450px] lg:max-w-[600px] w-full h-auto"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};