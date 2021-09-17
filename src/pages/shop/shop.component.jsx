import React from "react";
import { Route } from "react-router";
import { connect } from 'react-redux';

import { doc, onSnapshot,collection,getDoc } from "firebase/firestore";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { convertCollectionsSnapshotToMap, db } from "../../firebase/firebase.utils";

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading : true
    };


    unsubscribeFromSnapshot = null; //unsubscribe from snapshot method  // The snapshot is going to be the snapshot representation of our collection's array that we're going to get from firestore and we're going to fetch that inside of our componentDidMout method

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(db, "collections");

        onSnapshot(collectionRef, (snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
            })
        );

                
        //FETCH version
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-37846/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));


        //Observe version by Firebase
        // this.unsubscribeFromSnapshot = onSnapshot(
        //     collectionRef, (async snapshot => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //         updateCollections(collectionsMap);
        //         this.setState({ loading: false });
        //     })
        // );
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading}{...props}/> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={loading}{...props}/>} />
            </div>
        )
    }

    
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
});


// First version (use local storage )
// const ShopPage = ({ match }) => { //match we get from Line 90 in app.js
//     return ( 
//         <div className="shop-page">
//             <Route exact path={`${match.path}`} component={ CollectionsOverview } />
//             <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//         </div>
//     )
// };

// First version (use local storage )
// render() {
//     const { match } = this.props;
//     return (
//         <div className="shop-page">
//             <Route exact path={`${match.path}`} component={ CollectionsOverview } />
//             <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//         </div>
//     )
// }

export default connect(null,mapDispatchToProps)(ShopPage);