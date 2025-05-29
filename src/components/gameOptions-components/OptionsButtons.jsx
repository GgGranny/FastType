
function OptionsButtons({ children, onClick, isActive }) {
    const style = {
        color: isActive ? "white" : ""
    }
    return (
        <div>
            <button style={style} onClick={onClick} className="text-[#1c2321] font-normal hover:text-[#a9b4c2]">{children}</button>
        </div>
    )
}

export default OptionsButtons;