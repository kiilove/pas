import React from "react";
import ContactIcon from "../img/contact_icon.png";
import { Avatar, Carousel, Space } from "antd";
import MainCarousel from "../components/MainCarousel";
const Intro = () => {
  return (
    <div className="flex flex-col w-full h-full p-2 gap-y-2">
      <div className="flex w-full h-auto flex-col">
        <div
          className="flex  rounded-lg h-36"
          style={{ backgroundColor: "#2fbcb6", width: "100%" }}
        >
          <div className="flex p-5 w-full">
            <div className="flex w-full">
              <div className="flex w-3/4">
                <div className="flex flex-col ">
                  <span className="text-lg lg:text-2xl font-bold font-sans">
                    안녕하세요! 고객님
                  </span>
                  <span className="text-gray-200 lg:text-lg font-semibold font-sans mt-5 lg:ml-5">
                    새로운 투자의 시작을 저희와 함께 해주세요.
                  </span>
                </div>
              </div>
              <div className="flex w-1/4 items-center gap-x-2">
                <Avatar
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/avatar%2Favatar_w_01.jpg?alt=media&token=0f14e0fc-0b12-4618-a88d-c55db4951e5c"
                  }
                  size={100}
                />
                <div className="hidden lg:flex flex-col ">
                  <span className="text-lg font-semibold font-sans ">
                    쥴리엣
                  </span>
                  <span className="text-base font-semibold font-sans">
                    경기 서남본부
                  </span>
                  <span className="text-sm font-semibold font-sans">
                    010-1234-1234
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ height: "250px", width: "100%" }}
        className=" rounded-lg bg-transparent"
      >
        <MainCarousel />
      </div>
      <div
        style={{ height: "60px", width: "100%", backgroundColor: "#1e948e" }}
        className=" rounded-lg flex justify-center items-center gap-x-5"
      >
        <span
          className="text-gray-200 lg:text-lg"
          style={{ fontFamily: "Nanum Myeongjo" }}
        >
          전문 상담사{" "}
          <span
            className="font-bold text-gray-100 lg:text-xl"
            style={{ fontFamily: "Noto Sans KR" }}
          >
            쥴리엣
          </span>
          에게 빠르게 상담받으시겠어요?
        </span>
        <img
          src={ContactIcon}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
};

export default Intro;
