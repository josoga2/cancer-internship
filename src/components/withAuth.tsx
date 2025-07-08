'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants/constants'
import { jwtDecode } from "jwt-decode";


import { ReactNode } from "react";
import api from "@/api";

export default function withAuth({ children }: { children: ReactNode }) {
    return function AuthenticatedComponent() {
      const router = useRouter();
      const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
      
        
        useEffect(() => {
            auth().catch(() => setIsAuthorized(false) )
        }, [])

        useEffect(() => {
          if (isAuthorized === false) {
            router.replace("/login");
          }
        }, [isAuthorized, router]);


        const refreshToken = async () => {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN)

            try{
                const res = await api.post('api/auth/refresh/', {refresh: refreshToken})
                if( res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.access)
                    setIsAuthorized(true)
                }else{
                    setIsAuthorized(false)
                }
            } catch(error){
                console.log(error)
                setIsAuthorized(false)
            }
        };
        
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            if(!token){
                setIsAuthorized(false)
                return
            }
            const decoded = jwtDecode(token)
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration && tokenExpiration < now) {
                await refreshToken()
            } else{
                setIsAuthorized(true)
            }
        }

        if(isAuthorized === null){
            return(
                <div className="w-screen h-screen items-center justify-center flex flex-col"> 
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                </div>
            )
        }

        return isAuthorized ? <>{children}</> : null;
      
    };
  }