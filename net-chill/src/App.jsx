import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import ProtectedRoute from "./components/protectedRoute";
import BrowsePage from "./pages/browse/BrowsePage";
import Navbar from "./components/navbar/Navbar";
import MyAccountPage from "./pages/myAccount/MyAccountPage";
import "./App.css"

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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
    <div className="App">
      {user && <Navbar onSearch={handleSearch} />}
      <Routes>
        <Route index path="/" element={<LoginPage user={user} />} />
        <Route
          path="/browse"
          element={
            <ProtectedRoute user={user}>
              <BrowsePage searchTerm={searchTerm} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute user={user}>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
