"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Rss } from "lucide-react";
import Link from "next/link";
import ThemeBtn from '../../components/ToggleThemeButton';

type NavLinkProps = {
  title: string;
  className?: string;
};

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NavLink = ({ title }: NavLinkProps) => (
    <Link
      href={`#${title}`}
      onClick={() => setIsOpen(false)}
      className="base-bold text-black dark:text-white uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
    >
      {title}
    </Link>
  );

  return (
      <header
        className={clsx(
          "fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4",
          hasScrolled && "py-2 bg-white dark:bg-black"
        )}
      >
        <div className="container justify-between bg-transparent flex  h-14 items-center max-lg:px-5">
          <Link href="/" className="hidden max-lg:flex items-center gap-2">
            <Rss className="text-3xl text-white dark:text-black" />
            <span className="text-xl text-white dark:text-black font-bold uppercase">Links Hub</span>
          </Link>

          <button
            className="lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
            onClick={() => setIsOpen(prev => !prev)}
          >
            <img
              src={`/images/${isOpen ? "close" : "magic"}.svg`}
              alt="magic"
              className="size-1/2 animate-pulse object-contain"
            />
          </button>

          <div
            className={clsx(
              "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full bg-black dark:bg-black max-lg:opacity-0",
              isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
            )}
          >
            <div className="max-lg:relative dark:bg-black text-black dark:text-white bg-white max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
              <nav className="max-lg:relative max-lg:z-2 text-black dark:text-white max-lg:my-auto">
                <ul className="flex text-2xl max-lg:block max-lg:px-12">
                  <li className="nav-li">
                    <Link
                      className="base-bold  uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                    <div className="dot  " />
                    <NavLink title="pricing" />
                  </li>

                  <li className="nav-logo">
                    <Link
                      href="/"
                      className={clsx(
                        "max-lg:hidden flex gap-2 text-xl font-bold uppercase transition-transform duration-500 cursor-pointer"
                      )}
                    >
                      <Rss className="text-3xl " />
                      <span className="">Links Hub</span>
                    </Link>
                  </li>

                  <li className="nav-li text-[16px] ">
                    <NavLink className='text-white dark:text-black' title="faq" />
                    <div className="dot" />
                    <Link
                      href={"/login"}
                      className="flex text-black dark:text-white font-bold gap-2 items-center"
                    >
                      Login
                    </Link>
                              <ThemeBtn />
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        </div>
      </header>
  );
};

export default Navbar;
