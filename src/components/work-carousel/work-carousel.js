import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Carousel,
  Slide,
  SlideImage,
  Shade,
  Content,
  Eyebrow,
  ProjectTitle,
  ProjectCopy,
  ProjectLink,
  Controls,
  ArrowButton,
  Progress,
  ProgressButton,
  Count,
} from './work-carousel.css';

const AUTOPLAY_DELAY = 5500;

const WorkCarousel = ({ items, eyebrow }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const itemCount = items ? items.length : 0;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isPaused || itemCount < 2 || prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % itemCount);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused, itemCount]);

  if (!itemCount) return null;

  const showSlide = index => {
    setActiveIndex((index + itemCount) % itemCount);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
    if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
  };

  return (
    <Carousel
      ref={carouselRef}
      aria-label="Selected work"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={event => {
        if (!carouselRef.current.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isExternal = item.target === '_blank';
        const linkProps = isExternal
          ? {
              as: 'a',
              href: item.url,
              target: '_blank',
              rel: 'noopener noreferrer',
            }
          : { as: Link, to: item.url };

        return (
          <Slide
            key={item.title}
            aria-hidden={!isActive}
            aria-label={`${index + 1} of ${itemCount}`}
            aria-roledescription="slide"
            $active={isActive}
          >
            <SlideImage>
              <GatsbyImage
                image={item.image.childImageSharp.gatsbyImageData}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{ height: '100%', width: '100%' }}
                imgStyle={{ objectFit: 'cover' }}
              />
            </SlideImage>
            <Shade />
            <Content>
              <Eyebrow>{eyebrow}</Eyebrow>
              <ProjectTitle>{item.title}</ProjectTitle>
              <ProjectCopy>{item.copy}</ProjectCopy>
              {item.url && (
                <ProjectLink {...linkProps} tabIndex={isActive ? 0 : -1}>
                  View project <span aria-hidden="true">&#8599;</span>
                </ProjectLink>
              )}
            </Content>
          </Slide>
        );
      })}

      {itemCount > 1 && (
        <Controls>
          <ArrowButton
            type="button"
            aria-label="Show previous project"
            onClick={() => showSlide(activeIndex - 1)}
          >
            <span aria-hidden="true">&#8592;</span>
          </ArrowButton>
          <Progress aria-label="Choose a project">
            {items.map((item, index) => (
              <ProgressButton
                key={item.title}
                type="button"
                aria-label={`Show ${item.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                $active={index === activeIndex}
                onClick={() => showSlide(index)}
              />
            ))}
          </Progress>
          <Count aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(itemCount).padStart(2, '0')}
          </Count>
          <ArrowButton
            type="button"
            aria-label="Show next project"
            onClick={() => showSlide(activeIndex + 1)}
          >
            <span aria-hidden="true">&#8594;</span>
          </ArrowButton>
        </Controls>
      )}
    </Carousel>
  );
};

WorkCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  eyebrow: PropTypes.string,
};

WorkCarousel.defaultProps = {
  eyebrow: 'Selected work',
};

export default WorkCarousel;
