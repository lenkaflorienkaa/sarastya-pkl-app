import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import Link from "next/link"; // Import Link for navigation

export const Hero = () => {
  return (
    <section className="w-full bg-background">
      <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-left space-y-6">
          <main className="text-5xl md:text-6xl font-bold leading-tight">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Kickstart
              </span>{" "}
              Career Journey
            </h1>{" "}
            for{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Future
              </span>{" "}
              Innovators
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Secure your Internship at Sarastya Agility. Gain hands-on experience, learn from experts, and make a real impact on exciting projects.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center lg:justify-start">
            {/* "Apply Now" button links to the sign-in page */}
            <Link href="/sign-in">
              <Button className="w-full md:w-auto">Apply Now</Button>
            </Link>

            {/* "Learn More" button scrolls to the #sponsors section */}
            <a
              href="#sponsors" // This will scroll to the element with id="sponsors"
              className={`${buttonVariants({ variant: "outline" })} w-full md:w-auto flex items-center justify-center`}
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="z-10">
          <HeroCards />
        </div>
      </div>

      {/* Shadow effect */}
      <div className="shadow" />
    </section>
  );
};
