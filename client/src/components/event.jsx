import Card from 'react-bootstrap/Card';
import { useState , useReducer} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';
import Icon from './icon';
import Events from './events';

const EventCard = (props) => {
//const [userData, setUserData] = useState(props);


//giving me a blank state for the event card
// const blankStartState = {
//     id: '',
//     title: '',
//     description: '',
//     category: '',
//     location: '',
// }
 
//function to return the info that I want to display
function initState() {
    return {
        id: props.id,
        title: props.title,
        description: props.description,
        category: props.category,
        location: props.location,
    }
}  

const reducer = (state, action) => {

    switch (action.type) {
        case 'UPDATE_EVENT_TITLE':
            return {
              ...state,
                title: action.payload
            }
        case 'UPDATE_EVENT_DESCRIPTION':
            return {
              ...state,
                description: action.payload
            }
        case 'UPDATE_EVENT_CATEGORY':
            return {
              ...state,
                category: action.payload
            }
        case 'UPDATE_EVENT_LOCATION':
            return {
              ...state,
                location: action.payload
            }
        default:
            return state;
    }   

};
// Implment the userReducer to help me with the state
const [state, dispatch] = useReducer(reducer, initState());
const [events, setEvents] = useState([]);
const newEvent = {
    title: state.title,
    description: state.eventdescription,
    date: state.eventtime,
    category: state.category,
    location: state.location,
};




//DELETE EVENT

    const handleDelete = () => {
        //localhost:8080/api/events/5
        const idToDelete = props.event.id;
        confirmAlert({
            title: 'Confirm to Delete Event',
            message: `Are you sure to delete this event: ${props.event.title}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => props.onDelete(idToDelete)
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              },
              {
                label: 'Maybe?',
                onClick: () => console.log('Click Maybe')
              }
            ]
          });
        }
        //props.onDelete(idToDelete)


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title> {props.event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {!props.event.eventtime ? "TBD" :moment(props.event.eventtime).format('MMMM Do, YYYY')}</Card.Subtitle>
                <Card.Text>
                    <Icon/>
                    Location: {props.event.location}
                    <br></br>
                    ID: {props.event.id}
                    <br></br>
                    Description: {props.event.description}
                    <br></br>
                    Time: {props.event.eventtime}
                    <br></br>
                    Category: {props.event.category}
                </Card.Text>
               
                <button className='btn' id='hover' onClick={handleDelete}>Delete</button>
                <button  className='btn' id='hover' onClick={(e)=>handleSubmit(e)}>Edit</button>
            </Card.Body>
        </Card>

     /// DO I NEED A RETURN HERE
     /// SHOULD THIS BE ABOVE THE CARD INFO.?
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="Title">Titlelist:</label>
    //         <input
    //           type="text"
    //           id="id"
    //           name="name"
    //           value={userData.title}
    //           onChange={handleInputChange}
                   //dispatch({type: "UPDATE_EVENT_TITLE", payload: event.title})
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
                        //dispatch({type: "UPDATE_EVENT_LOCATION", payload: event.location})
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
                        //dispatch({type: "UPDATE_EVENT_DATE", payload: event.eventtime})
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
                        //dispatch({type: "UPDATE_EVENT_DESCRIPTION", payload: event.eventdescription})
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
      //          dispatch({type: "UPDATE_EVENT_CATEGORY", payload: event.category})
    //         />
    //       </div>
    //       <button type="submit">Save Changes</button>
    //     </form>


           










    )
    
}

export default EventCard;

// //EDIT EVENT
// //Function to handle changes in form inputs
//   //const handleInputChange = (event) => {
//    // const { name, value } = event.target;
//     // Update the corresponding field in userData state
//    // setUserData({
//     //  ...userData,
//     //  [name]: value,
//     //});
//  // };
// // // Function to handle form submission
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     // Call a callback function to handle the updated data
// //     const userEvent = {id:eventId.current?.value, title: userTitle.current?.value, location: userLocation?.current.value, eventtime: new Date()}
// //     console.log("uservent", userEvent)
// //     Events.handleUpdateRequest()
// //     props.submit(userEvent);
// //   };