import { connectMongoDB } from "../../../../lib/mongodb.js";
import Post from "../../../../models/post.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {title, img, content} = await req.json();
    console.log(title, img, content)
    await connectMongoDB();
    await Post.create({ title, img, content })
    return NextResponse.json({ message: "Post Created"}, {status:201});
}

export async function GET(){
    await connectMongoDB();
    const posts = await Post.find({});
    return NextResponse.json({posts});
}