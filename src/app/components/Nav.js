"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
    return (
        <div>
            <nav className='flex flex-row justify-between bg-black  h-16 p-1 sticky top-0 z-10'>
                {/* Logo div */}
                <div className='-mt-2.5'>
                    <Image
                        height={80}
                        width={110}
                        src={'/nav/logo.png'}
                        alt='Logo'
                    />
                </div>

                {/* div containing other nav items */}
                <div className='flex flex-row justify-between md:pr-10 relative'>
                    {/* hamburger */}
                    <div className='hover:cursor-pointer'>
                        <button 
                            className='mt-3.5 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                        
                        {/* Dropdown menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <Link href="/routes/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Login
                                </Link>
                                <Link href="/routes/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Dashboard
                                </Link>
                                <Link href="/routes/mint" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    New report
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}
