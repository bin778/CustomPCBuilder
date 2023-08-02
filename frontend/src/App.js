import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Main from "./view/Main.jsx";
import Login from "./view/Login.jsx";
import SignUp from "./view/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/"></Link>
        <Link to="/login"></Link>
        <Link to="/sign_up"></Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
