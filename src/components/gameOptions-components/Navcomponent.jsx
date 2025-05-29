import OptionsButtons from "./OptionsButtons";

function Navcomponent() {
    function handleTime() {
        console.log("this is clicked");
    }
    function handleWord() {

    }
    return (
        <div>
            <div className="flex justify-center items-center gap-x-3 py-1 bg-[#7d98a1] rounded">
                <OptionsButtons onClick={handleTime} isActive={false} >time</OptionsButtons>
                <OptionsButtons onClick={handleWord} isActive={true}>words</OptionsButtons>
            </div>
        </div>
    )
}

export default Navcomponent;