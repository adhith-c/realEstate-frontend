import React from "react";
import DashBoard from "../../components/Admin/DashBoard";
import SideBar from "../../components/Admin/SideBar";

function HomePage() {
  return (
    <div className="w-full">
      <div className="col-span-1">
        <SideBar />
      </div>
    </div>
  );
}

export default HomePage;
