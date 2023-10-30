import "../assets/css/output.css"
import { SyntheticEvent, useState } from "react"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

interface FormData {
    title: string,
    content: string,
    author: string,
    date: Date,
    image: File | null
}

function CreatePostPage(): JSX.Element {
    const ls = localStorage.getItem("user");
    const author: string = ls ? JSON.parse(ls).username : "";
  
    // Initialize the image file as null
    let [form, setForm] = useState<FormData>({
      title: "",
      content: "",
      author,
      date: new Date(),
      image: null,
    });
  
    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
      event.preventDefault();
  
      setForm({ ...form, date: new Date() });
  
      try {
        // Create a FormData object to send both text data and image file
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("author", form.author);
        formData.append("date", form.date.toISOString());
  
        // Add the image file to the FormData if it's not null
        if (form.image) {
          formData.append("image", form.image);
        }
  
        await fetch("http://localhost:4000/posts/create-post", {
          method: "POST",
          body: formData, // Send the FormData object
        });
        
        console.log(form);
        window.location.href = "/posts";
      } catch (err) {
        console.error(err);
      }
    };

    const textareaStyles: any = {
        height: "400px",
        resize: "none"
    };
  
    const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      setForm({ ...form, date: new Date(), [name]: value });
    };
  
    const handleImageUpload = (event: any) => {
      const imageFile = event.target.files[0];
      setForm({ ...form, image: imageFile });
    };

    return (
        <div className="w-full h-fit bg-light-background">
            <Navbar />

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
                <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*" // Restrict file type to images
                />
                <button type="submit" className="bg-light-theme-green text-white rounded-lg px-4 py-1.5 hover:bg-light-theme-green-active"> Create Post </button>
            </form>

            <Footer />
        </div>
    );
}

export default CreatePostPage;
