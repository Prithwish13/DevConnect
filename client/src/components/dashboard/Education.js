import React,{Fragment} from 'react';
import {useDispatch} from 'react-redux';
import { removeEducation } from '../../Store/actions/profileActions';


const Education = ({educations}) => {
    const dispatch = useDispatch();
    const handleClick = (id) => {
        dispatch(removeEducation(id))
    }
    const education  = educations.map(edu => {
        return (
         
                    <tbody  key = {edu._id}>
                        <tr>
                        <td>{edu.school}</td>
                        <td>{edu.degree}</td>
                        <td>
                            {edu.from.split('T')[0]} -  {edu.current ? "Currently Working" : edu.to.split('T')[0]}
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick = {()=>handleClick(edu._id)} >
                            Delete
                            </button>
                        </td>
                        </tr>
                    </tbody>
            
        )
    })

    return (
                <div>
                <h4 className="mb-2">Education Credentials</h4>
                  <table className="table">
                    <thead>
                        <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                        </tr>
                    </thead>
                    {education}
                 </table>
                </div>
    )
}

export default Education;