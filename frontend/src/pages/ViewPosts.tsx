import "../assets/css/output.css";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import PostList from "../components/PostList";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Post {
  title: string;
  content: string;
  author: string;
  date: Date;
  _id: string;
}

interface Data {
  search: string;
  totalPages: number;
  totalPosts: number;
  message: string;
}

function ViewPosts(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(5);
  const [data, setData] = useState<Data>({ search: "", totalPages: pageCount, totalPosts: 0, message: ""})
  const [size, setSize] = useState<number>(7)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let search = searchParams.get("search");

  useEffect(() => {
    search = search ? search : ""
    const queryString = `?page=${page}&query=${search}&size=${size}`

    try {
      fetch(`http://localhost:4000/posts/search${queryString}`)
        .then((res) => res.json())
        .then((data) => {
          data.data.forEach((post: Post) => (post.date = new Date(post.date)));
          setPosts(data.data);
          setPageCount(data.totalPages);
          setData(data)
          console.log(data)
        });
    } catch (err) {
      console.error(err);
    }
  }, [search, page, size])

  return (
    <div>
      <Navbar />

      <div className="w-full flex justify-center">
        <PostList posts={posts} data={data} />

        {/* \/ Buttons \/ */}

        <div className="flex flex-col items-center space-y-2">
        {/* //! PLEASE STYLE THESE BUTTONS AND MOVE THEM */}
          {/* Next Page Button */}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= pageCount}
            className={`${
              page >= pageCount ? "bg-gray-400" : "bg-green-500"
            } p-2 rounded`}
          >
            Next page
          </button>

          {/* Previous Page Button */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className={`${
              page <= 1 ? "bg-gray-400" : "bg-red-500"
            } p-2 rounded`}
          >
            Previous page
          </button>

          <button onClick={() => setSize(15)}>
            15 posts
          </button>
          <button onClick={() => setSize(10)}>
            10 posts
          </button>
          <button onClick={() => setSize(5)}>
            5 posts
          </button>

          <p>Total pages: {pageCount}</p>
          <p>Current page: {page}</p>
          <b>
            PUT THESE BUTTONS WHERE YOU WANT THEM
            <br />
            located in ViewPosts.tsx
          </b>
        </div>

        {/* /\ Buttons /\ */}

      </div>

      <Footer />
    </div>
  );
}

export default ViewPosts;
