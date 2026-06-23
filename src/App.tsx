import { useEffect } from "react";
import { NavLink } from "react-router";
import { fetchHelloWorld } from "./Api/HelloWorld/helloWorld.api";

const path = "</>";

function App() {

  async function fetchData() {
    try {
      const result = await fetchHelloWorld();
      console.log(result);
    } catch (error) {
      console.error("Error fetching Hello World:", error);
    }
  }
  
  useEffect( () => {
    fetchData();
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <nav className="flex justify-around items-center p-3">
        <NavLink to="/" className="text-lg font-bold hover:text-green-500">
          {path}
        </NavLink>
        <NavLink to="/login" className="text-lg font-bold hover:text-green-500">
          Login || Register
        </NavLink>
      </nav>
      <section className="p-4 flex flex-col">
        <section className="p-4 rounded-lg mb-6">
          <p className="text-lg text-gray-600">Welcome to</p>
          <h1 className="text-4xl font-bold text-green-500">Jessy Security</h1>
        </section>

        <section className="p-4 rounded-lg mb-6 flex items-center justify-center">
          <div className="bg-gray-100 rounded-lg text-center p-6">
            <p className="text-black">Your trusted security solution</p>
            <p className="text-gray-500">Protecting your digital world with confidence</p>
          </div>
        </section>
      </section>
      <footer className="p-4 text-center text-gray-500">
        <p>@RivasJF</p>
      </footer>
    </div>
  );
}

export default App;
