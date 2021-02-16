import React from 'react';
import classname from 'classname'
const TextFieldGroup = ({
    type,
    name,
    placeholder,
    label,
    errors,
    info,
    setValue,
    disable,
    value
}) => {
    return (
             <div className="form-group">
                  <input type={type} className={classname("form-control form-control-lg",{
                    "is-invalid":errors ? errors.email : false
                  })} 
                  placeholder={placeholder} name={name} 
                  value={value}
                  onChange={e=>setValue(e.target.value)}
                  />
                  {
                      errors ? errors.email : false && 
                  <div class="invalid-feedback">
                    {errors.email}
                  </div>
                  }
                  {
                      info && <small className="form-text text-muted">{info}</small>
                  }
            </div>
    )
}

export default TextFieldGroup;