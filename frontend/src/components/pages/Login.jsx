import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
})
const loginHandleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        })
    })
    const json = await response.json();
    console.log(json);

    if (json.success) {
        localStorage.setItem('authToken',json.authToken);
        console.log(localStorage.getItem('authToken'))
        navigate('/')
    }
    else{
        alert("Enter Valid Credentials")
    }

}

const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

return (
    <>
        <div className="container">
            <h1 className='m-3 text-center'>Login User</h1>
            <form onSubmit={loginHandleSubmit} >
          
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder='Enter your email'
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='email'
                        value={credentials.email}
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder='Enter your password'
                        name='password'
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>
            

                <div className=" d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Login</button>
                    <Link to='/signup' className='btn btn-danger'>I'm a new user</Link>
                </div>
            </form>
        </div>
    </>
)
}

export default Login