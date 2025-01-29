"use client"
import {useState,useEffect} from 'react'
import { User } from '../types/user-account';
interface FetchGetUserPageProps{
    username:string;
}
const useGetUserPage = (props:FetchGetUserPageProps | null) => {
  const [error,setError] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const [data,setData] = useState<User | null>(null);
  useEffect(() => {
    if(!props?.username) return;
    const fetchUser = async() =>{
        setLoading(true);
        try {
            const response = await fetch('/api/get-user-page',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'username':props.username
                    },
                }
            )
            if(!response.ok){
                throw new Error(`HTTP Error, status: ${response.statusText}`)
            }
            const result = await response.json();
            if(result.status === 404){
                setError('User not found')
            }
            setData(result.fetchedUser)
        } catch (error) {
            const err = error as Error;
            setError(`Error: ${err.message}`)
        }finally{
            setLoading(false)
        }
    }
    fetchUser();
  }, [props?.username])
  
  return {
    error,
    loading,
    data,
  }
}

export default useGetUserPage