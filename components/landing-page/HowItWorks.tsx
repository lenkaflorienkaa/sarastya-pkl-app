import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Assuming these Icons are appropriate or can be reinterpreted for the new content
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/landing-page/Icons";
import { JSX } from "react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />, // Icon for foundational excellence
    title: "Foundational Principles",
    description:
      "Dive deep into Sarastya's core principles and values that guide our mission and everyday operations, rooted in 'The Truth'.",
  },
  {
    icon: <MapIcon />, // Icon for cultural navigation/journey
    title: "Dynamic Working Culture",
    description:
      "Experience and contribute to Sarastya's unique organizational culture, fostering a collaborative and truth-based environment.",
  },
  {
    icon: <PlaneIcon />, // Icon for progressive execution/scalability
    title: "Ambidextrous Approach",
    description:
      "Learn and apply the Ambidextrous approach to balance exploration and exploitation, driving innovation and efficiency in projects.",
  },
  {
    icon: <GiftIcon />, // Icon for valuable outcomes/framework
    title: "XTrous Framework in Practice",
    description:
      "Master the XTrous framework through hands-on execution, boosting team and company productivity to achieve strategic goals.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="min-h-screen flex items-center justify-center flex-col text-center px-4 py-16"
    >
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold">
          Your Internship{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Journey
          </span>{" "}
          Step-by-Step
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Discover the structured approach that guides our interns from foundational learning to impactful project execution at Sarastya Agility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps) => (
            <Card key={title} className="bg-muted/50 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"> {/* Added padding and hover effects */}
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};