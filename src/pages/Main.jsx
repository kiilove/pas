import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import MainHeader from "../components/MainHeader";

const { Header, Content, Footer } = Layout;

const Main = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 스크롤이 될때 애니메이션 구동을 위한 useEffect
  // useEffect(() => {
  //   // 스크롤 이벤트 핸들러를 추가합니다.
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거합니다.
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // 스크롤이 멈추면 헤더를 보여주고 스크롤중에는 헤더를 안보이게 하기위함 useEffect

  useEffect(() => {
    let isScrollingTimeout; // 스크롤 이벤트 타임아웃 핸들러

    const handleScroll = () => {
      setScrolling(true); // 스크롤 중인 상태로 설정
      setScrollY(window.scrollY);

      // 일정 시간 동안 스크롤 이벤트가 발생하지 않으면 스크롤이 멈춘 것으로 판단
      clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        setScrolling(false); // 스크롤이 멈춘 상태로 설정
      }, 600); // 여기서 600은 스크롤이 멈췄다고 판단할 시간(밀리초)을 나타냅니다.
    };

    // 스크롤 이벤트 핸들러를 추가합니다.
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거합니다.
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(scrolling);
    console.log(scrollY);
  }, [scrolling]);

  const handleScroll = () => {
    // 스크롤 위치를 확인하여 헤더를 숨기거나 나타나게 합니다.
    if (window.scrollY > 0) {
      setScrolling(true); // 스크롤이 내려갔을 때
    } else {
      setScrolling(false); // 스크롤이 맨 위로 올라왔을 때
    }
  };

  return (
    <div style={{ maxWidth: "1000px", minHeight: "100vh", width: "100%" }}>
      <Layout>
        {/* <Header className="bg-white px-0 h-auto">
          <div className="flex w-full flex-col h-full justify-start items-start">
            <div
              id="headerBanner"
              className={`fixed flex w-full h-28 bg-white justify-center items-center border-b ${
                scrolling
                  ? "transition ease-in-out duration-300 delay-75 -top-24 translate-y-5"
                  : "ease-in-out -translate-y-1"
              } `}
              style={{ maxWidth: "1000px" }}
            >
              큰헤더
            </div>
          </div>
        </Header> */}
        <Header className="bg-white h-10">
          <MainHeader />
        </Header>
        <Content className="bg-white h-auto" style={{ minHeight: "600px" }}>
          {children}
        </Content>
        <Footer>
          <div className="flex w-full bg-gray-100 p-1">
            <div className="flex w-full flex-col gap-y-1">
              <li className="text-sm">
                <span>해당 사이트는 제품정보를 참고용으로 제공합니다.</span>
              </li>
              <li className="text-sm">
                <span>제조사 및 판매사 사정상 제품이 변경될 수 있습니다.</span>
              </li>
              <li className="text-sm">
                <span>
                  자세한 상담은 반드시 상담사를 통해 확인하실수 있습니다.
                </span>
              </li>
            </div>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default Main;
