import { useEffect } from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { wardStore } from "../store/WardStore";
import { provinceStore } from "../store/ProvinceStore";

export default function WardFormPage() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        provinceStore.fetchAll(0, 100); // load danh sách province để chọn
        if (id) {
            wardStore.getById(Number(id)).then(() => form.setFieldsValue(wardStore.selected));
        }
    }, [id]);

    const handleSubmit = async (values: any) => {
        if (id) await wardStore.update(Number(id), values);
        else await wardStore.create(values);
        navigate("/wards");
    };

    return (
        <Card className="max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">{id ? "Edit Ward" : "New Ward"}</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="provinceCode" label="Province" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select province"
                        options={provinceStore.list.map((p) => ({
                            label: `${p.name} (${p.code})`,
                            value: p.code,
                        }))}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form>
        </Card>
    );
}
