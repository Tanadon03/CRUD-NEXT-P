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
      <h1>NextJS CRUD + MongoDB</h1>
      <hr className='m-3'/>
      <button className='bg-green-500 text-white rounded px-2 py-1'><Link href="/create">Create Post</Link></button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map(val =>(
            <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
              <h4>{val.title}</h4>
              {/* <img src={val.img} alt='img'/> */}
              <Image src={val.img} width={300} height={0} alt={val.title}/>
              <p>{val.content}</p>
              <div className="mt-5">
                <Link className='bg-gray-500 text-white border py-1 px-2 rounded-md text-lg my-2' href={`/edit/${val._id}`}>Edit</Link>
                <Link className='bg-red-500 text-white border py-1 px-2 rounded-md text-lg my-2' href="/delete">Delete</Link>
              </div>
            </div>  

            // <div key={val._id} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            //     <a href="#">
            //         <img class="rounded-t-lg" src={val.img} alt={val.title} />
            //     </a>
            //     <div class="p-5">
            //         <a href="#">
            //             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{val.title}</h5>
            //         </a>
            //         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{val.content}</p>
            //         {/* <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            //             Read more
            //             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            //             </svg>
            //         </a> */}
            //         <div>
            //           <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" href={`/edit/${val._id}`}></button>
            //           <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="/delete">Default</button>
            //         </div>
            //     </div>
            // </div>

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
