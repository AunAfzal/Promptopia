"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "./logo.svg";
import Link from "next/link";
import Pfp from "./pfp.jpg";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const router = useRouter();

  const { user} = useUser();

  

  // Ensure useEffect only runs when user changes (prevents unnecessary re-renders)
  useEffect(() => {
    setIsSignedIn(user); // Convert user object to boolean for state
  }, [user]);  // Dependency array: Only re-run when user changes

  const handleSignInToggle = async () => {
    if (isSignedIn) {
      // Logout on sign out click
      try {
        await router.push("/api/auth/logout");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      // Redirect to login on sign in click
      router.push("/api/auth/login");
    }
  };

  const handleCreatePostToggle = () => {
    setIsCreatePostVisible((prev) => !prev);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className="transition-all duration-300 fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-white text-black z-10"
      >
        <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              alt="Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-xl font-semibold">Promptopia</span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            className={`rounded-full px-4 py-2 transition-colors duration-300 ${
              isSignedIn ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={handleSignInToggle}
          >
            {isSignedIn ? "Sign Out" : "Sign In"}
          </button>

          {isSignedIn && (
            <Link href={isCreatePostVisible ? "/" : "/create"} passHref>
              <button
                className={`rounded-full px-4 py-2 transition-colors duration-300 ${
                  isCreatePostVisible ? "bg-white text-black" : "bg-black text-white"
                }`}
                onClick={handleCreatePostToggle}
              >
                Create Post
              </button>
            </Link>
          )}

          {isSignedIn && (
            <Link href="/profile" passHref className="bg-gray-800 rounded-full p-1">
                {user && (
                  <img
                    src={user.picture}
                    className="rounded-full w-8 h-8 object-cover"
                    alt="Profile Picture"
                  />
                )}
            </Link>
          )}
        </div>
      </nav>
    </div>

  );
}
