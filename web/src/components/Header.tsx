'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { NavItems } from '../domain/Nav';
import useDeployment from '../hooks/useDeployment';
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { deploy } = useDeployment();
  const pathname = usePathname();

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className='absolute top-0 z-50 w-full font-anon '>
      <nav className='px-6 pt-4 pb-12 mx-auto md:pt-8 lg:px-12 xl:px-6'>
        <div className='flex items-center justify-between text-offwhite'>
          <div className='items-center flex-shrink-0 gap-3 p-2 '>
            <Link href='/'>
              <div className='text-3xl font-bold leading-loose text-white uppercase cursor-pointer'>
                {deploy.displayName}
              </div>
            </Link>
          </div>

          <nav>
            <ul className='hidden text-sm tracking-wider uppercase text-offwhite lg:flex lg:flex-wrap lg:gap-8'>
              {NavItems.map((element, i) => {
                return (
                  <Fragment key={i}>
                    <li key={i}>
                      <Link href={element.href}>
                        <div className={"relative cursor-pointer " + (pathname.includes(element.label) ? "underline underline-offset-8" : "")}>
                        {element.label} 
                          {/* {element.label} <span>{pathname.includes(element.label) ? 'together' : ''}</span> */}
                        </div>
                      </Link>
                    </li>
                    
                      <div className='border-r-2' />
                    
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
                      className="w-4 h-4 mb-1 -ml-1"
                      style={{ display: "inline" }}
                    />
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <div className='flex'>
            <div className='self-center lg:hidden'>
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
            <div className='text-offwhite relative hidden py-1.5 lg:block'>
              <ConnectButton
                chainStatus='icon'
                accountStatus='address'
                showBalance={false}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
