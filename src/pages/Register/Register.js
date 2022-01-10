import SignupForm from "./RegisterForm";
export default function Register() {
  return (
    <div className="container flex items-center justify-center h-screen w-screen">
      <div className="text-center bg-gray-150 shadow-xl p-5 h-auto w-screen md:w-3/5 shadow-gray-400/50 ">
        <h1 className="text-3xl font-bold font-inter text-gray-900 mt-5">
          Register
        </h1>
        <p className="login-text">Create an account</p>
        <SignupForm />
      </div>
    </div>
  );
}
