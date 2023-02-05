import { useState, useEffect } from 'react';

export default function () {
   const [windowSize, setWindowSize] = useState({
      width: null,
   });

   useEffect(() => {
      function handleResize() {
         setWindowSize({
            width: window.innerWidth,
         })
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
   }, [])

   return windowSize;
}
