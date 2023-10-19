import "../assets/css/output.css"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

function ViewPosts(): JSX.Element {
    return (
        <div>
            <Navbar />
            <PostList />
            <Footer />
        </div>
    );
}

export default ViewPosts;
