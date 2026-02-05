import React from "react";
import appwriteService from "../AppWrite/config";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="
    group
    block
    rounded-xl
    overflow-hidden
    bg-slate-800
    border border-slate-600/50
    shadow-lg shadow-black/20
    transition-all duration-300
    hover:shadow-2xl
    hover:shadow-blue-500/20
    hover:border-blue-500/50
    hover:-translate-y-1
    h-full
    flex flex-col
  "
    >
      <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
        <img
          src={
            featuredImage
              ? appwriteService.getFilePreview(featuredImage)
              : "/test.jpg"
          }
          alt={title}
          className="
        w-full
        h-full
        object-cover
        transition-transform duration-500
        group-hover:scale-105
      "
        />
      </div>

      <div className="p-5 flex-grow">
        <h2
          className="
        text-lg
        font-semibold
        text-slate-100
        leading-snug
        line-clamp-2
        transition-colors
        group-hover:text-blue-400
      "
        >
          {title}
        </h2>
        <div className="mt-4 flex items-center text-sm text-slate-400 group-hover:text-blue-300 transition-colors">
          Read more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
