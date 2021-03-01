import React ,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getCurrentProfile} from '../../Store/actions/profileActions'
import isEmpty from '../../valiodation/is-empty';
import {deleteAccount} from '../../Store/actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import ProfileDisplayAction from './ProfileDisplayAction';
import Experience from './Experience';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [dispatch])

    const handleDelete = () => {
        dispatch(deleteAccount())
    }

    //binging in profile
    const {profile,loading} = useSelector(state=>state.profile);
    const {user} = useSelector(state=>state.auth);

    let DashboardContent;

    if(loading || profile===null){
       DashboardContent=<Spinner/>
    }else if(Object.keys(profile).length > 0){
        DashboardContent = (
          <div className='container' >
             <div className="row">
                <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                <p className="lead text-muted">
                Welcome <Link to={`/profile/${profile.handle}`}>{user.name}
                </Link></p>
                <ProfileDisplayAction/>
                <Experience experiences={profile.experience} 
                />
                <div style={{marginBottom:'60px'}}>
                    <button
                     className="btn btn-danger"
                     onClick={handleDelete}
                     >
                    Delete My Account
                    </button>
                </div>
            </div>
            </div>
          </div>  
        )
    }else{
        DashboardContent = (
            <div className='container' >
                <p className="lead text-muted">
                welcome {user.name}
                </p>
                <p>You have not yet setup a profile,please add some info
                </p>
                <Link to='/create-profile' className='btn btn-lg btn-info'>
                Create Profile
                </Link>
            </div>
        )
    }

    return (
        DashboardContent
    )
}

export default Dashboard;