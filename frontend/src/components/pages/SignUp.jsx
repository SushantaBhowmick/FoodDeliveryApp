import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "",
    })
    const registerHandleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/api/user/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            })
        })
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container">
                <h1 className='m-3 text-center'>Register User</h1>
                <form onSubmit={registerHandleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Enter your name'
                            name='name'
                            value={credentials.name}
                            onChange={onChange}
                        />
                    </div>
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
                            id="exampleInputPassword1"
                            name='password'
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputlocation1" className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Enter your location'
                            name='geolocation'
                            value={credentials.geolocation}
                            onChange={onChange}
                        />
                    </div>

                    <div className=" d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Submit</button>
                        <Link to='/login' className='btn btn-danger'>Already a User</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp