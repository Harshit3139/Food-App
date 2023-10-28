import React from 'react';
import Navbar from '../Components/Navbar';
import Foter from '../Components/Foter';
import Card from '../Components/Card';
import Crousal from '../Components/Crousal';
import {useEffect, useState} from 'react';

export default function Home () {
  const [foodCat, setFoodCat] = useState ([]);
  const [foodItem, setFoodItem] = useState ([]);
  //console.log(typeof foodItem);

  const loadData = async () => {
    let response = await fetch ('http://localhost:5001/api/foodData', {
      method: 'POST',
      'Content-Type': 'application/json',
    });
    response = await response.json ();
    //console.log (response);
    setFoodItem (response[0]);
    setFoodCat (response[1]);
    //console.log(response[0],response[1]);  // beacuse we passed two things in displayData in Array From
  };

  useEffect (() => {
    loadData ();
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>
      <div><Crousal /></div>
      <div className='container'> 
        {foodCat.length > 0
  ? foodCat.map((data) => (
      <div key={data._id}>
        <div className="fs-3 m-3">{data.CategoryName}</div>
        <hr />
        {foodItem.length > 0
          ? foodItem
              .filter((item) => item.CategoryName === data.CategoryName)
              .map((filterItems) => (
                <div key={filterItems._id}>
                  <Card />
                </div>
              ))
          : <div key="no-data">No such data found</div>}
      </div>
    ))
  : ''}

        <Card />

      </div>
      <div> <Foter /></div>

    </div>
  );
}
