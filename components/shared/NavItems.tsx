"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className='lg:flex-center flex w-full flex-col items-start gap-12 lg:flex-row text-primary-50'>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-[#9fc8f2] font-extrabold "
            }  flex-center font-medium whitespace-nowrap  hover:text-[#9fc8f2] tracking-wider  text-[16px] leading-3`}
          >
            <Link className='capitalize' href={link.route}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
