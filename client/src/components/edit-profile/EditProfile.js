import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
//import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextArea';
import InputGroup from '../common/InputGroup';
import { createProfile,getCurrentProfile,clearCurrentProfile } from '../../Store/actions/profileActions';
import isEmpty from '../../valiodation/is-empty';

const EditProfile = () => {
    const dispatch = useDispatch();
    const fetchCurrentProfile = async () => {
          dispatch(getCurrentProfile());
    }
    useEffect(()=>{
        fetchCurrentProfile();
    },[]);
    
    const currentProfile= useSelector(state=>state.profile.profile);
    const social =  currentProfile?currentProfile.social:{};   
    const [handle,setHandle] = useState(!isEmpty(currentProfile)?currentProfile.handle:'');
    const [company,setCompany] = useState(!isEmpty(currentProfile)?currentProfile.company:'');
    const [website,setWebsite] = useState(!isEmpty(currentProfile)?currentProfile.website:'');
    const [location,setLocation] = useState(!isEmpty(currentProfile)?currentProfile.location:'')
    const [status,setStatus] = useState(!isEmpty(currentProfile)?currentProfile.status:'');
    const [skills,setSkills] = useState(!isEmpty(currentProfile)?currentProfile.skills.join(','):'');
    const [githubusername,setGithubusername] = useState(!isEmpty(currentProfile)?currentProfile.githubUserName:'');
    const [bio,setBio] = useState(!isEmpty(currentProfile)?currentProfile.bio:'');
    const [twitter,setTwitter] = useState(!isEmpty(social)?social.twitter:'');
    const [facebook,setFacebook] = useState(!isEmpty(social)?social.facebook:'');
    const [linkedin,setLinkedin] = useState(!isEmpty(social)?social.linkedin:'');
    const [youtube,setYoutube] = useState(!isEmpty(social)?social.youtube:'');
    const [instagram,setInstagram] = useState(!isEmpty(social)?social.instagram:'');
    const [disPlaySocialInputs,setDisPlaySocialInputs] = useState(false);   
    const errors= useSelector(state=>state.error.error);
    const updatedProfile = {
      handle:handle,
      company:company,
      website:website,
      location:location,
      status:status,
      skills:skills,
      githubUserName:githubusername,
      bio:bio,
      twitter:twitter,
      facebook:facebook,
      linkedin:linkedin,
      youtube:youtube,
      instagram:instagram
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createProfile(updatedProfile));
    };
    
    const option = [
        {lable:"* Select Professional Status",value:"0"},
        {lable:"Developer",value:"Developer"},
        {lable:"Junior Developer",value:"Junior Developer"},
        {lable:"Senior Developer",value:"Senior Developer"},
        {lable:"Manager",value:"Manager"},
        {lable:"Student or Learning",value:"Student or Learning"},
        {lable:"Intern",value:"Intern"},
        {lable:"Other",value:"Other"},
    ]

    return(
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <p className="lead text-center">Let's get some information to make your profile stand out</p>
            <form onSubmit={onSubmit}>
            <TextFieldGroup
            type='text'
            placeholder='* Profile Handle'
            name='handle'
            value={handle}
            setValue={setHandle}
            info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
            required={true}
            errors={errors}
            />

            <SelectListGroup
             error={errors ? errors.status:null}
             name='status'
             options={option}
             onChange={setStatus}
             value={status}
             info = "Give us an idea of where you are at in your career"
            />
            
            <TextFieldGroup
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            info='Could be your own company or one you work for'
            errors={errors}
            setValue={setCompany}
            />

            <TextFieldGroup
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            info='Enter The website'
            errors={errors}
            setValue={setWebsite}
            />

            <TextFieldGroup
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            info='City & state suggested (eg. Boston, MA)'
            errors={errors}
            setValue={setLocation}
            />

           <TextFieldGroup
            type='text'
            placeholder='Skills'
            name='skills'
            value={skills}
            info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
            errors={errors}
            setValue={setSkills}
            />

            <TextFieldGroup
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            info='If you want your latest repos and a Github link, include your username'
            errors={errors}
            setValue={setGithubusername}
            />
            
            <TextAreaGroup
            placeholder="A short bio of yourself"
            name='bio'
            error={errors?errors.bio : null}
            info="Tell us a little about yourself"
            value={bio}
            onChange={setBio}
            />

            <div className="mb-3">
              <button type="button" className="btn btn-light">Add Social Network Links</button>
              <span className="text-muted">Optional</span>
            </div>
            <InputGroup
             type='text'
             placeholder="Twitter Profile URL"
             name="twitter"
             icon="fab fa-twitter"
             error={errors? errors.twitter : null}
             value={twitter}
             onChange={setTwitter}
            />
            <InputGroup
             type='text'
             placeholder="Facebook Page URL"
             name="facebook"
             icon="fab fa-facebook"
             error={errors? errors.facebook : null}
             value={facebook}
             onChange={setFacebook}
            />
            <InputGroup
             type='text'
             placeholder="Linkedin Profile URL"
             name="linkedin"
             icon="fab fa-linkedin"
             error={errors? errors.linkedin : null}
             value={linkedin}
             onChange={setLinkedin}
            />
            <InputGroup
             type='text'
             placeholder="youtube channel URL"
             name="youtube"
             icon="fab fa-youtube"
             error={errors? errors.youtube : null}
             value={youtube}
             onChange={setYoutube}
            />
            <InputGroup
             type='text'
             placeholder="youtube channel URL"
             name="instagram"
             icon="fab fa-instagram"
             error={errors? errors.instagram : null}
             value={instagram}
             onChange={setInstagram}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
 )
}

export default EditProfile;