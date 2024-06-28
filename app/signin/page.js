'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Google from './google.jpeg';
export default function SignInPage() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleToggleMode = () => {
    setIsCreatingAccount((prev) => !prev);
  };

  const handleSignIn = () => {
    // Perform sign-in logic here
    // You can handle form submission or API calls for authentication
  };

  const handleGoogleSignIn = () => {
    // Perform Google sign-in or account creation logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md p-4 border border-gray-300 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">
          {isCreatingAccount ? 'Create Account' : 'Sign In'}
        </h2>

        {isCreatingAccount && (
          <div className="mb-4">
          <label className="block mb-2">User name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your username"
          />
        </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 w-full"
          onClick={handleSignIn}
        >
          {isCreatingAccount ? 'Create Account' : 'Sign In'}
        </button>

        <div className="flex justify-between items-center">
          <button
            className="text-white px-2 py-2 flex items-center border hover:border-blue-500 "
            onClick={handleGoogleSignIn}
          >
            <Image src={Google} alt="Google Icon" className="mr-2" width={64} height={64} />
          </button>
          <span >
            {isCreatingAccount ? "Already have an account? " : "Don't have an account? "}
            <span className="text-blue-500 cursor-pointer" onClick={handleToggleMode}>
            {isCreatingAccount ?"Sign In" : "Create one"}
          </span>
          </span>
        </div>
      </div>
    </div>
  );
}

