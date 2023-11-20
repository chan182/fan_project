import { arrData } from "./arrData";
import React from "react";
import { useParams } from "react-router-dom";

const Letter = () => {
    const params = useParams();
    const foundData = arrData.find((item) => {
        console.log(item.id);
        console.log(params.id);
        return item.id === parseInt(params.id);
    });
    console.log(foundData);
    return <div>하위 페이지 입니다.</div>;
};

export default Letter;
