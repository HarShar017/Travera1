'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Transition } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Discover', href: '#discover' },
  { name: 'Plan a Trip', href: '#plan' },
  { name: 'Features', href: '#features' },
]

const moreLinks = [
  { name: 'Tech', href: '#tech' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Contact Us', href: '#contact' },
  { name: 'Help', href: '#help' },
]

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20)
    })
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              TravelAI
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              
              <Menu as="div" className="relative">
                <Menu.Button className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                  More
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {moreLinks.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={`${
                                active
                                  ? 'bg-gray-100 dark:bg-gray-700'
                                  : ''
                              } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 