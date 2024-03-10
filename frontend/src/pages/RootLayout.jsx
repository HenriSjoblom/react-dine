import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import './RootLayout.css'

const RootLayout = () => {
  return(
    <div className="layout">
      <MainNavigation />
      <Outlet />
    </div>
  )
};

export default RootLayout;