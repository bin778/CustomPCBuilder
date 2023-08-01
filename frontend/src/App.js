import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Main from "./view/Main.jsx";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/"></Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
