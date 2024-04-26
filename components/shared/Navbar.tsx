import Image from "next/image";
import Link from "next/link";

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

        <div className='flex w-32 justify-end gap-3 '>
          <p>Login</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
