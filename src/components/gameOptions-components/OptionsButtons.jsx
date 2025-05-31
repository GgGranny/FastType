
function OptionsButtons({ children, onClick, isActive }) {
    const style = {
        color: isActive ? "white" : ""
    }
    return (
        <div>
            <button style={style} onClick={onClick} className="text-[#1c2321] font-normal hover:text-[#eef1ef]">{children}</button>
        </div>
    )
}

export default OptionsButtons;