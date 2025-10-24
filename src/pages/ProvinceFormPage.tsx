// src/pages/provinces/ProvinceFormPage.tsx
import { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { provinceStore } from "../store/ProvinceStore";

export default function ProvinceFormPage() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) provinceStore.getById(Number(id)).then(() => form.setFieldsValue(provinceStore.selected));
    }, [id]);

    const handleSubmit = async (values: any) => {
        if (id) await provinceStore.update(Number(id), values);
        else await provinceStore.create(values);
        navigate("/provinces");
    };

    return (
        <Card className="max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">{id ? "Edit Province" : "New Province"}</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form>
        </Card>
    );
}
