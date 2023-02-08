import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Form = () => {
    return (
        <div>
            <Link to='/'>
            <Button>
                Back
            </Button>
            </Link>
        </div>
    )
}

export default Form