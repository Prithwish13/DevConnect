import React,{useState,useReducer} from 'react';
import {Link} from 'react-router-dom';
import TextAreaGroup from '../common/TextArea';
import TextFieldGroup from '../common/TextFieldGroup';
import {useSelector,useDispatch} from 'react-redux';
import { addExperience } from '../../Store/actions/profileActions';
const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE';



const AddExperience = () => {
   const dispatch = useDispatch();
   const [company,setCompany] = useState('');
   const [title,setTitle] = useState('');
   const [location,setLocation] =  useState('');
   const [from,setFrom] = useState('');
   const [to,setTo] = useState('');
   const [current,setCurrent] = useState(false);
   const [description,setDescription] = useState('');
   const [disabled,setDisabled] = useState(false);

   const errors= useSelector(state=>state.error.error); 
   const handleSubmit = (e) =>{
      e.preventDefault();
      dispatch(addExperience({
          company,
          title,
          location,
          from,
          to,
          current,
          description
      })) 
   }

   const onCheck = () => {
     setCurrent(prev=>!prev);
     setDisabled(prev=>!prev);
   }

   return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={handleSubmit} >
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={company}
                  setValue={setCompany}
                  errors={errors}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  setValue={setTitle}
                  errors={errors}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  setValue={setLocation}
                  errors={errors}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  setValue={setFrom}
                  errors={errors}
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
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={setDescription}
                  error={errors?.description}
                  info="Tell us about the the position"
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

export default AddExperience;