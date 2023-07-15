import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Home from './screens/Home';
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/Home/:id" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;