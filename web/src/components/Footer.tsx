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

export default function Footer() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { deploy } = useDeployment();
  const pathname = usePathname();

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className='py-48 w-full mt-8 font-signika'>
      <div className='flex px-6 lg:px-16 min-h-[18] items-center flex-shrink-0 flex-col justify-center'>
        <div className='flex items-center self-stretch justify-between'>
          <div className='flex items-start'>
            <Link href='/'>
              <div className='text-8xl text-tavernGreen font-outfit'>
                Tavern
              </div>
              <div className='uppercase mx-5 text-subtext text-xl'>enter as strangers leave as friends</div>

            </Link>
          </div>

        </div>
      </div>

    </header>
  );
}
