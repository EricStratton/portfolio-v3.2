/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export function splitWords(words) {
   const wordsArr = words.split(/(\s+)/);
   return wordsArr.map((word, index) => {
      return (
         <div key={index} css={wordCSS} className="word">
            {word.length === 1 ? (
               <div css={css({ minWidth: '1.5rem' })} />
            ) : (
               word.split('').map((letter, i) => {
                  return (
                     <div 
                        key={i} 
                        css={letterCSS} 
                        className='letter'
                     >
                        {letter}
                     </div>
                  );
               })
            )}
         </div>
      );
   });
}

const wordCSS = css({
   display: 'inline-block',
});

const letterCSS = css({
   display: 'inline-block',
   margin: '0 1rem',
   clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
   transition: 'all 1.5s',
   transform: 'translateY(-3em)',
});
