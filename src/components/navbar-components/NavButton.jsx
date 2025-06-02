import React from "react";

export default function NavButton({ children, onClick, className = "" }) {
    return (
        <div className={`hover:text-[#e0fbfc] transition-all ${className}`} onClick={onClick}>
            {children}
        </div>
    )

}