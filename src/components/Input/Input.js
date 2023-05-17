import "./Input.scss";

function Input({ label, name, type }) {
  return (
    <div className="input">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input type={type} id={name} name={name} className="input__field" />
    </div>
  );
}

export default Input;
