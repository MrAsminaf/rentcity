import React from 'react';
import { useParams } from 'react-router';

function ListingPageComponent(props) {
    const {listingId} = useParams();

    return (
        <div>
            ListingPageComponent: {listingId}
        </div>
    );
}

export default ListingPageComponent;