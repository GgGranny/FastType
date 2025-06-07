
import { IoSettingsSharp } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { MdKeyboardAlt } from "react-icons/md";
import { FaBell } from "react-icons/fa6";

const Icons = [
    {
        name: "keyboard",
        icon: MdKeyboardAlt,
        path: "/"
    },
    {
        name: "crown",
        icon: FaCrown,
        path: "/leaderboard"
    },
    {
        name: "settings",
        icon: IoSettingsSharp,
        path: "/settings"
    },
    {
        name: "bell",
        icon: FaBell,
        path: "/notification"
    }
]
export default Icons;