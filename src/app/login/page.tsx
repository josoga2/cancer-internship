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
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/constants';
import { toast } from 'sonner';



export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const loginResponse = await publicApi.post('/api/auth/login/', { username, password } );
            if (loginResponse.status === 200 || loginResponse.status === 201) {
                localStorage.setItem(ACCESS_TOKEN, loginResponse.data.access);
                localStorage.setItem(REFRESH_TOKEN, loginResponse.data.refresh);
                toast.success("Logged in successfully!");
                // Handle successful login, e.g., redirect to dashboard
                router.replace('/dashboard');
            } else if (loginResponse.status === 401 || loginResponse.status === 400) {
                setError('Either your email is not yet verified or you are not inputting your username. Please check your email to verify your account or enter your username.');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as any).response === 'object' &&
                (error as any).response !== null &&
                'status' in (error as any).response &&
                (error as any).response.status === 401
            ) {
                setError('Either your email is not yet verified or you are not inputting your username. Please check your email to verify your account or enter your username.');
            } else {
                setError(' Invalid Username or Password. Username and Password are case sensitive. Please try again.');
            }
        }
    };

    return (
        <main className='max-w-full w-full py-10   flex flex-col  items-center justify-center'>
            <div className='hidden md:flex max-w-1/4 w-[1000px] py-2  flex-col gap-5 items-center justify-center'>
                
                <div className='w-full flex justify-center flex-row items-end'> 
                    <Image src={hb_logo} alt='jisender-logo' height={50} width={50} /> 
                </div>
                
                <div className='w-full flex justify-center items-center'>
                    {<p className='text-lg font-bold'> HackBio </p>}
                </div>
                
                <div className='w-full flex justify-start items-start text-lg'>
                    <Card className='w-full border-none shadow-none'>
                        <CardHeader className='text-center'>
                            {/* <CardTitle className="text-base">Login</CardTitle> */}
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-5">
                                <p className='text-red-500 text-center'>{error}</p>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="username" className='text-lg'>Username</Label>
                                    <Input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className='bg-blue-50 text-lg placeholder:text-lg py-6' />
                                </div>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className='text-lg'>Password</Label>
                                    <Input id="password" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required  className='bg-blue-50 text-lg placeholder:text-lg py-6'/>
                                </div>
                                
                                <a onClick={handleLogin} className='w-full'>
                                    <Button className='w-full bg-green-600 text-white text-lg py-6 hover:bg-green-700'>
                                        SIGN IN
                                    </Button>
                                </a>
                                <a href='/register'><p className='text-base text-center pt-5 text-blue-600 hover:underline'>  New here? Register. </p></a>

                            </form>
                        </CardContent>
                    </Card>
                </div>
                
                
            </div>

            <main className="md:hidden w-full max-w-md px-4 py-10 mx-auto flex flex-col gap-10 items-center justify-center">
                <div className="flex flex-col gap-4 w-full items-center md:items-start">
                    
                    <div className="w-full flex justify-center md:justify-start items-end gap-2">
                    <Image src={hb_logo} alt="hackbio-logo" height={50} width={50} />
                    </div>

                    <p className="text-lg font-bold text-center md:text-left">HackBio</p>

                    <Card className="w-full border-none shadow-none">
                    <CardHeader className="text-center"></CardHeader>
                    <CardContent>
                        <form className="space-y-5">
                        <p className="text-red-500 text-center">{error}</p>

                        <div className="grid gap-2">
                            <Label htmlFor="username" className="text-lg">Username</Label>
                            <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="bg-blue-50 text-lg placeholder:text-lg py-6"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-blue-50 text-lg placeholder:text-lg py-6"
                            />
                        </div>

                        <Button onClick={handleLogin} className="w-full bg-green-600 text-white text-lg py-6 hover:bg-green-700">
                            SIGN IN
                        </Button>

                        <a href="/register">
                            <p className="text-base text-center pt-5 text-blue-600 hover:underline">
                            New here? Register.
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