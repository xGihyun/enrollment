import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { IconContext } from "react-icons";
import { MdSpaceDashboard } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import Dropdown from "./Dropdown";

const ROUTES = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  // {
  //   name: "History",
  //   path: "/history",
  //   icon: <MdSpaceDashboard />,
  // },
];

export default function Sidebar({ user }: { user: User }) {
  const name = `${user.first_name} ${user.last_name}`;

  return (
    <aside className="fixed inset-y-0 left-0 h-full w-60 p-4 bg-white border-r text-black border-gray-200 flex flex-col">
      <div className="flex justify-center mb-10">
        <img
          src="/images/pcsLogoNew.webp"
          alt="PCS Logo"
          className="w-20 h-20"
        />
      </div>

      <nav className="flex flex-col gap-2">
        {ROUTES.map((route) => {
          const isCurrentPath = window.location.pathname === route.path;

          return (
            <Link
              href={route.path}
              key={route.path}
              className={`flex gap-2 items-center ${isCurrentPath ? "text-black" : "text-muted-foreground"}`}
            >
              <IconContext.Provider value={{ className: "w-6 h-6" }}>
                {route.icon}
              </IconContext.Provider>
              <span className="text-sm md:text-base lg:text-lg font-medium">
                {route.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger className="mt-auto text-start flex items-center justify-between">
          {name}
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="w-full"
            >
              Log Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <div className=""> */}
      {/* <div className="font-medium">{name}</div> */}

      {/* <Dropdown> */}
      {/*   <Dropdown.Trigger> */}
      {/*     <span className="inline-flex rounded-md"> */}
      {/*       <button */}
      {/*         type="button" */}
      {/*         className="inline-flex items-center py-2 border border-transparent leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150" */}
      {/*       > */}
      {/*         {name} */}
      {/**/}
      {/*         <svg */}
      {/*           className="ms-2 -me-0.5 h-4 w-4 rotate-180" */}
      {/*           xmlns="http://www.w3.org/2000/svg" */}
      {/*           viewBox="0 0 20 20" */}
      {/*           fill="currentColor" */}
      {/*         > */}
      {/*           <path */}
      {/*             fillRule="evenodd" */}
      {/*             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" */}
      {/*             clipRule="evenodd" */}
      {/*           /> */}
      {/*         </svg> */}
      {/*       </button> */}
      {/*     </span> */}
      {/*   </Dropdown.Trigger> */}
      {/**/}
      {/*   <Dropdown.Content> */}
      {/*     <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link> */}
      {/*     <Dropdown.Link href={route("logout")} method="post" as="button"> */}
      {/*       Log Out */}
      {/*     </Dropdown.Link> */}
      {/*   </Dropdown.Content> */}
      {/* </Dropdown> */}
      {/* </div> */}
    </aside>
  );
}
