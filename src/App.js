import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import PeopleForm from "./components/PeopleForm";
import PeopleList from "./components/PeopleList";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/form" element={<PeopleForm />} />
        <Route path="/list" element={<PeopleList />} />
      </Routes>
    </Router>
  );
}

export default App;
