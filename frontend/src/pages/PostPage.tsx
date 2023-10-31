import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CommentList from "../components/CommentList";
import UpvoteIcon from "../components/UpvoteIcon";
import DownvoteIcon from "../components/DownvoteIcon";
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
    const [voteCount, setVoteCount] = useState<number | null>(null); // Initialize voteCount stat
    const { id } = useParams();

    const getVotes = async () => {
        try {
          const res = await fetch(`http://localhost:4000/votes/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log(`All ${data.data.length} votes successfully fetched `)
          setVoteCount(data.voteCount); // Update voteCount state with the fetched data
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        console.log(UpvoteIcon)
        // setVoteCount("Loading...")
        const fetchData = async () => {
          try {
            const res = await fetch(`http://localhost:4000/posts/get-post/${id}`);
            const data = await res.json();
            setPost(data.data as Post);
          } catch (err) {
            console.error(err);
          }
        };
        fetchData(); // Call the async function inside the effect
        getVotes()
    }, []);

    const addVote = async (isUpvote: boolean) => {
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
                })
            });
            let data = await res.json()
            console.log(data.message)
        } catch (err) {
            console.error(err);
        }
        getVotes()

    };

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

    const renderDeleteButton = () => {
        if (post) {
            if (typeof JSON.parse(localStorage.getItem("user") || "").username === "string" && (post.author == JSON.parse(localStorage.getItem("user") || "").username)) {
                return (
                    <button onClick={deletePost} className="m-20 mb-10 text-red-600 transition-all hover:bg-red-200 px-3 py-1.5 rounded-lg">
                        Delete Post
                    </button>
                );
            } else {
                return "";
            }
        } 
        return "";
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


                            {JSON.parse(localStorage.getItem("user") || "").username === "string" && renderDeleteButton()}

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-auto flex flex-col justify-between items-center px-8 py-4">
                        <button className="btn w-1/3 rounded-full" onClick={() => addVote(true)}>
                            {/* <img src={UpvoteIcon} alt="Upvote Logo" /> */}
                            {UpvoteIcon()}
                        </button>
                        <b className="">
                            {voteCount}
                        </b>
                        <button className="btn w-1/3 rounded-full" onClick={() => addVote(false)}>
                            {/* <img src={downvoteIcon} alt="Downvote Logo" /> */}
                            {DownvoteIcon()}
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
