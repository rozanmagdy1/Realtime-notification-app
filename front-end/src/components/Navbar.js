import React, {useEffect, useState} from 'react';
import '../style/_navbar.scss';
import Notification from "../static/notificatio.svg";
import Message from "../static/message.svg";
import Settings from "../static/settings.svg";

function Navbar({socket}) {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data]);
        });
        return () => {
            socket.off("getNotification");
        };
    }, [socket]);


    const displayNotification = (senderName, type) => {
        let action;

        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "commented";
        } else {
            action = "shared";
        }
        return (
            <span className="notification">{`${senderName} ${action} your post.`}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };


    return (
        <div className="navbar">
            <div className='container'>
                <div className="logo text-center">Realtime Notification App</div>

                <div className="icons">
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Notification} className="iconImg" alt=""/>
                        {
                            notifications.length > 0 &&
                            <div className="counter">{notifications.length}</div>
                        }
                    </div>
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Message} className="iconImg" alt=""/>
                    </div>
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Settings} className="iconImg" alt=""/>
                    </div>
                </div>
            </div>

            {
                open && (
                    <div className="notifications">
                        {notifications.length > 0 ? (
                            notifications.map((n) => displayNotification(n.senderName, n.type))
                        ) : (
                            <p>No new notifications.</p>
                        )}
                        <button className="nButton" onClick={handleRead}>
                            Mark as read
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default Navbar;