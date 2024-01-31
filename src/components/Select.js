import React from "react";

function SelectItems(props) {
    return (
        <div className="SelectItems">
            <div className="form-group">
                <div className="d-flex justify-content-between">
                    <span className="secondary-text-color">{props.title}: </span>
                    <select className="w-50" name="items">
                        {props.data.map((row, index) => {
                            return (
                                <option key={index + 1} value={row.id}>{row.fullName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SelectItems