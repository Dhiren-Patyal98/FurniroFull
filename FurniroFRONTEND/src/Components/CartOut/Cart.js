import React from 'react'

import './Cart.css'
import cartimg from '../../Images/Cartimages/Cartproduct.png'
import { TbTrashFilled } from "react-icons/tb";
import HeaderTwo from './HeaderTwo'
import WarrantyDetail from '../Shop/WarrantyDetail'

export default function Cart() {
  return (
    <div>
      
      <HeaderTwo/>
      <div className='Main-cartContainer'>
        <div className='cart-content'>

         <div className='cart-Product'>
            <div className='cart-nav'>
               <text>Product</text>
               <text> Price </text>
               <text>Quantity</text>
               <text>Subtotal</text>
            </div>

            <div className='cart-product-details'>

              <div className='image-designing'><img src={cartimg} alt=''></img></div>
              <text className='cart-text '>Asgaard sofa</text>
              <text className='cart-text-1'>Rs. 250,000.00</text>
              <text className='cart-quantity'>1</text>
              <text className='cart-pricing'>Rs. 250,000.00</text>
              <TbTrashFilled className='trash-icon'/>
            </div>

            


         </div>
          



          <div className='cart-Total'>
          
          
          <div className='cart-heading'>
             <text>Cart Totals</text>
          </div>


          <div className='cart-items-price'>
            <div className='cart-items-st'>
            <text>
              Subtotal
              </text>
              <text>
              Total
              </text>
            </div>

            <div className='cart-rs'>
             <text>
             Rs. 250,000.00
             </text>

             <span>
             Rs. 250,000.00
             </span>
            </div>

          </div >



          <div className='cart-checkout-button'>
           <button className='cart-button'>
            Check Out
            </button>
        
          </div>



          </div>

        </div>
      </div>
      <WarrantyDetail/>
    </div>
    
  )
}
