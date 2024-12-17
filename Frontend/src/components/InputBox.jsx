import React from "react";

const InputBox = ({
  onFocus,
  name,
  value,
  onChange,
  inputStyle,
  lableStyle,
  label,
  placeholder,
  type = "text",
}) => {
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          onFocus={onFocus}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input input-bordered w-full  ${inputStyle}`}
        />
      </label>
    </>
  );
};

export default InputBox;
