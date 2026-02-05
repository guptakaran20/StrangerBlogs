import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative w-full text-slate-300 font-['Poppins'] overflow-hidden bg-slate-900 border-t border-slate-800">
      <div className="absolute inset-x-0 bottom-0 h-[380px] overflow-hidden pointer-events-none opacity-20">
        <svg
          className="absolute bottom-0 w-full h-full scale-x-[2] scale-y-[2] origin-bottom"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1600 900"
        >
          <defs>
            <path
              id="wave"
              d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
              s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859
              s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
            />
          </defs>

          <g>
            <use href="#wave" fill="rgba(59, 130, 246, 0.4)">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="8s"
                values="270 230; -334 180; 270 230"
                keyTimes="0; .5; 1"
                calcMode="spline"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" fill="rgba(59, 130, 246, 0.6)">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="6s"
                values="-270 230;243 220;-270 230"
                keyTimes="0; .6; 1"
                calcMode="spline"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              />
            </use>

            <use href="#wave" fill="rgba(59, 130, 246, 0.8)">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="4s"
                values="0 230;-140 200;0 230"
                keyTimes="0; .4; 1"
                calcMode="spline"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </div>

      {/* Footer Content */}
      <section className="relative z-10 flex flex-col items-center gap-8 pt-24 pb-16">
        {/* Social Icons */}
        <ul className="flex gap-8">
          <li>
            <a
              href="https://github.com/guptakaran20"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md group"
            >
              {/* Github Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/guptakaran0720"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md group"
            >
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/guptakaran0720"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md group"
            >
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </li>
        </ul>

        {/* Links */}
        <ul className="flex gap-8 text-base font-medium">
          <li>
            <Link to="/" className="cursor-pointer text-slate-400 hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="cursor-pointer text-slate-400 hover:text-blue-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="cursor-pointer text-slate-400 hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Legal */}
        <p className="text-xs text-slate-500">
          © 2025 All rights reserved
        </p>
      </section>
    </footer>
  );
}
