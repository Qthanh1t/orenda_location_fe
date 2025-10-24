import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Table, Space, Select } from "antd";
import { wardStore } from "../store/WardStore";
import { provinceStore } from "../store/ProvinceStore";
import { Link, useNavigate } from "react-router-dom";

const WardListPage = observer(() => {
    const navigate = useNavigate();
    const { list, loading, total, page, size, fetchAll, remove } = wardStore;
    const [provinceFilter, setProvinceFilter] = useState<string | undefined>(undefined);

    useEffect(() => {
        provinceStore.fetchAll(0, 100); // load danh sách province để lọc
        fetchAll();
    }, []);

    const handleFilter = (provinceCode?: string) => {
        setProvinceFilter(provinceCode);
        fetchAll(0, size, provinceCode);
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Wards</h2>
                <Button type="primary" onClick={() => navigate("/wards/new")}>
                    + Add Ward
                </Button>
            </div>

            <div className="flex gap-4 mb-4">
                <Select
                    allowClear
                    placeholder="Filter by Province"
                    style={{ width: 250 }}
                    value={provinceFilter}
                    onChange={handleFilter}
                    options={provinceStore.list.map((p) => ({
                        label: `${p.name} (${p.code})`,
                        value: p.code,
                    }))}
                />
            </div>

            <Table
                rowKey="id"
                dataSource={list}
                loading={loading}
                pagination={{
                    current: page + 1,
                    pageSize: size,
                    total,
                    onChange: (p, s) => fetchAll(p - 1, s, provinceFilter),
                    showSizeChanger: true,
                }}
                columns={[
                    { title: "ID", dataIndex: "id", width: 80 },
                    { title: "Name", dataIndex: "name" },
                    { title: "Code", dataIndex: "code" },
                    { title: "Province Code", dataIndex: "provinceCode" },
                    {
                        title: "Actions",
                        render: (_, record) => (
                            <Space>
                                <Link to={`/wards/${record.id}/edit`}>Edit</Link>
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

export default WardListPage;
