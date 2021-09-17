import React from "react";
import { connect } from "react-redux";


import { addItem } from "../../redux/cart/cart.actions";

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
  } from './collection-item.styles';
  
  const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
  
    return (
      <CollectionItemContainer>
        <BackgroundImage className='image' imageUrl={imageUrl} />
        <CollectionFooterContainer>
          <NameContainer>{name}</NameContainer>
          <PriceContainer>{price}</PriceContainer>
        </CollectionFooterContainer>
        <AddButton onClick={() => addItem(item)} inverted>
          Add to cart
        </AddButton>
      </CollectionItemContainer>
    );
  };
  
// CSS VERSION
// import "./collection-item.styles.scss";
// import CustomButton from '../custom-button/custom-button.component';
// const CollectionItem = ({ item, addItem}) => {
//     const { name, price, imageUrl } = item;
//     return (
//     <div className='collection-item'>
//         <div
//             className = 'image'
//             style = {{
//                 backgroundImage : `url(${imageUrl})`
//             }}
//         />
//         <div className='collection-footer'>
//             <span className='name'>{ name }</span>
//             <span className='price'>{ price }</span>
//         </div>
//         <CustomButton onClick={() => addItem(item)} inverted> ADD to cart </CustomButton>
//     </div>
// )};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
    //whenever we call addItem function, it will get "item" as property, passed it into our addItem() which gives us back the object where the type is equal to add item and the payload is equal to the passed "item". And then we will dispatch the new object into our store and it'll go through redux flow 
});

// equal to 
// var mapDispatchToProps = function mapDispatchToProps(dispatch) {
//     return {
//       addItem: function addItem(item) {
//         return dispatch(_addItem(item));
//       }
//     };
//   };

export default connect(null,mapDispatchToProps)(CollectionItem);