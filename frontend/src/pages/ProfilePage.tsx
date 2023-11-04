import "../assets/css/output.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";

interface User {
    username: string;
    userAuthID: string;
    _id: string;
    email: string;
    admin: boolean;
    avatar: string;
}

interface Post {
    title: string;
    content: string;
    author: string;
    date: Date;
    _id: string;
}

function ProfilePage(): JSX.Element {
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    // Get user from mongo-db
    useEffect(() => {
        const username = params["username"];
        fetch(`http://localhost:4000/users/profile/${username}`)
            .then((res) => res.json())
            .then((data) => setUser(data.user as User))
            .catch((err) => console.error(err));

        fetch(`http://localhost:4000/posts/user/${username}`)
            .then((res) => res.json())
            .then((data) => {
                // Fix dates from stupid mongo date to JS date object
                const postsWithDates: Post[] = data.data.map((post: Post) => ({
                    ...post,
                    date: new Date(post.date)
                }));
                setPosts(postsWithDates as Post[]);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="h-screen">
            <Nav />
            <div className="w-full flex justify-center">
                <div className="h-fit min-h-screen w-2/3 border-x border-light-border">
                    <div className="w-full h-fit p-10 flex items-center">
                        <img
                            src={user ? user.avatar : "https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account-thumbnail.jpg"}
                            alt="User avatar"
                            className="w-36 h-36 shadow-gray-400 shadow-sm rounded-md"
                        />
                        <h1 className="text-2xl px-10">
                            {user ? user.username : "Loading"}
                            <br />
                            <span className="text-sm">
                                {user ? user.email : "Loading"}
                            </span>
                        </h1>
                    </div>

                    {/* Render the users posts */}
                    <div className="divide-y divide-light-border border-y border-light-border">
                        {posts.map((post) => (
                            <div className="w-full h-fit">
                                <div className="w-full flex justify-between items-center px-8 py-4">
                                    <Link
                                        to={"/posts/" + post._id}
                                        title="View post"
                                        className="text-xl text-light-theme-green hover:text-light-theme-green-active transition-all"
                                    >
                                        {post.title}
                                    </Link>
                                    <span className="text-xs px-1 font-light text-black">
                                        {post.date.toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm font-light px-8 pb-4 whitespace-nowrap overflow-x-hidden overflow-ellipsis">
                                    {post.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;
