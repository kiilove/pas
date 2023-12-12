import { Button, Form, Input, Radio, Space, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import UniqueIdApply from "../components/UniqueIdApply";
import PersonalInfoApply from "../components/PersonalInfoApply";
import {
  decryptData,
  encryptData,
  formatPhoneNumber,
  getToday,
} from "../functions";
import Password from "antd/es/input/Password";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Timestamp } from "firebase/firestore";
import { useFirestoreAddData } from "../hooks/useFirestore";

const InputJoinService = () => {
  const [applyState, setApplyState] = useState({
    uniqueValue: false,
    uniqueAt: undefined,
    personalValue: false,
    personalAt: undefined,
  });
  const [sellerId, setSellerId] = useState("jncore");
  const [form] = Form.useForm();
  const inputRef = useRef();
  const firestoreAdd = useFirestoreAddData();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (apiType, title, message, placement, duration) => {
    api[apiType]({
      message: title,
      description: message,
      placement,
      duration,
    });
  };
  const scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    console.log(data.zonecode);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    if (fullAddress !== "") {
      inputRef?.current.setFieldsValue({
        ...inputRef?.current.getFieldsValue(),
        userZoneCode: data.zonecode,
        userFullAddress: fullAddress,
      });
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleAddJoin = async (data) => {
    try {
      await firestoreAdd.addData("userJoinService", { ...data }, (data) => {
        openNotification(
          "success",
          "접수되었습니다.",
          "곧 담당자가 연락드리겠습니다."
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    //console.log(values);
    const encryptInfo = {
      userName: encryptData(values.userName, process.env.REACT_APP_SECRET_KEY),
      userPhoneNumber: encryptData(
        inputRef?.current.getFieldsValue().userPhoneNumber,
        process.env.REACT_APP_SECRET_KEY
      ),
      userJumin1: encryptData(
        values.userJumin1,
        process.env.REACT_APP_SECRET_KEY
      ),
      userJumin2: encryptData(
        values.userJumin2,
        process.env.REACT_APP_SECRET_KEY
      ),
      userZoneCode: encryptData(
        values.userZoneCode,
        process.env.REACT_APP_SECRET_KEY
      ),
      userFullAddress: encryptData(
        values.userFullAddress,
        process.env.REACT_APP_SECRET_KEY
      ),
      userExtraAddress: encryptData(
        values.userExtraAddress,
        process.env.REACT_APP_SECRET_KEY
      ),
    };

    // const decryptInfo = {
    //   userName: decryptData(
    //     encryptInfo.userName,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    //   userPhoneNumber: decryptData(
    //     encryptInfo.userPhoneNumber,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    //   userJumin1: decryptData(
    //     encryptInfo.userJumin1,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    //   userJumin2: decryptData(
    //     encryptInfo.userJumin2,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    //   userZoneCode: decryptData(
    //     encryptInfo.userZoneCode,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    //   userFullAddress: decryptData(
    //     encryptInfo.userFullAddress,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    //   userExtraAddress: decryptData(
    //     encryptInfo.userExtraAddress,
    //     process.env.REACT_APP_SECRET_KEY
    //   ),
    // };
    // console.log("암호화", encryptInfo);
    // console.log("복호화", decryptInfo);
    const newInfo = { ...encryptInfo, ...applyState, sellerId };
    handleAddJoin(newInfo);
  };
  const onReset = () => {
    form.resetFields();
  };

  const handleApplys = (value) => {
    setApplyState(() => ({ ...applyState, ...value }));
  };

  const handlePhoneNumber = (value) => {
    inputRef?.current.setFieldsValue({
      ...inputRef?.current.getFieldsValue(),
      userPhoneNumber: formatPhoneNumber(value),
    });
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // 여기서 phoneNumber의 형식이 올바른지 확인하고 결과를 반환합니다.
    // 예시: 정규식을 사용하여 형식을 검사
    const regex = /^(\d{2,3})-(\d{3,4})-(\d{4})$/; // 간단한 예시 형식
    return regex.test(phoneNumber);
  };
  useEffect(() => {
    console.log(inputRef?.current?.getFieldsValue());
  }, [inputRef?.current]);

  return (
    <div
      className="flex flex-col bg-gray-200"
      style={{ maxWidth: "1000px", width: "100%", height: "100vh" }}
    >
      <div className="flex flex-col w-full bg-white">
        <div className="flex w-full flex-wrap">
          <div className="flex w-full flex-col p-4 h-auto ">
            <span>고유식별정보 처리동의</span>
            <div className="flex w-full h-full justify-start items-center border">
              <UniqueIdApply />
            </div>
            <div className="flex h-auto justify-start items-center mt-4">
              <Radio.Group
                name="uniqueApply"
                defaultValue={false}
                onChange={(e) => {
                  const today = new Date();
                  const timestampToday = Timestamp.fromDate(today);
                  handleApplys({
                    uniqueValue: e.target.value,
                    uniqueAt: timestampToday,
                  });
                }}
              >
                <Radio value={true}>동의함</Radio>
                <Radio value={false}>동의안함</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="flex w-full flex-col p-4 h-auto ">
            <span>개인정보를 위한 이용자 동의</span>
            <div className="flex w-full h-full justify-start items-center border">
              <PersonalInfoApply />
            </div>
            <div className="flex h-auto justify-start items-center  mt-4">
              <Radio.Group
                name="personalApply"
                defaultValue={false}
                onChange={(e) => {
                  const today = new Date();
                  const timestampToday = Timestamp.fromDate(today);
                  handleApplys({
                    personalValue: e.target.value,
                    personalAt: timestampToday,
                  });
                }}
              >
                <Radio value={true}>동의함</Radio>
                <Radio value={false}>동의안함</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-white">
        <div className="flex p-4 w-full">
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            size="large"
            className="w-full"
            onFinish={onFinish}
            ref={inputRef}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "이름을 입력해주세요",
                },
              ]}
            >
              <Input placeholder="이름" />
            </Form.Item>
            <Form.Item
              name="userPhoneNumber"
              rules={[
                {
                  required: true,
                  message: "올바른 전화번호를 입력해주세요",
                },
                () => ({
                  validator(_, value) {
                    if (
                      !value ||
                      isPhoneNumberValid(formatPhoneNumber(value))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("올바른 전화번호 형식을 입력해주세요")
                    );
                  },
                }),
              ]}
            >
              <Input
                placeholder="전화번호"
                onChange={(e) => handlePhoneNumber(e.target.value)}
              />
            </Form.Item>

            <Space>
              <Form.Item
                name="userJumin1"
                rules={[
                  {
                    required: true,
                    message: "주민등록번호를 입력해주세요",
                  },
                ]}
              >
                <Input
                  placeholder="주민등록번호"
                  maxLength={6}
                  style={{ width: "120px" }}
                />
              </Form.Item>

              <Form.Item
                name="userJumin2"
                rules={[
                  {
                    required: true,
                    message: "주민등록번호를 입력해주세요",
                  },
                ]}
              >
                <Password maxLength={7} style={{ width: "120px" }} />
              </Form.Item>
            </Space>
            <div className="flex">
              <Form.Item
                name="userZoneCode"
                rules={[
                  {
                    required: true,
                    message: "주소를 입력해주세요",
                  },
                ]}
              >
                <Input
                  placeholder="우편번호"
                  style={{ width: "80px" }}
                  className=" placeholder:text-sm"
                  readOnly
                  onClick={() => handleClick()}
                />
              </Form.Item>
              <Button onClick={() => handleClick()} type="primary">
                검색
              </Button>
            </div>
            <Form.Item name="userFullAddress">
              <Input placeholder="주소" readOnly />
            </Form.Item>
            <Form.Item name="userExtraAddress">
              <Input placeholder="상세주소" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !applyState.uniqueValue || !applyState.personalValue
                  }
                >
                  가입신청
                </Button>
                <Button
                  htmlType="button"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  돌아가기
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default InputJoinService;
