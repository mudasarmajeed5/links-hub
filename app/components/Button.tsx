import clsx from "clsx";
import { Marker } from "./Marker";
import React from "react";
import Image from "next/image";
// Define the prop types for the Button component
interface ButtonProps {
  icon?: string; // Optional string for the icon URL
  children: React.ReactNode; // Children can be text or other React components
  href?: string; // Optional href for anchor tag
  containerClassName?: string; // Optional className for container
  onClick?: () => void; // Optional onClick handler for button
  fill?: string | undefined; // Optional fill color for the Marker component
}

const Button = ({
  icon,
  children,
  href,
  containerClassName,
  onClick,
  fill,
}: ButtonProps) => {
  const Inner = () => (
    <>
      <span className="relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden">
        <span className="absolute -left-[1px]">
          <Marker fill={fill} />
        </span>

        {icon && (
          <Image
          src={icon}
          alt="circle"
          width={40}
          height={40}
          className="mr-5 object-contain z-10"
        />
        )}

        <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
          {children}
        </span>
      </span>

      <span className="glow-before glow-after" />
    </>
  );

  return href ? (
    <a
      className={clsx(
        "relative p-0.5 g5 rounded-2xl shadow-500 group",
        containerClassName
      )}
      href={href}
    >
      <Inner />
    </a>
  ) : (
    <button
      className={clsx(
        "relative p-0.5 g5 rounded-2xl shadow-500 group",
        containerClassName
      )}
      onClick={onClick}
    >
      <Inner />
    </button>
  );
};

export default Button;
