import React from "react";
import { Spin } from 'antd';
import './loading.css'
const Loading: React.FC = () => {
    return ( 
        <Spin size="large" className="spin"/>
     );
}
 
export default Loading;