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
      <nav className='mx-auto px-6 pb-12 pt-4 md:pt-8 lg:px-12 xl:px-6'>
        <div className='text-offwhite flex items-center justify-between'>
          <div className='flex-shrink-0 items-center gap-3 p-2 '>
            <Link href='/'>
              <div className='cursor-pointer text-3xl font-bold uppercase leading-loose text-white'>
                {deploy.displayName}
              </div>
            </Link>
          </div>

          <nav>
            <ul className='text-sm text-offwhite hidden uppercase tracking-wider lg:flex lg:flex-wrap lg:gap-8'>
              {NavItems.map((element, i) => {
                return (
                  <Fragment key={i}>
                    <li key={i}>
                      <Link href={element.href}>
                        <div className={"relative cursor-pointer " + (pathname.includes(element.label) ? "underline" : "")}>
                          {element.label} <span>{pathname.includes(element.label) ? 'together' : ''}</span>
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
                  href="https://docs.playmint.app"
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
