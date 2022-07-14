import React, { useState } from "react";

export default function Register() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const register = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/register",{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={register}>
            <input placeholder="Username" onChange={(e)=> setusername(e.target.value)}/><br/>
            <input placeholder="Password" type="password" onChange={(e)=> setpassword(e.target.value)}/><br/>
            <button type="submit" >Register</button>
            </form>
        </div>
    )
}