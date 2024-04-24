
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Dropdown, ConfigProvider } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import StudentListing from "./StudentListing";
import enUS from "antd/es/locale/en_US";
const App = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ConfigProvider locale={enUS}>
        <ProLayout
          locale="en-US"
          location={{
            pathname: "/home",
          }}
        
          layout={"sidebar"}
          menuHeaderRender={(logo, title) => (
            <div
              id="customize_menu_header"
              style={{
                height: "32px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <h3>Student Dashbaord</h3>
            </div>
          )}
          collapsedButtonRender={false}
          collapsed={false}
   
          route={{
            routes: [
              {
                path: "/home",
                name: "Students",
                icon: "icon-shoucang1",
              },
            ],
          }}
          avatarProps={{
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            title: "Profile",
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: "Logout",
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
        >
          <PageContainer>
            <StudentListing />
          </PageContainer>
        </ProLayout>
      </ConfigProvider>
    </div>
  );
};
export default App;
