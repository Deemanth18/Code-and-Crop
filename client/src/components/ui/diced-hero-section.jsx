import React, { useState, useEffect, useRef } from 'react';
import { ChronicleButton } from './chronicle-button';

const warpedStyles = `
.warped-image {
  --r: 20px;
  --s: 40px;
  --x: 25px;
  --y: 5px;
}
.top-right {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(at calc(100% - var(--r)) var(--r),#0000 25%,#000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(100% - var(--_d) - var(--x)) 0 var(--_m), 100% calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 100% 0,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
  -webkit-mask: calc(100% - var(--_d) - var(--x)) 0 var(--_m), 100% calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 100% 0,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}
.top-left {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(at var(--r) var(--r),#000 75%,#0000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(var(--_d) + var(--x)) 0 var(--_m), 0 calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 0 0,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
  -webkit-mask: calc(var(--_d) + var(--x)) 0 var(--_m), 0 calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 0 0,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}
.bottom-left {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(from 180deg at var(--r) calc(100% - var(--r)),#0000 25%,#000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(var(--_d) + var(--x)) 100% var(--_m), 0 calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 0 100%,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
  -webkit-mask: calc(var(--_d) + var(--x)) 100% var(--_m), 0 calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 0 100%,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}
.bottom-right {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),#0000 25%,#000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(100% - var(--_d) - var(--x)) 100% var(--_m), 100% calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 100% 100%,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
  -webkit-mask: calc(100% - var(--_d) - var(--x)) 100% var(--_m), 100% calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 100% 100%,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}
`;

export const DicedHeroSection = ({
  topText,
  mainText,
  subMainText,
  buttonText,
  slides = [],
  onMainButtonClick,
  onGridImageHover,
  onGridImageClick,
  topTextStyle,
  mainTextStyle,
  subMainTextStyle,
  buttonStyle = {},
  componentBorderRadius = '0px',
  backgroundColor,
  separatorColor = '#005baa',
  maxContentWidth = '1536px',
  mobileBreakpoint = 1000,
  fontFamily = 'inherit',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("diced-warped-style")) {
      const styleEl = document.createElement("style");
      styleEl.id = "diced-warped-style";
      styleEl.innerHTML = warpedStyles;
      document.head.appendChild(styleEl);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      if (containerRef.current) {
        setIsMobile(containerRef.current.offsetWidth < mobileBreakpoint);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const getGradientStyle = (gradient) => {
    if (gradient) {
      return {
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      };
    }
    return {};
  };

  const defaultSlides = [
    { title: "Roma Tomatoes", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
    { title: "Sweet Carrots", image: "https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=800&q=80" },
    { title: "Bell Peppers", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80" },
    { title: "Baby Spinach", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80" },
  ];

  const activeSlides = slides && slides.length >= 4 ? slides : defaultSlides;

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: componentBorderRadius,
        backgroundColor,
        padding: '2rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        maxWidth: maxContentWidth,
        margin: '0 auto',
        fontFamily,
        position: 'relative',
      }}
    >
      <div
        style={{
          flex: 1,
          marginRight: isMobile ? 0 : '2rem',
          textAlign: isMobile ? 'center' : 'left',
          alignItems: isMobile ? 'center' : 'flex-start',
          maxWidth: isMobile ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 1,
          paddingBottom: isMobile ? '2rem' : 0,
        }}
      >
        <div>
          <span
            style={{
              ...topTextStyle,
              ...getGradientStyle(topTextStyle?.gradient),
              display: 'block',
            }}
          >
            {topText}
          </span>
          <h1
            style={{
              ...mainTextStyle,
              fontSize: mainTextStyle?.fontSize,
              marginTop: '0.5rem',
            }}
          >
            <span
              style={{
                ...getGradientStyle(mainTextStyle?.gradient),
                display: 'inline-block',
              }}
            >
              {mainText}
            </span>
          </h1>
          <hr
            style={{
              height: '0.25rem',
              width: '6.25rem',
              background: separatorColor,
              border: 'none',
              margin: isMobile ? '1.125rem auto 1.875rem' : '1.125rem 0 1.875rem',
            }}
          />
          <p
            style={{
              ...subMainTextStyle,
              ...getGradientStyle(subMainTextStyle?.gradient),
            }}
          >
            {subMainText}
          </p>
        </div>
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          <ChronicleButton
            text={buttonText}
            onClick={onMainButtonClick}
            hoverColor={buttonStyle?.hoverColor}
            hoverForeground={buttonStyle?.hoverForeground ?? '#fff'}
            borderRadius={buttonStyle?.borderRadius}
            fontFamily={fontFamily}
            customBackground={buttonStyle?.backgroundColor}
            customForeground={buttonStyle?.color}
          />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'relative',
          width: isMobile ? '100%' : '50%',
          paddingLeft: isMobile ? 0 : '2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            width: '100%',
            aspectRatio: '1 / 1',
          }}
        >
          {[activeSlides[3], activeSlides[2], activeSlides[1], activeSlides[0]].map((slide, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%',
                overflow: 'hidden',
                borderRadius: '20px',
              }}
            >
              <img
                src={slide?.image}
                alt={slide?.title || 'Produce Slide'}
                className={`warped-image ${['bottom-right', 'bottom-left', 'top-right', 'top-left'][index]}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => onGridImageClick && onGridImageClick(index)}
                onMouseEnter={() => onGridImageHover && onGridImageHover(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
