import UserProvider from "./context/UserContext";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <UserProvider>
      <LoginPage />;
    </UserProvider>
  );
}

export default App;