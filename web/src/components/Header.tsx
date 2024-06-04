'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { NavItems } from '../domain/Nav';
import useDeployment from '../hooks/useDeployment';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import logo from '../images/logo-unopt.svg';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { deploy } = useDeployment();
  const pathname = usePathname();

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className='absolute top-0 z-50 w-full'>
      <div className='px-6 pt-4 mx-auto md:pt-8 lg:px-12 flex items-center justify-between text-offwhite'>
        <nav className='items-center flex gap-3 p-2'>
        {/* <nav className='items-center flex gap-3 p-2 border-b-2 border-white pr-24 md:pr-12 lg:pr-20'> */}
          <Link href='/'>
            <div className='text-3xl font-bold leading-loose text-white uppercase cursor-pointer'>
              {/* {deploy.displayName} */}
              <Image src={logo} width={90} height={90} alt='logo' />
            </div>
          </Link>

          <ul className='mt-5 hidden md:text-lg lg:text-xl tracking-wider uppercase text-offwhite md:flex md:gap-2 lg:gap-6 pl-4 '>
            {NavItems.map((element, i) => {
              return (
                <Fragment key={i}>
                  <li key={i}>
                    <Link href={element.href}>
                      <div className={"relative cursor-pointer " + (pathname.includes(element.label) ? "underline underline-offset-8" : "")}>
                        {element.label}
                      </div>
                    </Link>
                  </li>

                  <div className='' >/</div>

                </Fragment>
              );
            })}

            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.playtavern.com"
              >
                <div className="relative cursor-pointer">
                  docs
                  <ArrowUpRightIcon
                    className="w- h-3 mb-4 "
                    style={{ display: "inline" }}
                  />
                </div>
              </a>
            </li>
          </ul>
        </nav>
        <div className='flex'>
          <div className='self-center md:hidden'>
            <button
              onClick={() => {
                handleMobileNavClick();
              }}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect y='6' width='24' height='2' fill='white'></rect>
                <rect y='11' width='24' height='2' fill='white'></rect>
                <rect y='16' width='24' height='2' fill='white'></rect>
              </svg>
            </button>
            {isMobileNavOpen ? (
              <>
                <MobileNav onClick={handleMobileNavClick} />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className='text-offwhite relative hidden py-1.5 md:block '>
            <ConnectButton
              chainStatus='icon'
              accountStatus='address'
              showBalance={false}
            />
            
          </div>
        </div>
      </div>

    </header>
  );
}
