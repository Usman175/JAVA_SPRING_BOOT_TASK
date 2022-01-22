import React,{useEffect} from 'react'
import './startWidth.scss'
import SubHeader from '../../../components/subHeader'
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector,useDispatch } from "react-redux";
import Skeleton from "../../../components/skeleton/skeleton";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {registerUserTypes} from '../../../utils/userTypeConst'
import {setActiveUserType,updateRegisteredUserFlag} from '../../../store/action/action'
import AOS from "aos"
import 'aos/dist/aos.css';
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    zIndex: 999999,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

AOS.init({
  duration: 1200,
});

function StartWith(props) {
    const dispatch=useDispatch()
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const authUser = useSelector((state) => state.authReducer);
  const handleRegister=(type)=>{
    if(type==="Client"){
      props.history.push('/client-registration')
    }else{
      props.history.push(`/user-registration?type=${type}`)    
    }
  }

  const handleStartAs=(type)=>{
    if(type==="Client"){
      props.history.push('/all-my-posts')
      sessionStorage.setItem('userType',"Client")
      dispatch(setActiveUserType('Client'))
    }else if(type==="IndividualFreelancer"){
      props.history.push('/all-projects')
      sessionStorage.setItem('userType',"Freelancer")
      dispatch(setActiveUserType('Freelancer'))
    }else if(type==="Organization"){
      props.history.push('/all-projects')
      sessionStorage.setItem('userType',"Organization")
      dispatch(setActiveUserType('Organization'))
    }else if(type==="Headhunter"){
      props.history.push('/all-my-posts')
      sessionStorage.setItem('userType',"Headhunter")
      dispatch(setActiveUserType('Headhunter'))
    }
  }

  return (
   
    <div className="start-with-page">
      <SubHeader />
      <div className="start-with-page-detail">
        <div className="start-with-page-menu"  >
          <div className='bcknd_container'>
          <div className='row'>
            <div className='col-12 col-md-2'></div>
            <div className='col-12 col-md-8'>
            <Skeleton count={3} isSkeletonLoading={authUser.isLoading} />
            <div hidden={authUser.isLoading} className='row'>
           <div className='col-12 col-md-8'>
           <div className='row'>
           <div className='col-12'>
           <h2 className='start-width-main-heading'>{languageType.HOW_WOULD_LIKE_TO_START}</h2>
           </div>
             <div className='col-12 col-lg-6'>
             <div className="start-with-page-left" data-aos="fade-up">
               {
               authUser.registeredUserTypes.length>0?  <h2><i className='fa fa-check-circle'></i> Your are registered following <br /> <i className='fa fa-arrow-circle-o-right'></i> you can start as</h2>
              :   <h2><i className='fa fa-check-circle'></i> Your are not registered for type <br /> <i className='fa fa-arrow-circle-o-right'></i> To proceed next you need to register</h2>
            
               }
             
             {
               authUser.registeredUserTypes && authUser.registeredUserTypes.length>0  ?
               authUser.registeredUserTypes.map((item,index)=>(
                <div onClick={()=>handleStartAs(item.userType)}  className={`start-with-page-menu-item-${index}`}>
                Start as a {item.userType==="IndividualFreelancer"?"Freelancer":item.userType}
              </div>
               )):<div className='not-registered-user-type'>
                 You not register yet for any type
               </div>
             }           
          </div>
          
             </div>
             <div className='col-12 col-lg-6'>
             <div className="start-with-page-left" data-aos="fade-up">
               {
                 authUser.registeredUserTypes.length>2?   <h2><i className='fa fa-user-plus'></i> Your are already register <br />  <i className='fa fa-arrow-circle-o-right'></i> For all type of users</h2>
                 :   <h2><i className='fa fa-user-plus'></i> Your can register following <br />  <i className='fa fa-arrow-circle-o-right'></i> you can start after register</h2>
           
               }
          
             {
               authUser.registeredUserTypes && authUser.registeredUserTypes.length<3?
               registerUserTypes.map((item,index)=>{
                 if(!authUser.registeredUserTypes.map(item1=>item1.userType).includes(item)){
                   return  <div onClick={()=>handleRegister(item)}  className={`start-with-page-menu-item-${index}`}>
                   Register as a {item==="IndividualFreelancer"?"Freelancer":item}
                 </div>
                 }
               }):<div className='not-registered-user-type'>
                 You have registered each type thanks
               </div>
             } 
           
          </div>
          
</div>
           </div>
       
           </div>
           <div className='col-12 col-md-4'>
           <div className="start-with-page-img">
            {authUser?.myAuth === null ? ( 
             <div className='balloon top' data-aos="fade-left">
             <span>Hi! please select what you want to do.</span> 
             </div>
            )
            :
            ( 
              <div className='balloon top' data-aos="fade-left">
              <span>Hi! {" "}
               {authUser?.myAuth?.user?.profileName} {" "}
              {/*  {authUser?.myAuth?.user?.email}  */} you are already registered as {authUser.registeredUserTypes.map(item=>item.userType).toString().replace(","," ")}</span>
              </div>
            )} 
            <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/start-icon.png"} />
          
          </div>
            </div>
            </div>
            </div>
            <div className='col-12 col-md-2'></div>
            </div>
          
          </div>
       
         
        </div>

      </div>

    </div>
  )
}

export default StartWith
