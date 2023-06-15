import React from 'react';

function InputTextBox ({description, onChange}) {
  return (
    <div>
        <label>{description}</label>
        <input type="text" className="input" name="username" id="username" onChange={onChange}></input>
    </div>

  );
}

export default InputTextBox;