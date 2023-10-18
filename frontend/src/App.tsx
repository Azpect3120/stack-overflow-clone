import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostForm from "./pages/PostForm";
import CreateAccountPage from "./pages/CreateAccountPage";
import ViewPosts from "./pages/ViewPosts";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/accounts/create" element={<CreateAccountPage />} />
        <Route path="/posts" element={<ViewPosts />} />
        <Route path="/posts/create" element={<PostForm />} />
      </Routes>
    </Router>
  )
}

export default App;
