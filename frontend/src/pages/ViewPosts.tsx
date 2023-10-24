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
        const query: string = new URLSearchParams(window.location.search).get("search") ? new URLSearchParams(window.location.search).get("search") : "";
        try {
            // fetch(`http://localhost:4000/posts`)
            fetch(`http://localhost:4000/posts/search?query=${query}`)
            .then(res => res.json())
            .then(data => {
                data.data.forEach((post: Post) => post.date = new Date(post.date));
                // data.data = data.data.filter((post: Post) => post.content.toLowerCase().includes(query.toLowerCase()) || post.title.toLowerCase().includes(query.toLowerCase()) || post.author.toLowerCase().includes(query.toLowerCase()));
                setPosts(data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, [ window.location.href, window.location.search ]);

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
