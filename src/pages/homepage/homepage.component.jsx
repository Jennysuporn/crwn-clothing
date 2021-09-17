import React from "react";
import Directory from "../../components/directory/directory.component";

import { HomePageContainer } from "./homepage.styles";

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;



//NOTE: using css
// import './homepage.styles.scss';
// const HomePage = () => (
//     <div className='homepage'>
//         <Directory />
//     </div>
// );