import { Button, Form, Input, Radio, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import UniqueIdApply from "../components/UniqueIdApply";
import PersonalInfoApply from "../components/PersonalInfoApply";
import {
  decryptData,
  encryptData,
  formatPhoneNumber,
  getToday,
} from "../functions";

const InputTelService = () => {
  const [form] = Form.useForm();
  const inputRef = useRef();

  const [applyState, setApplyState] = useState({
    uniqueValue: false,
    uniqueAt: undefined,
    personalValue: false,
    personalAt: undefined,
  });

  const onFinish = (values) => {
    //console.log(values);
    const encryptInfo = {
      userName: encryptData(
        inputRef?.current.getFieldsValue().userName,
        process.env.REACT_APP_SECRET_KEY
      ),
      userPhoneNumber: encryptData(
        inputRef?.current.getFieldsValue().userPhoneNumber,
        process.env.REACT_APP_SECRET_KEY
      ),
    };

    const decryptInfo = {
      userName: decryptData(
        encryptInfo.userName,
        process.env.REACT_APP_SECRET_KEY
      ),
      userPhoneNumber: decryptData(
        encryptInfo.userPhoneNumber,
        process.env.REACT_APP_SECRET_KEY
      ),
    };
    console.log("암호화", encryptInfo);
    console.log("복호화", decryptInfo);
    const newInfo = { ...encryptInfo, ...applyState };

    console.log(newInfo);
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
                onChange={(e) =>
                  handleApplys({
                    uniqueValue: e.target.value,
                    uniqueAt: getToday(),
                  })
                }
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
                onChange={(e) =>
                  handleApplys({
                    personalValue: e.target.value,
                    personalAt: getToday(),
                  })
                }
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
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !applyState.uniqueValue || !applyState.personalValue
                  }
                >
                  전화상담요청
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
    </div>
  );
};

export default InputTelService;
