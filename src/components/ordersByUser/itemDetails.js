import {getDesignOrDefaultImage} from "../helpers/imageHelper";

export function ItemDetails(props) {
    const item = props.item;
    const customizations = item.customizations;

    return (
        <div key={props.index} className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    <img src={getDesignOrDefaultImage(item)} className="card-img" alt={"name"}/>
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <div className="card-text">
                            <div className="row align-items-center">
                                <div className="col">
                                    <span>Quantity:{item.quantity}</span><br/>
                                    <span>Height: {item.height}</span> - <span>Width: {item.width}</span><br/>
                                </div>
                                <div className="col">
                                    {customizations.map(additional =>
                                        <div key={additional.id}>
                                            {additional.type.subType}: {additional.name}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}