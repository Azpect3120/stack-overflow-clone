import "../assets/css/output.css"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import PostList from "../components/PostList";

function ViewPosts(): JSX.Element {
    return (
        <div>
            <Navbar />

            <div className="w-full flex justify-center">
                <PostList />
            </div>

            <Footer />
        </div>
    );
}

export default ViewPosts;
