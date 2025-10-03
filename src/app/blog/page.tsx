"use client";
import publicApi from "@/publicApi";
import Navbar from "@/components/Nav/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/Nav/footer";


export default function ContentPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const [articles__, setArticles] = useState<Array<{
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
    }>>([
        {
            id: "",
            slug: "",
            excerpt: "",
            title: "",
            content_type: "",
            content_md: "", 
            content_html: "",
            author: {
                name: "",
                avatar: null 
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
            <section className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between py-20">
                <div className="flex flex-col items-start justify-start gap-5  max-w-3xl min-w-3xl">
                    <div className="flex flex-col h-[280px] w-full gap-5 justify-center p-5 items-start bg-hb-lightgreen">
                        <h1 className="text-2xl font-bold">DNA and Dreams</h1>
                        <p className="text-gray-500">HackBio's Technical Blog</p>
                    </div>

                    <div className="flex flex-col gap-5 w-full">
                        <h2 className="text-2xl font-bold">Latest Notes</h2>
                        {articles__.map((article) => (
                            <div key={article.id} onClick={()=>{router.push(`blog/${article.slug}`)}} className="flex flex-row gap-5 p-5 border rounded-md justify-between border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex flex-col gap-5 w-[550px]">
                                    <h3 className="text-xl font-semibold hover:cursor-pointer">{article.title}</h3>
                                    <p className="text-gray-600">{article.excerpt}</p>
                                    <div className="flex items-center gap-5">
                                        {article.author?.avatar && (
                                            <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full border border-hb-green" />
                                        )}
                                        <span className="text-sm text-gray-500">{article.author?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 ">
                                        <span>{new Date(article.published_at ?? "").toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{article.reading_time} min read</span>
                                    </div>
                                </div>
                                <div className="min-w-24 max-w-36 w-[150px] h-[150px] hover:cursor-pointer">
                                    {article.cover_image && (<img src={article.cover_image ?? ""} alt={article.title} className="w-40 h-40 object-cover rounded-md" />)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col pt-5 w-full px-3 gap-2">
                        <hr className="border-gray-300" />
                        <p className="text-lg font-bold">Subscribe</p>
                        <input type="text" placeholder="What should we call you" className="w-[250px] p-2 border text-sm border-gray-300 rounded-md" value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type="text" placeholder="Your Email" className="w-[250px] p-2 border text-sm border-gray-300 rounded-md" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <button onClick={handleSubmit} className="bg-hb-green w-[125px] text-white  p-2 rounded-md  hover:bg-hb-lightgreen text-sm hover:text-hb-green cursor-pointer">Subscribe</button>
                    </div>
                </div>
            </section>

            <section className="flex flex-col md:hidden w-full px-4 pt-5 gap-5">
                {/* Header Section */}
                <div className="flex flex-col gap-4 justify-center p-5 items-start bg-hb-lightgreen rounded-md">
                    <h1 className="text-xl font-bold">DNA and Dreams</h1>
                    <p className="text-gray-500 text-sm">HackBio's Technical Blog</p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full pt-3">
                    </div>
                </div>

                {/* Articles List */}
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="text-lg font-bold">Latest Notes</h2>
                    {articles__.map((article) => (
                    <div 
                        key={article.id} 
                        onClick={() => router.push(`blog/${article.slug}`)} 
                        className="flex flex-col gap-3 p-4 border rounded-md border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Image */}
                        {article.cover_image && (
                        <div className="w-full h-40">
                            <img 
                            src={article.cover_image} 
                            alt={article.title} 
                            className="w-full h-full object-cover rounded-md" 
                            />
                        </div>
                        )}

                        {/* Title & Excerpt */}
                        <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <p className="text-gray-600 text-sm">{article.excerpt}</p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                        {article.author?.avatar && (
                            <img 
                            src={article.author.avatar} 
                            alt={article.author.name} 
                            className="w-8 h-8 rounded-full border border-hb-green" 
                            />
                        )}
                        <span className="text-sm text-gray-500">{article.author?.name}</span>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{new Date(article.published_at ?? "").toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{article.reading_time} min read</span>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="flex flex-col pt-5 px-3 gap-5 pb-20">
                        <hr className="border-gray-300" />
                        <p className="text-lg font-bold">Subscribe</p>
                        <input type="text" placeholder="What should we call you" className="w-[250px] p-2 border text-sm border-gray-300 rounded-md" value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type="text" placeholder="Your Email" className="w-[250px] p-2 border text-sm border-gray-300 rounded-md" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <button onClick={handleSubmit} className="bg-hb-green w-[125px] text-white  p-2 rounded-md  hover:bg-hb-lightgreen text-sm hover:text-hb-green cursor-pointer">Subscribe</button>
                    </div>
                </section>
            <Footer />
        </main>
    );
}