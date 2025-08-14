"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  props?: any;
  disabled?: boolean;
  classType?: string;
};

const index = ({
  classType,
  children,
  className,
  onClick,
  type,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        classType === "primary" && "border-none bg-primary text-white"
      } 
            ${
              classType === "secondary" &&
              "bg-green-700 text-white border border-transparent"
            } 
            ${classType === "tertiary" && "bg-white text-primary"} 
            hover:bg-opacity-90 rounded-[8px] transition-colors duration-200 ease-in-out 
            cursor-pointer
            ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default index;
