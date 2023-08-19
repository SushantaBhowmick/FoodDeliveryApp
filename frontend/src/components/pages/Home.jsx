import React, { useEffect, useState } from 'react'
import Card from '../Card'

const Home = () => {

  const [search, setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/disp/foods",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    response = await response.json();
    // console.log(response[0],response[1]);
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
      <div className="carousel">
      <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption d-none d-md-block" style={{zIndex:"10"}}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2 " type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
                                {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100"  style={{filter:"brightness(30%)"}} alt="..." />

                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?momos" className="d-block w-100"  style={{filter:"brightness(30%)"}} alt="..." />

                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}}  alt="..." />

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
                </div>
            </div>

      </div>
      <div className='container'>
        {
          foodCat !== [] ? foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem !== [] ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card 
                            foodItem={filterItems}
                            item={filterItems}
                            ImgSrc={filterItems.img}
                            options ={filterItems.options[0]}

                            />
                          </div>
                        )
                      }
                      )
                    : <div>No such file here </div>
                }
              </div>
            )
          }) : ""
        }
      </div>
    </>
  )
}

export default Home