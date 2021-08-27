import { useEffect, useState, useContext } from "react"
import axios from "axios";
import {useRouter} from 'next/router';
import { SyncOutlined} from '@ant-design/icons';


const UserRoute =({children})=>{

    
    //state
    const [found, setFound]=useState(false);
  
    //rounter
        const router= useRouter();
    useEffect(()=>{
        fetchUser();
       
       
     } ,[]);

   



        const fetchUser= async()=>{
            try {

                const {data} = await axios.get("/api/current-user");
                    console.log("fetchine",data);
                    if(data.found) setFound(true);
            }catch(err){
                console.log(err);
                setFound(false);
                router.push("/login");
            }
       
    }

    return (<>
         { !found ? (<SyncOutlined 
       spin 
       className ="d-flex justify-content-center display-1 text-primary p-5" />) :
       
       (<>{children}</>)
          
       
}</>
);
    
}
export default UserRoute;