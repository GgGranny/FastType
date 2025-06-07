import React from "react";
import NavButton from "./NavButton";
import logo from "../../assets/logo2.png";
import Icons from "../../config/Icons";

function Navbar() {
    const handleOnClick = (title) => {
        if (title === "crown") {
            console.log("crown pressed");
        } else if (title === "settings") {
            console.log("setting pressed");
        } else if (title === "keyboard") {
            console.log("keyboard pressed");
        } else if (title === "profile") {
            console.log("profile pressed");
        } else if (title === "bell") {
            console.log("bell pressed");
        }
    }
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div>
                    <img className="h-25" src={logo} alt="" />
                </div>
                <div className="flex items-center gap-x-3">
                    {Icons.map((icon, index) => {
                        return (
                            (icon.name == "keyboard" || icon.name == "crown" || icon.name == "settings") && (
                                <NavButton key={index} className="text-white" onClick={() => handleOnClick(icon.name)} path={icon.path}>
                                    {<icon.icon />}
                                </NavButton>
                            )
                        )
                    })}

                </div>
            </div>
            <div className="flex justify-center items-center gap-x-3">
                {Icons.map((icon, index) => {
                    return ((icon.name == "profile" || icon.name == "bell") && (
                        <NavButton className="text-white" key={index} onClick={() => handleOnClick(icon.name)}>
                            {<icon.icon />}
                        </NavButton>
                    ))
                })}
            </div>
        </div>
    )
}

export default Navbar;