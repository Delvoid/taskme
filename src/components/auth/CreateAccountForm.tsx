import { useState } from "react";
import Button from "../Button";
import Input from "../form/Input";
import { motion } from "framer-motion";

const CreateAccountForm = () => {
  const [formData, setFormData] = useState<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>({ email: "", username: "", password: "", confirmPassword: "" });

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
        id="username"
        label="Username"
        type="text"
        initialValue={formData.username}
        onUpdate={(field, value) => handleOnUpdate(field, value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        initialValue={formData.password}
        onUpdate={(field, value) => handleOnUpdate(field, value)}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="text"
        initialValue={formData.confirmPassword}
        onUpdate={(field, value) => handleOnUpdate(field, value)}
      />

      <div className="px-4 pb-2 pt-4">
        <Button
          type="button"
          variant="primary"
          label="create account"
          onClick={() => {
            console.log("button pressed");
          }}
        />
      </div>
    </motion.form>
  );
};
export default CreateAccountForm;
