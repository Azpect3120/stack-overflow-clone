import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import PostForm from "./pages/PostForm";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/create" element={<PostForm />} />
      </Routes>
    </Router>
  )
}

export default App;
