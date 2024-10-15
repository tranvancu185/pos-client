import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Error501DarkIMG from 'src/assets/images/error/503-dark.svg'
import Error501LightIMG from 'src/assets/images/error/503-light.svg'
import useLayoutStore from 'src/stores/layoutStore'

const Error503 = () => {
  const themeConfig = useLayoutStore((state) => state)
  const { setPageTitle, isDark } = themeConfig

  useEffect(() => {
    setPageTitle('Error 503')
  }, [setPageTitle])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
        <div className="relative">
          <img
            src={isDark ? Error501DarkIMG : Error501LightIMG}
            alt="503"
            className="mx-auto w-full max-w-xs object-cover md:max-w-xl"
          />
          <p className="mt-5 text-base dark:text-white">Service Unavailable!</p>
          <Link
            to="/"
            className="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error503
