import { NavLink } from "react-router";


function App() {
  return (
    <>
      <nav className="flex justify-around items-center p-3">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/window">Go to Panel</NavLink>
      </nav>
      <section className="p-4 flex justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold text-blue-500">Just Do it!!</h1>
      </section>
    </>
  );
}

export default App;
