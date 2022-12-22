type Props = {
  id: string;
  label: string;
  initialValue?: string;
  type?: "text" | "password";
  onUpdate: (fieldName: string, value: string) => void;
};

const Input = ({ id, label, initialValue, type = "text", onUpdate }: Props) => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(id, e.target.value);
  };
  return (
    <div className="pb-2 pt-4">
      <div className="relative">
        <input
          type={type}
          id={id}
          value={initialValue || ""}
          onChange={onChange}
          className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          placeholder=" "
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className="absolute top-1 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-[#161616] dark:text-gray-400 peer-focus:dark:text-blue-500"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
