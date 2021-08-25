import styled from 'styled-components';

export const Container = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      text-transform: uppercase;
      font-size: 1.3rem;
      margin: 0.5rem 1rem;
    }
  }
`;
