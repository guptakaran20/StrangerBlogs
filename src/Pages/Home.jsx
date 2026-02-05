import React, { useEffect, useState } from "react";
import { Container, PostCard, EmptyState } from "../Components/index.js";
import appwriteservice from "../AppWrite/config.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Query } from "appwrite";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

useEffect(() => {
  appwriteservice.getPosts([
    Query.equal("status", "active")
  ]).then((data) => {
    if (data) {
      setPosts(data.documents);
    }
  });
}, []);


  if (!authStatus) {
    return (
      <div className="w-full bg-slate-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>

          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Share your story with the world.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join a community of writers and readers. Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/signup" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get started
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-white">
                Log in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="py-24 sm:py-32 bg-slate-900 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-400">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to blog
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A simple, elegant, and powerful blog platform for everyone.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {[
                  { name: 'Create', description: 'Write and publish your thoughts clearly and efficiently.' },
                  { name: 'Connect', description: 'Engage with a community of like-minded individuals.' },
                  { name: 'Discover', description: 'Find new perspectives and ideas every day.' },
                  { name: 'Share', description: 'Easily share your content across platforms.' },
                ].map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-white">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                        {/* Icon placeholder */}
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.235-7.5.217V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className='w-full py-8 pt-32 min-h-screen'>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 px-2">
          <div className="relative">
            <h1 className="text-3xl font-bold text-white mb-2">Home Feed</h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            <p className="text-slate-400 mt-2 text-sm">
              Discover latest posts from the community
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-1/3 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search home feed..."
              className="
                block w-full pl-10 pr-3 py-2.5 
                border-none
                rounded-xl
                leading-5 
                bg-slate-800/50 
                text-slate-100 
                placeholder-slate-500 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500/50 
                focus:bg-slate-800
                transition-all duration-300
                shadow-inner
                "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className='flex flex-wrap -mx-2'>
            {filteredPosts.map((post) => (
              <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/4 animate-in fade-in zoom-in duration-500'>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message={searchQuery ? `No results for "${searchQuery}"` : "No posts found"}
            actionText={searchQuery ? "Clear Search" : "Create Post"}
            actionLink={searchQuery ? null : "/add-post"}
          >
          </EmptyState>
        )}

        {searchQuery && filteredPosts.length === 0 && (
          <div className='flex justify-center mt-4'>
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Clear search
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
