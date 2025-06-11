import { Statistics } from "./Statistics"
import Image from "next/image"
import workImage from "../assets/work.jpeg"
import work2Image from "../assets/work2.jpg"

export const About = () => {
  return (
    <section id="about" className="flex justify-center py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12 px-6 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12">

          {/* Image Container */}
          {/* The gap is for spacing BETWEEN the images */}
          <div className="md:w-1/2 h-full flex flex-col justify-center items-center relative rounded-lg overflow-hidden gap-12">
            <Image
              src={workImage}
              alt="Sarastya Agility Internship Program Work"
              // Added hover effect: hover:scale-105 for 5% enlargement on hover
              // transition-transform duration-300 makes the animation smooth
              className="object-fill w-full h-1/2 rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src={work2Image}
              alt="Sarastya Agility Internship Program Work 2"
              // Added hover effect: hover:scale-105 for 5% enlargement on hover
              className="object-fill w-full h-1/2 rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Text Content Container */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center md:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span style={{ color: '#DD489A' }}>About</span> Sarastya Agility
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Sarastya Agility is more than just an internship provider; it's a dynamic platform designed to help you:
            </p>
            <ul className="text-muted-foreground mt-4 text-lg list-disc pl-5 space-y-2 text-left w-full">
              <li>
                Identify and enhance your competencies, capabilities, and personal capacity.
              </li>
              <li>
                Apply what you've learned in school or on campus to real-world scenarios.
              </li>
              <li>
                Foster an environment where individuals can become initiative-taking, interactive, and collaborative, truly embodying an Ambidex mindset.
              </li>
              <li>
                Engage in a vibrant multi-generational learning environment (Generation X, Y, and Z) that is both flexible and adaptive.
              </li>
            </ul>
            <div className="mt-6 w-full">
              <Statistics />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}