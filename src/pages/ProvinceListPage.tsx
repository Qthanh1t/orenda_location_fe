// src/pages/provinces/ProvinceListPage.tsx
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Table, Space } from "antd";
import { provinceStore } from "../store/ProvinceStore";
import { Link, useNavigate } from "react-router-dom";

const ProvinceListPage = observer(() => {
    const navigate = useNavigate();
    const { list, loading, total, page, size, fetchAll, remove } = provinceStore;

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Provinces</h2>
                <Button type="primary" onClick={() => navigate("/provinces/new")}>
                    + Add Province
                </Button>
            </div>
            <Table
                rowKey="id"
                dataSource={list}
                loading={loading}
                pagination={{
                    current: page + 1, // antd dùng 1-based
                    pageSize: size,
                    total,
                    onChange: (p, s) => fetchAll(p - 1, s),
                    showSizeChanger: true,
                }}
                columns={[
                    { title: "ID", dataIndex: "id", width: 80 },
                    { title: "Name", dataIndex: "name" },
                    { title: "Code", dataIndex: "code" },
                    {
                        title: "Actions",
                        render: (_, record) => (
                            <Space>
                                <Link to={`/provinces/${record.id}/edit`}>Edit</Link>
                                <Button type="link" danger onClick={() => remove(record.id!)}>
                                    Delete
                                </Button>
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
});

export default ProvinceListPage;
