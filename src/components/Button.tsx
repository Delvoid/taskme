import { createComponent } from "../utils/createComponent";

type Params = Parameters<typeof getButtonClasses>;
type Variants = Params[0];

type Props = {
  label: string;
  variant: Variants;
  type: "button" | "submit";
  onClick: () => void;
};

const getButtonClasses = createComponent({
  default: "border border-default text-default uppercase hover:bg-default/80 ",
  primary: "bg-red-primary uppercase hover:bg-red-primary/80 ",
});

const Button = ({ type = "button", variant, label, onClick }: Props) => {
  const classes = getButtonClasses(
    variant,
    "block w-full rounded-lg p-4 focus:outline-none p-4 text-lg transform active:scale-90 transition-transform"
  );
  return (
    <button type={type} className={classes} onClick={() => onClick()}>
      {label}
    </button>
  );
};

export default Button;
