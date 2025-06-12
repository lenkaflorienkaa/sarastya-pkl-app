"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface InternSpotlightProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const internSpotlightList: InternSpotlightProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=1",
    name: "Anya Wijaya",
    position: "Content Creative Intern - Sarastya Agility",
    socialNetworks: [
      { name: "Linkedin", url: "#" },
      { name: "Instagram", url: "#" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=2",
    name: "Bayu Pratama",
    position: "Back End Developer Intern - Sarastya Technology",
    socialNetworks: [
      { name: "Linkedin", url: "#" },
      { name: "Facebook", url: "#" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=6",
    name: "Luna Putri",
    position: "Fashion Designer Intern - Appslings",
    socialNetworks: [
      { name: "Linkedin", url: "#" },
      { name: "Instagram", url: "#" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=4",
    name: "Dimas Setiawan",
    position: "Data Analytics Intern - Sarastya Agility",
    socialNetworks: [
      { name: "Linkedin", url: "#" },
      { name: "Facebook", url: "#" },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size={20} />;
      case "Facebook":
        return <Facebook size={20} />;
      case "Instagram":
        return <Instagram size={20} />;
      default:
        return null;
    }
  };

  return (
    <section id="intern-spotlights" className="max-w-6xl mx-auto px-4 py-24 sm:py-32">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Meet Our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Shining Stars
          </span>{" "}
          : Intern Spotlights
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          These talented interns have contributed significantly to their divisions. Here's a
          glimpse of the stars in action!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {internSpotlightList.map(({ imageUrl, name, position, socialNetworks }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="w-full max-w-xs"
          >
            <Card className="bg-muted/50 relative pt-16 flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300 shadow-md">
              <Image
                src={imageUrl}
                alt={`${name}, ${position}`}
                className="absolute -top-12 rounded-full w-24 h-24 object-cover border-4 border-white shadow-lg"
                width={96}
                height={96}
              />
              <CardHeader className="pb-2">
                <CardTitle>{name}</CardTitle>
              </CardHeader>

              <CardContent className="pb-2 text-sm text-muted-foreground">
                <p>{position}</p>
              </CardContent>

              <CardFooter className="gap-2">
                {socialNetworks.map(({ name, url }) => (
                  <a
                    key={name}
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                ))}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
