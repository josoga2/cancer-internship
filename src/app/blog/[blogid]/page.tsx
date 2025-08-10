"use client";
import Navbar from "@/components/Nav/navbar";
import publicApi from "@/publicApi";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkDeflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export default function ContentPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const params = useParams();
    const blogId = params.blogid;
    console.log("Blog ID:", blogId); // For debugging purposes
    const [articles__, setArticles] = useState<Array<{
        id?: number | string
        slug?: string
        title?: string
        excerpt?: string
        content_type?: string
        content_markdown?: string
        content_html?: string
        author?: {
            name?: string
            avatar?: string | null
        }
        published_at?: string
        reading_time?: number
        tags?: Array<string>
        cover_image?: string | null
    }>>([
        {
            id: "",
            slug: "",
            excerpt: "",
            title: "",
            content_type: "",
            content_markdown: "", 
            content_html: "",
            author: {
                name: "",
                avatar: null // Changed to null to handle cases where avatar might not be provided,
            },
            published_at: "",
            reading_time: 0,
            tags: [],
            cover_image: null
        }
    ]);

    useEffect(() => {
        const fetchArticles = async () => {
        try {
            const response = await publicApi.get('/api/articles/'); // Adjust the endpoint as needed
            //console.log("Response from get-user-profile:", response.data);
            if (response.data && response.status == 200 || response.status == 201) {
                //console.log("article data:", response.data);
                const articleList = response.data; 
                setArticles(articleList);
            
            
            } else {
            console.error("No articles profile found.");
            
            }
        } catch (error) {
            console.error("Error fetching articles profile:", error);
        }
        };

        fetchArticles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission, e.g., send data to an API
        const response = await publicApi.post("/api/attempted-payment/", {
            name: name,
            email: email,
            payment_method: 'blog',
        });

        if (response.status === 201) {
            // Handle successful submission, e.g., show a success message
            //console.log("Enrollment successful:", response.data);
            alert("Thank you for subscribing.");
            
        } else {
            // Handle error case, e.g., show an error message
            console.error("Enrollment failed:", response.data);
        }

        // Reset form fields after submission
        setEmail("");
    }

    return (
        
        <main>
            <Navbar />
            <section className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between">
                <div className="flex flex-col items-start justify-start gap-5  max-w-3xl min-w-3xl">
                    <a href="/blog" className="flex flex-row gap-2 items-center font-bold text-xl hover:underline"> <BiArrowBack /> All Articles </a>
                    <div className="flex flex-col gap-5 w-full">
                        {articles__
                            .filter((article__: {
                                id?: number | string
                                slug?: string
                                title?: string
                                excerpt?: string
                                content_type?: string
                                content_md?: string
                                content_html?: string
                                author?: {
                                    name?: string
                                    avatar?: string | null
                                }
                                published_at?: string
                                reading_time?: number
                                tags?: Array<string>
                                cover_image?: string | null
                            }) => article__.slug === blogId)
                            .map((article: {
                                id?: number | string
                                slug?: string
                                title?: string
                                excerpt?: string
                                content_type?: string
                                content_markdown?: string
                                content_html?: string
                                author?: {
                                    name?: string
                                    avatar?: string | null
                                }
                                published_at?: string
                                reading_time?: number
                                tags?: Array<string>
                                cover_image?: string | null
                            }) => (
                                <div key={article.id} className="flex flex-col gap-5 p-5 border rounded-md justify-between ">
                                    <div className="flex flex-col h-fit w-full gap-5 justify-center p-5 items-start bg-hb-lightgreen ">
                                        <h1 className="text-2xl font-bold"> {article.title} </h1>
                                        <div className=" min-w-36 hover:cursor-pointer">
                                            {article.cover_image && (
                                                <img 
                                                    src={article.cover_image} 
                                                    alt={article.title || "Cover image"} 
                                                    className="w-full h-48 object-cover rounded-md" 
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full pt-10 px-5 prose ">
                                        {article.content_type === "md" ? (
                                            <Markdown
                                            remarkPlugins={[
                                                remarkGfm,
                                                remarkMath,
                                                remarkDeflist
                                            ]}
                                            rehypePlugins={[
                                                rehypeRaw,
                                                rehypeKatex,
                                                rehypeHighlight
                                            ]}
                                            >
                                            {article.content_markdown}
                                        </Markdown>
                                        ): (<div dangerouslySetInnerHTML={{ __html: article.content_html ?? "" }} />)}
                                        
                                    </div>
                                    <div className="flex flex-col pt-5 px-3 gap-5">
                                        <hr className="border-gray-300" />
                                        <p className="text-lg font-bold">Subscribe</p>
                                        <input type="text" placeholder="What should we call you" className="w-[250px] p-2 border text-sm border-gray-300 rounded-md" value={name} onChange={(e)=>setName(e.target.value)} />
                                        <input type="text" placeholder="Your Email" className="w-[250px] p-2 border text-sm border-gray-300 rounded-md" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                        <button onClick={handleSubmit} className="bg-hb-green w-[125px] text-white  p-2 rounded-md  hover:bg-hb-lightgreen text-sm hover:text-hb-green cursor-pointer">Subscribe</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    
                </div>
            </section>

            <section className="flex flex-col md:hidden w-full px-4 pt-5 gap-5">
                <a 
                    href="/blog" 
                    className="flex flex-row gap-2 items-center font-bold text-lg hover:underline"
                > 
                    <BiArrowBack /> All Articles 
                </a>

                {articles__
                    .filter(article => article.slug === blogId)
                    .map(article => (
                    <div 
                        key={article.id} 
                        className="flex flex-col gap-5 border rounded-md p-4"
                    >
                        {/* Title + Cover */}
                        <div className="flex flex-col gap-4 items-start">
                        <h1 className="text-xl font-bold">{article.title}</h1>
                        {article.cover_image && (
                            <img 
                            src={article.cover_image} 
                            alt={article.title} 
                            className="w-full h-48 object-cover rounded-md" 
                            />
                        )}
                        </div>

                        {/* Content */}
                        <div className="prose max-w-none text-sm">
                        {article.content_type === "md" ? (
                            <Markdown
                            remarkPlugins={[remarkGfm, remarkMath, remarkDeflist]}
                            rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
                            >
                            {article.content_markdown}
                            </Markdown>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: article.content_html ?? "" }} />
                        )}
                        </div>

                        {/* Subscribe Form */}
                        <div className="flex flex-col gap-3 pt-3 border-t border-gray-300">
                        <p className="text-base font-bold">Subscribe</p>
                        <input 
                            type="text" 
                            placeholder="What should we call you" 
                            className="w-full p-2 border text-sm border-gray-300 rounded-md" 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="w-full p-2 border text-sm border-gray-300 rounded-md" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                        />
                        <button 
                            onClick={handleSubmit} 
                            className="bg-hb-green w-full text-white p-2 rounded-md hover:bg-hb-lightgreen text-sm hover:text-hb-green"
                        >
                            Subscribe
                        </button>
                        </div>
                    </div>
                    ))}
                </section>

        </main>
    );
}