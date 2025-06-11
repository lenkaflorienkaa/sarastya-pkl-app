'use client'; // This component needs to be a Client Component for hooks like useState and useInView

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import imageGrowth from "../assets/growth.png";
import imageReflecting from "../assets/reflecting.png";
import imageLookingAhead from "../assets/looking-ahead.png";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useInView } from 'react-intersection-observer'; // Import useInView hook

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: "Hands-On Real-World Projects Example",
    description:
      "Gain invaluable practical experience by directly contributing and learning to live projects that shape industry innovations at Sarastya Agility.",
    image: imageLookingAhead,
  },
  {
    title: "Dedicated Mentorship & Growth",
    description:
      "Receive personalized guidance from experienced professionals, fostering your skill development and accelerating your career growth in a supportive environment.",
    image: imageReflecting,
  },
  {
    title: "Dynamic & Collaborative Culture",
    description:
      "Thrive in an agile, multi-generational environment where collaboration, initiative, and innovative thinking are celebrated and nurtured.",
    image: imageGrowth,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-7xl mx-auto text-center space-y-12">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Benefits of Internship{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            at Sarastya
          </span>
        </h2>

        {/* Benefit Badges - could also add hover effects here if desired */}
        <div className="flex flex-wrap justify-center gap-4">
          {features.map(({ title }) => (
            <Badge key={title} variant="secondary" className="text-sm">
              {title}
            </Badge>
          ))}
        </div>

        {/* Benefit Cards with Entrance and Hover Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, description, image }: FeatureProps, index) => {
            // Use useInView for entrance animation
            const { ref, inView } = useInView({
              triggerOnce: true, // Only trigger the animation once
              threshold: 0.1,    // Animation triggers when 10% of card is visible
            });

            return (
              <Card
                key={title}
                ref={ref} // Attach ref for intersection observer
                // Add 'group' class to the card so its children can react to its hover state
                className={`group bg-muted/50 p-4 shadow-lg
                            transition-all duration-500 ease-out 
                            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} /* Entrance animation */
                            delay-[${index * 100}ms] /* Staggered delay for each card */
                            hover:scale-105 hover:shadow-xl hover:border-primary/50` /* Card hover effects */
                          }
              >
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent>{description}</CardContent>

                <CardFooter>
                  <Image
                    src={image}
                    alt={title}
                    // Image interaction: scales up and rotates slightly when the *card* is hovered
                    className="w-[200px] lg:w-[300px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1"
                    width={300}
                    height={200}
                  />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};