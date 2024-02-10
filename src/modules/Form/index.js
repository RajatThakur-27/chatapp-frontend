import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Form = ({
    isSignInPage = true,
}) => {
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        console.log('data :>> ',data);
        e.preventDefault()
        const res = await fetch(`https://backend-chat-8fl0.onrender.com/api/${isSignInPage ? 'login' : 'register' }`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.status === 400){
            alert("Invalid credentials");
        }else{
            const resData= await res.json();
            console.log('data :>> ',resData);
            if(resData.token){
                localStorage.setItem('user:token',resData.token);
                localStorage.setItem('user:detail',JSON.stringify(resData.user));
                navigate('/')
            }
        }      
    }

    return (
        <div className="bg-light h-screen flex items-center justify-center">
            <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className="text-4xl font-extrabold">Welcome {isSignInPage && 'Back' }</div>
                <div className="text-xl font-light mb-14">{isSignInPage ? 'Sign in to explore':'Sign up now to get started' }</div>

                <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>

                    { !isSignInPage && <Input label="Full Name" name="name" placeholder="Enter your full name" className="mb-6 w-[75%]" value= {data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value }) } /> }

                    <Input label="Email Address" type="email" name="email" placeholder="Enter your email" className="mb-6 w-[75%]" value = {data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value }) }  />

                    <Input label="Password" name="password" placeholder="Enter your password" className="mb-14 w-[75%] " value= {data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value }) }  />

                    <Button label={isSignInPage ? 'Sign in' : 'Sign up' } type="submit" className="w-[75%] mb-2" />

                </form>
                <div>{ isSignInPage ? "Didn't have an account? " : "Already have an account? " } 
                <span className="text-primary cursor-pointer underline" onClick={()=> navigate(`/users/${isSignInPage ? 'sign_up':'sign_in'}`)}>{ isSignInPage ? 'Sign up':'Sign in' }</span></div>
            </div>
        </div>
        
    );
}

export default Form;