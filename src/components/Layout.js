import React from 'react';
import {Container, HeaderContent} from 'semantic-ui-react';
import Header from './Header';

export default props => {
  return (
    <Container>
      <HeaderContent>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </HeaderContent>

      <Header />
      {props.children}
    </Container>
  );
};
