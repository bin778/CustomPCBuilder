import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Login from "./view/Login.jsx";
import Main from "./view/Main.jsx";
import SignUp from "./view/SignUp.jsx";
import Quote from "./view/Quote.jsx";
import AccountDelete from "./view/AccountDelete.jsx";
import Keyword from "./view/Keyword.jsx";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/"></Link>
        <Link to="/main"></Link>
        <Link to="/sign_up"></Link>
        <link to="/quote"></link>
        <link to="/account_delete"></link>
        <link to="/keyword"></link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/account_delete" element={<AccountDelete />} />
          <Route path="/keyword" element={<Keyword />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
