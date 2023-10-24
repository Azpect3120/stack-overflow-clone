import { SyntheticEvent, useState } from "react";

interface CommentObject {
    author: String;
    content: String;
    date: Date;
}

interface Props {
    postID: String;
}

function createComment (props: Props): JSX.Element {
    const ls = localStorage.getItem("user");
    const author: string = ls ? JSON.parse(ls).username : "";

    let [comment, setComment] = useState<CommentObject>({author, content: "", date: new Date() });

    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        
        if (localStorage.getItem("user") == null) {
            window.location.href = "/accounts/login"; 
            return;
        }

        setComment({ ...comment, date: new Date() });

        try {
            await fetch(`http://localhost:4000/comments/create/${props.postID}`, {
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

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setComment({ ...comment, date: new Date(), [name]: value })
    };

    const textareaStyles: any = {
        height: "400px",
        resize: "none"
    }

    return (

            <form onSubmit={handleSubmit} className="w-3/4 mx-auto h-fit pb-12">
                <h1 className="font-bold text-3xl px-2 py-10">
                   Post a Comment
                </h1>

                <div className="h-fit w-full my-5 rounded-md p-6 bg-white border border-light-border">
                    <h1 className="text-lg py-2"> Post Comment </h1>
                    <p className="text-xs"> Write comment here: </p>
                    <textarea onChange={handleInputChange} style={textareaStyles} className="text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500 resize-none" name="content" placeholder="eg. You're opinion is objectively bad" required />
                </div>
                <button type="submit" className="bg-light-theme-green text-white rounded-lg px-4 py-1.5 hover:bg-light-theme-green-active"> Create Comment </button>
            </form>
    )
}

export default createComment;
