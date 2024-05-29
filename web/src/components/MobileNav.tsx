import Image from 'next/image';
import Link from 'next/link';
import logo from '../images/logo-unopt.svg';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { NavItems } from '../domain/Nav';
import { Fragment } from 'react';

type MobileNavProps = {
  onClick: () => void;
};

export default function MobileNav(props: MobileNavProps) {
  return (
    <div className='navbar-menu fixed bottom-0 left-0 top-0 z-40 w-1/2 max-w-sm'>
      <div
        className='bg-slate-600 navbar-backdrop fixed inset-0 opacity-50'
        onClick={props.onClick}
      ></div>
      <nav className='bg-slate-900 relative flex h-full w-full flex-col overflow-y-auto border-r px-10 py-8'>
        <Link href='/'>
          <span className='font-anon mb-16 inline-block text-xl font-medium text-white'>
            <Image width={45} height={45} src={logo} alt='logo' />
          </span>
        </Link>
        <ul className='b-32 font-anon gap-8 uppercase tracking-wider'>
          {NavItems.map((element, i) => {
            return (
              <Fragment key={i}>
                <li key={i}>
                  <Link href={element.href}>
                    <div className='relative cursor-pointer pb-8'>
                      {element.label}
                    </div>
                  </Link>
                </li>
              </Fragment>
            );
          })}

          {/* <li className='pb-8 '>
            <a
              href='https://warpcast.com/gn0madic'
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className='relative cursor-pointer'>warpcast</div>
            </a>
          </li> */}
          {/* 
          <li className='pb-8'>
            <a
              href='https://discord.gg/pP2G7sY7GY'
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className='relative cursor-pointer'>discord</div>
            </a>
          </li> */}

          <li className=''>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.playtavern.com"
            >
              <div className="relative text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                docs
                <ArrowUpRightIcon
                  className="w-4 h-4 mb-1 -ml-1"
                  style={{ display: "inline" }}
                />
              </div>
            </a>
          </li>
        </ul>
        <div className='mb-8 flex transform items-center justify-center py-4 pt-16 duration-200'>
          <ConnectButton
            chainStatus='icon'
            accountStatus='avatar'
            showBalance={false} />
        </div>
      </nav>
    </div>
  );
}
