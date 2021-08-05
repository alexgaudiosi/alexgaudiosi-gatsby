import styled from 'styled-components';
import { accent } from 'constants/theme';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem;

  a {
    color: #757575;
    transition: color 0.2s ease;
    text-decoration: underline ${accent};

    &:hover {
      color: inherit;
    }
  }
`;
