import { NavLink } from "react-router-dom"

export default function NavButton({ children, onClick, className = "", path }) {
    return (
        <div className={`hover:text-[#e0fbfc] transition-all ${className}`} onClick={onClick}>
            <NavLink to={path}>{children}</NavLink>
        </div>
    )

}