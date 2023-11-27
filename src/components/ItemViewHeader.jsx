import { Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import React from "react";
const iconStyle = "text-2xl font-bold text-gray-800";
const ItemViewHeader = ({ scrollPosition }) => {
  return (
    <div className="flex w-full h-10 justify-start items-center bg-white">
      <div className="flex justify-start items-center w-full h-full">
        <FaArrowLeftLong
          onClick={() => {
            window.history.back();
          }}
        />
      </div>
    </div>
  );
};

export default ItemViewHeader;
