import {Collapse} from "bootstrap";
import {useEffect, useState} from "react";

export function UploadImage(props) {

    return (
        <div className="mb-3">
            <label htmlFor="designFile" className="form-label">Please upload your design</label>
            <input className={props.isDesignValid===null || props.isDesignValid ? "form-control": "form-control is-invalid"} type="file" id="designFile" onChange={(e) => {
                props.setImages(e.target.files);
                if(e.target.files != null) props.setIsDesignValid(true);
                e.preventDefault()
            }}/>
        </div>
    )
}

export function CollapseDesign(props) {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const myCollapse = document.getElementById('collapseTarget1')
        const bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()

        const myCollapse2 = document.getElementById('collapseTarget2')
        const bsCollapse2 = new Collapse(myCollapse2, {toggle: false})
        toggle ? bsCollapse2.hide() : bsCollapse2.show()
    })

    return (
        <div className="py-2">
            <div className="collapse-button-container">
                <button className="btn btn-primary" onClick={(e) => {
                    setToggle(toggle => !toggle);
                    e.preventDefault()
                }}>I need help with my design
                </button>
                <button className="btn btn-primary" onClick={(e) => {
                    setToggle(toggle => !toggle);
                    e.preventDefault()
                }}>
                    I have my design ready
                </button>
            </div>
            <div className="collapse" id="collapseTarget2">
                <div className="mb-3">
                    <label htmlFor="designIdeas" className="form-label">We would love to hear your ideas for the design:</label>
                    <textarea className={props.isDesignValid===null || props.isDesignValid ? "form-control": "form-control is-invalid"} id="designIdeas" rows="3" value={props.designIdeas}
                              onChange={(e) => {props.setDesignIdeas(e.target.value);  if(props.designIdeas !== "") {props.setIsDesignValid(true);}}}/>
                </div>
            </div>
            <div className="collapse" id="collapseTarget1">
                <UploadImage image={props.image} setImages={props.setImages} isDesignValid={props.isDesignValid} setIsDesignValid={props.setIsDesignValid}/>
            </div>
        </div>
    )
}