import { Search } from './Search';
import React from "react";
import Image from 'next/image';

export function TopNav({}) {
  return (
    <header className="sticky top-0 z-10 navbar bg-base-100 drop-shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl border-zinc-300">
          <Image
            alt="Logo"
            src='/logo-transparent.png'
            className='-mt-1 -ml-1'
            width={50}
            height={50}
          />
          SlopeFinder
        </a>
      </div>
      <div className="w-5/12 h-full flex-none gap-2">
        <Search className="w-full h-4/5"/>
        {/* <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" width={40} height={40} />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div> */}
      </div>
    </header>
  );
}