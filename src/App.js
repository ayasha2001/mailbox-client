import './App.css';
import LoginSignup from './components/auth/LoginSignup';
import {Outlet} from "react-router-dom"
import ComposeMail from './components/mail/ComposeMail';

function App() {
  return (
    <div className="App">
      <Outlet/>
      {/* <ComposeMail/> */}
    </div>
  );
}

export default App;
