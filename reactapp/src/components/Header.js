import React, { memo } from 'react';
import { StoreConsumer } from '../contexts/StoreContext'

const Header = memo(() => {

  return (
    <StoreConsumer>
      { ctx => (
        <header>
          <h1>{ ctx.search }</h1>
        </header>
      )}
    </StoreConsumer>
  )
});

export default Header;