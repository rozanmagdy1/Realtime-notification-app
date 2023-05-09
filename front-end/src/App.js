import './App.css';
import {useEffect, useState} from "react";
import './style/_login.scss';
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import {posts} from "./data";
import {io} from "socket.io-client";

function App() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState("");
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        setSocket(io("http://localhost:5000"));
    }, []);

    useEffect(() => {
        if (user !== "") {
            socket?.emit("newUser", user);
        }
    }, [socket, user]);


    return (
        <div className="App">
            <div className='container app-container p-5'>
                {user ? (
                    <>
                        <Navbar socket={socket}/>
                        {
                            posts.map((post) => (
                                <Card key={post.id} post={post} socket={socket} user={user}/>
                            ))
                        }
                        <span className="username">{user}</span>
                    </>
                ) : (
                    <div className="login">
                        <h2 className='text-center p-2 mb-5'>Realtime Notification App</h2>
                        <input
                            className='mb-4'
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={() => setUser(username)}>Login</button>
                    </div>
                )}
            </div>

        </div>
    );
}

export default App;
