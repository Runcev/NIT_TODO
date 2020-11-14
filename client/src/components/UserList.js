import React from "react";

export default function UserList(user) {
    return (
        <div>{user.name} {user.email}</div>
    );
}