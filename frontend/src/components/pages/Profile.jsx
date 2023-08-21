import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
    const [user, setUser] = useState([]);
    console.log(user)
    const id = localStorage.getItem("userID");

    useEffect(() => {
        if(!id){
            alert("You Are not Logged in ")
        }
        const handlePrint = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/user/me/${id}`)
                setUser(response.data.user)
                console.log(response.data.user.date)
            } catch (error) {
                console.log(error)
            }
        }
        handlePrint()
    }, [id])
    return (
        <div className="profilePage">
            <h1 className='text-center'>Profile</h1>
            <div className="container pro fs-5">
                <div>
                    <h4>Full Name:</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email:</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Created At:</h4>
                    <p>{user.date}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile