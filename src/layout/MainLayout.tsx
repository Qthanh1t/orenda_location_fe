// src/components/Layout/MainLayout.tsx
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content, Header } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    return (
        <Layout className="min-h-screen">
            <Sider>
                <div className="text-white text-center py-4 text-lg font-bold">
                    Location Admin
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        { key: "/provinces", label: <Link to="/provinces">Provinces</Link> },
                        { key: "/wards", label: <Link to="/wards">Wards</Link> },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className="bg-white shadow-md px-6 font-semibold">
                    Location Management
                </Header>
                <Content className="p-6 bg-gray-50">{children}</Content>
            </Layout>
        </Layout>
    );
}
