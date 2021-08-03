import './App.css';
import Header from '../common/Header'
import Footer from '../common/Footer';

import Banner from './Banner';

function App() {
  return (
    <div className="App">
        <Header />
        <div className={"App-header"}>
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
