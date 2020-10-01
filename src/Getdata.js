import React,{ useEffect,useState } from 'react';
import spin from "./spin.gif";
function Getdata() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //let t = "5cf9dfd5-3449-485e-b5ae-70a60e997864";
  useEffect(() =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    
    fetch("https://api.covid19api.com/summary", requestOptions)
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.Countries);
      },(error) => {
        setIsLoaded(false);
        setError(error);
      })
  },[]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <img src={spin} alt="loading..." className="spin-center"></img>;
  } else {
      const res = items.map(item => ({y: item.TotalConfirmed,label:item.Country}));
      console.log(res);
    return (
         res  
    );
  }
}

export default Getdata;
