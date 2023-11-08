import { Layout } from "antd";
import React, { useState, useEffect } from "react";

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러를 추가합니다.
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거합니다.
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <Header className="bg-white px-0 h-auto">
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
        </Header>
        <Content className="bg-white" style={{ height: "2500px" }}>
          content
        </Content>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
};

export default Main;
