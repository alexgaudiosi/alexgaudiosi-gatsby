import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';

export const Title = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0 1rem;
`;

export const ImageFrame = styled.div`
  min-height: 160px;
  display: flex;
  align-items: flex-start;

  .gatsby-image-wrapper {
    width: 100%;
  }

  ${MEDIA.TABLET`
    min-height: 90px;
  `};
`;

export const Copy = styled.p`
  color: #757575;
  margin: 0 0rem 2rem;

  ${MEDIA.TABLET`
    margin-bottom: 4rem;
  `};
`;
