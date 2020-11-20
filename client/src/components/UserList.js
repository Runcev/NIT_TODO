import React from "react";

export default function UserList(user) {
    return (
        <div>
            <ul>
                <li>
                    Name: {user.name}<br></br>
                    Email: {user.email}
                </li>
            </ul>
        </div>
    );
}