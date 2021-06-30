import React, { useEffect } from 'react'
import { useHistory } from "react-router";

export default function HomePage() {
    const history = useHistory();

    useEffect(() => {
        history.push('/phones')
    })

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
