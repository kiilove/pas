import { Layout } from "antd";
import React, { useState, useEffect } from "react";

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [scrolling, setScrolling] = useState(false);

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

      // 일정 시간 동안 스크롤 이벤트가 발생하지 않으면 스크롤이 멈춘 것으로 판단
      clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        setScrolling(false); // 스크롤이 멈춘 상태로 설정
      }, 600); // 여기서 300은 스크롤이 멈췄다고 판단할 시간(밀리초)을 나타냅니다.
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
    <div
      className="flex w-full h-full justify-center items-start "
      style={{ maxWidth: "1000px", minHeight: "100vh" }}
    >
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
        <Header
          className={
            scrolling ? "h-0" : "bg-white border-b h-10 fixed px-0 w-full"
          }
          style={{ maxWidth: "1000px" }}
        >
          헤더
        </Header>
        <Content className="bg-white" style={{ height: "2500px" }}></Content>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
};

export default Main;