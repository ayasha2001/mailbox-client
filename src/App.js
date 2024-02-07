import './App.css';
import LoginSignup from './components/auth/LoginSignup';
import {Outlet} from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store} >
      <Outlet/>
      </Provider>
      {/* <ComposeMail/> */}
    </div>
  );
}

export default App;
