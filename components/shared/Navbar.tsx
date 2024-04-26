import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { MobileNav, NavItems } from ".";

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
      <div className='wrapper flex-between'>
        <Link href='/' className='w-44'>
          <Image
            src='/assets/icons/textLogo.svg'
            width={200}
            height={200}
            alt='Project Logo'
          />
        </Link>

        <SignedIn>
          <div className='lg:flex-between hidden w-full max-w-xs'>
            <NavItems />
          </div>
        </SignedIn>

        <div className='flex w-32 justify-end gap-3 '>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Link
              href='/sign-in'
              className='flex-center button-shadow button-primary'
            >
              Login
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
