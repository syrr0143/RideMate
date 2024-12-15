import React from "react";

const InputBox = ({
  name,
  value,
  onChange,
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
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </>
  );
};

export default InputBox;
