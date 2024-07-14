
import LogOut from "@/components/LogOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { MobileSidebar } from "./mobile-sidebar";

import defaultAvater from '@/public/images/avatar.jpeg';

export const Navbar = async () => {
  const loggedInUser = await getLoggedInUser()
  const fullName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`

  const avatarFallBack = loggedInUser?.firstName?.substring(0, 2)
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={loggedInUser?.image ? loggedInUser?.image : defaultAvater}
                  className="object-cover"
                  alt={fullName}
                />
                <AvatarFallback><span className="uppercase font-bold">{avatarFallBack}</span></AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <LogOut />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
