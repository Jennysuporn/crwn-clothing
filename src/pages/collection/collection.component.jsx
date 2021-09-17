import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selector";

import './collection.styles.scss';

const CollectionPage = ({ collection }) => { 
    const { title, items } = collection;
    console.log('here');
    console.log(collection);
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
};

//here, we got ownProps from { connect }
const mapStateToProps = (state, ownProps) => ({ //ownProps are the attributes that are passed when the component is used
    collection: selectCollection(ownProps.match.params.collectionId)(state) //adding (state)  is necessary because unlike other selectors, this selector needs a part of the state depending on the URL parameter
});

export default connect(mapStateToProps)(CollectionPage);

