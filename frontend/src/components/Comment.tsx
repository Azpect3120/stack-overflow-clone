import { useEffect, useState } from "react";
import "../assets/css/output.css";
import Voting from "./Voting";

import EditComment from "./EditComment"

interface CommentObject {
    author: String;
    content: String;
    date: Date;
    postID: String;
    _id: String;
}

interface Props {
    comment: CommentObject;
}

function Comment(props: Props): JSX.Element {
    const [isEditing, setIsEditing] = useState(false)
    const [voteCount, setVoteCount] = useState<number | null>(null); // Initialize voteCount stat

    const deleteComment = async () => {
        try {
            await fetch(
                `http://localhost:4000/comments/delete/${props.comment._id}`,
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

    const getVotes = async () => {
        try {
          const res = await fetch(`http://localhost:4000/votes/${props.comment._id}`, {
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
          getVotes()
      }, []);

    const addVote = async (isUpvote: boolean) => {
        try {
            let res = await fetch(`http://localhost:4000/votes/comment/${props.comment._id}`, {
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
        } catch (err) {
            console.error(err);
        }
        getVotes()

    };

    return (
        <div className="px-16 py-4 flex w-full">
            <Voting voteCount={voteCount || 0 } addVote={addVote} removeVote={addVote} />
            
            <div className="w-full">
                <div className="flex text-xs items-center justify-between">
                    <p className="text-light-theme-green py-2">
                        {" "}
                        {props.comment.author} (
                        {props.comment.date.toLocaleDateString()}){" "}
                    </p>

                    {isEditing ? ( // Conditional rendering based on isEditing state
                        <EditComment
                            commentData={props.comment}
                            postID={props.comment.postID}
                            commentID={props.comment._id}
                        />
                    ) : (
                        <div>
                            {props.comment ? (
                                JSON.parse(localStorage.getItem("user")) ? (
                                    props.comment.author ===
                                    JSON.parse(localStorage.getItem("user")).username ? (
                                        <div>
                                            <button
                                                onClick={() => setIsEditing(true)}
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
