import React, { memo } from 'react'
import { StoreConsumer } from '../contexts/StoreContext'

const NavItem = memo(({ title, active, toggleActive }) => {

  let classNames = 'nav-item'

  if(title === active) {
    classNames = `${classNames} active`
  }

  let iconClasses;

  if(title === 'favorites') {
    iconClasses = `fas fa-heart`
  
  } else if(title.substring(0,3) === '/r/') {
    iconClasses = `fab fa-reddit-alien`

  } else {
    iconClasses = ``
  }

  const favorited = (num) => {
    return `(${num})`
  }

  const handleClick = () => {
    
    toggleActive(title)
  }

  const handleHref = () => {
    if(title === 'favorites') {
      return '/favorites'
    } else {
      return '/'
    }
  }

  return (
    <StoreConsumer>
      {ctx => {
        // console.log(ctx)
        return ( 
        <a href={handleHref()} className={classNames} onClick={handleClick}>
          <li>
          <i className={iconClasses}></i> 

          { 
            title.substring(0,3) === '/r/' ? 
            ` ${ctx.search}` : 
            ` ${title} ${favorited(ctx.favorited)}` 
          }

          </li>
        </a>)
      }}
    </StoreConsumer>
    
  )
})


export default NavItem;