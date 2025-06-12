'use client'; // This component needs to be a Client Component for hooks like useState and useInView

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInView } from 'react-intersection-observer'; // Import useInView hook

interface TestimonialProps {
  image: string;
  name: string;
  userName: string; // This will now include Position and Intern/Alumni status
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://i.pravatar.cc/150?img=1", // Generic avatar for intern 1
    name: "Anya Wijaya",
    userName: "Content Creative - Sarastya Agility Intern '23",
    comment: "The projects at Sarastya gave me hands-on experience far beyond what I learned in class. Truly invaluable for my career!",
  },
  {
    image: "https://i.pravatar.cc/150?img=2",
    name: "Bayu Pratama",
    userName: "Back End Developer - Sarastya Technology Intern '24",
    comment: "My mentor at Sarastya was amazing. Their personalized guidance was key to rapidly developing my skills and understanding the industry.",
  },
  {
    image: "https://i.pravatar.cc/150?img=3",
    name: "Citra Dewi",
    userName: "Livestreamer - Appslings Intern '24",
    comment: "The collaborative environment here is incredible. I felt like a true team member from day one, contributing meaningfully to real projects!",
  },
  {
    image: "https://i.pravatar.cc/150?img=4",
    name: "Dimas Setiawan",
    userName: "Front End Developer - Sarastya Technology Alumni '23",
    comment: "I learned so much more than I expected. Sarastya truly invested in my growth, both technically and professionally.",
  },
  {
    image: "https://i.pravatar.cc/150?img=5",
    name: "Eka Putra",
    userName: "Event Organizer - Sarastya Agility Alumni '22",
    comment: "My internship led directly to a full-time offer. Sarastya opened doors I never thought possible for my career path!",
  },
  {
    image: "https://i.pravatar.cc/150?img=6",
    name: "Fira Lestari",
    userName: "Fashion Designer - Appslings Intern '24",
    comment: "Working with the XTrous framework was eye-opening. Sarastya's innovative approach is truly inspiring and effective in practice!",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="max-w-6xl mx-auto px-4 py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Hear From Our{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Interns & Alumni{" "}
        </span>
        </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8 text-center max-w-2xl mx-auto">
        Discover what makes the Sarastya Agility internship program a truly transformative experience, directly from those who've lived it.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {testimonials.map(({ image, name, userName, comment }, index) => { // Added index for staggered animation
            // Use useInView for entrance animation
            const { ref, inView } = useInView({
              triggerOnce: true, // Only trigger the animation once when it comes into view
              threshold: 0.1,    // Element is considered in view when 10% is visible
            });

            return (
              <Card
                key={userName} // Using userName as key
                ref={ref} // Attach ref for intersection observer
                // Add 'group' class to the card so its children can react to its hover state
                className={`group w-full max-w-md p-6 bg-muted/50 shadow-lg
                            transition-all duration-500 ease-out 
                            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} /* Entrance animation */
                            delay-[${index * 100}ms] /* Staggered delay for each card */
                            hover:scale-105 hover:shadow-xl hover:border-primary/50` /* Card hover effects */
                          }
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar>
                    <AvatarImage
                      alt={name}
                      src={image}
                      // Image interaction: scales up and rotates slightly when the *card* is hovered
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <CardDescription>{userName}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>{comment}</CardContent>
              </Card>
            );
          })}
      </div>
    </section>
  );
};