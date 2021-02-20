import React from 'react';
import classname from 'classname';

const TextAreaGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
}) => {

    return (
        <div className="form-group">
              <textarea className={
                  classname("form-control form-control-lg",{
                      'is-invalid':error
                  })
              }  
             placeholder={placeholder} name={name}
              value={value}
              onChange={e=>onChange(e.target.value)}
              ></textarea>
              {info && <small className="form-text text-muted">{info}</small>}
              {error && 
                <div className="invalid-feedback">
                 {error}
                </div>
              }
        </div>
    )
}

export default TextAreaGroup;