import React from 'react';
import SHOP_DATA from './shop.data'
import CollectionPreview from '../../component/collection-preview/collection-preview.component'

class ShopPage extends React.Component{
    constructor(props){
        super(props);
        this.state = SHOP_DATA;
    }

    render(){
        const collections = this.state;
        return(
            <div>
                {collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))}
            </div>
        )
    }
}

export default ShopPage;