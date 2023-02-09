import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";
import { selectCurrentAdmin } from "../admin/adminMainSlice";

function AdminAuth() {
  const token = useSelector(selectCurrentAdmin);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to="/admin/login"
      state={{ from: location }}
      replace
    />
  );
}

export default AdminAuth;
