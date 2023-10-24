import "../assets/css/output.css"

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
    const deleteComment = () => {
        try {
            fetch(`http://localhost:4000/comments/delete/${props.comment._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            window.location.href = window.location.href;
        } catch (err) {
            console.error(err);
        }

    };
    return (
        <div className="px-24 py-4">
            <div className="flex text-xs items-center justify-between">
                <p className="text-light-theme-green py-2"> {props.comment.author} ({props.comment.date.toLocaleDateString()}) </p>
                { (props.comment.author === JSON.parse(localStorage.getItem("user")).username) ? 
                    <button onClick={deleteComment} className="text-red-600 transition-all hover:bg-red-200 px-2 py-1 rounded-lg"> Delete </button>
                    : ""
                }
            </div>
            <p className="text-md"> {props.comment.content} </p>
        </div>
    );
}

export default Comment;
