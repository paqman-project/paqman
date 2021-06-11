import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../img/logo.svg"
import logo2 from "../img/logo_v2.svg"
import ToggleButton from "../components/ToggleButton"

/**
 * This is PAQMANs header for all pages
 */
export default function Header() {
    const [hovering, setHovering] = useState(false)

    return (
        <div className="h-16 flex flex-row shadow-lg items-center left-0">
            <button
                type="button"
                classname="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white 
                hover:bg-gray-700 focus:outline-none  "
                aria-controls="mobile-menu"
                aria-expanded="false"
            >
                <span classname="sr-only">Open main menu</span>

                <svg
                    classname="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

                <svg
                    classname="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div classname="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">

                <div classname="flex-shrink-0 flex items-center">
                    <img classname="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                    <img classname="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
                </div>

                <div classname="hidden sm:block sm:ml-6">
                    <div classname="flex space-x-4">
                        <a href="#" classname="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
                        <a href="#" classname="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
                        <a href="#" classname="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                        <a href="#" classname="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
                    </div>
                </div>
            </div>

            <div classname="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button classname="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span classname="sr-only">View notifications</span>
     
          <svg classname="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div classname="ml-3 relative">
          <div>
            <button type="button" classname="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span classname="sr-only">Open user menu</span>
              <img classname="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </button>
          </div>

        
          <div classname="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a href="#" classname="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
            <a href="#" classname="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
            <a href="#" classname="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
          </div>
        </div>
      </div>





            <Link to="/">
                <div
                    onMouseOver={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {hovering ? (
                        <img
                            src={logo2}
                            width="300px"
                            alt="PAQMAN Logo"
                            className="p-6"
                        />
                    ) : (
                        <img
                            src={logo}
                            width="300px"
                            alt="PAQMAN Logo with Slogan"
                            className="p-6"
                        />
                    )}
                </div>
            </Link>
        </div>
    )
}
