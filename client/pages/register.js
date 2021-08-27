import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loading3QuartersOutlined, SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import {Context} from '../context'
import { useRouter } from 'next/router'


const register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const {state: {user},}=useContext(Context);
    const router=useRouter();
   useEffect(()=>{
       if(user!==null) router.push("/")
   },[user]);
    


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // console.table({ name, password, email });

            const { data } = await axios.post(`/api/register`, { name, email, password });
            // console.log('REGISTER RESPONSE', data);
            setLoading(false);
            toast.success("Successfully registered");

        } catch (err) {

            toast.error(err.response.data);
            setLoading(false);
        }
    }

    return ( <
        div className = "custom_bg-register" >
        <
        h1 className = " text-centre header_style " > Register < /h1>

        <
        div className = "container col-md-4 custom_border-radius offset-md pb-4 " >

        <
        form onSubmit = { handleSubmit } >

        <
        input type = "text"
        className = " form-control text-center mb-2"
        value = { name }
        onChange = {
            (e) => setName(e.target.value)
        }
        placeholder = 'enter name'
        required >
        <
        /input>

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
        className = "form-control text-center mb-4 "
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
        disabled = {!name || !email || !password || loading } > { loading ? < SyncOutlined spin / > : "submit" } <
        /button>  < /
        div >

        <
        /form>  <
        p > <
        br / > < br / > < br / >
        <
        /p> <
        p className = "col-md-8 offset-md-2 text-center custom_text custom_border-radius p-1 mt-5"
        id = "custom_text" >
        Already registered ?
        <
        Link href = "/login" > login < /Link> < /
        p >

        <
        /
        div >


        <
        /div>


    )
}
export default register;