import Image from "next/image";
import Link from "next/link"; // Import the Link component from Next.js

const Footer = () => {
  return (
    <footer id="footer" className="bg-background">
      <hr className="w-11/12 mx-auto" />

      <section className="container max-w-7xl mx-auto py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8 justify-center">
        <div className="col-span-full xl:col-span-2 flex items-center justify-center xl:justify-start">
          {/* Use Link component for internal navigation */}
          <Link
            href="/"
            className="font-bold text-xl flex items-center gap-2"
          >
            <Image
              src="/sarastya-logo.png"
              alt="Sarastya Agility Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            Sarastya Agility
          </Link>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <a href="https://www.instagram.com/daily.sarastya/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100">Instagram</a>
          <a href="https://www.linkedin.com/company/sarastya" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100">LinkedIn</a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Internship Journey</h3>
          {/* Use Link component for internal anchor links */}
          <Link href="#howItWorks" className="opacity-60 hover:opacity-100">Our Process</Link>
          <Link href="#career-journey" className="opacity-60 hover:opacity-100">Career Path Milestones</Link>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Quick Links</h3>
          {/* Use Link component for internal anchor links */}
          <Link href="#about" className="opacity-60 hover:opacity-100">About Us</Link>
          <Link href="#features" className="opacity-60 hover:opacity-100">Benefits</Link>
          <Link href="#howItWorks" className="opacity-60 hover:opacity-100">How It Works</Link>
          <Link href="#faq" className="opacity-60 hover:opacity-100">FAQ</Link>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Contact & Support</h3>
          {/* Mailto and external WhatsApp links remain <a> tags */}
          <a href="mailto:sarastya.hg@gmail.com" className="opacity-60 hover:opacity-100">Email Us</a>
          <a href="https://wa.me/6285176863899" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100">WhatsApp Us</a>
          <Link href="#newsletter" className="opacity-60 hover:opacity-100">Get Updates</Link>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto pb-14 text-center">
        <h3>
          &copy; {new Date().getFullYear()} Sarastya Agility. All rights reserved.{" "}
        </h3>
      </section>
    </footer>
  );
};

export default Footer;