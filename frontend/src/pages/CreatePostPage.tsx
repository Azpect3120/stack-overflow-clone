import "../assets/css/output.css"
import { useState } from "react"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

interface FormData {
    title: string,
    content: string,
    author: string,
    date: Date | null
}

function CreatePostPage (): JSX.Element {
    let [form, setForm] = useState<FormData>({title: "", content: "", author: "", date: new Date() })

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        setForm({ ...form, date: new Date() })

        try {
            await fetch("http://localhost:4000/posts/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            window.location.href = "/posts";
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setForm({...form, [name]: value })
    };

    const textareaStyles: any = {
        height: "400px",
        resize: "none"
    };

    return (
        <div className="w-full h-fit bg-light-background">
            <Navbar user={{username: "Azpect", password: "root", id: "1"}}/>

            <form onSubmit={handleSubmit} className="w-2/3 mx-auto h-fit pb-12">
                <h1 className="font-bold text-3xl px-2 py-10">
                    Create a Post
                </h1>

                <div className="h-fit w-full rounded-md p-6 bg-white border border-light-border">
                    <h1 className="text-lg py-2"> Title </h1>
                    <p className="text-xs"> Enter your posts title </p>
                    <input onChange={handleInputChange} className="text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500" type="text" name="title" placeholder="eg. 10 Reasons Why Go is Better Than Rust." required />
                </div> 

                <div className="h-fit w-full my-5 rounded-md p-6 bg-white border border-light-border">
                    <h1 className="text-lg py-2"> Post Details </h1>
                    <p className="text-xs"> Enter your posts details here </p>
                    <textarea onChange={handleInputChange} style={textareaStyles} className="text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500 resize-none" name="content" placeholder="eg. 10 Reasons Why Go is Better Than Rust." required />
                </div>
                <button type="submit" className="bg-light-theme-green text-white rounded-lg px-4 py-1.5 hover:bg-light-theme-green-active"> Create Post </button>
            </form>

            <Footer />
        </div>
    );
}

export default CreatePostPage;
