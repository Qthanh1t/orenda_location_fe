
//Định nghĩa kiểu dữ liệu cho Phân trang

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number; // current page index (0-based)
    size: number;
}

//Định nghĩa tham số truy vấn chung cho tìm kiếm phân trang

export interface ProvinceRequestParams {
    text?: string;
    page?: number;
    size?: number;
    sort?: string;
}

export interface WardRequestParams {
    provinceCode?: string;
    text?: string;
    page?: number;
    size?: number;
    sort?: string;
}

// --- Provinces ---

export interface Province {
    id?: number;
    name: string;
    code: string;
}


// --- Wards ---

export interface Ward {
    id?: number;
    name: string;
    code: string;
    provinceCode: string;
}

