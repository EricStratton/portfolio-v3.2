/** @jsxImportSource @emotion/react */
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { css } from '@emotion/react';
import { splitWords } from '../util/splitwords';

const Preloader = () => {
   const ctxRef = useRef();
   const tlRef = useRef();

   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         tlRef.current && tlRef.current.progress(0).kill();
         tlRef.current = gsap
            .timeline()
            .from('.wrapper', {
               scale: 0,
               opacity: 0.5,
               duration: 2,
               delay: 0.2,
               ease: 'expo',
            })
            .to('.letter', {
               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
               y: 0,
               stagger: 0.3,
            }, '-=1.8s');
      }, ctxRef);
      return () => ctx.revert();
   }, []);

   return (
      <div ref={ctxRef} css={bgCSS}>
         <div className="wrapper" css={wrapperCSS}>
            <h1 className="name" css={nameCSS}>
               {splitWords('Eric Stratton')}
            </h1>
         </div>
      </div>
   );
};

const bgCSS = css({
   backgroundColor: '#808000',
});

const wrapperCSS = css({
   position: 'relative',
   height: '100vh',
   width: '100vw',
   backgroundColor: '#f5f5dc',
});

const nameCSS = css({
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   fontFamily: 'Belleza, serif',
   fontSize: '8rem',
   width: 'max-content',
});

export default Preloader;
