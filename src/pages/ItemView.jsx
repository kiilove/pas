import Layout, { Content, Header } from "antd/es/layout/layout";
import React from "react";
import ItemViewHeader from "../components/ItemViewHeader";
import { Divider } from "antd";
import ContactIcon from "../img/contact_icon.png";
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
const ItemView = ({ propProductId }) => {
  return (
    <Layout>
      <Header className="h-10 bg-transparent w-full px-2">
        <ItemViewHeader />
      </Header>
      <Content>
        <div className="flex w-full flex-col">
          <div className="flex w-full bg-gray-200 justify-center items-center py-5 border-gray-400 border">
            <img
              src={picUrl}
              alt=""
              className=" object-center object-contain"
              style={{ maxHeight: "200px" }}
            />
          </div>
          <div
            className="flex w-full bg-white flex-col p-7 gap-y-1"
            style={{ height: "250px" }}
          >
            <div className="flex gap-x-2">
              <span style={makerInlineStyle}>{makerName}</span> /
              <span style={makerInlineStyle}>{productType}</span>
            </div>
            <div className="flex">
              <span
                style={titleInlineStyle}
                className=" font-bold text-gray-800"
              >
                {title}
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
                    계약구좌
                  </span>
                </div>
                <div className="flex">
                  <span
                    className="text-gray-600"
                    style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                  >
                    2구좌
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
                      1-200회
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
                      73,000원
                    </span>
                  </div>
                  <div className="flex bg-white w-1/2 h-12 justify-center items-center">
                    <span
                      style={contentInlineStyle}
                      className="font-bold text-gray-700 italic"
                    >
                      14,600,000원
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
      </Content>
    </Layout>
  );
};

export default ItemView;
