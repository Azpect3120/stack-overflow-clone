import "../assets/css/output.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProfilePage(): JSX.Element {
    const params = useParams();
    const [user, setUser] = useState(null);


    useEffect(() => {

        const username = params["username"];
        fetch(`http://localhost:4000/users/profile/${username}`)
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(err => console.error(err));


    }, [])


    return (
        <div className="h-screen">
            <Nav />
                <div className="w-full flex justify-center">
                    <div className="h-fit min-h-screen w-2/3 border-x border-light-border">
                        <h1>
                            {JSON.stringify(user)}
                        </h1>
                    </div>
                </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;
