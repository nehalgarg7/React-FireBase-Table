import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Error() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    })

    return (
        <div>Error</div>
    )
}

export default Error