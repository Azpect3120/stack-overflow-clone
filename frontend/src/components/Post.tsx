import "../assets/css/output.css";
import { Link } from "react-router-dom";

interface Props {
    id: string;
    author: string;
    title: string;
    content: string;
    date: Date;
    imageUrl: string;
}

function Post(props: Props): JSX.Element {
    return (
        <div className="w-full h-fit">
            <div className="w-full flex justify-between items-center px-8 py-4">
                <Link
                    to={"/posts/" + props.id}
                    title="View post"
                    className="text-xl text-light-theme-green hover:text-light-theme-green-active transition-all overflow-x-hidden overflow-ellipsis whitespace-nowrap"
                >
                    {props.title}
                </Link>
                <p className="text-sm text-light-theme-green">
                    <Link to={"/accounts/profile/" + props.author} title={"View " + props.author + "'s profile"}>
                        {props.author} 
                    </Link>
                    <span className="text-xs px-1 font-light text-black">
                        {props.date ? props.date.toLocaleDateString() : ""}
                    </span>
                </p>
            </div>
            <div className="flex w-full items-center justify-between px-8 pb-4">
                <p className="text-sm font-light whitespace-nowrap overflow-x-hidden overflow-ellipsis">
                    {props.content}
                </p>
                <p className="text-xs font-light shrink-0 w-fit">
                    {props.imageUrl ? "1 attachment..." : ""}
                </p>
            </div>
        </div>
    );
}

export default Post;
