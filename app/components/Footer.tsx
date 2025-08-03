"use client";
import { useTheme } from "next-themes";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdArrowForward } from "react-icons/md";

export const Footer = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <footer
      className={`py-8 px-4 md:px-6 lg:px-8 border-t ${
        isDark ? "bg-[#0C1838] border-[#263466]" : "bg-white border-gray-200"
      }`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-black"}`}>
              Links Hub
            </h3>
            <p className={`text-sm ${isDark ? "text-[#C4CBF5]" : "text-gray-600"}`}>
              The ultimate platform for creating your personalized link page. Connect all your
              online profiles in one place.
            </p>
          </div>

          <div>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-black"}`}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Features", "Pricing", "Contact"].map((label, i) => (
                <li key={i}>
                  <Link
                    href={`/${label.toLowerCase()}`}
                    className={`transition-colors ${
                      isDark
                        ? "text-[#C4CBF5] hover:text-[#2EF2FF]"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-black"}`}>
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {["Terms", "About", "Cookies"].map((label, i) => (
                <li key={i}>
                  <Link
                    href={`/${label.toLowerCase()}`}
                    className={`transition-colors ${
                      isDark
                        ? "text-[#C4CBF5] hover:text-[#2EF2FF]"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {label === "Cookies" ? "Cookie Policy" : label + " of Service"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-black"}`}>
              Newsletter
            </h3>
            <p className={`text-sm mb-2 ${isDark ? "text-[#C4CBF5]" : "text-gray-600"}`}>
              Subscribe to get updates on new features and announcements.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className={`border-0 placeholder:text-opacity-50 ${
                  isDark
                    ? "bg-[#263466] text-white placeholder:text-[#C4CBF5]"
                    : "bg-gray-100 text-black placeholder:text-gray-500"
                }`}
              />
              <Button
                className={`${isDark ? "bg-[#3C52D9] hover:bg-[#1959AD]" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                <MdArrowForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 pt-8 flex flex-col md:flex-row justify-between items-center border-t ${
            isDark ? "border-[#263466]" : "border-gray-200"
          }`}
        >
          <p className={`text-sm ${isDark ? "text-[#C4CBF5]" : "text-gray-600"}`}>
            © {new Date().getFullYear()} Links Hub. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                href="#"
                key={i}
                className={`transition-colors ${
                  isDark ? "text-[#C4CBF5] hover:text-[#2EF2FF]" : "text-gray-700 hover:text-blue-500"
                }`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
