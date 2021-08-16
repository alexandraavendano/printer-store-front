import './App.css';

import Banner from './Banner';

function Home() {
    return (
        <div>
            <Banner
                message={"Advertisement"}
                submessage={"Design + Print + Install + Delivery"}
                image={"designtools.png"}
            />
            <hr/>
        </div>
    );
}

export default Home;