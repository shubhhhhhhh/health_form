import { useEffect, useState } from "react";
import { MainContext } from "./Context";

export default function GlobalContext({ children }) {
    const [data, setData] = useState()

    function dd(param){
        setData(param)
    }

    useEffect(()=>{
        console.log(data)
    },[data])

    const value = {
        datas:data,
        setDat:dd
    }

    return (
        <>
            <MainContext.Provider value={value}>
                {children}
            </MainContext.Provider>
        </>
    )
} 