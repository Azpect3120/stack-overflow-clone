import "../assets/css/output.css"

interface CommentObject {
    author: String;
    content: String;
    date: Date;
    postId: String;
}

interface Props {
    comment: CommentObject;
}

function Comment(props: Props): JSX.Element {
    return (
        <div className="px-24 py-4">
            <p className="text-light-theme-green text-xs py-2"> {props.comment.author} ({props.comment.date.toLocaleDateString()}) </p>
            <p className="text-md"> {props.comment.content} </p>
        </div>
    );
}

export default Comment;
