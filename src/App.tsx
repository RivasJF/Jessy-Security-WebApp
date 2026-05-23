import { NavLink } from "react-router";
import './App.css';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/window">Go to Panel</NavLink>
      </nav>
      <section>
        <h1>Just Do it!!</h1>
      </section>
    </>
  );
}

export default App;
