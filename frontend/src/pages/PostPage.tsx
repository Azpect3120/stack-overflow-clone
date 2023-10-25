import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CommentList from "../components/CommentList";
import upvoteIcon from "../assets/images/upvote.svg";
import downvoteIcon from "../assets/images/downvote.svg";
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

    useEffect(async () => {
        try {
            const res = await fetch(`http://localhost:4000/posts/get-post/${id}`);
            const data = await res.json();
            setPost(data.data as Post);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const deletePost = async () => {
        try {
            await fetch(`http://localhost:4000/posts/delete-post/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            window.location.href = "/posts";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Nav />
            
            <div className="w-full flex justify-center">
                <div className="h-fit min-h-screen w-2/3 border-x border-light-border">
                    <div className="flex items-center justify-between">
                        <h1 className="p-20 pb-10 text-4xl">
                            {post ? post.title : "Loading..."}         
                        </h1>

                        {
                            (post) ? 
                                (JSON.parse(localStorage.getItem("user")) ? 
                                    (post.author == JSON.parse(localStorage.getItem("user")) ?
                                        <button onClick={deletePost} className="m-20 mb-10 text-red-600 transition-all hover:bg-red-200 px-3 py-1.5 rounded-lg">
                                            Delete Post
                                        </button>
                                        : null)
                                    : null)
                            : "Loading..."
                        }

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-auto flex flex-col justify-between items-center px-8 py-4">
                            <button className="btn w-1/3 rounded-full">
                                <img src={upvoteIcon} alt="Upvote Logo" />
                            </button>
                            <p className="">
                                doest this work
                            </p>
                            <button className="btn w-1/3 rounded-full container">
                                <img src={downvoteIcon} alt="Downvote Logo" />
                            </button>
                        </div>
                        <p className="p-20 py-5 text-sm text-light-theme-green border-b border-light-border">
                            {post ? post.author : "Loading..."}
                        </p>
                    </div>
                    <p className="mx-20 my-10 text-lg whitespace-pre-line">
                        {post ? post.content : "Loading..."}
                    </p>

                    <CommentList id={post ? post._id : ""}/>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PostPage;
