import Navbar from "./components/navbar-components/Navbar";
import Hero from "./components/hero-components/Hero";
import Navcomponent from "./components/gameOptions-components/Navcomponent";
import { useContext } from "react";
import { TestContext } from "./components/context/TestContextAPI";
function App() {

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-2">
        <div className="col-start-2 col-span-3 row-span-3">
          <div>
            <Navbar />
          </div>
          <div className="my-5">
            <Navcomponent />
          </div>
          <div>
            <Hero />
          </div>
        </div>
      </div >
    </>
  )
}

export default App
