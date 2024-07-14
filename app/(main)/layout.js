import { auth } from "@/auth";
import { MainNav } from "@/components/MainNav";
import { getUserByEmail } from "@/quries/user";
import { SessionProvider } from "next-auth/react";
const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
  },
];
const MainLayout = async ({ children }) => {
  const session = await auth();
  const loggedInUser = await getUserByEmail(session?.user?.email);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b ">
        <div className="container flex h-20 items-center justify-between py-6 ">
          <SessionProvider>
            <MainNav items={navLinks} loggedInUser={loggedInUser} />
          </SessionProvider>
        </div>
      </header>
      <main className="flex-1 pt-20 flex flex-col">{children}</main>
    </div>
  );
};
export default MainLayout;
