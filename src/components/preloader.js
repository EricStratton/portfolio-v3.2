/** @jsxImportSource @emotion/react */
import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ClassNames, css } from '@emotion/react';
import { mQ } from '../util/styleutil';
import SplitWord from './splitword';
import LinkWrapper from './linkwrapper';
import useWindowSize from '../hooks/usewindowsize';

const Preloader = () => {
   const [finished, setFinished] = useState(false);
   const ctxRef = useRef(null);
   const tlRef = useRef(null);
   const windowSize = useWindowSize();

   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         tlRef.current && tlRef.current.progress(0).kill();
         tlRef.current = gsap
            .timeline()
            .from('.wrapper', {
               scale: 0,
               opacity: 0.5,
               duration: 3,
               delay: 0.4,
               ease: 'expo',
            })
            .to(
               '.letter',
               {
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  y: 0,
                  stagger: 0.3,
                  ease: 'power2',
                  onComplete() {
                     setFinished(true);
                  },
               },
               '-=2.1s'
            );
      }, ctxRef);
      return () => ctx.revert();
   }, []);

   return (
      <div ref={ctxRef} css={bgCSS}>
         <div className="wrapper" css={wrapperCSS}>
            <div css={textWrapperCSS}>
               <ClassNames>
                  {({ cx, css }) => (
                     <h1
                        className={cx(
                           'name',
                           css(nameCSS),
                           windowSize.width < 376 &&
                              css({
                                 display: 'flex',
                                 flexDirection: 'column',
                              })
                        )}
                     >
                        <SplitWord words="Eric Stratton" target="letter" />
                     </h1>
                  )}
               </ClassNames>
               <ClassNames>
                  {({ cx, css }) => (
                     <h2
                        className={cx(
                           'contact',
                           css(contactCSS),
                           windowSize.width < 376 && css({ top: '65%' })
                        )}
                     >
                        <LinkWrapper link="mailto:strattonericj@gmail.com" parentFinished={finished}>
                           <SplitWord words="Contact" target="letter" invert />
                        </LinkWrapper>
                     </h2>
                  )}
               </ClassNames>
            </div>
         </div>
      </div>
   );
};

const bgCSS = css({
   backgroundColor: '#808000',
   overflow: 'hidden',
});

const wrapperCSS = css({
   position: 'relative',
   height: '100vh',
   width: '100vw',
   backgroundColor: '#f5f5dc',
});

const textWrapperCSS = css({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   position: 'fixed',
   left: '50%',
   top: '50%',
   transform: 'translate(-50%, -50%)',
   whiteSpace: 'nowrap',
   rowGap: '1rem'
});

const nameCSS = mQ({
   fontFamily: 'Belleza, serif',
   fontSize: ['3rem', '5rem', '6rem', '9rem'],
   width: 'fit-content',
});

const contactCSS = mQ({
   fontFamily: 'Federo, serif',
   fontSize: ['2rem', '3rem', '4rem', '5rem'],
   width: 'fit-content',
});

export default Preloader;
