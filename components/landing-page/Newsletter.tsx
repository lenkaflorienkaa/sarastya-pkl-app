'use client'; // This component needs to be a Client Component for hooks like useState and useInView

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInView } from 'react-intersection-observer'; // Import useInView hook

export const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribed!");
    // In a real application, you would handle the subscription logic here (e.g., send to a backend service)
  };

  // Use useInView hook for section entrance animation
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once when it comes into view
    threshold: 0.1,    // When 10% of the element is visible
  });

  return (
    <section id="newsletter" className="w-full">
      <hr className="w-11/12 mx-auto border-muted" />

      <div
        ref={ref} // Attach the ref to the main content div for observation
        // Apply entrance animation classes based on inView state
        className={`max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center
                    transition-all duration-700 ease-out /* Smooth transition for entrance */
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} /* Fade-in-up effect */`}
      >
        <h3 className="text-4xl md:text-5xl font-bold">
          Stay Updated on New{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Internship
          </span>{" "}
          Opportunities
        </h3>

        <p className="text-xl text-muted-foreground mt-4 mb-10">
          Receive timely alerts about new PKL/Internship programs, application deadlines, and exclusive insights from Sarastya Agility directly to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 md:gap-2 justify-center items-center w-full max-w-md mx-auto
                     transition-all duration-300 /* Smooth transitions for form interaction */
                     focus-within:shadow-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 /* Highlight on input focus */"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            required
          />
          <Button
            type="submit"
            className="w-full md:w-auto transition-transform duration-300 hover:scale-105" /* Button hover interaction */
          >
            Get Notified
          </Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto border-muted" />
    </section>
  );
};