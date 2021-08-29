import React from "react";

//TODO:
// Cambiar el estado de la orden
// Subir archivos
// Descargar archivos
export function ItemsTable(props) {
    const items = props.item;

    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        }).then(response => {
                response.arrayBuffer().then(function(buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (items === undefined || items.length === 0) {
        return <div/>
    } else {
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Customizations</th>
                        <th>Height</th>
                        <th>Width</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item =>
                        <tr key={item.id}>
                            <td>{item.quantity}</td>
                            <td>
                                <ul className="list-group list-group-flush">
                                    {item.customizations.map(c =>
                                        <li className="list-group-item">{c.name + "-" + c.type.subType}</li>
                                    )}
                                </ul>
                            </td>
                            <td>{item.height}</td>
                            <td>{item.width}</td>
                            <td>{item.state.name}</td>
                            <td>{item.designNotes}</td>
                            <td>{item.image === null
                                ? <button className={"btn btn-primary"}>Upload</button>
                                : <button className={"btn btn-primary"}>Download</button>}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}