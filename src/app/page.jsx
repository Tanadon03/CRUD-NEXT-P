"use client"

import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const [postData,setPostData] = useState([]);

  console.log(postData)

  const getPost = async() =>{
    try{
      const res = await fetch("http://localhost:3000/api/posts",{
        method:"GET",
        cache:"no-store"
      })

      if(!res.ok){
        throw new Error("Failed to fetch post")
      }

      const data  = await res.json();
      setPostData(data.posts)


    }catch(error){
      console.log("Error Loading Post")
    }
  }

  useEffect(() => {
    getPost();
  },[])


  return (
    <div className='container mx-auto my-3'>
      <h1 className='text-3xl font-bold my-10'>NextJS CRUD + MongoDB</h1>
      <hr className='m-3'/>
      <button className='bg-green-500 text-white rounded px-3 py-2 float-right'><Link href="/create">Create Post</Link></button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map(val =>(
            <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
              <h4 className='font-bold text-xl mb-3'>{val.title}</h4>
              {/* <img src={val.img} alt='img'/> */}
              <Image src={val.img} width={300} height={0} alt={val.title}/>
              <p>{val.content}</p>
              <div className="mt-5">
                <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2 mr-2 ' href={`/edit/${val._id}`}>Edit</Link>
                <Link className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2' href="/delete">Delete</Link>
              </div>
            </div>  
          ))
        ) : (
          <p className="bg-gray-300 p-3 my-3">
            You do not have any post yet.
          </p>
        )}
      </div>
    </div>
  );
}
