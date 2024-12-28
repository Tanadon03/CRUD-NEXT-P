"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function  CreatePostPage() {
    const [title,setTitle] = useState("");
    const [img,setImg] = useState("");
    const [content,setContent] = useState("");

    const router = useRouter(); 

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!title || !img || !content){
            alert('Please complete all input')
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, img, content }),
            });
        
            if (res.ok) {
                console.log("Post created successfully");
                router.push("/"); // Redirect to home page
            } else {
                const errorMessage = await res.text(); // Get backend error message
                console.error("Backend error:", errorMessage);
                throw new Error("Failed to create a post");
            }
        } catch (error) {
            console.error("Error creating post:", error.message);
        }
        
    }
    

  return (
    <div className='container mx-auto py-10 '>
        <h3 className='text-3xl font-bold'>Create Post</h3>
        <hr className='my-3'/>
        <Link href='/' className='bg-gray-500 inline-block text-white border py-3 px-2 rounded my-2'>Go Back</Link>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='Post Title'
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                type="text" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='Post Img URL'
                onChange={(e) => setImg(e.target.value)}
            />
            <textarea onChange={(e) => setContent(e.target.value)} name="" id="" cols="30" rows="10" 
                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='Enter Your Content'>
            </textarea>
            <button 
                type="submit" 
                className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Create Post
            </button>

        </form>

        
    </div>
  )
}

export default CreatePostPage