import { FaDiscord, FaGoogle } from "react-icons/fa";
import type { IconType } from "react-icons";
export type Socials = {
  label: string;
  icon: IconType;
};
export const socialsList: Socials[] = [
  {
    label: "Discord",
    icon: FaDiscord,
  },
  {
    label: "Google",
    icon: FaGoogle,
  },
];
