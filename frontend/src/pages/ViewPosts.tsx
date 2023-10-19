import "../assets/css/output.css"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import PostList from "../components/PostList";
import { useState, useEffect } from "react";

interface Post {
    title: string;
    content: string;
    author: string;
    date: Date;
    _id: string;
}

function ViewPosts(): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        try {
            fetch("http://localhost:4000/posts/posts")
            .then(res => res.json())
            .then(data => {
                data.data.forEach((post: Post) => post.date = new Date(post.date));
                setPosts(data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div>
            <Navbar />

            <div className="w-full flex justify-center">
                <PostList posts={posts} />
            </div>

            <Footer />
        </div>
    );
}

export default ViewPosts;
