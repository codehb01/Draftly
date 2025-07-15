import React from "react";

const Login = () => {
  const handleSubmit = async () => {};
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="w-full py-6 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Admin</span>Login
          </h1>
          <p className="font-light">
            Enter your credentials to access the admin panel
          </p>
        </div>
        <form onSubmit={handleSubmit()}></form>
      </div>
    </div>
  );
};

export default Login;
