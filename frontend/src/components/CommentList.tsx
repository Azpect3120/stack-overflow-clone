import "../assets/css/output.css"
import Comment from "./Comment";


function CommentList(): JSX.Element {
    return (
        <div className="border-t border-light-border py-4">
            <h1 className="text-3xl px-20 py-8 w-full">
                Responses
            </h1>
            <div className="w-full divide-y divide-light-border">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    );
}

export default CommentList;
