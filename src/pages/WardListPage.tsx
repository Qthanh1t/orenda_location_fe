import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Table, Space, Select } from "antd";
import { wardStore } from "../store/WardStore";
import { provinceStore } from "../store/ProvinceStore";
import { Link, useNavigate } from "react-router-dom";
import {removeVietnameseTones} from "../utils/util.ts"
import Search from "antd/es/input/Search";

const WardListPage = observer(() => {
    const navigate = useNavigate();
    const { list, loading, total, page, size, provinceCode } = wardStore;

    useEffect(() => {
        provinceStore.fetchAll(0, 50);
        wardStore.fetchAll();
        wardStore.setText("");
        wardStore.setProvinceCode("");
    }, []);

    const handleFilter = (provinceCode: string) => {
        wardStore.setProvinceCode(provinceCode);
        wardStore.fetchAll(0, size, provinceCode);
    };

    const handleSearch = (value: string) => {
        wardStore.setText(value);
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Wards</h2>
                <Space>
                    <Search
                        placeholder="Search ward..."
                        onSearch={handleSearch}
                        style={{ width: 240 }}
                        allowClear
                    />
                    <Button type="primary" onClick={() => navigate("/wards/new")}>
                        + Add Ward
                    </Button>
                </Space>
            </div>

            <div className="flex gap-4 mb-4">
                <Select
                    allowClear
                    showSearch={true}
                    placeholder="Filter by Province"
                    style={{ width: 250 }}
                    value={provinceCode}
                    onChange={handleFilter}
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                        removeVietnameseTones((option?.label ?? "").toLowerCase()).includes(removeVietnameseTones(input.toLowerCase()))
                    }
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
                    onChange: (p, s) => wardStore.fetchAll(p - 1, s, provinceCode),
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
                                <Button type="link" danger onClick={() => wardStore.remove(record.id!)}>
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
