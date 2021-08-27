import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loading3QuartersOutlined, SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context';
import { useRouter } from 'next/router';
//import loginState from '../components/loginState'

const login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    //state
    const { state:{user}, dispatch } = useContext(Context);
    //console.log('state', state)

    //router
    const router = useRouter();

    useEffect(()=>{
        if (user!== null) router.push("/")
    }, [user]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // console.table({ name, password, email });

            const { data } = await axios.post(`/api/login`, {
                email,
                password
            });
            // console.log('REGISTER RESPONSE', data);

            dispatch({
                type: "LOGIN",
                payload: data,
            })

            //save in local storage
            window.localStorage.setItem('user', JSON.stringify(data));

            //redirect

            setLoading(false);
            toast.success("Successfully logged In");

            router.push('/');

        } catch (err) {

            toast.error(err.response.data);
            setLoading(false);
        }
    }

    return ( <
        div className = "custom_bg-login" >
        <
        h1 className = " text-centre header_style " > login < /h1>

        <
        div className = "container col-md-4 custom_border-radius offset-md pb-4 " >

        <
        form onSubmit = { handleSubmit } >



        <
        input type = "email"
        className = "form-control text-center mb-2 "
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        placeholder = 'enter email'
        required >

        <
        /input>

        <
        input type = "password"
        className = "form-control text-center mt-6 mb-4 "
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        placeholder = 'enter password'
        required >

        <
        /input> <
        div className = "text-center  md-5" >
        <
        button type = "submit"
        className = "btn  custom_border-radius "
        id = "custom_btn-text"
        disabled = {!email || !password || loading } > { loading ? < SyncOutlined spin / > : "submit" } <
        /button>  < /
        div >

        <
        /form>  <
        p > <
        br / > < br / > < br / >
        <
        /p> <
        p className = "col-md-10 offset-md text-center custom_text custom_border-radius p-1 mt-5"
        id = "custom_text" >
        Create account ?
        <Link href = "/register" > register < /Link> < /
        p >

        <
        /
        div >


        <
        /div>


    )
}
export default login;