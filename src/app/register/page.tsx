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
            const registerResponse = await publicApi.post('/api/auth/register/', {username, email, password} );
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
        <main className='max-w-full w-full py-10   flex flex-col  items-center justify-center'>
            <div className='hidden md:flex max-w-1/4 w-[1000px] py-2  flex-col gap-5 items-center justify-center'>
                
                <div className='w-full flex justify-center flex-row gap-2 items-end'> 
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
                                {error && <p className='text-red-500 text-center'>{error}</p>}
                                
                                <div className="grid gap-2">
                                    <Label className='text-lg'>Email</Label>
                                    <Input id="email" type="text" placeholder="you@mail.com" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} required className='bg-blue-50 text-lg placeholder:text-lg py-6' />
                                </div>

                                <div className="grid gap-2">
                                    <Label className='text-lg'>Username</Label>
                                    <Input id="username" type="text" placeholder="myUniqueUserName" value={username} onChange={(e)=>setUsername(e.target.value)} required className='bg-blue-50 text-lg placeholder:text-lg py-6' />
                                </div>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className='text-lg'>Password</Label>
                                    <Input  type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}  className='bg-blue-50 text-lg placeholder:text-lg py-6'/>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className='text-lg'>Confirm Password</Label>
                                    <Input  type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required  className='bg-blue-50 text-lg placeholder:text-lg py-6'/>
                                </div>
                                
                                <a onClick={handleLogin} className='w-full'>
                                    <Button className='w-full bg-green-600 text-white text-lg py-6 hover:bg-green-700'>
                                        SIGN UP
                                    </Button>
                                </a>
                                <a href='/login'><p className='text-base text-center pt-5 text-blue-600 hover:underline'>  Already have an account? Sign In. </p></a>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <main className="md:hidden w-full max-w-md px-4 py-10 mx-auto flex flex-col gap-5 items-center justify-center">
                <div className="w-full max-w-md px-4 py-2 mx-auto flex flex-col gap-2 items-center justify-center md:max-w-[400px]">
                    <div className="w-full flex justify-center md:justify-start gap-2 items-end">
                        <Image src={hb_logo} alt="hackbio-logo" height={50} width={50} />
                    </div>

                    <div className="w-full text-center ">
                        <p className="text-lg font-bold">HackBio</p>
                    </div>

                    <Card className="w-full border-none shadow-none">
                        <CardHeader className="text-center"></CardHeader>
                        <CardContent>
                        <form className="space-y-5">
                            {error && (
                            <p className="text-red-500 text-center">{error}</p>
                            )}

                            <div className="grid gap-2">
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="you@mail.com"
                                value={email}
                                onChange={(e) =>
                                setEmail((e.target as HTMLInputElement).value)
                                }
                                required
                                className="bg-blue-50 text-lg placeholder:text-lg py-6"
                            />
                            </div>

                            <div className="grid gap-2">
                            <Label htmlFor="username" className="text-lg">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="myUniqueUserName"
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

                            <div className="grid gap-2">
                            <Label htmlFor="confirmPassword" className="text-lg">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-blue-50 text-lg placeholder:text-lg py-6"
                            />
                            </div>

                            <Button
                            onClick={handleLogin}
                            className="w-full bg-green-600 text-white text-lg py-6 hover:bg-green-700"
                            >
                            SIGN UP
                            </Button>

                            <a href="/login">
                            <p className="text-base text-center pt-5 text-blue-600 hover:underline">
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