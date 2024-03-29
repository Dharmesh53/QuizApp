import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <div className="w-2/3 m-auto font-pops">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
