import Nav from "../components/Nav";
import Footer from "../components/Footer";
<<<<<<< HEAD
import CommentSection from "../components/CommentSection";
=======
import CommentList from "../components/CommentList";
>>>>>>> f630539695d524a6851372a26856845eec02e636
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Post {
    title: string;
    content: string;
    author: string;
    date: Date;
    _id: string;
}

function PostPage(): JSX.Element {
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams();

    useEffect(() => {
        try {
            fetch(`http://localhost:4000/posts/get-post/${id}`)
                .then(res => res.json())
                .then(data => setPost(data.data as Post))

            console.log(post);

        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => console.log(post), [post])
    return (
        <div>
            <Nav />
            
            <div className="w-full flex justify-center">
                <div className="h-fit min-h-screen w-2/3 border-x border-light-border">
                    <h1 className="p-20 pb-10 text-4xl">
                        {post ? post.title : "Loading..."}         
                    </h1>
                    <p className="p-20 py-5 text-sm text-light-theme-green border-b border-light-border">
                        {post ? post.author : "Loading..."}
                    </p>

                    <p className="mx-20 my-10 text-lg whitespace-pre-line">
                        {post ? post.content : "Loading..."}
                    </p>

                    <CommentList />

                </div>
            </div>

            <CommentSection />

            <Footer />
        </div>
    )
}

export default PostPage;
