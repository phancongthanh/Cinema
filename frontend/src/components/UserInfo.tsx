import React from "react";
import EditProfile from "./EditProfile";

const UserInfo = () => {
  return (
    <div className="flex flex-col w-[60rem] h-[26rem] border rounded-2xl shadow items-center">
      <div className="my-4 text-2xl">Chỉnh sửa thông tin</div>
      <EditProfile />
    </div>
  );
};

export default UserInfo;
