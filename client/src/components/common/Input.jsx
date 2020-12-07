import React from "react";

const Input = ({ error, name, type, ...rest }) => {
  return (
    <div className="form-group">
      <input {...rest} name={name} type={type} className="myInput" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
