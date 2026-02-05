import React from 'react';

function Loader() {
    return (
        <div className='min-h-screen flex justify-center items-center bg-[#0e121c]'>
            <div className='relative w-24 h-24'>
                <div className='absolute top-0 left-0 w-full h-full border-4 border-slate-700/50 rounded-full'></div>
                <div className='absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin'></div>
                <div className='absolute inset-0 flex items-center justify-center font-bold text-blue-500 text-sm animate-pulse'>
                    Loading...
                </div>
            </div>
        </div>
    );
}

export default Loader;
