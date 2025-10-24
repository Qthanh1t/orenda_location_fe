export function removeVietnameseTones(str: string): string {
    return str
        .normalize("NFD") // tách ký tự có dấu thành base + dấu
        .replace(/[\u0300-\u036f]/g, "") // xóa dấu
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}