/** @jsxImportSource @emotion/react */
import { useRef, useEffect } from 'react';
import { css } from '@emotion/react';

const Cursor = () => {
   const mainRef = useRef(null);
   const secondaryRef = useRef(null);
   const positionRef = useRef({
      mouseX: 0,
      mouseY: 0,
      destinationX: 0,
      destinationY: 0,
      distanceX: 0,
      distanceY: 0,
      key: -1,
   });

   useEffect(() => {
      const main = mainRef.current;
      const position = positionRef.current;
      const secondary = secondaryRef.current;
      function onMouseMove(event) {
         if (!main || !position) return;
         const { clientX, clientY } = event;
         position.mouseX = clientX - secondary.clientWidth / 2;
         position.mouseY = clientY - secondary.clientHeight / 2;
         const x = clientX - main.clientWidth / 2;
         const y = clientY - main.clientHeight / 2;
         main.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      document.addEventListener('mousemove', onMouseMove);
      return () => document.removeEventListener('mousedown', onMouseMove);
   }, []);

   useEffect(() => {
      const position = positionRef.current;
      const secondary = secondaryRef.current;
      function followMouse() {
         position.key = requestAnimationFrame(followMouse);
         const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = position;
         if (!destinationX || !destinationY) {
            position.destinationX = mouseX;
            position.destinationY = mouseY;
         } else {
            position.distanceX = (mouseX - destinationX) * 0.1;
            position.distanceY = (mouseY - destinationY) * 0.1;
            if (Math.abs(position.distanceX) + Math.abs(position.distanceY) < 0.1) {
               position.destinationX = mouseX;
               position.destinationY = mouseY;
            } else {
               position.destinationX += distanceX;
               position.destinationY += distanceY;
            }
         }
         secondary.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
      followMouse();
      return () => cancelAnimationFrame(followMouse);
   }, []);

   return (
      <div>
         <div ref={mainRef} css={css([circleCSS, { width: '70px', height: '70px' }])}></div>
         <div
            ref={secondaryRef}
            css={css([circleCSS, { width: '35px', height: '35px', backgroundColor: 'black' }])}
         ></div>
      </div>
   );
};

const circleCSS = css({
   zIndex: '1000',
   borderRadius: '50%',
   borderWidth: '1px',
   borderStyle: 'solid',
   borderColor: 'black',
   pointerEvents: 'none',
   position: 'fixed',
});

export default Cursor;
