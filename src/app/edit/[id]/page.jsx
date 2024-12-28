"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use } from 'react'


function EditPostPage({ params }) {

    const { id } = use(params);

    const [postData,setPostData] = useState("");

    //New Data of Post
    const [newTitle,setNewTitle] = useState("");
    const [newImg,setNewImg] = useState("");
    const [newContent,setNewContent] = useState("");


    const router = useRouter();

    const getPostByID = async (id) => {
        try{
            const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
                method: "GET",
                cache: "no-store"
            })

            if(!res.ok){
                throw new Error("Failed to fetch a post")
            }

            const data = await res.json();
            setPostData(data.post)

            setNewTitle(data.post.title)
            setNewImg(data.post.img)
            setNewContent(data.post.content)



        }catch(error){
            console.log("Error from Edit Page :",error)
        }
    }

    useEffect(()=>{
        getPostByID(id);
    },[])

    const handleSubmit = async(e)=> {
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
                method :"PUT",
                header: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({newTitle , newImg, newContent})
            })

            if(!res.ok){
                console.log("failed to Update")
            }

            router.refresh();
            router.push('/');

        }catch(error){

        }
    }

  return (
    <div className='container mx-auto py-10 '>
        <h3 className='text-3xl font-bold'>Edit Post</h3>
        <hr className='my-3'/>
        <Link href='/' className='bg-gray-500 inline-block text-white border py-3 px-2 rounded my-2'>Go Back</Link>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <input 
                type="text" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                value={newImg}
                onChange={(e) => setNewImg(e.target.value)}
            />
            <textarea onChange={(e) => setNewContent(e.target.value)} name="" id="" cols="30" rows="10" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                value={newContent}>
            </textarea>
            <button 
                type="submit" 
                className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit Post
            </button>

        </form>

        
    </div>
  )
}

export default EditPostPage