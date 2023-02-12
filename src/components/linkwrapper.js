/** @jsxImportSource @emotion/react */
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { css } from '@emotion/react';
import { mQ } from '../util/styleutil';
import { encodeString, decodeString } from '../util/encoder';

const LinkWrapper = ({ link, parentFinished, children, encodeKey = 156 }) => {
   const string = encodeString(link, encodeKey);
   const ctxRef = useRef(null);
   const tlRef = useRef(null);

   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         tlRef.current && tlRef.current.progress(0).kill();
         tlRef.current = gsap.timeline({ paused: true });
         tlRef.current.fromTo(
            '.underline',
            {
               width: '0',
               left: '0',
            },
            {
               width: '100%',
               duration: 1,
            }
         );
         tlRef.current.add('midway');
         tlRef.current.fromTo(
            '.underline',
            {
               width: '100%',
               left: '0',
            },
            {
               width: '0',
               left: '100%',
               duration: 1,
               immediateRender: false,
            }
         );
      }, ctxRef);
      return () => ctx.revert();
   }, []);

   function onMouseEnter() {
      parentFinished && tlRef.current && tlRef.current.tweenFromTo(0, 'midway');
   }

   function onMouseLeave() {
      parentFinished && tlRef.current && tlRef.current.play();
   }

   function onClick(event) {
      event.preventDefault();
      if (window.location) {
         window.location.href = decodeString(string);
      }
   }

   return (
      <a
         ref={ctxRef}
         href="#"
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         onClick={onClick}
         css={linkCSS}
      >
         {children}
         <span css={underlineCSS} className="underline" />
      </a>
   );
};

const linkCSS = css({
   cursor: 'none',
   textDecoration: 'none',
   '&:link, &:visited, &:hover, &:active': {
      color: 'black',
   },
   position: 'relative'
});

const underlineCSS = mQ({
   display: 'block',
   position: 'absolute',
   bottom: '0',
   left: '0',
   right: '0',
   width: '0',
   height: ['1px', '1.5px', '2px', '2.5px'],
   backgroundColor: 'black',
});

export default LinkWrapper;
