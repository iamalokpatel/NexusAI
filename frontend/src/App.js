import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Messages from "./pages/Messages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1>404 - Page Not Found</h1>
              <a href="/">Go back to Home</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
