import React from 'react'
import { Container } from '../Components/index.js'

function About() {
    return (
        <div className='py-8 pt-32 w-full min-h-screen'>
            <Container>
                <div className="w-full max-w-4xl mx-auto space-y-12">

                    {/* Header Section */}
                    <div className="text-center relative">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            About <span className="text-blue-500">StrangerBlogs</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            A community-driven platform for thinkers, writers, and storytellers to share their ideas with the world.
                        </p>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
                    </div>

                    {/* Mission Card */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            We believe that everyone has a story to tell. StrangerBlogs was built to provide a clean, modern, and distraction-free environment for reading and writing. Whether you're sharing technical expertise, personal journeys, or creative fiction, our platform is designed to make your words shine.
                        </p>
                    </div>

                    {/* Stats / Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Open Platform", desc: "No gatekeepers. Write what matters to you." },
                            { title: "Modern Design", desc: "A sleek reading experience for your audience." },
                            { title: "Community", desc: "Connect with like-minded readers and writers." }
                        ].map((item, index) => (
                            <div key={index} className="p-6 rounded-xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm hover:bg-slate-800/50 transition-colors">
                                <h3 className="text-xl font-semibold text-blue-400 mb-2">{item.title}</h3>
                                <p className="text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quote */}
                    <div className="text-center py-12 border-t border-slate-800">
                        <blockquote className="text-2xl italic text-slate-300 font-light">
                            "Writing is the painting of the voice."
                        </blockquote>
                        <cite className="block mt-4 text-slate-500 font-medium not-italic">— Voltaire</cite>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default About
