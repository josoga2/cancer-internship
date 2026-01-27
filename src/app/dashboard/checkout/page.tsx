'use client'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/components/widgets/checkout/check-out-form";
import router from "next/router";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import publicApi from "@/publicApi";


export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Page() {
    
    const searchParams = useSearchParams();

    const prog = searchParams.get("prog");
    const id = searchParams.get("id");
    //console.log('prog: ', prog, '& id: ', id)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')


    useEffect(() => {
        const fetchProgramAndId = async ()=> {
            try{
                if(prog === 'course'){
                    const res = await publicApi.get('/api/courses/');
                    if(res.status === 200){
                        const course = (res.data as Array<{ id: string, overview: string, title:string }>).find((item) => Number(item.id) === Number(id));
                        //console.log(course, 'is imported');
                        setDesc(course?.overview || '')
                        setTitle(course?.title || '' )
                    }
                    else{
                        console.error("Failed to fetch contents.");
                    }
                }
                if(prog === 'career' || prog === 'internship' ){
                    const res = await publicApi.get('/api/internships/');
                    if(res.status === 200){
                        const course = (res.data as Array<{ id: string, overview: string, title:string }>).find((item) => Number(item.id) === Number(id));
                        //console.log(course, 'is imported');
                        setDesc(course?.overview || '')
                        setTitle(course?.title || '' )
                    }
                    else{
                        console.error("Failed to fetch contents.");
                    }
                }
                else{
                    console.error("Failed to fetch contents.");
                }
            }
            catch (error) {
                console.error("Error fetching content:", error);
                router.push("/login");
            }
            
        }; fetchProgramAndId();
    }, [prog, id]);
    


    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5 items-center justify-center ">
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm title={title} desc={desc} progId={Number(id)} curr="USD" discount={0.5} plan={prog || 'subscription'} />
                    </Elements>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm title={title} desc={desc} progId={Number(id)} curr="USD" discount={0.5} plan={prog || 'subscription'} />
                    </Elements>
                </div>
            </div>
        </main> 
    )
}

