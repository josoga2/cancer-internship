'use client'
import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";
import React from "react";
import api from "@/api";
import NavbarPay from "@/components/Nav/navbar-pay";


function Page() {
    
    const [referralCode, setReferralCode] = useState('');
    const [error, setError] = useState('');
    interface UsageEntry {
        id: number;
        used_by: string;
        used_for: string;
        used_cost: string; // Keep as string if API sends "60", or number if it sends 60
        used_at: string;
        referral_code: number;
    }
    const [data, setData] = useState<ReferralData>({ usage: [] });

    interface ReferralData {
        usage: UsageEntry[];
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/generate-referral/');
            setReferralCode(response.data.code);
            //console.log('Referral code generated:', response.data);
        } catch (error) {
            console.error('Error generating referral code:', error);
        }
    };

    useEffect(() => {
        const getReferralCode = async () => {
            try {
                const response = await api.get('/api/my-referral/');
                setReferralCode(response.data.code);
                //console.log('Fetched referral code:', response.data);
            } catch (error) {
                console.error('Error fetching referral code:', error);
            }
        }
        getReferralCode();
    }, [])

    useEffect(() => {
        const getReferralCodeUsage = async () => {
            try {
                const response = await api.get('/api/my-referral-usage/');
                setData(response.data);
                //console.log('Fetched referral code:', response.data);
            } catch (error) {
                console.error('Error fetching referral code:', error);
            }
        }
        getReferralCodeUsage();
    }, [])


    return (
        <main>
            <NavbarPay />
            <div className="hidden w-full py-10 pt-24 h-full md:flex flex-col gap-5 items-center justify-center ">
                <div className="tetx-center text-sm flex flex-col gap-5 items-center justify-center">
                    <p className="text-lg font-bold ">Tell a friend about us, they will thank you, and we will thank you ☺️!</p>
                    <p className="">Generate your referral code!</p>

                    
                    <div className="flex flex-col gap-3 text-sm">
                        
                        <label className="font-semibold text-gray-600">Your referral code</label>
                        <p className="bg-zinc-200 rounded-sm py-2 px-5">{referralCode? referralCode : "No referral code generated yet."}</p>


                        {referralCode ? (
                            <button className="bg-gray-700 text-white px-4 py-2 rounded-sm  transition-colors mt-3 w-75 md:w-120" >Generate Referral Code</button>
                        ) : (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors mt-3 w-75 md:w-120" onClick={handleSubmit}>Generate Referral Code</button>
                        )}

                    </div>

                    <div>
                        <p className="py-5 text-base font-bold text-center">Your Usage Record</p>
                        {data.usage.length === 0 ? (
                            <p className="text-sm text-gray-500 mt-5">No referral usage data available.</p>
                        ):(
                        <table className="w-full text-left bg-white border-collapse">
                            
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">User</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">Purpose</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">Cost</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.usage.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{item.used_by}</td>
                                    <td className="px-6 py-4 text-xs text-gray-600">{item.used_for}</td>
                                    <td className="px-6 py-4 text-xs text-gray-900 font-semibold">${item.used_cost}</td>
                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        {new Date(item.used_at).toLocaleDateString()}
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <div className="tetx-center text-sm flex flex-col gap-5 pt-20 items-center justify-center">
                    <p className="text-lg font-bold ">Tell a friend about us, they will thank you, and we will thank you ☺️!</p>
                    <p className="">Generate your referral code!</p>

                    
                    <div className="flex flex-col gap-3 text-sm">
                        
                        <label className="font-semibold text-gray-600">Your referral code</label>
                        <p className="bg-zinc-200 rounded-sm py-2 px-5">{referralCode? referralCode : "No referral code generated yet."}</p>


                        {referralCode ? (
                            <button className="bg-gray-700 text-white px-4 py-2 rounded-sm  transition-colors mt-3 w-75 md:w-120" >Generate Referral Code</button>
                        ) : (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors mt-3 w-75 md:w-120" onClick={handleSubmit}>Generate Referral Code</button>
                        )}

                    </div>

                    <div>
                        <p className="py-5 text-base font-bold text-center">{`Your Usage Record (See full table on desktop)`}</p>
                        {data.usage.length === 0 ? (
                            <p className="text-sm text-gray-500 mt-5">No referral usage data available.</p>
                        ):(
                        <table className="w-full text-left bg-white border-collapse ">
                            
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">User</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">Purpose</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.usage.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{item.used_by}</td>
                                        <td className="px-6 py-4 text-xs text-gray-600">{item.used_for}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        )}
                    </div>
                </div>
            </div>
        </main> 
    )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
