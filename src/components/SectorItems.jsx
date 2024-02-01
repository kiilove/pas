import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
const cardWidth = "230px";
const cardMWidth = "100%";

const SectorItems = () => {
  return (
    <>
      <div className="hidden md:flex w-full flex-wrap justify-around gap-2">
        <Card
          hoverable
          style={{ width: cardWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_kitchen_interior_white_light_0_35dcf82e-da40-4ad1-80f1-8312c67f3ad2_0.jpg?alt=media&token=16a71010-3a1d-4744-8006-fa87cba5965a" />
          }
        >
          <Meta
            title="주방가전 모음"
            description="냉장고, 김치냉장고, 냉동고, 식기세척기"
          />
        </Card>
        <Card
          hoverable
          style={{ width: cardWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_laundry_room_interior_white_light_0_83cb4eb1-31cd-48f9-8080-bed8591668de_0.jpg?alt=media&token=948d3b7e-e070-476d-bdb3-e642290bc32d" />
          }
        >
          <Meta title="세탁가전 모음" description="세탁기, 건조기, 스타일러" />
        </Card>
        <Card
          hoverable
          style={{ width: cardWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_living_room_interior_white_light_tv_installed_0_9635bdd5-b584-4402-be3c-23075341b2d4_0.jpg?alt=media&token=392eb6be-2f6d-4c61-b249-954476b81bd9" />
          }
        >
          <Meta
            title="거실가전 모음"
            description="TV, 무선청소기, 공기청정기"
          />
        </Card>
        <Card
          hoverable
          style={{ width: cardWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_summer_beach_1_e7fc1c40-0944-46a0-b79c-3607178e42f6_0.jpg?alt=media&token=e9fa0931-bc44-49c8-be2a-76072dcfe62b" />
          }
        >
          <Meta title="계절가전 모음" description="에어컨" />
        </Card>
      </div>
      <div className="flex md:hidden w-full flex-wrap justify-around gap-2 px-2">
        <Card
          hoverable
          style={{ width: cardMWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_kitchen_interior_white_light_0_35dcf82e-da40-4ad1-80f1-8312c67f3ad2_0.jpg?alt=media&token=16a71010-3a1d-4744-8006-fa87cba5965a" />
          }
        >
          <Meta
            title="주방가전 모음"
            description="냉장고, 김치냉장고, 냉동고, 식기세척기"
          />
        </Card>
        <Card
          hoverable
          style={{ width: cardMWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_laundry_room_interior_white_light_0_83cb4eb1-31cd-48f9-8080-bed8591668de_0.jpg?alt=media&token=948d3b7e-e070-476d-bdb3-e642290bc32d" />
          }
        >
          <Meta title="세탁가전 모음" description="세탁기, 건조기, 스타일러" />
        </Card>
        <Card
          hoverable
          style={{ width: cardMWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_living_room_interior_white_light_tv_installed_0_9635bdd5-b584-4402-be3c-23075341b2d4_0.jpg?alt=media&token=392eb6be-2f6d-4c61-b249-954476b81bd9" />
          }
        >
          <Meta
            title="거실가전 모음"
            description="TV, 무선청소기, 공기청정기"
          />
        </Card>
        <Card
          hoverable
          style={{ width: cardMWidth }}
          cover={
            <img src="https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/assets%2FDefault_summer_beach_1_e7fc1c40-0944-46a0-b79c-3607178e42f6_0.jpg?alt=media&token=e9fa0931-bc44-49c8-be2a-76072dcfe62b" />
          }
        >
          <Meta title="계절가전 모음" description="에어컨" />
        </Card>
      </div>
    </>
  );
};

export default SectorItems;
