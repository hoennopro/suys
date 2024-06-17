import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcrypt";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Check if email already exists
      const emailExistsResponse = await axios.get(
        `https://localhost:8080/user?email=${email}`
      );
      if (emailExistsResponse.data.length > 0) {
        alert("Email already registered");
        return;
      }

      // Hash password using bcrypt before sending to server
      const hashedPassword = await bcrypt.hash(password, 10);

      // Register user
      const response = await axios.post("https://localhost:8080/register", {
        email,
        password: hashedPassword,
      });
      console.log(response.data); // Handle successful registration response
      // Redirect user or set authentication state
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error (e.g., display error message)
    }
  };
  /*
tạo form cho người dùng nhập
lấy thông tin người dùng nhập
khi gửi thông tin lên db.json
phải kiểm tra email có tồn tại hay không
nếu có rồi báo email đã được đăng ký
dùng truy cập vào
axios,get("https://localhost:8080/user?email_like-$(email)")
--> 2 kết quả trả về
1. là []: chứng tỏ email chữa tồn tại trong bảng user
+ mã hóa mật khẩu rồi mới lưu
dùng thư việc bcrypt để mã hóa 
+ lưu lên db.json
2. là [()]: chứng tỏ email đã tồn tại
*/

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
