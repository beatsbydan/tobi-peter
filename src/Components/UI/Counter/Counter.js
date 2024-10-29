import React, { useEffect, useState } from 'react'

const Counter = ({targetNumber, largeValue}) => {
    const [count, setCount] = useState(0);
    const [isLargeValue, setLargeValue] = useState(false);
    const [isCounting, setCounting] = useState(true);

    const duration = 2000;
    const increment = targetNumber / (duration / 10); 

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevCount)=>{
                if(prevCount + increment >= targetNumber){
                    setCounting(false);
                    clearInterval(interval);

                    if(largeValue) setLargeValue(true);

                    return targetNumber;
                }
                return prevCount + increment
            })
        }, 10)

        return () => clearInterval(interval)
        
    },[targetNumber, increment, isLargeValue, largeValue])

    return (
        <h1>{(isCounting || (!isCounting && !isLargeValue)) ? Math.round(count) : largeValue}</h1>
    )
}

export default Counter