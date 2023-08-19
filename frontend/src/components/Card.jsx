import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer'

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef()
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let navigate = useNavigate()


  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  
  return (
    <>

      <div>
        <div className="card bg-dark mt-3" style={{ "width": "16rem", "maxHeight": "100vh" }}>
          <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            <p className="card-text">{foodItem.description}</p>
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