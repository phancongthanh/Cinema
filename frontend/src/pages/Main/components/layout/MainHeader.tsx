import { Button, Icon } from "@mui/material";
import React, { FC, ReactNode } from "react";
import TabPanel from "./TabPanel";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountIcon from "../../../../components/AccountIcon";

const MainHeader = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div className="p-4 pr-8 pl-20 space-x-4 border-b bg-neutral-100">
        <div className="flex justify-between">
          <img
            src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/logo_home.png"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          {auth !== null ? (
            <AccountIcon />
          ) : (
            <div className="flex justify-end space-x-8 h-12">
              <Button
                className="text-2xl font-bold"
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </Button>
              <Button
                className=""
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </div>
      <TabPanel />
    </>
  );
};

export default MainHeader;
