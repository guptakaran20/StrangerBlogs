import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../AppWrite/config";
import { Button, Container } from "../Components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

 const deletePost = async () => {
  try {
    // 1️⃣ Delete the post document
    const status = await appwriteService.deleteDocument(post.$id);

    if (status) {
      // 2️⃣ Delete associated image (ONLY if it exists)
      if (post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      navigate("/");
    }
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
};

    return post ? (
        <div className="py-8 pt-32 min-h-screen">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border border-slate-700 rounded-xl p-2 bg-slate-900/50 backdrop-blur-sm shadow-xl overflow-hidden group">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-auto max-h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">{post.title}</h1>
                    <div className="h-1 w-20 bg-blue-600 rounded-full mt-4 mx-auto md:mx-0"></div>
                </div>

                {isAuthor && (
                    <div className="flex gap-4 mb-6 justify-center md:justify-start">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg transition-transform hover:-translate-y-0.5 px-6">
                                Edit
                            </Button>
                        </Link>
                        <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform hover:-translate-y-0.5 px-6" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="browser-css text-slate-300 leading-relaxed text-lg px-2">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
