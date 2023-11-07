import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CommentList from "../components/CommentList";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Voting from "../components/Voting";
import LoginError from "../components/LoginError";

interface Post {
    title: string;
    content: string;
    author: string;
    date: Date;
    imageUrl: string;
    _id: string;
}

function PostPage(): JSX.Element {
    const [voteCount, setVoteCount] = useState<number | null>(null); // Initialize voteCount stat
    const [error, setError] = useState<string | null>(null);
    const [post, setPost] = useState<Post | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const { id } = useParams();

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve the user ID from localStorage and store it in state.
        const user = localStorage.getItem('user');
        if (user) {
            const userId = JSON.parse(user).id;
            setUserId(userId);
        }
    }, []);

    const getVotes = async () => {
        try {
            const res = await fetch(`http://localhost:4000/votes/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(`All ${data.data.length} votes successfully fetched `);
            setVoteCount(data.voteCount); // Update voteCount state with the fetched data
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:4000/posts/get-post/${id}`
                );
                // ! FIX THIS TO SEND NO POST TO CLIENT, PAGE WILL LOAD INDEFINITELY
                if (res.status === 404) {
                    throw new Error("No post found");
                }
                const data = await res.json();
                setPost(data.data as Post);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData(); // Call the async function inside the effect
        getVotes();
    }, []);

    const addVote = async (isUpvote: boolean) => {
        if (!localStorage.getItem("user")) {
            setError("You must be signed in to vote.");
            return;
        }
        try {
            let res = await fetch(`http://localhost:4000/votes/post/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: new Date(),
                    author: JSON.parse(localStorage.getItem("user")).username,
                    vote: isUpvote,
                }),
            });
            let data = await res.json();
            console.log(data.message);
        } catch (err) {
            console.error(err);
        }
        getVotes();
    };

    const deletePost = async () => {
        try {
            await fetch(`http://localhost:4000/posts/delete-post/${id}?userID=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            window.location.href = "/posts";
        } catch (err) {
            console.error(err);
        }
    };

    const editPost = async () => {
        try {
            await fetch(`http://localhost:4000/posts/edit-post/${id}?userID=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: "Content", title: "Title" })
            });

            setPost({...post, content: "Content", title: "Title" });

        } catch (err) {
            console.error(err);
        }

    };

    const renderDeleteButton = () => {
        if (post) {
            if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username === post.author) {
                return (
                    <button
                        onClick={deletePost}
                        className="text-red-600 transition-all hover:bg-red-200 text-sm px-2 py-1 my-1.5 rounded-lg"
                    >
                        Delete Post
                    </button>
                );
            } else {
                return "";
            }
        }
        return "";
    };

    const renderEditButton = () => {
        if (post) {
            if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username === post.author) {
                return (
                    <button
                        onClick={() => {setEditing(!editing)}}
                        className="text-green-600 transition-all hover:bg-green-200 text-sm px-2 py-1 rounded-lg"
                    >
                        Edit Post
                    </button>
                );
            } else {
                return "";
            }
        }
        return "";
    };

    return (
        <div>
            <Nav />
            <div className="w-full flex justify-center">
                <div className="h-fit min-h-screen w-2/3 border-x border-light-border">

                    <div className="w-full">
                        <div className="flex items-center">
                            {error && (
                                <LoginError
                                    styles={"mx-32"}
                                    message={error}
                                    onClose={() => setError(null)}
                                />
                            )}
                            <Voting
                                voteCount={voteCount || 0}
                                addVote={addVote}
                                removeVote={addVote}
                            />
                            <h1 className="p-20 px-10 text-4xl">
                                {post ? post.title : "Loading..."}
                            </h1>
                            <div className="w-fit px-5 ml-auto flex flex-col items-center justify-center">
                                {renderEditButton()}
                                {renderDeleteButton()}
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-b border-light-border">
                        <Link to={"/accounts/profile/" + post?.author} title={"View " + post?.author + "'s profile"} className="p-20 py-5 text-md text-light-theme-green">
                                {post ? post.author : "Loading..."}
                            </Link>
                        </div>
                    </div>

                    {
                        post ? 
                            post.imageUrl ? 
                                <img src={post.imageUrl} className="w-full p-10" />        
                            : ""
                        : ""
                    }

                    {
                        editing ? 
                            <textarea className="mx-20 my-10 text-lg whitespace-pre-line">
                                {post ? post.content : "Loading..."}
                            </textarea>
                        :
                        <p className="mx-20 my-10 text-lg whitespace-pre-line">
                            {post ? post.content : "Loading..."}
                        </p>
                    }
                    <CommentList id={post ? post._id : ""} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostPage;
