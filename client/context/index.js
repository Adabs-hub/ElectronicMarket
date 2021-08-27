import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios'
import { reject } from 'lodash';
import { WindowsFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';

//initail state
const initialState = {
    user: null,
}

//create context

const Context = createContext();

//root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload };
        case "LOGOUT":
            return {...state, user: null };
        default:
            return state;
    }
};

//context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    useEffect(() => {
        dispatch({
            type: 'LOGIN',
            payload: JSON.parse(window.localStorage.getItem("user")),

        })
    }, []);
   const router=useRouter();

    axios.interceptors.response.use(
        function(response){
            //any status code that is within the range of 2xx shout trigger this function
            return response;
        },
        function (err)
        {
            // any status codes tha falls outside the range of 2xx should this function to trigger

            let res=err.response;
        if(res.status ===401 && res.config && !res.config._isRetryRequest){
            return new Promise((resolve, reject)=>{
                axios.get("/api/logout")
                .then((data)=>{
                    console.log("/401 err>logut")
                    dispatch({type:"LOGOUT"})
                    Window.localStorage.removeItem("user")
                    router.push('/');
              }).catch((err)=>{
                    console.log("AXIOS INTERCEPTORS ERR",err)
                    reject(err);
                })
            })
        }
        return Promise.reject(err);
        }
    );
    useEffect(()=>{

        const getCsrfToken = async()=>{
        const{data}=await axios.get("/api/csrf-token");
       console.log("csrf",data);
        axios.defaults.headers["X-CSRF-TOKEN"]= data.getCsrfToken;
        }
        getCsrfToken();

    },[]);

    return ( <
        Context.Provider value = {
            { state, dispatch }
        } > { children } <
        /Context.Provider > 
    )
}
export { Context, Provider };