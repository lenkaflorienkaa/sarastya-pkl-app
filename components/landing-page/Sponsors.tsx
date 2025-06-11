import {
  Briefcase,
  Star,
  Award,
  Users,
} from "lucide-react";
import { JSX } from "react";

interface MilestoneProps {
  icon: JSX.Element;
  name: string;
}

const careerMilestones: MilestoneProps[] = [
  {
    icon: <Briefcase size={34} />,
    name: "Internship", // Practical Work/Field Practice
  },
  {
    icon: <Star size={34} />,
    name: "Pre-Professional Internship",
  },
  {
    icon: <Award size={34} />,
    name: "Professional Internship",
  },
  {
    icon: <Users size={34} />,
    name: "Welcome to the TEAM!",
  },
];

export const Sponsors = () => {
  return (
    <section id="career-journey" className="h-screen flex items-center justify-center">
      <div className="container">
        {/*
          New animation classes:
          animate-fade-in-up - Custom animation for fade in and slight upward slide
          (You'll need to define this in your global CSS, e.g., globals.css or a dedicated animations.css)
        */}
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-primary animate-fade-in-up">
          Career Opportunities at Sarastya
        </h2>
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Sarastya's commitment to developing the next generation of talent is realized through our closed recruitment internship program. Every qualified participant has the opportunity to become a part of the Sarastya team.
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {careerMilestones.map(({ icon, name }: MilestoneProps) => (
              <div
                key={name}
                className="flex flex-col items-center text-muted-foreground/60 text-center p-6 border rounded-lg shadow-sm w-40 h-36 justify-center transition-transform duration-300 hover:scale-105 hover:shadow-md"
              >
                <span className="mb-4 text-primary">{icon}</span>
                <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};