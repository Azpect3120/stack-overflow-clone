import "../assets/css/output.css"
import Post from "./Post";

function PostList (): JSX.Element {
    const date: Date = new Date();
    const author: string = "Azpect";
    const title: string = "The Battle of Titans: Golang vs. Rust";
    const content: string = `In the ever-evolving landscape of programming languages, two contenders have emerged as favorites among developers - Go (or Golang) and Rust. Both languages offer unique features and capabilities that cater to different needs and use cases. In this blog post, we'll delve into the depths of these languages, comparing their strengths and weaknesses to help you decide which one suits your project best.
Section 1: The Swift Development of Go

Go, also known as Golang, is renowned for its speed and simplicity. This statically-typed language was designed at Google and has garnered popularity for its efficient and concise syntax. Go's garbage collection, goroutines, and built-in support for concurrent programming make it an excellent choice for building web servers and microservices. Developers appreciate Go's no-frills approach, making it easy to learn and maintain. With a strong emphasis on performance, Go excels in the domain of cloud-native and networked applications.
Section 2: Rust's Unyielding Focus on Safety

On the other side of the arena stands Rust, a systems programming language that prioritizes memory safety without sacrificing performance. Rust is lauded for its fearless concurrency, where its borrow checker prevents data races and null pointer dereferences. It's an ideal choice for applications requiring fine-grained control over system resources, such as operating systems and embedded systems. Rust's emphasis on preventing runtime errors at compile time sets it apart from many other languages.
Section 3: A Showdown in Practicality

While Go and Rust have distinct strengths, there's no one-size-fits-all answer to the Golang vs. Rust debate. Your choice should depend on the specific requirements of your project. Here's a brief comparison:

    If you need rapid development and scalability for web services, Go's simplicity and built-in concurrency support can give you a head start.

    For systems programming, where memory safety is a non-negotiable requirement, Rust's strict adherence to safe practices offers robust protection against bugs and vulnerabilities.

Section 4: Bridging the Gap

Developers aren't confined to using just one language. Many projects incorporate both Go and Rust. For instance, you could use Go to build the high-level components of a system and Rust for low-level systems programming, ensuring both efficiency and safety.
Section 5: Conclusion

In the Golang vs. Rust debate, there's no definitive winner. The choice depends on your project's goals, your team's expertise, and the specific challenges you face. Both languages have thriving communities and ecosystems, making it easier to find support and resources for your development journey.

Whichever language you choose, the world of Go and Rust offers exciting possibilities for developers seeking to build reliable and performant software. So, are you ready to embark on your coding adventure with Go or Rust? The choice is yours, and the journey is bound to be exhilarating.`;

    return (
        <div className="h-fit min-h-screen w-2/3 border-x border-light-border divide-y divide-light-border">
            <div className="w-full">
                <h1 className="text-2xl p-8"> All Posts </h1>
                <p className="px-8 pb-4 font-light"> 4 posts </p>
            </div>

            <Post author={author} title={title} content={content} date={date} id="jkafnjkafbnaknfjka" />
            <Post author={author} title={title} content={content} date={date} id="uianjkabgjkabghjak" />
            <Post author={author} title={title} content={content} date={date} id="aguibajgkbagjkbang" />
            <Post author={author} title={title} content={content} date={date} id="aiojknagjkabngjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
            <Post author={author} title={title} content={content} date={date} id="foiabngjkabgnfjkab" />
        </div>
    );
}

export default PostList;
