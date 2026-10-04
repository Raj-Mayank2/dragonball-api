import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import CharacterDetails from "./pages/CharacterDetails";
import GraphQL from "./pages/GraphQL";
import Home from "./pages/Home";
import Sagas from "./pages/Sagas";
import SagaDetails from "./pages/SagaDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ApiDocs from "./pages/ApiDocs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/signup"
  element={<Signup />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
        <Route
          path="/characters/:id"
          element={<CharacterDetails />}
        />
<Route
  path="/docs"
  element={<ApiDocs />}
/>
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/graphql"
          element={<GraphQL />}
        />

        <Route
  path="/sagas"
  element={<Sagas />}
/>

<Route
  path="/sagas/:id"
  element={<SagaDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;