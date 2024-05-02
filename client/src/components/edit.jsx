// import React, { useState } from 'react';

// function EditUserDataForm(props) {
//   // Initialize state to store user data
//   const [userData, setUserData] = useState(props);

//   // Function to handle changes in form inputs
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     // Update the corresponding field in userData state
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Call a callback function to handle the updated data
//     props.onSubmit(userData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="Title">Titlelist:</label>
//         <input
//           type="text"
//           id="id"
//           name="name"
//           value={userData.title}
//           onChange={handleInputChange}
//         />
//       </div>
       
//       <div>
//         <label htmlFor="eventtime">Location:</label>
//         <input
//           type="text"
//           id="id"
//           name="name"
//           value={userData.location}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="eventtime">Date:</label>
//         <input
//           type="text"
//           id="id"
//           name="name"
//           value={userData.eventtime}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="eventtime">Event Description:</label>
//         <input
//           type="text"
//           id="id"
//           name="name"
//           value={userData.eventdescription}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="age">Category:</label>
//         <input
//           type="text"
//           id="id"
//           name="name"
//           value={userData.category}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button type="submit">Save Changes</button>
//     </form>
//   );
// }

// export default EditUserDataForm;
