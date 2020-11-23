import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import './App.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import UserList from "./components/UserList";


const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

function App(){

    const events = [
        {
            start: moment().toDate(),
            end: moment().add("days").toDate(),
            title: "Some title",
        }
    ];

    const onEventResize = (data) => {
        const { start, end } = data;

        this.setState(() => {
          events[0].start = start;
          events[0].end = end;
          return { events: [...events] };
        });
      };

    const onEventDrop = (data) => {
        console.log(data);
      };



    const callApi = async () => {
        const res = await fetch('/api/user');
        const body = await res.json();
        if (res.status !== 200) throw Error(body.message);
        return body;
    };

    const setUsersList = () => {
        callApi()
            .then(res => {

                let users = JSON.parse(res.users);

                let userList = users.map(user => (
                        <UserList
                            name={user.name}
                            email={user.email}
                        />
                    )
                );

                setUsers(userList);

            })
            .catch(err => console.log(err));
    };

    const [users, setUsers] = useState(setUsersList);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [responseToPost, setResponseToPost] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email})
        });
        const body = await response.text();
        setResponseToPost(body);
        setName('');
        setEmail('');

        setUsersList();
    };

    useEffect(() => {
        /*
        callApi()
            .then(res => {

                let users = JSON.parse(res.users);

                let userList = users.map(user => (
                        <UserList
                            name={user.name}
                            email={user.email}
                        />
                    )
                );

                setUsers(userList);

            })
            .catch(err => console.log(err));
        */
    });
    
    const calendar = <div className="calendar">
        <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={events}
            localizer={localizer}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizable
            style={{ height: "84vh" }}
        />
    </div>;
    const login =
        <div>
            <div className ="head">
                <h1>Scheduler - Test ReactApp</h1>
                <p>{responseToPost}</p>
            </div>
            <div className ="users">
                {users}
            </div>
            <div className = "block-bottom">
                <form className="box" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input type ="submit" value="Login"/>
                </form>
            </div>
        </div>;

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="navButtons">

                    </div>
                </div>
                <div className="row">
                    <div className="col-9 ">
                        {calendar}
                    </div>
                    <div className="col3">
                        vrotibahdfds
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
