
import { useRef } from "react";

const FormEvent = (props) => {

    //const [ event, setEvent ] = useState({title: "", location: "", eventtime: ""})
    const eventId = useRef();
    const userTitle = useRef();
    const userLocation = useRef();
    const userEventTime = useRef();
    const userDescription = useRef();
    const userCategory = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userEvent = {id:eventId.current?.value, title: userTitle.current?.value, location: userLocation?.current.value, eventtime: new Date()}
        //console.log("Inside the component", userEvent);
        props.submit(userEvent);
       
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2> Please register your next Event in our community</h2>

            <label>Event Title</label>
            <input type="text" name="title" required placeholder="Title of your Event" ref={userTitle}/>

            <label>Event Location</label>
            <input type="text" name="location" required placeholder="Where will be your event" ref={userLocation}/>

            <label>Event Date</label>
            <input type="text" name="location" required placeholder="When will be your event?" ref={userEventTime}/>            
            
            <label>Event Description</label>
            <input type="text" name="location" required placeholder="Describe your event" ref={userDescription}/>
            
            <label>Event Category</label>
            <input type="text" name="location" required placeholder="What is the category of your event?" ref={userCategory}/>

            <button className="button" type="submit">Submit</button>
        </form>

    )
}

export default FormEvent;