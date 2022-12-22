import { useState } from "react";
import Button from "../Button";
import Input from "../form/Input";
import { motion } from "framer-motion";

const SignInForm = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const handleOnUpdate = (fieldName: string, value: string | number | Date) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <motion.form
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "tween" }}
      layout
      action=""
      className="mx-auto w-full px-4 sm:w-2/3 lg:px-0"
    >
      <Input
        id="email"
        label="Email"
        initialValue={formData.email}
        onUpdate={(field, value) => handleOnUpdate(field, value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        initialValue={formData.password}
        onUpdate={(field, value) => handleOnUpdate(field, value)}
      />

      <div className="text-right text-gray-400 hover:text-gray-100 hover:underline">
        <a href="#">Forgot your password?</a>
      </div>
      <div className="px-4 pb-2 pt-4">
        <Button
          type="button"
          variant="primary"
          label="sign in"
          onClick={() => {
            console.log("button pressed");
          }}
        />
      </div>
    </motion.form>
  );
};

export default SignInForm;
