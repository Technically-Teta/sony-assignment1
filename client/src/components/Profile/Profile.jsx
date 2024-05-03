import React from 'react';
import './Profile.css'


const Profile = (props) => {
  let user = props.user;
  console.log(user);
 

  return (
    <div>
    <h1> User - Profile</h1>
      <div className="row align-items-center profile-header">
        <div className="col-md text-center text-md-left">
          <h2>{user.name}</h2>
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{user.email}</h2>
        </div>
      </div>
      <div className='reserve'>
        <h2>Reserved Books:</h2>
      </div>
      <div>
        <h2>Checked Out Books:</h2>
      </div>
      <button className='return-button' >
            Return your book
      </button>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;