import React from 'react';
import { useParams } from 'react-router';

function AccountComponent() {
    const {id} = useParams();

    return(
        <div>Account with id: {id}</div>
    );
}

export default AccountComponent;