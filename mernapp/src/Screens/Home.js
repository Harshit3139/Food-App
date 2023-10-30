import React from 'react';
import Navbar from '../Components/Navbar';
import Foter from '../Components/Foter';
import Card from '../Components/Card';
// import Crousal from '../Components/Crousal';
import {useEffect, useState} from 'react';

export default function Home() {
  const [search,setSearch] = useState('');
  const [foodCat, setFoodCat] = useState ([]);
  //const [foodItem, setFoodItem] = useState ([]);
  const [foodItem, setFoodItem] = useState([]);

  //console.log(typeof foodItem);

  const loadData = async () => {
    let response = await fetch ("http://localhost:5001/api/foodData", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      } 
    });
    response = await response.json ();
    //console.log (response);
    setFoodItem(response[0].items);
    setFoodCat(response[0].category);
    //console.log(response[0],response[1]);  // beacuse we passed two things in displayData in Array From
  };

  useEffect(() => {
    loadData ()
  }, []);
return(
  <>
    <div> <Navbar/></div>
    <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{object:"contain !important "}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <div className="d-flex justify-content-center ">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success " type="submit">Search</button> */}
    </div>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/200x100/?burger" className="d-block w-100" style={{filter:"brightness(60%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/200×100/?pizza" className="d-block w-100" style={{filter:"brightness(60%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/200×100/?barbeque" className="d-block w-100" style={{filter:"brightness(60%)"}}  alt="..."/>
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
    <div className='container'>
    {
      foodCat && foodCat.length !== 0 ? 
      foodCat.map((data)=>{
        return(<div className="row mb-3" key={data._id} >
          <div  className="fs-3 m-3">
          {data.CategoryName}
          </div>
          <hr/>
          {foodItem && foodItem.length !== 0 ? foodItem.filter((item)=>(item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())))
          .map((filterItems)=>{
            return(
              <div className="col-12 col-md-6 col-lg-3 mb-3" key={filterItems._id}>
                <Card foodName={filterItems.name}
                options={filterItems.options[0]}
                imgSrc = {filterItems.img}
                
                ></Card>
              </div>
            )
          })
           : <div key="No-data" className="col-12">No Such Data Found</div>}
           </div>
        )
      })
      : <div key="No-categories">"""""""""""""</div>
    }
    </div>
    <div> <Foter/></div>
    </>
)
  }
