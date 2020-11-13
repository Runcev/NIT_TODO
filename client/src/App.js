import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const [users, setUsers] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [responseToPost, setResponseToPost] = useState("");

    const callApi = async () => {
        const res = await fetch('/api/user');
        const body = await res.json();
        if (res.status !== 200) throw Error(body.message);
        return body;
    };

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
    };

    useEffect(() => {
        callApi()
            .then(res => setUsers(res.users))
            .catch(err => console.log(err));
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

            {users}

            <form onSubmit={handleSubmit}>
                <p>
                    <strong>Add user:</strong>
                </p>
                <div>Name: <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                /></div>

                <div>Email: <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                /></div>

                <button type="submit">Submit</button>
            </form>
            <p>{responseToPost}</p>
        </div>
    );
}

export default App;
