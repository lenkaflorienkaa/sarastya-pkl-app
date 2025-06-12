import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is the Sarastya Internship Program?",
    answer: "Sarastya Internship Academy is a program designed for active students (from SMK or University) to maximize their competencies, abilities, and capacity, helping them adapt to the work environment and develop professional attitudes in their field.",
    value: "item-1",
  },
  {
    question: "What are the key objectives of interning at Sarastya?",
    answer:
      "Our objectives include supporting government education programs, enhancing relevant softskills and hardskills, fostering competencies based on individual potential, gaining experience in modern Ambidextrous management, and applying the XTrous Framework with internal teams.",
    value: "item-2",
  },
  {
    question: "Why should I choose to intern at Sarastya Agility?",
    answer:
      "Sarastya provides a dynamic platform to recognize and enhance your competencies, apply school/campus learning to real-world scenarios, foster initiative, interaction, and collaboration, and offers a flexible, adaptive multi-generational learning environment.",
    value: "item-3",
  },
  {
    question: "What are the different internship program types and their durations?",
    answer: "We offer PKL/Prakerin (minimum 6 months), Magang Pra Profesional (MPP, minimum 1 year for qualified PKL alumni), and Magang Profesional (MP, maximum 5 months for experienced professionals).",
    value: "item-4",
  },
  {
    question: "How do I apply for the PKL/Prakerin program?",
    answer: "The application process involves a formal application submission (Permohonan), an interview, a selection phase (which includes a Project Based Test), and then program execution upon acceptance.",
    value: "item-5",
  },
  {
    question: "What are the general requirements for PKL/Prakerin applicants?",
    answer: "Requirements include being an active student (SMK/D3/D4/S1), committing to a minimum duration of 6 months, having relevant academic majors/concentrations, possessing a capable laptop (min. Windows 10, 6GB RAM), and successfully passing our selection process.",
    value: "item-6",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full text-left"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h3 className="font-medium mt-6">
          Still have questions?{" "}
          <a
            rel="noreferrer noopener"
            href="mailto:sarastya.hg@gmail.com" // Primary contact email from PDF
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact us
          </a>
        </h3>
      </div>
    </section>
  );
};