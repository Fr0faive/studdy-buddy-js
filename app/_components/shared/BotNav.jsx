"use client";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoChatbubble, IoPerson } from "react-icons/io5";

export default function BotNav() {
  const pathname = usePathname();
  const listNav = [
    {
      name: "Home",
      path: "/",
      component: <FaHome />,
    },
    {
      name: "Course",
      path: "/course",
      component: <FaBookOpen />,
    },
    {
      name: "Chat",
      path: "/chat",
      component: <IoChatbubble />,
    },
    {
      name: "Profile",
      path: "/profile",
      component: <IoPerson />,
    },
  ];
  return (
    <nav className="fixed bottom-0 w-[390px] p-3 bg-[#00707E]">
      <ul className="flex flex-row gap-16 justify-center w-full p-1 items-center">
        {listNav.map((data) => (
          <li
            className={`text-3xl ${
              pathname === data.path && "bg-white p-1 rounded-lg"
            }`}
            key={data.name}
          >
            <a href={data.path}>{data.component}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
