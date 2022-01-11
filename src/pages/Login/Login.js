import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="container flex items-center justify-center h-screen w-screen">
      <div className="text-center bg-gray-150 shadow-xl shadow-gray-400/50 p-5 h-auto w-screen md:w-3/5  ">
        <h1 className="text-3xl font-bold font-inter text-gray-900 mt-5">Login</h1>
        <p className="login-text">Login with your email and password</p>
        <LoginForm />
      </div>
    </div>
  );
}
