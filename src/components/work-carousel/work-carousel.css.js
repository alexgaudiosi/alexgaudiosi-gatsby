import styled, { css } from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';
import { accent } from 'constants/theme';

export const Carousel = styled.section`
  position: relative;
  width: 100%;
  min-height: min(72rem, calc(100vh - 13rem));
  overflow: hidden;
  background: #101312;
  color: #fff;

  &:focus-within {
    outline: 2px solid ${accent};
    outline-offset: -2px;
  }

  ${MEDIA.TABLET`
    min-height: 64rem;
  `};
`;

export const Slide = styled.article`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  opacity: 0;
  visibility: hidden;
  transform: scale(1.02);
  transition: opacity 700ms ease, transform 1000ms ease, visibility 700ms;
  pointer-events: none;

  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
      visibility: visible;
      transform: scale(1);
      pointer-events: auto;
      z-index: 1;
    `};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const SlideImage = styled.div`
  position: absolute;
  inset: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(9, 13, 12, 0.15), transparent 68%);
  }
`;

export const Shade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      180deg,
      rgba(10, 12, 11, 0.04) 25%,
      rgba(10, 12, 11, 0.88) 100%
    ),
    linear-gradient(90deg, rgba(10, 12, 11, 0.56), transparent 72%);
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: min(110rem, calc(100% - 8rem));
  margin: 0 auto;
  padding: 0 0 10rem;

  ${MEDIA.TABLET`
    width: calc(100% - 4rem);
    padding-bottom: 12rem;
  `};
`;

export const Eyebrow = styled.p`
  margin: 0 0 1.5rem;
  color: ${accent};
  font-size: 1.4rem;
  font-family: Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const ProjectTitle = styled.h2`
  max-width: 72rem;
  font-size: clamp(4.8rem, 8vw, 9.6rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: -0.035em;
`;

export const ProjectCopy = styled.p`
  max-width: 52rem;
  margin: 2rem 0 2.8rem;
  font-size: clamp(1.8rem, 2.4vw, 2.4rem);
  line-height: 1.35;
`;

export const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.7rem;
  border-bottom: 2px solid ${accent};
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;

  span {
    text-decoration: none;
    transition: transform 180ms ease;
  }

  &:hover span,
  &:focus span {
    transform: translate(0.3rem, -0.3rem);
  }
`;

export const Controls = styled.div`
  position: absolute;
  z-index: 3;
  right: max(4rem, calc((100vw - 110rem) / 2));
  bottom: 4rem;
  display: flex;
  align-items: center;
  gap: 1.4rem;

  ${MEDIA.TABLET`
    right: 2rem;
    bottom: 2.4rem;
    left: 2rem;
    justify-content: space-between;
  `};
`;

export const ArrowButton = styled.button`
  display: grid;
  width: 4.6rem;
  height: 4.6rem;
  padding: 0;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  color: #fff;
  background: rgba(12, 15, 14, 0.35);
  font-size: 2rem;
  cursor: pointer;
  transition: border-color 180ms ease, background-color 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: ${accent};
    background: rgba(12, 15, 14, 0.75);
    outline: none;
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

export const ProgressButton = styled.button`
  width: ${({ $active }) => ($active ? '3.2rem' : '1rem')};
  height: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: 1rem;
  background: ${({ $active }) =>
    $active ? accent : 'rgba(255, 255, 255, 0.55)'};
  cursor: pointer;
  transition: width 250ms ease, background-color 250ms ease;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
`;

export const Count = styled.span`
  min-width: 5.5rem;
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
`;
