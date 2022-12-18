export const createComponent = <TConfig extends Record<string, string>>(
  config: TConfig
) => {
  return (variant: keyof TConfig, ...otherClasses: string[]): string => {
    return config[variant] + " " + otherClasses.join(" ");
  };
};
