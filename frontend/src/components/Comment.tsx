import React, { useState } from "react";
import "../assets/css/output.css";

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

    return (
        <div className="px-24 py-4">
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
                            JSON.parse(localStorage.getItem("user")).username ? (
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
    );
}


export default Comment;
