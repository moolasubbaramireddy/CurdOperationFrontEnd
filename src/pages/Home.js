import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const[users,setUsers]=useState([]);

    const {id}=useParams();

    useEffect(()=>{
            loadUsers();
      
    },[]);

    //getting all data from database and displaing to website
    const loadUsers= async()=>{
        const result=await axios.get("http://localhost:8081/api/v1/users");
        setUsers(result.data);
        console.log(result.data);
    }
    //deleteing user based on id ofter  that load the user
    const deleteUser= async (id)=>{
      await axios.delete(`http://localhost:8081/api/v1/user/${id}`);
      loadUsers();
    }

  return (
    <div className='container' >
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Serial No</th>
      <th scope="col">Name</th>
      <th scope="col">UserName</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    {
        users.map((user,index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <Link 
                className='btn btn-primary mx-2'
                to={`/viewuser/${user.id}`}
                >View</Link>
                <Link 
                  className='btn btn-outline-primary mx-2'
                  to={`/edituser/${user.id}`}
                  >
                    Edit
                </Link>
                <button
                  onClick={()=>deleteUser(user.id)}
                  className='btn btn-danger mx-2'
                  >
                  Delete
                </button>

            </td>
          </tr>
        ))
    }
   
 
  </tbody>
</table>
        </div>
      
    </div>
  )
}
