import React,{Fragment, useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { removeExperience ,getCurrentProfile} from '../../Store/actions/profileActions';



const Experience = ({experiences}) => {
    const dispatch =  useDispatch();
    const onDelete = (id) => {  
       dispatch( removeExperience(id));
    }
    
    const experience = experiences.map(exp => {
        return (
            
                <Fragment key={exp._id}>
                    <tbody>
                        <tr>
                        <td>{exp.company}</td>
                        <td>{exp.title}</td>
                        <td>
                            {exp.from.split('T')[0]} - {exp.current ? "Currently Working" : exp.to.split('T')[0]}
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={()=>onDelete(exp._id)} >
                            Delete
                            </button>
                        </td>
                        </tr>
                    </tbody>
                 </Fragment>
                    
        )  
    })

    return (
            <div>
                 <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                <thead>
                        <tr>
                        <th>Company Name</th>
                        <th>Job Title</th>
                        <th>Years</th>
                        <th />
                        </tr>
                    </thead>
                {experience}
                </table>
            </div>
        )
}

export default Experience;