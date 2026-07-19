import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-18 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-900 transition-opacity hover:opacity-90">
          <GraduationCap size={28} strokeWidth={2.2} className="text-primary" />
          <span>UniMate</span>
        </a>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-7">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200">
            Features
          </a>
          <a href="#calculators" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200">
            Calculators
          </a>
          <a href="#institutions" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200">
            Institutions
          </a>
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200">
            About
          </a>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/register" className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2 transition-colors duration-200 cursor-pointer">
            Log In
          </Link>
          <Link to="/register" className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover hover:-translate-y-px hover:shadow-md hover:shadow-primary/25 active:translate-y-0 active:shadow-sm transition-all duration-200 cursor-pointer text-center">
            Get Started
          </Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button 
          className="md:hidden text-slate-900 p-2 focus:outline-none cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="absolute top-18 left-0 w-full bg-white border-b border-slate-200 p-6 shadow-lg flex flex-col gap-5 z-40 md:hidden">
          <a 
            href="#features" 
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" 
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a 
            href="#calculators" 
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" 
            onClick={() => setIsOpen(false)}
          >
            Calculators
          </a>
          <a 
            href="#institutions" 
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" 
            onClick={() => setIsOpen(false)}
          >
            Institutions
          </a>
          <a 
            href="#about" 
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" 
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <hr className="border-t border-slate-200 my-1" />
          <div className="flex flex-col gap-3">
            <Link to="/register" className="bg-white text-slate-900 border border-slate-200 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-all duration-200 cursor-pointer w-full text-center">
              Log In
            </Link>
            <Link to="/register" className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-all duration-200 cursor-pointer w-full text-center">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
