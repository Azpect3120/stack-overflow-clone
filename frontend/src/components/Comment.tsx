import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "../assets/css/output.css";
import Voting from "./Voting";
import LoginError from "./LoginError";

import EditComment from "./EditComment"

interface CommentObject {
    author: String;
    content: String;
    date: Date;
    voteCount: Number;
    postID: String;
    _id: String;
}

interface Props {
    comment: CommentObject;
}

function Comment(props: Props): JSX.Element {
    const [isEditing, setIsEditing] = useState(false)
    const [voteCount, setVoteCount] = useState<Number | null>(props.comment.voteCount); // Initialize voteCount stat
    const [error, setError] = useState<String | null>(null);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve the user ID from localStorage and store it in state.
        const user = localStorage.getItem('user');
        if (user) {
            const userId = JSON.parse(user).id;
            setUserId(userId);
        }
    }, []);

    const deleteComment = async () => {
        try {
            await fetch(
                `http://localhost:4000/comments/delete/${props.comment._id}?userID=${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.href = window.location.href;
        } catch (err) {
            console.error(err);
        }
    };

    const addVote = async (isUpvote: boolean) => {
        if (!userId) {
            setError("You must be logged in to vote.");
            return;
        }
        try {
            let res = await fetch(`http://localhost:4000/votes/comment/${props.comment._id}?userID=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: new Date(),
                    author: (JSON.parse(localStorage.getItem("user") || "" ).username || "Unknown"),
                    vote: isUpvote,
                })
            });
            let data = await res.json()
            console.log(data.message)
            setVoteCount(data.voteCount)
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };
    

    return (
        <div className="px-16 py-4 flex w-full items-center justify-center">
            {error && (
                <LoginError
                    styles={""}
                    message={error}
                    onClose={() => setError(null)}
                />
            )}
            <Voting voteCount={voteCount || 0 } addVote={addVote} removeVote={addVote} />
            
            <div className="w-full">
                <div className="flex text-xs items-center justify-between">
                    <Link to={"/accounts/profile/" + props.comment.author} title={"View " + props.comment.author + "'s profile"}  className="text-light-theme-green py-2">
                        {" "}{props.comment.author} ({props.comment.date.toLocaleDateString()}){" "}
                    </Link>
                    {isEditing ? ( // Conditional rendering based on isEditing state
                        <EditComment
                            commentData={props.comment}
                            postID={props.comment.postID}
                            commentID={props.comment._id}
                            userId={userId}
                            onCancel={handleCancelEdit}
                        />
                    ) : (
                        <div>
                            {props.comment ? (
                                JSON.parse(localStorage.getItem("user") || "") ? (
                                    props.comment.author ===
                                    JSON.parse(localStorage.getItem("user") || "{username:''").username ? (
                                        <div>
                                            <button
                                                onClick={handleEditClick}
                                                className="text-green-600 transition-all hover:bg-green-200 px-2 py-1 rounded-lg mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={deleteComment}
                                                className="text-red-600 transition-all hover:bg-red-200 px-2 py-1 rounded-lg ml-2"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : null
                                ) : null
                            ) : (
                                "Loading..."
                            )}
                        </div>
                    )}
                </div>
                {isEditing ? "" : <p className="text-md"> {props.comment.content} </p> }
            </div>
        </div>
    );
}


export default Comment;
