import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import "./App.css";
import Home from "./pages/homepage/home";
import Header from "./components/header/header";
import ProtectedRoute from "./components/protectedRoute";
import Movies from "./pages/movies/movies";

function AppWithHeader() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route index path="/" element={<Home user={user} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute user={user}>
              <Movies />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWithHeader />
    </BrowserRouter>
  );
}

export default App;
