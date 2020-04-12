import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>

      {touched && error}

      <input {...input} />
    </div>
  );
};
