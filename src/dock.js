import { useState } from "react";
import MacDock from "react-apple-menu";
import data from "./data";
import './funtab.css';

const Docks = () => {
    const [dockList, setDockList] = useState(data.dock)

    return (
        <div className='dock'>
            <MacDock stretch={false} size={66} zoom={0.6}>
                {dockList.map((item, index) => {
                    return (
                        <img key={index} src={item.icon} alt='' />
                    )
                })}
            </MacDock>
        </div>
    )
}

export default Docks;