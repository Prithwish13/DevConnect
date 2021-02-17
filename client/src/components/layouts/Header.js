import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { logout } from '../../Store/actions/authActions';
import { clearCurrentProfile } from '../../Store/actions/profileActions';

export default function Header() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
    return (
        <div>
         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">DevConnector</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="profiles"> Developers
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
             {!isAuthenticated &&<li className="nav-item">
                <Link className="nav-link" to='/register'>Sign Up</Link>
              </li>}
              {!isAuthenticated && <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
              </li>}
              {
                isAuthenticated &&
                <li className="nav-item">
                <a className="nav-link" onClick={()=>{
                  dispatch(clearCurrentProfile())
                  dispatch(logout())
                }}>Logout</a>
              </li>
              }
            </ul>
           </div>
          </div>
         </nav>
        </div>
    )
}

