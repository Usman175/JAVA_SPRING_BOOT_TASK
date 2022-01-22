import React from 'react'

export default function SearchBar(props) {
    return (
        <div className="home-search-subMenu-area">
        <div className="home-search-subMenu-item">
          <input type="checkbox" /> {props.languageType.Logo_BRAND}  
        </div>  
        <div className="home-search-subMenu-item">
          <input type="checkbox" />  {props.languageType.PRINT_NOTICE}  
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" /> {props.languageType.ROAD}
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" /> {props.languageType.PPT_DESIGN}
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" />  {props.languageType.MATTERID_PREMIER}
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" /> {props.languageType.TWO_GREAT_NATURE} 
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" /> {props.languageType.DRY_PLATE_SIGN_BOARD}
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" />  {props.languageType.TURRET_DESIGN}
        </div> 
        <div className="home-search-subMenu-item">
          <input type="checkbox" /> {props.languageType.DESIGNS}
        </div> 
        <div className="home-search-subMenu-item">
         <button>{props.languageType.SEARCH}</button>
        </div> 
        
        </div>
    )
}
