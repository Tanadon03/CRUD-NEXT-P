import { connectMongoDB } from "../../../../../lib/mongodb.js";
import Post from "../../../../../models/post.js";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({_id:id})
    return NextResponse.json({ post }, {status:200})
}

export async function PUT(req , {params}){
    const {id} = params;
    const { newTitle:title, newImg:img, newContent:content } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, {title,img,content});
    return NextResponse.json({message:"Post Updated"}, {status:200});
}