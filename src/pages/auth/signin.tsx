import React from "react";
import Banner from "../../components/auth/Banner";
import Login from "../../components/auth/Login";

const signin = () => {
  return (
    <section className="flex min-h-screen items-stretch text-white ">
      <Banner />
      <div
        className="z-0 flex w-full items-center justify-center px-0 text-center md:px-16 lg:w-1/2"
        style={{ backgroundColor: "#161616" }}
      >
        <Login />
      </div>
    </section>
  );
};

export default signin;
