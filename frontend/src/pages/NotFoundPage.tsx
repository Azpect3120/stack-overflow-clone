import "../assets/css/main.css"
import Navbar from "../components/Nav";

function NotFoundPage (): JSX.Element {
    return (
        <div className="h-screen">
            <Navbar />
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
                <div className="divide-x-2 divide-black flex text-2xl py-4">
                    <h1 className="px-5"> 404 </h1>
                    <h1 className="px-5"> Page could not found!</h1>
                </div>
                <p className="text-sm w-fit text-center">
                    The page or resource you have requested could not be located. <br /> If you think this is an issue you may contact an admin.
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
