import React from "react";

interface ButtonType {
    children: React.ReactNode
    className?: string;
    onClick?: () => void
}


const Button: React.FC<ButtonType> = ({ children, onClick, className }) => {
  return (
    <button
      className={`bg-[#50a640] hover:bg-[#50bb3d] px-6 py-6 transition-colors duration-100 rounded-lg cursor-pointer ${className}`}
      onClick={onClick}
    >
     { children } 
    </button>
  );
};

export default Button;
