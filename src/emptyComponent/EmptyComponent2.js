import Header from '../common/Header'
import Footer from '../common/Footer';

function EmptyComponent () {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content-container">
                    <span>Work in progress</span>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EmptyComponent;
