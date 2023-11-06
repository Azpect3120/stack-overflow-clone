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
    const [isSelf, setSelf] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>("");

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve the user ID from localStorage
                const user = localStorage.getItem('user');
                if (user) {
                    const userId = JSON.parse(user).id;
                    setUserId(userId);
                }
                // Get user from mongo-db
                const username = params["username"];
                const userResponse = await fetch(`http://localhost:4000/users/profile/${username}?userID=${userId}`);
                const userData = await userResponse.json();
                setUser(userData.user as User);

                // Get users' posts from mongo-db
                const postsResponse = await fetch(`http://localhost:4000/posts/user/${username}`);
                const postData = await postsResponse.json();

                // Fix dates from MongoDB date to JS date object
                const postsWithDates: Post[] = postData.data.map((post: Post) => ({
                ...post,
                date: new Date(post.date),
                }));
                setPosts(postsWithDates as Post[]);
            } catch (err) {
            console.error(err);
            }
        };

        fetchData();
    }, [params]);

    // Update the users avatar display every time the user object is updated
    useEffect(() => setAvatar(user ? user.avatar : ""), [user]);

    // Determine if the user is viewing their own profile
    useEffect(() => {
        const loggedUser: { username: string; id: string } =
            JSON.parse(localStorage.getItem("user") || "{}") || null;
        loggedUser
            ? setSelf(loggedUser.username === user?.username)
            : setSelf(false);
    }, [posts, user]);

    const updateAvatar = async (event: any) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "Avatars");

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dhh4hjypo/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        // Ensure success
        if (response.status === 200) {
            const url = data.secure_url;
            const username = user?.username;

            setAvatar(url);

            // Update avatar in the backend mongo-db
            fetch(`http://localhost:4000/users/update-avatar?userID=${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, url }),
            });
        } else {
            console.error("Image response or user does not exist.");
        }
    };

    return (
        <div className="h-screen">
            <Nav />
            <div className="w-full flex justify-center">
                <div className="h-fit min-h-screen w-2/3 border-x border-light-border">
                    {/* Render the users profile information */}
                    <div className="w-full h-fit p-10 flex items-center">
                        <div className="flex flex-col w-1/6">
                            <img
                                src={
                                    user?.avatar
                                        ? avatar
                                        : "https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account-thumbnail.jpg"
                                }
                                alt="User avatar"
                                className="w-40 h-40 shadow-gray-400 shadow-sm rounded-md"
                            />
                            {isSelf ? (
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="text-xs py-3"
                                    onChange={updateAvatar}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        <h1 className="text-2xl px-10">
                            {user ? user.username : "Loading"}
                            <span className="text-xs">
                                <br />
                                {isSelf
                                    ? user
                                        ? ` #${user._id}`
                                        : " #Loading"
                                    : ""}
                            </span>
                            <br />
                            <span className="text-sm">
                                {isSelf ? (user ? user.email : "Loading") : ""}
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
