import './App.css';
import LoginSignup from './components/auth/LoginSignup';
import {Outlet} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
