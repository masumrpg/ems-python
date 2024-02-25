"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";

// icons
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { BsFillBellFill, BsBell } from "react-icons/bs";
import { TbMailFilled, TbMail } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { PiNotepadFill, PiNotepad } from "react-icons/pi";

// type Props = {};

interface SideNavItemType {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

const sidebarItmes: SideNavItemType[] = [
  {
    icon: {
      icon: <GoHome />,
      fillIcon: <GoHomeFill />,
    },
    label: "Home",
    href: "/dashboard",
  },
  {
    icon: {
      icon: <CiSearch />,
      fillIcon: <FiSearch />,
    },
    label: "Explore",
    href: "/attendance",
  },
  {
    icon: {
      icon: <BsBell />,
      fillIcon: <BsFillBellFill />,
    },
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: {
      icon: <TbMail />,
      fillIcon: <TbMailFilled />,
    },
    label: "Messages",
    href: "/messages",
  },
  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    label: "Lists",
    href: "/lists",
  },

  {
    icon: {
      icon: <HiOutlineUsers />,
      fillIcon: <HiUsers />,
    },
    label: "Communities",
    href: "/communities",
  },

  {
    icon: {
      icon: <BiUser />,
      fillIcon: <BiSolidUser />,
    },
    label: "Profile ",
    href: "/profile",
  },
];
export default function Sidebar({
  className,
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={cn(
        "min-h-screen h-full overflow-y-auto overflow-x-hidden py-6 px-2 w-fit flex flex-col gap-3 border-r-[1px] dark:border-[#1F2937]",
        className,
        isSidebarOpen && "md:w-fit"
      )}
    >
      {/* logo */}
      <HoverContainer>
          <Link href={"/"}>
            <FaXTwitter className="text-3xl" />
          </Link>

      </HoverContainer>

      {/* sidenavitems */}

      {sidebarItmes.map((d, i) => (
        <HoverContainer key={i}>
          <SideNavItem
            icon={d.icon}
            href={d.href}
            isSidebarOpen={isSidebarOpen}
            label={d.label}
          />
        </HoverContainer>
      ))}

      {/* toggle button  */}
      <section
        className={cn(
          "hidden md:flex w-ful  justify-end",
          !isSidebarOpen && "justify-start"
        )}
      >
        <HoverContainer>
          <RiArrowLeftDoubleFill
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={cn(
              "text-gray-400 transition-all text-3xl",
              !isSidebarOpen && "rotate-180"
            )}
          />
        </HoverContainer>
      </section>
    </div>
  );
}

function SideNavItem({
  href,
  isSidebarOpen,
  icon,
  label,
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const [animationParent] = useAutoAnimate();
  const location = usePathname();
  const isActivePage = location == href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center cursor-pointer"
    >
      {/* icon */}
      <div className="w-full h-auto text-3xl">
        {/* <FaXTwitter /> */}
        {isActivePage ? icon?.fillIcon : icon?.icon}
      </div>
      {/* label */}
      {isSidebarOpen && (
        <p
          className={cn(
            "text-md hidden md:block pr-4  transition-all ",
            isActivePage && "font-bold"
          )}
        >
          {label}
        </p>
      )}
    </Link>
  );
}

function HoverContainer({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="p-3 transition-all rounded-full cursor-pointer hover:bg-gray-200 w-fit dark:hover:bg-zinc-900 group-hover:dark:bg-zinc-900 group-hover:bg-gray-200 ">
      {children}
    </div>
  );
}
