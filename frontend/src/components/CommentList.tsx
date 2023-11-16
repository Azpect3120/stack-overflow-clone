import "../assets/css/output.css"
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { useEffect, useState } from "react";

interface CommentObject {
    author: String;
    content: String;
    votes: Array<{ author: string, vote: boolean, date: Date}>;
    voteCount: Number;
    date: Date;
    postID: string;
    _id: string;
}

interface Props {
    id: String;
}

function CommentList(props: Props): JSX.Element {
    const [comments, setComments] = useState<CommentObject[]>([]);

    useEffect(() => {
        if (props.id) {
            try {
                fetch(`http://localhost:4000/comments/${props.id}`)
                .then(res => res.json())
                .then(data => {
                    data.data.forEach((comment: CommentObject) => comment.date = new Date(comment.date));
                    setComments(data.data as CommentObject[]);
                })
            } catch (err) {
                console.error(err);
            }
        }
    }, [props]);

    return (
        <div className="border-t border-light-border py-4">
            <h1 className="text-3xl px-20 py-8 w-full">
                {comments.length} Responses
            </h1>
            <div className="w-full divide-y divide-light-border">
                {
                    comments.map((cmt: CommentObject) => (
                        <Comment comment={cmt} key={cmt._id}/>
                    ))
                }

            </div>
            <CreateComment postID={props.id}/>
        </div>
    );
}

export default CommentList;
