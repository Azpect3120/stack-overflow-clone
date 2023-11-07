import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ViewPosts from "./pages/ViewPosts";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/accounts/create" element={<CreateAccountPage />} />
        <Route path="/accounts/profile/:username" element={<ProfilePage />} />
        <Route path="/posts" element={<ViewPosts />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/posts/create" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
