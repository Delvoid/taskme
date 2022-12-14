import { socialsList } from "../../utils/socials";
import Button from "../Button";
import SocialButton from "./SocialButton";
import BlurImage from "../../../public/BaseImageBlur.png";
import SignInForm from "./SignInForm";
import { useState } from "react";
import CreateAccountForm from "./CreateAccountForm";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

const Login = () => {
  const [createAccount, setCreateAccount] = useState(true);
  return (
    <>
      <div
        className="absolute inset-0 z-10 items-center bg-gray-500 bg-cover bg-no-repeat lg:hidden"
        style={{
          backgroundImage: `url(${BlurImage.src})`,
        }}
      >
        <div className="absolute left-[420px] top-96 w-full   scale-[2.5]">
          <svg
            fill="#fca5a5"
            fill-opacity="0.3"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 589.3 652.48"
          >
            <defs>
              <style></style>
            </defs>
            <path d="M401.03,0H0V652.48H60.61l112.18-159.9h232.11l184.4-247.58L401.03,0Zm-37.39,404.9H232.11l103.16-158.61h-98L86.4,465.5V87.69l273.37-1.29,122.5,162.47-118.63,156.03Z" />
          </svg>
        </div>
      </div>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="z-20 w-full py-4"
      >
        <h1 className="my-2 text-2xl font-bold uppercase">
          {createAccount ? "login" : "create account"}
        </h1>
        <div className="space-x-2 py-4">
          {socialsList.map(({ label, icon }) => (
            <SocialButton
              key={label}
              social={{ label, icon }}
              handleOnClick={() => signIn("discord", { callbackUrl: `/` })}
            />
          ))}
        </div>
        {createAccount && (
          <p className="text-gray-100">or use email your account</p>
        )}
        <AnimatePresence>
          {createAccount ? <SignInForm /> : <CreateAccountForm />}
        </AnimatePresence>
        <div className="mx-auto w-full px-4 sm:w-2/3 lg:px-0">
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300 md:px-16">
            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
          </div>
          <div className="px-4 pb-2 pt-4">
            <Button
              type="button"
              label={!createAccount ? "sign in" : "create account"}
              variant="default"
              onClick={() => setCreateAccount((prev) => !prev)}
            />
          </div>

          {/* SOCIAL MEDIA LINKS */}
          <div className="right-0 left-0 mt-16 flex justify-center space-x-4 p-4 text-center lg:hidden ">
            <a href="#">
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#">
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#">
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
