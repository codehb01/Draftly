import React from "react";
import { assets } from "../assets/assets";
import { footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 text-gray-500">
      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-500/30">
        {/* Logo + Description */}
        <div className="max-w-lg">
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            veritatis facere beatae esse soluta nobis ipsa, cupiditate eius
            quibusdam nam nesciunt at est iure quam similique laudantium quas
            maiores perspiciatis.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-1/2">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-3 md:mb-5">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="py-4 text-center text-sm md:text-base">
        &copy; 2025 Draftly. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
