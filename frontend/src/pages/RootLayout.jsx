import { Outlet } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";

import './RootLayout.css'

const RootLayout = () => {
  return(
    <div className="layout">
      <MainNavigation />
      <div className="content-layout">
        <Outlet />
      </div>
    </div>
  )
};

export default RootLayout;