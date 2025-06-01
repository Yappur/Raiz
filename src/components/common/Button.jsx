function Button({
  onClick,
  onClickParams,
  children,
  disabled = false,
  color = "primary",
  className = "",
  type = "button",
}) {
  const buttonColor = {
    primary:
      "border-black bg-button-primary text-white hover:bg-button-primary-hover",
    secondary:
      "border-black bg-button-secondary text-black hover:border-button-secondary-border-hover",
  };
  const handleOnClick = () => {
    if (onClickParams) {
      onClick(...onClickParams);
    } else {
      onClick();
    }
  };
  return (
    <button
      onClick={() => handleOnClick()}
      type={type}
      className={`py-3 px-6 text-center border text-sm cursor-pointer transition-colors ${buttonColor[color]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
