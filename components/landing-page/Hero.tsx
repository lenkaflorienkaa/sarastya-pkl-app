import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons"; // You might want to replace this icon if not relevant to Sarastya

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
            <Button className="w-full md:w-auto">Apply Now</Button> {/* Changed to "Apply Now" */}

            {/* Consider changing or removing this button if a GitHub repo isn't relevant for students */}
            <a
              rel="noreferrer noopener"
              href="/about-sarastya" // Example: link to an 'About Us' or 'Program Details' page
              target="_blank"
              className={`${buttonVariants({ variant: "outline" })} w-full md:w-auto flex items-center justify-center`}
            >
              Learn More
              {/* Replace GitHubLogoIcon if not relevant. Maybe an arrow icon? */}
              {/* <GitHubLogoIcon className="ml-2 w-5 h-5" /> */}
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