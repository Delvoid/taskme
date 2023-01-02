import type { Socials } from "../../utils/socials";

const SocialButton = ({
  social,
  handleOnClick,
}: {
  social: Socials;
  handleOnClick: () => void;
}) => {
  const { icon: Icon } = social;
  return (
    <span
      onClick={handleOnClick}
      className="inline-flex h-10 w-10 transform items-center justify-center rounded-full border-2 border-white text-lg font-bold transition-transform hover:border-blue-500 hover:text-blue-500 active:scale-75"
    >
      <Icon className="h-5 w-5" />
    </span>
  );
};

export default SocialButton;
