import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "@/features/auth/authSlice";

const LoginWithSocial = () => {
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    dispatch(loginWithGoogle({ token }))
      .unwrap()
      .then((response) => {
        console.log("Đăng nhập với Google thành công:", response);
      })
      .catch((error) => {
        console.error("Lỗi khi đăng nhập với Google:", error);
        // Xử lý lỗi đăng nhập
      });
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    // Xử lý lỗi đăng nhập
  };

  return (
    <div className="btn-box row">
      <div className="col-12">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </div>
    </div>
  );
};

export default LoginWithSocial;
