import {  Menu } from "antd";
import { useState, useEffect, useContext } from 'react';


import Link from "next/link";
import { AppstoreOutlined, LogoutOutlined, UserAddOutlined, LoginOutlined, SettingOutlined, MailOutlined } from '@ant-design/icons';
import { Context } from '../context';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const { Item } = Menu;
const {SubMenu} = Menu;
const {ItemGroup} = Menu;


function TopNav() {

    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context)

    const { user } = state;
    const router = useRouter();



    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
        //console.log(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async() => {

        dispatch({ type: "LOGOUT" })
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    }

    


    function handleClick (e) {
      console.log('click ', e);
      this.setState({ current: e.key });
    };

 
    



    return (
        <>

   

            <Menu className = "nav_style"  mode="horizontal" selectedKeys = {[current] } >

            <Item key = "index" onClick = { (e) => { setCurrent(e.key) } }
            icon = { < AppstoreOutlined / > }  >
            <Link href = "/" ><a >
            Home
             </a></Link >


            </Item>

            {user === null && ( < >
                        <Item key = "/login" icon = { < LoginOutlined / > } 
                        onClick = { (e) => { setCurrent(e.key) } }  >
                        <Link href = "/login" ><a >
                        login < /a></Link >

                        </Item>
                 

                        <Item key = "/register" icon = { < UserAddOutlined / > } 
                        onClick = { (e) => { setCurrent(e.key) } }  >
                        <Link href = "/register" ><a >
                        register 
                        </a></Link >

                        </Item>

                        </> )}

         { user !== null && ( <>                        
            <SubMenu key="submenu" icon={<SettingOutlined />}  title={user && user.name} className="ms-auto ml-1" >
                <ItemGroup className=" px-1">
                    <Item><Link href="/user"><a>Dashboard</a></Link></Item>
                    <Item key= "logout:"    onClick = { logout } className=" custom_border-radios" > logout  </Item>
                </ItemGroup>
                     
                     
                                       
                   </SubMenu> 
                
         
          </> )   }  




 

        
                      
        
 
                            </Menu>
                            
                            </> ) } 
                         
                             

                        export default TopNav;