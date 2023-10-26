import "../assets/css/output.css";
import { Link } from "react-router-dom";

interface Props {
    id: string;
    author: string;
    title: string;
    content: string;
    date: Date;
}

function Post(props: Props): JSX.Element {
    return (
        <div className="w-full h-fit">
            <div className="w-full flex justify-between items-center px-8 py-4">
                <Link
                    to={"/posts/" + props.id}
                    title="View post"
                    className="text-xl text-light-theme-green hover:text-light-theme-green-active transition-all"
                >
                    {props.title}
                </Link>
                <p className="text-sm text-light-theme-green">
                    {props.author}{" "}
                    <span className="text-xs px-1 font-light text-black">
                        {props.date ? props.date.toLocaleDateString() : ""}
                    </span>
                </p>
            </div>
            <p className="text-sm font-light px-8 pb-4 whitespace-nowrap overflow-x-hidden overflow-ellipsis">
                {props.content}
            </p>
        </div>
    );
}

export default Post;
