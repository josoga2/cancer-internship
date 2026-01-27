'use client'
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import { CreditCard, Wallet } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import NavbarPay from "@/components/Nav/navbar-pay";
import publicApi from "@/publicApi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST!
);

export default function CheckOutForm({title, desc, progId, curr, discount, plan}:{ title:string; desc:string; progId:number, curr:string, discount:number; plan:string }) {

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [priceType, setPriceType] = useState('')
    const [refCode, setRefCode] = useState('')

    
    //dropdown for length of subscription / one-time payment
    const [subscriptionLength, setSubscriptionLength] = useState('12 months');
    console.log(subscriptionLength)

    const productPrice = (() => {
        
        if (subscriptionLength === '6 months') {
            return 0.5;
        } else if (subscriptionLength === '12 months') {
            return 1;
        } else if (subscriptionLength === '3 months') {
            return 0.25;
        }
        return 0;
    })();

    const createCheckout = async() => {
        try {
            const res = await publicApi.post(
                "/api/create-checkout/",
                { priceType: priceType, title:title, desc:desc, progId:progId, subscriptionLength:subscriptionLength, refCode:refCode }
            );
            if(res.status === 200){
                //console.log('successful')
                setClientSecret(res.data.client_secret);
            }
            
        } catch (err) {
            console.log('unsuccessful')
            //router.push("/login");
        }
    }

    useEffect(() => {
        if (!priceType) return;

        createCheckout();
    }, [priceType]);

    const planPrice = (() => {
        switch (plan) {
            case "course":
                return 30;
            case "career":
                return 60;
            case "internship":
                return 100;
            case "subscription":
                return 400;
            default:
                return 0;
            }
    })();



    const [finalPrice, setFinalPrice] = useState(0);
    const exchangeRateNaira = 1500
    const exchangeRateRupee = 90

    const [currency, setCurrency] = useState('USD');

    const exchangeRate = (() => {
        if (currency === 'NGN') {
            return exchangeRateNaira;
        } else if (currency === 'INR') {
            return exchangeRateRupee;
        } else {
            return 1; // USD
        }
    })();

    //paypal config
    const initialOptions = {
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        
    };

    //Paypal Processors

    const createOrder = async () => {
    // 1. Call your Django backend to create the order

        try{
            const res = await publicApi.post(
                "/api/create-paypal-order/",
                { priceType: priceType, title:title, desc:desc, progId:progId, subscriptionLength:subscriptionLength, refCode:refCode  }
            );
            if(res.status === 200){
                //console.log('successful')
                return res.data.id; // Returns the PayPal ID
            }
        }
        catch (error) {
            console.error("Error creating PayPal order:", error);
        }
    };


    const onApprove = async (data: any) => {
        // 2. Call your Django backend to capture the funds

        try{
            const res = await publicApi.post(
                `/api/capture-paypal-order/${data.orderID}/`,
            );
            if(res.status === 200){
                //console.log('successful')
                alert(`Payment Successful! Thank you very much for your purchase. We sent a mail to: ${res.data.email} Click ok and proceed to access your dashboard.`);
                window.location.href = `/dashboard/checkout/return-paypal/`; // Redirect to dashboard
            }
        }
        catch (error) {
            console.error("Error capturing PayPal order:", error);
        }
    };


    console.log(`refcod is: `, refCode)

    //console.log(priceType, title, progId, subscriptionLength)

    return (
        <main>
            <div className="pt-16">
                <NavbarPay />
            </div>
            
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5  items-start justify-start ">
                <div className="text-xs flex w-full flex-row font-bold items-center justify-between right-0 gap-2">
                    <div className="text-sm flex flex-row font-bold items-center right-0 gap-2">
                        <p>Select Currency</p>
                        <select
                            value={currency}
                            onChange={(e) => {setCurrency(e.target.value);}}
                            className="border p-1 rounded-sm"
                        >
                            <option value="USD">USD</option>
                            <option value="NGN">NGN</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>

                    <div className="text-sm flex flex-row font-bold items-center right-0 gap-2">
                        <p>{`(1)`} Select Suscription Length</p>
                        <select
                            value={subscriptionLength}
                            onChange={(e) => {setSubscriptionLength(e.target.value);}}
                            className="border p-1 rounded-sm"
                        >
                            <option value="3 months">3 months</option>
                            <option value="6 months">6 months</option>
                            <option value="12 months">12 months</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 items-start gap-2 w-200 justify-between text-base">
                    <div className="p-5 border  rounded-sm">
                        <p className="text-sm font-bold">Select preferred payment method</p>
                        <Accordion type="single" collapsible>

                            {/**Paypal */}
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Paypal
                                </AccordionTrigger>

                                {priceType && subscriptionLength? 
                                <AccordionContent>
                                    <PayPalScriptProvider options={initialOptions}>
                                        <PayPalButtons
                                            style={{ layout: "vertical" }}
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                        />
                                    </PayPalScriptProvider>
                                    <input className="py-3 px-3 w-full border-2 border-hb-green rounded-md" placeholder="Referral code" value={refCode} onChange={(e)=>setRefCode(String(e.target.value))} />
                                </AccordionContent>
                                : <AccordionContent>
                                    <div>{`Please select your preferred payment plan (to your right)`}</div>
                                </AccordionContent>}
                            </AccordionItem>

                            {/**Card */}
                            
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        <span className="flex flex-row gap-2 items-center"><CreditCard /> <p>{`Card (Credit or Debit)`}</p></span>
                                    </AccordionTrigger>

                                    <AccordionContent>
                                        {clientSecret ? 
                                        <div id="checkout">
                                            <EmbeddedCheckoutProvider
                                                stripe={stripePromise}
                                                options={{ clientSecret }}
                                            >
                                                <EmbeddedCheckout />
                                            </EmbeddedCheckoutProvider>
                                        </div>
                                        : <div>{`Please select your preferred payment plan (to your right)`}</div>}
                                    </AccordionContent>
                                </AccordionItem>
                            

                            {/**Opay */}
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    <span className="flex flex-row gap-2 items-center"><Wallet /> <p>{`Bank Transfer (NGN)`}</p></span>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <form className="flex flex-col gap-3 items-start w-full  rounded-sm">
                                        <div className="flex flex-col gap-2 p-5 bg-yellow-100 border-amber-800 border rounded-sm">
                                            <p className="text-amber-800">
                                                {`Kindly proceed to pay NGN ${(Number(finalPrice)*Number(exchangeRateNaira) || 'Select your plan on the right')} via OPay (Nigerians) using the following details: Adewale Ogunleye, 8108368289. After payment, please send a screenshot of the transaction details to @thehackbio on X (Twitter), HackBio on Linkedin or via email at: contact@thehackbio.com`}
                                            </p>
                                            <p className="text-amber-800">
                                                Please note that enrollment will be processed manually and might take 24 hours before it reflects on your account.
                                            </p>
                                            <p className="text-amber-800">
                                                {`Description: Program + Duration + Referral Code (optional).`}
                                            </p>
                                        </div>
                                        <a
                                            href={`mailto:contact@thehackbio.com?subject=Payment%20Receipt&body=Hi%20HackBio%2C%0A%0APlease%20find%20my%20receipt%20attached.`}
                                            className="bg-hb-green px-5 text-white rounded-sm font-bold py-2"
                                        >
                                        Send us your receipt
                                        </a>
                                    </form>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    
                    </div>

                    <form className="border p-5 bg-white rounded-sm ">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold">{title}</p>
                                <p className="text-sm font-medium">{desc}</p>
                            </div>

                            <p className="font-bold text-base pb-5 border-b">{`(2)`} Select Plan</p>

                            <div className="flex flex-col gap-2 border rounded-sm p-3">
                                <div className="flex flex-row items-center gap-3" >
                                    <input type="radio" name="priceType" value={'subscription'} className="scale-150 accent-hb-green " onChange={() => {setFinalPrice(200 * productPrice);setPriceType('subscription');  }} />
                                    <p className="text-base font-bold">{`Pro Subscription (12 months)`}</p>
                                </div>
                                <span className="flex flex-row gap-2"> <p className="text-base font-bold">{`${currency} ${200 * exchangeRate * productPrice}`}</p> <p className="text-base line-through text-gray-400">{`${currency} ${400 * exchangeRate * productPrice}`}</p> <p className="text-base  font-bold text-blue-600">{`(50% off)`}</p> </span>
                                <p className="text-sm font-medium">{`Access this course and everything (Internships and Courses) from HackBio`}</p>
                            </div>

                            <p className="text-red-400 text-sm">
                                {priceType
                                ? priceType.charAt(0).toUpperCase() + priceType.slice(1)
                                : "None "}
                                {` Selected`}
                            </p>

                            {/**Prepare for all cases */}
                            <div className="flex flex-col gap-2 border rounded-sm p-3">
                                <div className="flex flex-row items-center gap-3">
                                    <input type="radio" name="priceType" value={'course'} className="scale-150 accent-hb-green " onChange={() => {setFinalPrice((planPrice - (planPrice * discount)) ); setPriceType(plan); }} />
                                    <p className="text-base font-bold">{`Access this program alone (12 months) `}</p>
                                </div>
                                <span className="flex flex-row gap-2 "> <p className="text-base font-bold">{`${currency} ${(planPrice - (planPrice * discount)) * exchangeRate }`}</p> <p className="text-base line-through text-gray-400">{`${currency} ${planPrice * exchangeRate }`} </p> <p className="text-base text-blue-600 font-bold ">{`(50% off)`}</p> </span>
                                <p className="text-sm font-medium">{`Just this course alone for 12 months`}</p>
                            </div>

                            <div className="flex flex-row gap-5 items-center text-3xl">
                                <p className="text-xl font-bold">Total:</p> <p className="">{currency} {finalPrice * exchangeRate }</p>
                            </div>
                        </div>

                    </form>
                </div>
                
            </div>

            {/**MOBILE */}

            <div className="flex flex-col w-full md:hidden gap-5   rounded-xl">
                <div className="text-base flex flex-row font-bold items-center right-0 gap-2">
                    <p>Select Currency</p>
                    <select
                        value={currency}
                        onChange={(e) => {setCurrency(e.target.value);}}
                        className="border p-1 rounded-sm"
                    >
                        <option value="USD">USD</option>
                        <option value="NGN">NGN</option>
                        <option value="INR">INR</option>
                    </select>
                </div>
                <div className="flex flex-col-reverse text-sm items-start gap-2 w-full justify-between ">
                     
                    <div className="p-5 border  rounded-sm">
                        <p className="font-bold text-base pb-5 border-b">Select Preferred Payment Method</p>
                        <Accordion type="single" collapsible>

                            {/**Paypal */}
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Paypal
                                </AccordionTrigger>

                                <AccordionContent>
                                    {priceType && subscriptionLength? 
                                    <AccordionContent>
                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                            />
                                        </PayPalScriptProvider>
                                        <input className="py-3 px-3 w-full border-2 border-hb-green rounded-md" placeholder="Referral code" value={refCode} onChange={(e)=>setRefCode(String(e.target.value))} />
                                    </AccordionContent>
                                    : <AccordionContent>
                                        <div>{`Please select your preferred payment plan (to your right)`}</div>
                                    </AccordionContent>}
                                </AccordionContent>
                            </AccordionItem>

                            {/**Card */}
                            
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        <span className="flex flex-row gap-2 items-center"><CreditCard /> <p>{`Card (Credit or Debit)`}</p></span>
                                    </AccordionTrigger>

                                    <AccordionContent>
                                        {clientSecret ?  
                                        <div id="checkout">
                                            <EmbeddedCheckoutProvider
                                                stripe={stripePromise}
                                                options={{ clientSecret }}
                                            >
                                                <EmbeddedCheckout />
                                            </EmbeddedCheckoutProvider>
                                        </div>
                                        : <div>{`Please select your preferred payment plan (to your below)`}</div>}
                                    </AccordionContent>
                                </AccordionItem>
                            

                            {/**Opay */}
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    <span className="flex flex-row gap-2 items-center"><Wallet /> <p>{`Bank Transfer (NGN)`}</p></span>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <form className="flex flex-col gap-3 items-start w-full  rounded-sm">
                                        <div className="flex flex-col gap-2 p-5 bg-yellow-100 border-amber-800 border rounded-sm">
                                            <p className="text-amber-800">
                                                {`Kindly proceed to pay NGN ${(Number(finalPrice)*Number(exchangeRateNaira) || 'Select your plan on the right')} via OPay (Nigerians) using the following details: Adewale Ogunleye, 8108368289. After payment, please send a screenshot of the transaction details to @thehackbio on X (Twitter), HackBio on Linkedin or via email at: contact@thehackbio.com`}
                                            </p>
                                            <p className="text-amber-800">
                                                Please note that enrollment will be processed manually and might take 24 hours before it reflects on your account.
                                            </p>
                                        </div>
                                        <a
                                            href={`mailto:contact@thehackbio.com?subject=Payment%20Receipt&body=Hi%20HackBio%2C%0A%0APlease%20find%20my%20receipt%20attached.`}
                                            className="bg-hb-green px-5 text-white rounded-sm font-bold py-2"
                                        >
                                        Send us your receipt
                                        </a>
                                    </form>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    
                    </div>

                    <form className="border p-5 bg-white rounded-sm w-full">
                       
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold">{title}</p>
                                <p className="text-sm font-medium">{desc}</p>
                            </div>

                            <div className="flex flex-col gap-2 border rounded-sm p-3">
                                <div className="flex flex-row items-center gap-3" >
                                    <input type="radio" name="priceType" value={'subscription'} className="scale-150 accent-hb-green " onChange={() => {setFinalPrice(200 * productPrice);setPriceType('subscription');  }} />
                                    <p className="text-base font-bold">{`Pro Subscription (12 months)`}</p>
                                </div>
                                <span className="flex flex-row text-xs gap-2"> <p className="font-bold">{`${currency} ${200 * exchangeRate * productPrice}`}</p> <p className="line-through text-gray-400">{`${currency} ${400 * exchangeRate * productPrice}`}</p> <p className="font-bold text-blue-600">{`(50% off)`}</p> </span>
                                <p className="text-sm font-medium">{`Access this course and everything (Internships and Courses) from HackBio`}</p>
                            </div>

                            <p className="text-red-400 text-sm">
                                {priceType
                                ? priceType.charAt(0).toUpperCase() + priceType.slice(1)
                                : "None "}
                                {` Selected`}
                            </p>

                            {/**Prepare for all cases */}
                            <div className="flex flex-col gap-2 border rounded-sm p-3">
                                <div className="flex flex-row items-center gap-3">
                                    <input type="radio" name="priceType" value={'course'} className="scale-125 accent-hb-green " onChange={() => {setFinalPrice((planPrice - (planPrice * discount)) ); setPriceType(plan); }} />
                                    <p className="text-base font-bold">{`Access this program alone (12 months) `}</p>
                                </div>
                                <span className="flex flex-row text-xs gap-2 "> <p className=" font-bold">{`${currency} ${(planPrice - (planPrice * discount)) * exchangeRate }`}</p> <p className=" line-through text-gray-400">{`${currency} ${planPrice * exchangeRate }`} </p> <p className=" text-blue-600 font-bold ">{`(50% off)`}</p> </span>
                                <p className="text-sm font-medium">{`Just this program alone for 12 months`}</p>
                            </div>

                            <div className="flex flex-row gap-5 items-center text-3xl">
                                <p className="text-xl font-bold">Total:</p> <p className="">{currency} {finalPrice * exchangeRate }</p>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    )
}