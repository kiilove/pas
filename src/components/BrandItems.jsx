import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
const cardWidth = "120px";
const imgHeight = "80px";
const imgWidth = "90%";

const BrandItems = () => {
  return (
    <div className="flex w-full flex-wrap justify-around gap-2">
      <Card
        hoverable
        size="small"
        style={{ width: cardWidth, height: "150px" }}
        bodyStyle={{ height: "50px" }}
        cover={
          <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2Fall_p.png?alt=media&token=520b92de-add1-42d6-9d8b-e70b539e06c9" />
        }
      ></Card>
      <Card
        hoverable
        size="small"
        style={{ width: cardWidth, height: "150px" }}
        bodyStyle={{ height: "50px" }}
        cover={
          <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2Fss_p.png?alt=media&token=5b3817c9-7066-48bc-83f2-80b443ac64ed" />
        }
      ></Card>
      <Card
        hoverable
        size="small"
        style={{ width: cardWidth, height: "150px" }}
        bodyStyle={{ height: "50px" }}
        cover={
          <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2Flg_p.png?alt=media&token=76f03168-d5cc-4874-824e-93ed2697f20e" />
        }
      ></Card>
    </div>
  );
};

export default BrandItems;
