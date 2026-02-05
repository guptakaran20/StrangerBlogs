import React, { useState } from 'react'
import { Container, Button, Input } from '../Components/index.js'
import { useForm } from 'react-hook-form'
import appwriteService from "../AppWrite/config.js";

function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const [error, setError] = useState("");

    const submit = async (data) => {
        try {
            await appwriteService.submitContact(data);
            setSubmitted(true);
            reset();
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <div className='py-8 pt-30 w-full min-h-[80vh] flex items-center justify-center'>
            <Container>
                <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">

                    {/* Decorative background glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                        <p className="text-slate-400">Have a question or just want to say hi? We'd love to hear from you.</p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    {submitted ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-8 rounded-xl text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                            <p>Thank you for reaching out. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(submit)} className="space-y-6 relative z-10 text-left">
                            <Input
                                label="Name"
                                placeholder="Your Name"
                                className="bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
                                labelClassName="text-slate-300 font-medium mb-1 block"
                                {...register("name", { required: true })}
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
                                labelClassName="text-slate-300 font-medium mb-1 block"
                                {...register("email", { required: true })}
                            />
                            <div>
                                <label className='inline-block mb-1 pl-1 text-slate-300 font-medium'>Message</label>
                                <textarea
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:bg-slate-800 focus:border-blue-500 outline-none duration-200 resize-none min-h-[150px]"
                                    placeholder="Write your message here..."
                                    {...register("message", { required: true })}
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-none"
                            >
                                Send Message
                            </Button>
                        </form>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Contact
