# Cinema
BTL môn phân tích thiết kế hướng đối tượng.
## Hướng dẫn cài đặt
1. Sau khi git pull code có thư mục Cinema
- Build backend: chạy backend.build.bat
- Build frontend: chạy frontend.build.bat (có thể npm start trong thư mục frontend/ mà không cần build)
2. Cấu hình đường môi trường chạy trong thư mục build/
- Tạo appsettings.Local.json có nôi dụng copy từ appsettings.Development.json
- Chỉnh sửa đường dẫn database của MySQL trong appsettings.Local.json (cấu hình "CinemaContext")
3. Chạy file run.bat
4. Tạo database và sinh dữ liệu mẫu
- Truy cập localhost:5000/api/database
