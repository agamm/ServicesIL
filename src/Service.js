import React from 'react';

export default function Service(props) {

    const service = {
        id: props.match.params.id
    }
    if (!service) {
        return <div>השירות לא נמצא</div>
    }
    return (
        <div>
            <h1>{service.id} (#123)</h1>
        </div>
    );
}