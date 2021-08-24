import React, {useState} from "react";
import {DropMenuLabelInLine, FloatingInput, SimpleInput} from "../products/productFormHelpers";
import {savePayment} from "../helpers/externalCalls";
import {Redirect} from "react-router";

//TODO:
// Validation not empty
// Get method payment and give modal option
const filterNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
}

const filterLetters = (event) => {
    if (!/[A-Z ]/.test(event.key)) {
        event.preventDefault();
    }
}

export function Payment(props) {
    const [cardNumber, setCardNumber] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2021);
    const [securityCode, setSecurityCode] = useState(null);
    const months = [...Array(12).keys()].map(m => m + 1);
    const years = [...Array(20).keys()].map(m => m + new Date().getFullYear());
    const [redirectToOrders, setRedirectToOrders] = useState(false);

    const onSubmit = (e) => {
        const payment = {
            cardNumber : cardNumber,
            cardHolderName : cardName,
            month: month,
            year: year,
            cvv: securityCode,
            client: {
                id: props.userName
            }
        }

        savePayment(setRedirectToOrders, payment);
        e.preventDefault();
    }


    if (redirectToOrders) {
        return <Redirect to="/orders" />
    }

    return (
        <div className="container container-medium">
            <h1>Payment</h1>
            <form className="container bg-light border" onSubmit={(e) => onSubmit(e)}>
                <FloatingInput title={"Card Number"} value={cardNumber} handleChange={setCardNumber}
                               id={"cardNumber"} maxLength={"16"} validFormat={filterNumbers}/>
                <FloatingInput title={"Card Holder Name - Capital Case"} value={cardName} handleChange={setCardName}
                               id={"cardName"} maxLength={"26"} validFormat={filterLetters}/>
                <div className="row" style={{marginTop: 15}}>
                    <div className="col">
                        <DropMenuLabelInLine array={years} handleChange={setYear} title={"Year"}/>
                    </div>
                    <div className="col">
                        <DropMenuLabelInLine array={months} handleChange={setMonth} title={"Month"}/>
                    </div>
                    <div className="col">
                        <SimpleInput title={"CVV"} value={securityCode} handleChange={setSecurityCode}
                                       id={"cardName"} maxLength={"4"} validFormat={filterNumbers}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary ">Save</button>
            </form>
        </div>
    )
}