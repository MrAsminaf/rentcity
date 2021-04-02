import React from 'react';

function ListingCompactComponent(props) {
    return (
        <div>
            Tytuł: {props.title} 
            Data opublikowania: {props.datePublished}
        </div>
    );
}

export default ListingCompactComponent;