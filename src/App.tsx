// App.tsx
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import AppRoutes from "./AppRoutes";

function App() {
  const { token, fetchUser } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser(); // Fetch user on app load if token exists
    }
  }, [token]);

  return <AppRoutes />;
}

export default App;
