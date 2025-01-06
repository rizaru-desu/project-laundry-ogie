"use client";
import React from "react";
import { Button, Card, Form, Image, Layout, Typography, Input } from "antd";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

type FieldType = {
  usernameOrEmail?: string;
  password?: string;
};
export default function Page() {
  const router = useRouter();
  return (
    <Layout>
      <Content className="flex items-center justify-center min-h-screen gap-5 flex-col">
        <Image
          preview={false}
          alt="asd"
          src="./image/logo.png"
          width={100}
          height={100}
        />
        <Title level={3}>Admin Panel - My Laundry</Title>
        <Card className="w-1/3">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={() => router.replace("/pages/dashboard")}
          >
            <Form.Item<FieldType>
              label="Emai or Username"
              name="usernameOrEmail"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="default" htmlType="submit">
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
