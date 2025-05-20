import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
function App() {

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-2">
        <div className="col-start-2 col-span-3 row-span-3">
          <div>
            <Navbar />
          </div>
          <div>
            <Hero />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
