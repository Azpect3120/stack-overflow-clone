import { SyntheticEvent, useState } from "react";

interface CommentObject {
    author: string;
    content: string;
    date: Date;
}

interface Props {
    postID: string;
    commentData: CommentObject;
    commentID: string;
}

function CreateComment(props: Props): JSX.Element {
    const ls = localStorage.getItem("user");
    const author: string = ls ? JSON.parse(ls).username : "";

    const [comment, setComment] = useState<CommentObject>({
        author,
        content: props.commentData.content, // Use props.commentData.content as initial content
        date: new Date(),
    });

    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();

        if (localStorage.getItem("user") == null) {
            window.location.href = "/accounts/login";
            return;
        }

        setComment({ ...comment, date: new Date() });

        try {
            await fetch(`http://localhost:4000/comments/edit/${props.commentID}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment)
            })

            window.location.href = `/posts/${props.postID}`;
        } catch (err) {
            console.error(err);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setComment({ ...comment, date: new Date(), [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="w-3/4 mx-auto pb-6">
        <textarea
            onChange={handleInputChange}
            value={comment.content}
            className="h-24 text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500 resize-none"
            name="content"
            placeholder="eg. Your opinion is objectively bad"
            required
        />
        <button
            type="submit"
            className="bg-light-theme-green text-white rounded-lg px-2 py-1.5 hover:bg-light-theme-green-active"
        >
            Save Comment
        </button>
    </form>
    
    
    );
}

export default CreateComment;
