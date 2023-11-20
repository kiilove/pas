import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const MainHeader = ({ scrollPosition }) => {
  return (
    <div className="flex w-full h-14 bg-transparent  justify-start items-center">
      <div className="flex gap-x-5 w-full">
        <span className="font-bold">온라인 시스템</span>
        <div className="flex justify-center items-center">
          <Input style={{ width: 150 }} prefix={<SearchOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
