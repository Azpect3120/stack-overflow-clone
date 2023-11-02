import "../assets/css/output.css"
import { SyntheticEvent, useState } from "react"
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

interface FormData {
    title: string,
    content: string,
    author: string,
    date: Date,
    imageUrl: string
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
      imageUrl: "",
    });
  
    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
      event.preventDefault();
  
      setForm({ ...form, date: new Date() });
  
      try {
        await fetch("http://localhost:4000/posts/create-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form), // Send the FormData object
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
      setForm({ ...form, [name]: value });
      console.log(form);
    };
  
    const handleImageUpload = (event: any) => {
      const imageFile = event.target.files[0];
      console.log(imageFile);
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "BlogImages");

      fetch(`https://api.cloudinary.com/v1_1/dhh4hjypo/image/upload`, {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        const url = data.secure_url;
        setForm({...form, imageUrl: url});
      })
      .catch(err => console.error(err))
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

                    <input
                        type="file"
                        onChange={handleImageUpload}
                        onSubmit={handleInputChange}
                        accept="image/*" // Restrict file type to images
                        className="file:rounded-md file:bg-light-theme-green file:text-white file:outline-none file:border-0 file:p-1 file:px-2 file:mr-4 text-sm file:hover:bg-light-theme-green-active file:cursor-pointer"
                    />
                </div>
                <button type="submit" className="bg-light-theme-green text-white rounded-lg px-4 py-1.5 hover:bg-light-theme-green-active"> Create Post </button>
            </form>

            <Footer />
        </div>
    );
}

export default CreatePostPage;
