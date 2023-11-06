import "../assets/css/output.css"
import Post from "./Post";

interface Post {
    title: string;
    content: string;
    author: string;
    date: Date;
    _id: string;
}

interface Props {
    posts: Post[];
}

function PostList (props: Props): JSX.Element {

    return (
        <div className="h-fit min-h-screen w-2/3 border-x border-light-border divide-y divide-light-border">
            <div className="w-full">
                <h1 className="text-2xl p-8"> All Posts </h1>
                <p className="px-8 pb-4 font-light"> {props.posts.length} Posts </p>
            </div>
            
            {props.posts.map(post => (
                <Post id={post._id} key={post._id} author={post.author} title={post.title} content={post.content} date={post.date} />
            ))}

        </div>
    );
}

export default PostList;
