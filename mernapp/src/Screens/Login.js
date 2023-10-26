import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
  const [credentials,setcredentials] = useState({Email:"",password:""})
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/api/loginuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email: credentials.Email, password: credentials.password})
        }).catch(error => console.error('Error:', error));
        if(response){
        const json = await response.json();
        console.log(json);
        if (!json.success) {
          alert("Enter the Correct Credentials")
        }
    }
} 
   const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
      <div className='container'>
     <form onSubmit={handleSubmit}>
     
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='Email' value={credentials.Email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ABC@gamil.com'/>
    <div id="emailHelp" className="form-text"  >We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>New users</Link>
</form> 
</div>
    </>
  )
}
