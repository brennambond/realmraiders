import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className='bg-slate-800 text-white'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row '>
        <Link href='/' className='w-44'>
          <Image
            src='/assets/icons/textLogo.svg'
            alt='logo'
            width={200}
            height={200}
          />
        </Link>

        <p>2024 Realm Raiders. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
