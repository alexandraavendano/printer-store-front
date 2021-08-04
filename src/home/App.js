import './App.css';
import Header from '../common/Header'
import Footer from '../common/Footer';

import Banner from './Banner';

function App() {
  return (
    <div>
        <Header />
        <div className={"content-container"}>
            <Banner
                message={"Advertisement"}
                submessage={"Design + Print + Install + Delivery"}
                image={"designtools"}
            />
            <hr/>
        </div>
        <Footer />
    </div>
  );
}

export default App;
