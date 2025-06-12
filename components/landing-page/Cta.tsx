import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32 flex justify-center"
    >
      <div className="container max-w-3xl text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Ready to Launch Your{" "}
          {/* Using text-primary as it often represents a key brand color,
              or you could use a gradient like from previous sections */}
          <span className="text-primary">
            Career
          </span>{" "}
          with Sarastya?
        </h2>
        <p className="text-muted-foreground text-lg mt-4">
          Don't miss your chance to gain unparalleled hands-on experience and invaluable mentorship. Join our dynamic team and turn theory into real-world impact.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button className="w-full md:w-auto">Apply Now</Button> {/* This button should link to your /signup or /signin page */}
          <Button variant="outline" className="w-full md:w-auto">
            Explore Programs {/* This button could link to a #programs section on your landing page or a dedicated programs page */}
          </Button>
        </div>
      </div>
    </section>
  );
};