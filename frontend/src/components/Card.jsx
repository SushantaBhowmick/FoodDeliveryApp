import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer'

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef()

  let options = props.options;
  let priceOptions = Object.keys(options);
  let food = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {

    await dispatch({
      type: "ADD",
      id: food._id,
      name: food.name,
      price: finalPrice,
      qty: qty,
      size: size,
      desc: food.description,
    })
    console.log(data);
  }

  const finalPrice = qty * parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <>

      <div>
        <div className="card bg-dark mt-3" style={{ "width": "16rem", "maxHeight": "100vh" }}>
          <img src={food.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{food.name}</h5>
            <p className="card-text">{food.description}</p>
            <div className="container w-100">
              <select name="" className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {
                  Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    )
                  })
                }
              </select>
              <select name="" className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                  priceOptions.map((data) => {
                    return <option key={data} value={data}>{data}</option>
                  })
                }
              </select>
              <div className='d-inline h-100 fs-5'>
                ₹{finalPrice}/-
              </div>

            </div>
            <hr />
            <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
              {/* <Link to={`/cart/${props.id}`} >Add To Cart</Link> */}
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card