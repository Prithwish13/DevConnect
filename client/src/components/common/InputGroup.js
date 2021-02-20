import React from 'react';
import classname from 'classname';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    onChange,
    icon,
    type
}) => {

    return (
        <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className={icon}></i>
                </span>
              </div>
              <input className={classname("form-control form-control-lg",{
                    "is-invalid":error
                  })} 
                  placeholder={placeholder} name={name} 
                  value={value}
                  onChange={e=>onChange(e.target.value)}
              />
              {error && 
                <div className="invalid-feedback">
                 {error}
                </div>
              }
        </div>
    )
}

export default InputGroup;