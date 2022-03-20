import { useEffect, useState } from "react"

export function Async(){
    const [isVisible, setIsVisible] = useState(false);
    const [isNotVisible, setIsNotVisible] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setIsVisible(true);
            setIsNotVisible(false);
        }, 1000);

    },[])

    return (
        <>
            <div>
                <h1>Async</h1>
            </div>
            {isVisible && <button>
                Button
            </button>}
            {isNotVisible && <button>
                Button2
            </button>}
        </>
    )
}