import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function SignUp() {
  const navigate = useNavigate();
    const [credentials,setcredentials] = useState({name:"", Email:"",password:"",geolocation:""})
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/api/createuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: credentials.name, Email: credentials.Email, password: credentials.password, location: credentials.geolocation})
        }).catch(error => console.error('Error:', error));
        if(response){
        const json = await response.json();
        console.log(json);
        alert("Sign up Successfully");
        navigate("/login");
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
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='Email' value={credentials.Email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ABC@gamil.com'/>
    <div id="emailHelp" className="form-text"  >We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">Address</label>
    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword2"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
</form> 
</div>
    </>
  )
}