import React from "react";
import { Button, Image, Layout, Menu, theme } from "antd";
import {
  RiMenuFoldFill,
  RiMenuUnfoldFill,
  RiDashboardHorizontalFill,
  RiSettings4Fill,
} from "react-icons/ri";
import { FaCartArrowDown, FaUserGear } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { useRouter } from "next/navigation";
const { Sider, Header, Content, Footer } = Layout;

interface ContentPageProps {
  children: React.ReactNode;
}

const ContentPage: React.FC<ContentPageProps> = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        className="bg-white"
        trigger={null}
        breakpoint="md"
        collapsedWidth="80"
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
          console.log(collapsed, type);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          background: colorBgContainer,
        }}
      >
        <div className="rounded-md m-3 items-center justify-center flex">
          <Image
            preview={false}
            src="/image/logo.png"
            width={35}
            height={35}
            alt="logo"
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <RiDashboardHorizontalFill />,
              label: "Dashboard",
              onClick: () => {
                router.replace("/pages/dashboard");
              },
            },
            {
              key: "orderan",
              icon: <FaCartArrowDown />,
              label: "Orderan",
              onClick: () => {
                router.replace("/pages/order");
              },
            },
            {
              key: "user",
              icon: <FaUserGear />,
              label: "Kelola User",
            },
            {
              key: "setting",
              icon: <RiSettings4Fill />,
              label: "Pengaturan",
            },
          ]}
        />
      </Sider>

      <Layout style={{ marginInlineStart: collapsed ? 80 : 200 }}>
        <Header
          className="flex flex-row justify-between "
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <RiMenuUnfoldFill /> : <RiMenuFoldFill />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="font-bold"
          />
          <div className="flex gap-3">
            <span className="text-md text-black font-bold">Delevoper</span>
            <Button
              type="text"
              icon={<FaPowerOff />}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "80vh",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ContentPage;
