import './App.css';

import Banner from './banner';
import ShowProducts from "../products/showProducts";

function Home() {
    return (
        <div>
            <Banner
                message={"Advertisement"}
                submessage={"Design + Print + Install + Delivery"}
                image={"designtools.png"}
            />
            <ShowProducts category='Customizable'/>
            <hr/>
        </div>
    );
}

export default Home;