import "../assets/css/output.css"
import Comment from "./Comment";
import CreateComment from "./CreateComment";

interface CommentObject {
    author: String;
    content: String;
    date: Date;
    postId: String;
}

function CommentList(): JSX.Element {
    const commentData: CommentObject = { author: "Azpect", content: "Hello world", date: new Date(), postId: "98ruin2n8iubhuhb" };
    return (
        <div className="border-t border-light-border py-4">
            <h1 className="text-3xl px-20 py-8 w-full">
                12 Responses
            </h1>
            <div className="w-full divide-y divide-light-border">
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
                <Comment comment={commentData} />
            </div>
            <CreateComment />
        </div>
    );
}

export default CommentList;
