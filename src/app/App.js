import "../app/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../navbar/navbar.js";
import Signin from "../login/signin.js";
import Signup from "../login/signup.js";
import Function from "../function/function.js";
import Home from "../home/home.js";
import Ranking from "../ranking/ranking.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* 로그인이랑 회원가입 */}
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        {/* 기능 */}
        <Route path="/function" element={<Function />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
