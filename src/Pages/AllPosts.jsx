import React, { useEffect, useState } from "react";
import appwriteservice from "../AppWrite/config.js";
import { Container, PostCard, EmptyState, Loader } from "../Components/index.js";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (userData) {
      appwriteservice.getUserPosts(userData.$id).then((data) => {
        if (data) {
          setPosts(data.documents);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [userData]);

  if (loading) return <Loader />;

  return (
    <div className="w-full py-8 pt-32 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 px-2">
          <div className="relative">
            <h1 className="text-3xl font-bold text-white mb-2">My Posts</h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            <p className="text-slate-400 mt-2 text-sm">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
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
              placeholder="Search posts..."
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
          <div className="flex flex-wrap -mx-2 transition-all duration-500">
            {filteredPosts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4 animate-in fade-in zoom-in duration-500">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message={searchQuery ? `No results for "${searchQuery}"` : "You haven't posted anything yet"}
            actionText={searchQuery ? "Clear Search" : "Create Post"}
            actionLink={searchQuery ? null : "/add-post"}
          />
        )}

        {/* Reset Search Button Logic if needed via EmptyState prop hack or just handle it here */}
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

export default AllPosts;
