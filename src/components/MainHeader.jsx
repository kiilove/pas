import { Input } from "antd";
import { SearchOutlined, PhoneOutlined } from "@ant-design/icons";
import React from "react";
const iconStyle = "text-2xl font-bold text-gray-800";
const MainHeader = ({ scrollPosition }) => {
  return (
    <div className="flex w-full h-10 justify-start items-center">
      <div className="flex gap-x-5 w-full">
        <div className="flex justify-end items-center w-full gap-x-4">
          <SearchOutlined className={iconStyle} />
          <PhoneOutlined className={iconStyle} />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
