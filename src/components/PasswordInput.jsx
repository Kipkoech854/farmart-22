import { useState } from "react";

const PasswordInput = ({ name, value, placeholder, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="password-input">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <span
        className="toggle-visibility"
        onClick={() => setShow(!show)}
      >
        {show ? "🙈" : "👁️"}
      </span>
    </div>
  );
};

export default PasswordInput;
