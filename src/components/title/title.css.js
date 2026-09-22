import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';
import { accent } from 'constants/theme';

export const Text = styled.span`
  display: block;
  font-weight: ${({ $emphasized, size }) => () => {
    if ($emphasized) return '600';

    switch (size) {
      case 'large':
        return '400';
      default:
        return '500';
    }
  }};
  font-size: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '3.2rem';
      default:
        return '2rem';
    }
  }};
  line-height: 1.2;
  margin-bottom: 10px;
  text-decoration: ${({ $emphasized }) =>
    $emphasized ? `underline ${accent}` : 'none'};
  text-decoration-thickness: ${({ $emphasized }) =>
    $emphasized ? '0.08em' : 'auto'};
  text-underline-offset: ${({ $emphasized }) =>
    $emphasized ? '0.16em' : 'auto'};

  ${MEDIA.TABLET`
    font-size: ${({ size }) => () => {
      switch (size) {
        case 'large':
          return '2.6rem';
        default:
          return '2rem';
      }
    }};
  `};
`;
