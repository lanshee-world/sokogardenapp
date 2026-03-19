import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
    // destructure the details passed from the Getproducts component
    // the useLocation hook allows us to get/destructure the properties passed from the previous component.
    const{product} = useLocation().state || {}

    const navigate = useNavigate()

     // below we specify the image url
     const img_url ="https://keyafidel.alwaysdata.net/static/images/"

    //  initialize hooks to manage the state of your application
    const[number, setNumber] = useState("");
    const[loading, setLoading] = useState(false);
    const[success, setSuccess] = useState("");
    const[error, setError] = useState("");

    //   create  a function that will handle the submit action
    const handleSubmit = async (e) =>{
        // prevent the site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try{
            // create a form data object
            const formdata = new FormData()

            // update the data to the form data
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://keyafidel.alwaysdata.net/api/mpesa_payment", formdata)

            // set loading back to default
            setLoading(false)

            // update the success hook with a message
            setSuccess(response.data.message)

        }
        catch(error){
          //  If there is an error respond to error
          setLoading(false)

          // update the error hook with the error message
          setError(error.message)
        }
    }

  return (
    <div className="row justify-content-center">
      <h1 className='text-success'>Make Payment-Lipa Na Mpesa</h1>

      <div className="col-md-1">
        <input type="button" 
        value=" <- Back"
        className='btn btn-primary'
        onClick={() => navigate("/")} />
      </div>

      <div className="col-md-6 card shadow p-4">
        <img src={img_url + product.product_photo} alt="product name" className='product_img' />
      </div>
      <div className="card-body">
        <h2 className='text-info'>{product.product_name}</h2>

        <p className='text-dark'>{product.product_description}</p>

        <h3 className='text-warning'> KES.{product.product_cost}</h3>

        <form onSubmit={handleSubmit}>

          {/* Bind the loading hook */}
        {loading && <Loader/>}

        <h3 className='text-success'>{success}</h3>
        <h4 className='text-danger'>{error}</h4>

            <input type="number" 
            placeholder='Enter your phone number 254xxxxxxxxx' 
            className='form-control'
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}/>

            <input type="submit" value="Make Payment" className='btn btn-success' />
        </form>
      </div>
    </div>
  )
}

export default Makepayment;
