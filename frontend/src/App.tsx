import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import PostForm from "./pages/PostForm";
import CreateAccountPage from "./pages/CreateAccountPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/createAccount" element={<CreateAccountPage />} />
      </Routes>
    </Router>
  )
}

export default App;
