import React, { useEffect, useState } from "react";
import ContactIcon from "../img/contact_icon.png";
import ReviewBanner from "../img/review_event.png";
import { Avatar, Carousel, Space } from "antd";
import MainCarousel from "../components/MainCarousel";
import MainBestItems from "../components/MainBestItems";

import MainCategoryItems from "../components/MainCategoryItems";
import { useParams } from "react-router-dom";

const Intro = () => {
  const [referrerIP, setReferrerIP] = useState("");
  const [referrerData, setReferrerData] = useState();
  const params = useParams();
  async function getIPAddress() {
    const response = await fetch("https://ipapi.co/json/");

    const data = await response.json();
    setReferrerData(data);
    return data.ip;
  }

  function getReferrer() {
    return document.referrer;
  }

  useEffect(() => {
    console.log(params);
  }, [params]);

  useEffect(() => {
    async function fetchIPAndReferrer() {
      try {
        const ip = await getIPAddress(); // 비동기 함수의 결과를 기다림

        const referrer = getReferrer();
        console.log(referrer);
      } catch (error) {
        console.error("Error fetching IP address: ", error);
      }
    }

    fetchIPAndReferrer();
  }, []);
  return (
    <div className="flex flex-col w-full h-full gap-y-0 ">
      <div className="flex w-full h-auto flex-col">
        <div className="flex h-28 bg-gray-200" style={{ width: "100%" }}>
          <div className="flex p-5 w-full">
            <div className="flex w-full">
              <div className="flex w-3/4">
                <div className="flex flex-col ">
                  <span
                    className="text-lg lg:text-2xl font-bold"
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    고객님, 반가워요
                  </span>
                  <span
                    className="text-gray-800 lg:text-lg font-semibold mt-5 lg:ml-5"
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    고객님만을 위한 새로운 상품을 준비했습니다.
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
                  <span
                    className="text-lg font-semibold "
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    쥴리엣
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    경기 서남본부
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "Noto Sans KR" }}
                  >
                    010-1234-1234
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={ReviewBanner} alt="" className="w-full" />
      </div>

      <div
        style={{ height: "60px", width: "100%", backgroundColor: "#1e948e" }}
        className="flex justify-center items-center gap-x-5"
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
      <div className="flex flex-col px-2 gap-y-2 mt-5">
        <MainBestItems sellerToken={params?.sellerToken} />
      </div>
      <div className="flex flex-col px-2 gap-y-2 mt-5">
        <MainCategoryItems />
      </div>
    </div>
  );
};

export default Intro;
