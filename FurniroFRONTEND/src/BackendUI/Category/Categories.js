import React, { useState } from 'react'
import Sidebar from '../sideBar'
import AddCategory from './AddCategory'
import'./categories.css'
import ShowCategory from './ShowCategory'
export default function Categories() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const[addCategory,setAddCategory] = useState(false);
    const[showCategory,setShowCategory] = useState(false);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
    <div>
    <div className='grid-container'>
  
  <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
  <div className='cat'>
 <div className='cat-button'>
  <button
     type="button"
     className="btn btn-primary btn-lg"
     style={{ height: "50px", width: "100px" }}
     onClick={()=>
     {
      setAddCategory(true);
      setShowCategory(false);
     }
     }
  >Add Category</button>
 </div>
 <div className='cat-button'>
  <button 
     type="button"
     className="btn btn-secondary btn-lg"
     style={{ height: "50px", width: "100px" }}
     onClick={()=>
      {
       setShowCategory(true);
       setAddCategory(false);
      }
      }
  >Show Categories</button>
 </div>
  </div>

  {addCategory && <AddCategory></AddCategory>}
  {showCategory && <ShowCategory></ShowCategory>}
  </div>
 
 </div>
  )
}
