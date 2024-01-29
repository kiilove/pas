import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ItemViewHeader from "../components/ItemViewHeader";
import { Divider, Tabs } from "antd";
import ContactIcon from "../img/contact_icon.png";
import AllHappyServiceInfo from "../components/AllHappyServiceInfo";
import ProductInfo from "../components/ProductInfo";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDescription from "../components/ProductDescription";
import "./ItemView.css";
const items = [
  {
    key: "1",
    accountCount: "2구좌",
    title: "LG TROMM 세탁기(24kg/모던스테인리스)",
    productType: "세탁기",
    shortTitle: "LG TROMM 세탁기",
    makerName: "LG",
    picUrl:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%20WASHER_24_00.png?alt=media&token=5e66ada3-cb03-4355-af9b-fbae10e27fe6",
  },
];

const fontInlineStyle = {
  fontFamily: "Noto Sans KR",
};

const makerInlineStyle = {
  fontFamily: "Noto Sans KR",
  fontSize: "12px",
};

const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  fontSize: "18px",
};

const contentInlineStyle = {
  fontFamily: "Noto Sans KR",
  fontSize: "15px",
};

const { makerName, productType, title, picUrl, accountCount } = items[0];

const ItemView = () => {
  const [scrolling, setScrolling] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [currentElectronic, setCurrentElectronic] = useState({});
  const [descriptionsUrl, setDescriptionsUrl] = useState([]);
  const [thumbnailsUrl, setThumbnailsUrl] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const tabItems = [
    { key: "1", label: "상조서비스 안내", children: <AllHappyServiceInfo /> },
    {
      key: "2",
      label: "가전제품 안내",
      children: <ProductDescription descriptionUrls={descriptionsUrl} />,
    },
  ];
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
    // 페이지 로드 시 스크롤 위치를 맨 위로 설정
    window.scrollTo(0, 0);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거합니다.
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location?.state?.data) {
      setCurrentItem({ ...location.state.data });
      const flatDescription = location.state.data.productInfo
        .map((product, pIdx) => {
          return product.productDescription;
        })
        .flat();

      if (flatDescription?.length > 0) {
        const flatUrl = flatDescription.map((flat, fIdx) => {
          return flat.url;
        });
        setDescriptionsUrl([...flatUrl]);
      }

      const flatThumbnail = location.state.data.productInfo
        .map((product, pIdx) => {
          return product.productThumbnail;
        })
        .flat();

      if (flatThumbnail?.length > 0) {
        const flatUrl = flatThumbnail.map((flat, fIdx) => {
          return flat.url;
        });
        setThumbnailsUrl([...flatUrl]);
      }
    }
  }, [location]);

  return (
    <div
      style={{ maxWidth: "1000px", minHeight: "100vh", width: "100%" }}
      className=" overflow-x-hidden"
    >
      <Layout>
        <Header className="h-10 bg-transparent w-full px-2 bg-white">
          <ItemViewHeader />
        </Header>
        <Content className="bg-gray-100">
          <div className="flex w-full flex-col">
            <div className="flex w-full bg-gray-100 justify-center items-center py-5 border-gray-400 border ">
              <div className="flex flex-col md:flex-row w-full justify-center items-center gap-10">
                {thumbnailsUrl.length === 1 && (
                  <img
                    src={thumbnailsUrl[0]}
                    alt=""
                    className=" object-center object-contain product-thumbnail-image"
                  />
                )}

                {thumbnailsUrl.length > 1 &&
                  thumbnailsUrl.map((thumb, tIdx) => {
                    return (
                      <img
                        src={thumb}
                        alt=""
                        className=" object-center object-contain product-thumbnail-image"
                      />
                    );
                  })}
              </div>
            </div>
            <div
              className="flex w-full bg-white flex-col p-7 gap-y-1"
              style={{ height: "250px" }}
            >
              <div className="flex gap-x-2">
                <span style={makerInlineStyle}>
                  {location?.state?.data?.productInfo[0]?.productVendor}
                </span>{" "}
                /
                <span style={makerInlineStyle}>
                  {location?.state?.data?.productInfo[0]?.productType}
                </span>
              </div>
              <div className="flex">
                <span
                  style={titleInlineStyle}
                  className=" text-sm md:font-bold text-gray-800"
                >
                  {currentItem?.itemName}
                </span>
              </div>
              <Divider />
              <div className="flex flex-col w-full">
                <div className="flex w-full h-7">
                  <div className="flex" style={{ width: "100px" }}>
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      AS기간
                    </span>
                  </div>
                  <div className="flex">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      1년
                    </span>
                  </div>
                </div>
                <div className="flex w-full h-7">
                  <div className="flex" style={{ width: "100px" }}>
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      판매사
                    </span>
                  </div>
                  <div className="flex">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      프리드라이프
                    </span>
                  </div>
                </div>
                <div className="flex w-full h-7">
                  <div className="flex" style={{ width: "100px" }}>
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      계약구좌
                    </span>
                  </div>
                  <div className="flex">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      {currentItem?.accountCount}
                    </span>
                  </div>
                </div>
                <div className="flex w-full h-7">
                  <div className="flex" style={{ width: "100px" }}>
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      가입가능연령
                    </span>
                  </div>
                  <div className="flex">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      만25세 ~ 만65세
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-2 bg-white py-5">
              <div className="flex flex-col w-full px-7 ">
                <div className="flex my-2">
                  <span
                    className="text-black"
                    style={{ fontFamily: "Noto Sans KR", fontSize: "14px" }}
                  >
                    납입 금액 안내
                  </span>
                </div>
                <div
                  className="flex flex-col h-auto bg-green-400"
                  style={{ padding: "1px" }}
                >
                  <div className="flex w-full">
                    <div className="flex bg-green-100 w-1/2 h-10 justify-center items-center">
                      <span
                        style={{ ...contentInlineStyle, fontSize: "13px" }}
                        className="text-gray-500"
                      >
                        1-150회
                      </span>
                    </div>
                    <div className="flex bg-green-200 w-1/2 h-10 justify-center items-center">
                      <span
                        style={{ ...contentInlineStyle, fontSize: "13px" }}
                        className="text-gray-800"
                      >
                        만기시 환급금액
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="flex bg-white w-1/2 h-12 justify-center items-center">
                      <span
                        style={contentInlineStyle}
                        className="font-bold text-gray-700 italic"
                      >
                        72,000원
                      </span>
                    </div>
                    <div className="flex bg-white w-1/2 h-12 justify-center items-center">
                      <span
                        style={contentInlineStyle}
                        className="font-bold text-gray-700 italic"
                      >
                        10,800,000원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "60px",
                width: "100%",
                backgroundColor: "#1e948e",
              }}
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
          </div>
          <div className="flex w-full px-0 mt-2 bg-white">
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              tabBarStyle={{ marginLeft: "20px" }}
              className="w-full"
            />
          </div>
        </Content>
        <div
          id="contact-menu"
          className={
            scrolling
              ? "hidden"
              : "flex h-14 bottom-0 z-10 fixed justify-center items-center w-full"
          }
          style={{ maxWidth: "1000px" }}
        >
          <div
            className="flex w-1/2 bg-slate-700 h-full justify-center items-center cursor-pointer "
            onClick={() => navigate("/telservice")}
          >
            <span
              style={{ ...fontInlineStyle, fontSize: "16px" }}
              className="text-gray-100"
            >
              전화상담신청
            </span>
          </div>
          <div
            className="flex w-1/2 bg-green-600 h-full justify-center items-center cursor-pointer"
            onClick={() => navigate("/joinservice")}
          >
            <span
              style={{ ...fontInlineStyle, fontSize: "16px" }}
              className="text-gray-100"
            >
              상품가입신청
            </span>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ItemView;
