import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter } from "react-router";
function App() {
  const [count, setCount] = useState(0);

  return <LoginPage />;
}

export default App;
