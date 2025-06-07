import Navbar from "./components/navbar-components/Navbar";
import Hero from "./components/hero-components/Hero";
import Navcomponent from "./components/gameOptions-components/Navcomponent";
import { Route, Routes } from "react-router-dom";
import ResultPage from "./components/result-component/ResultPage";

function App() {

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-3 gap-2">
        <div className="col-start-2 col-span-3 row-span-3">
          <div>
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </div >
    </>
  )
}

export default App
