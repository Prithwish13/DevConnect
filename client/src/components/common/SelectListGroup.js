import classname from 'classname';
import React from 'react';

const SelectListGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    options
}) => {
   
    return (
            <div className="form-group">
              <select className={classname("form-control form-control-lg",{
                  'is-invalid':error
              })} name={name} onChange={e=>onChange(e.target.value)} 
              value={value}
              >
               { options.map(option=>(
                  <option 
                   key={option.lable} 
                   value={option.value}
                  >
                  {option.lable}
                  </option> 
                 ))
               } 
              </select>
              {info && 
                <small className="form-text text-muted">{info}</small>
              }
              {error && 
                <div className="invalid-feedback">
                 {error}
                </div>
              }
            </div>
    )
}

export default SelectListGroup;