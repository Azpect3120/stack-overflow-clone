import "../assets/css/output.css"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

function PostForm (): JSX.Element {
    return (
        <div className="w-full h-fit bg-light-background">
            <Navbar />
        
            <div className="w-2/3 h-screen mx-auto">
                <h1 className="font-bold text-3xl px-20 py-10">
                    Create a Post
                </h1>

                <div className="h-fit w-full rounded-md p-6 bg-white border border-light-border">
                    <h1 className="text-lg py-2"> Title </h1>
                    <p className="text-xs"> Enter your posts title </p>
                    <input className="text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500" type="text" name="title" placeholder="eg. 10 Reasons Why Go is Better Than Rust." required />
                </div> 

                <div className="h-fit w-full my-5 rounded-md p-6 bg-white border border-light-border">
                    <h1 className="text-lg py-2"> Post Details </h1>
                    <p className="text-xs"> Enter your posts details here </p>
                    <textarea className="text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500" name="description" placeholder="eg. 10 Reasons Why Go is Better Than Rust." required />
                </div>



            </div>

            <Footer />
        </div>
    );
}

export default PostForm;