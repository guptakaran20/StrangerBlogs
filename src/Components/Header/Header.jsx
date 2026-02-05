import React, { useState } from "react";
import { Container, LogoutBtn } from "../index.js";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navitems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Contact Us", slug: "/contact", active: true },
  ];

  const handleNavClick = (slug) => {
    navigate(slug);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <Container>
        <nav
          className="
            relative
            flex items-center justify-between
            h-[60px] sm:h-[72px] px-4 sm:px-8
            rounded-full
            bg-slate-900/80 backdrop-blur-md
            border border-slate-700/50
            shadow-lg
          "
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/Gemini_Generated_Image_7tdy2l7tdy2l7tdy.png"
              alt="logo"
              className="
                h-8 w-8
                sm:h-10 sm:w-10
                lg:h-12 lg:w-12
                rounded-full
                object-cover
                border-2 border-slate-700
              "
            />
            <span
              className="
                hidden sm:inline-block
                text-slate-100 tracking-wide
                text-lg font-semibold
                ml-2
              "
            >
              StrangerBlogs
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-2">
            {navitems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className={`
                        px-4 py-2 rounded-full transition text-sm font-medium
                        ${location.pathname === item.slug
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }
                      `}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-xl flex flex-col gap-2 md:hidden">
              {navitems.map((item) => item.active && (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.slug)}
                  className={`
                            w-full text-left px-4 py-3 rounded-xl transition
                            ${location.pathname === item.slug
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                          `}
                >
                  {item.name}
                </button>
              ))}
              {authStatus && (
                <div className="mt-2 pt-2 border-t border-slate-700">
                  <LogoutBtn />
                </div>
              )}
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
