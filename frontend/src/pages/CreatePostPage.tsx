import "../assets/css/output.css"
import { SyntheticEvent, useState } from "react"
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import axios from "axios"

interface FormData1 {
    title: string,
    content: string,
    author: string,
    date: Date,
    imageUrl: File | null
}

function CreatePostPage(): JSX.Element {
    const ls = localStorage.getItem("user");
    const author: string = ls ? JSON.parse(ls).username : "";
  
    // Initialize the imageUrl file as null
    let [form, setForm] = useState<FormData1>({
      title: "",
      content: "",
      author,
      date: new Date(),
      imageUrl: null,
    });
  
    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
      event.preventDefault();
  
      setForm({ ...form, date: new Date() });
  
      try {
        // Create a FormData object to send both text data and imageUrl file
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("author", form.author);
        formData.append("date", form.date.toISOString());
  
        // Add the imageUrl file to the FormData if it's not null
        if (form.imageUrl) {
          formData.append("imageUrl", form.imageUrl);
        }
        console.log(formData);
  
        axios.post("http://localhost:4000/posts/create-post", {...formData.entries()}, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        })
        .then(response => {
          console.log(response)
        })
        
        // window.location.href = "/posts";
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
      console.log(imageFile)
      setForm({ ...form, imageUrl: imageFile });
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
                    <textarea onChange={handleInputChange} style={textareaStyles} className="text-sm w-full my-2 px-2 py-1 border border-light-border rounded-md outline-none focus:ring-1 focus:ring-green-500 resize-none" name="content" placeholder="eg. Right off the bat, there are clear differences between Go and Rust. Go has a stronger focus on building web APIs and small services that can scale endlessly, especially with the power of Goroutines. The latter is also possible with Rust, but things are much harder from a developer experience point of view..." required />
                </div>
                <input
                    name="image"
                    type="file"
                    onChange={handleImageUpload}
                    accept="imageUrl/*" // Restrict file type to images
                />
                <button type="submit" className="bg-light-theme-green text-white rounded-lg px-4 py-1.5 hover:bg-light-theme-green-active"> Create Post </button>
            </form>

            <Footer />
        </div>
    );
}

export default CreatePostPage;
