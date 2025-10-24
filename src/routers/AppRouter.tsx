// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProvinceListPage from "../pages/ProvinceListPage";
import ProvinceFormPage from "../pages/ProvinceFormPage";
import WardListPage from "../pages/WardListPage";
import WardFormPage from "../pages/WardFormPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/provinces" replace />} />
                    <Route path="/provinces" element={<ProvinceListPage />} />
                    <Route path="/provinces/new" element={<ProvinceFormPage />} />
                    <Route path="/provinces/:id/edit" element={<ProvinceFormPage />} />
                    <Route path="/wards" element={<WardListPage />} />
                    <Route path="/wards/new" element={<WardFormPage />} />
                    <Route path="/wards/:id/edit" element={<WardFormPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}
