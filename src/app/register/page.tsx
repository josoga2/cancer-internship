"use client"


import Image from 'next/image';
import hb_logo from '../../../public/hb_logo.png';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader,  } from "@/components/ui/card"
import { useState } from 'react';
import publicApi from '@/publicApi';
import { useRouter } from 'next/navigation';


export default function Login() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const registerResponse = await publicApi.post('/api/auth/register/', {username: username.trim().toLowerCase(), email: email.trim().toLowerCase(), password} );
            if (registerResponse.status === 200 || registerResponse.status === 201) {
                // Handle successful registration, e.g., redirect to login page
                setError('You are successfully registered. Please check your email to verify your registeration.');

                await publicApi.post("/api/attempted-payment/", {
                    name: username,
                    email: email,
                    payment_method: "registered",
                });
                
                router.replace('/login');
            } else {
                setError('You are successfully registered. Please check your email to verify your registeration.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Either a User with the same credentials exist or Invalid Email or Password.');
        }
    };

    return (
        <main className="max-w-full w-full py-10 flex flex-col h-screen items-center justify-center bg-linear-to-b from-white via-hb-lightgreen to-hb-lightgreen">
            <div className='hidden md:flex w-87.5 py-5 bg-white  flex-col gap-2 items-center justify-center border-2 border-gray-200 rounded-lg shadow-lg px-5'>
                
                <div className='w-full flex justify-start items-start text-base'>
                    <Card className='w-full  rounded-sm shadow-sm'>
                        <CardHeader className='text-center'>
                            {/* <CardTitle className="text-base">Login</CardTitle> */}
                            <div className='w-full flex justify-center flex-col items-center'> 
                                <Image src={hb_logo} alt='jisender-logo' height={40} width={40} /> 
                                <p className='text-lg font-bold'> HackBio </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-5">
                                {error && <p className='text-red-500 text-center text-xs'>{error}</p>}
                                
                                <div className="grid gap-1">
                                    <Label className='font-bold'>Email</Label>
                                    <Input id="email" type="text" placeholder="you@mail.com" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} required className='bg-blue-50 py-5' />
                                </div>

                                <div className="grid gap-1">
                                    <Label className='font-bold'>Username</Label>
                                    <Input id="username" type="text" placeholder="myUniqueUserName" value={username} onChange={(e)=>setUsername(e.target.value)} required className='bg-blue-50 py-5' />
                                </div>
                                
                                <div className="grid gap-1">
                                    <Label htmlFor="password" className='font-bold'>Password</Label>
                                    <Input  type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}  className='bg-blue-50 py-5'/>
                                </div>

                                <div className="grid gap-1">
                                    <Label htmlFor="password" className='font-bold'>Confirm Password</Label>
                                    <Input  type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required  className='bg-blue-50 py-5'/>
                                </div>
                                
                                <a onClick={handleLogin} className='w-full'>
                                    <Button className='w-full bg-green-600 text-white py-5 hover:bg-green-700'>
                                        Sign Up
                                    </Button>
                                </a>
                                <a href='/login'><p className='text-sm text-center pt-5 text-blue-600 hover:underline'>  Already have an account? Sign In. </p></a>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <main className="md:hidden w-full h-full items-center justify-center">
                <div className="w-75 px-4 mx-auto flex flex-col  items-center justify-center">

                    <Card className="w-full border shadow-sm rounded-sm">
                        <CardHeader className="text-center">
                            <div className='w-full flex justify-center flex-col items-center'> 
                                <Image src={hb_logo} alt='jisender-logo' height={40} width={40} /> 
                                <p className='text-lg font-bold'> HackBio </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                        <form className="space-y-3 text-xs">
                            {error && (
                            <p className="text-red-500 text-center text-xs">{error}</p>
                            )}

                            <div className="grid gap-1">
                            <Label htmlFor="email" className="font-bold">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="you@mail.com"
                                value={email}
                                onChange={(e) =>
                                setEmail((e.target as HTMLInputElement).value)
                                }
                                required
                                className="bg-blue-50 text-xs py-3"
                            />
                            </div>

                            <div className="grid gap-1">
                            <Label htmlFor="username" className="font-bold">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="myUniqueUserName"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-blue-50 text-xs py-3"
                            />
                            </div>

                            <div className="grid gap-1">
                            <Label htmlFor="password" className="font-bold">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-blue-50 text-xs py-3"
                            />
                            </div>

                            <div className="grid gap-1 pb-3">
                            <Label htmlFor="confirmPassword" className="font-bold">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-blue-50 text-xs py-3"
                            />
                            </div>

                            <Button
                            onClick={handleLogin}
                            className="w-full bg-green-600 text-white py-3 hover:bg-green-700"
                            >
                            Sign Up
                            </Button>

                            <a href="/login">
                            <p className="text-sm text-center  text-blue-600 hover:underline">
                                Already have an account? Sign In.
                            </p>
                            </a>
                        </form>
                        </CardContent>
                    </Card>
                    </div>

            </main>
        </main>
    )
}