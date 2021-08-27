import {  useState, useContext } from "react"
import {Context} from '../../context';
import UserRoute from "../../components/routes/userRoute"



const UserIndex =()=>{  
    //state
    
    const {state:{user},}=useContext(Context);
    
    return(
        <>
            <UserRoute>
     
           <>
            <h1 className = " py-5 text-center  text-dark text-md border  rounded nav_style" > 
            USER  
        <pre>
            {JSON.stringify(user,null,4)}
        </pre>< /h1>
        </>
        
        </UserRoute>
    

  
</>
        )
  
    
}
export default UserIndex;