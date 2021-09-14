import { createSelector } from "reselect";

import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

//If we don't create this, we will not be able to use collections.map
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

// FYI : https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/20796198#notes
// "no memoize ver."
export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
        (collections) => collections[collectionUrlParam]
    );


// FYI : https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/20796198#notes
// " memoize ver."
// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector(
//     [selectCollections],
//     (collections) => collections[collectionUrlParam]
//   )
// );