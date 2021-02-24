import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextArea';
import { addEducation } from '../../Store/actions/profileActions';

const AddEducation = () => {
    const [school,setSchool] = useState('');
    const [degree,setDegree] = useState('');
    const [fieldOfStudy,setFieldOfStudy] = useState('');
    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');
    const [current,setCurrent] = useState(false);
    const [description,setDescription] = useState('');
    const [disabled,setDisabled] = useState(false);
    const dispatch =  useDispatch();

    const errors = useSelector(state=>state.error.error);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addEducation({
            school,
            degree,
            fieldOfStudy,
            from,
            to,
            current,
            description
        }))
    };

    const onCheck = () => {
        setCurrent(prev=>!prev);
        setDisabled(prev=>!prev);
    }


    return (
       <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={school}
                  setValue={setSchool}
                  error={errors}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={degree}
                  setValue={setDegree}
                  error={errors}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  setValue={setFieldOfStudy}
                  error={errors}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  setValue={setFrom}
                  error={errors}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  setValue={setTo}
                  error={errors}
                  disable={disabled}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaGroup
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={setDescription}
                  error={errors?.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AddEducation;