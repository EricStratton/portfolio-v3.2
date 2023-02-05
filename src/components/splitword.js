/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mQ } from '../util/styleutil';

const SplitWord = ({ words, target, invert = false }) => {
   const wordsArr = words.split(/(\s+)/);
   return wordsArr.map((word, index) => {
      return (
         <div key={index} css={wordCSS} className="word">
            {(!word.replace(/\s/g, '').length) ? (
               <div css={mQ({ minWidth: ['1.5rem', '2.25rem', '3rem', '4rem'] })} />
            ) : (
               word.split('').map((letter, i) => {
                  return (
                     <div
                        key={i}
                        css={css([
                           letterCSS,
                           { transform: `translateY(${invert ? '3em' : '-3em'})` },
                        ])}
                        className={target}
                     >
                        {letter}
                     </div>
                  );
               })
            )}
         </div>
      );
   });
};

const wordCSS = css({
   display: 'inline-block',
});

const letterCSS = mQ({
   display: 'inline-block',
   margin: ['0 0.25rem', '0 0.5rem', '0 0.75rem', '0 1rem'],
   clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
   transition: 'all 1.5s',
   '&:first-of-type': {
      marginLeft: '0'
   },
   '&:last-of-type': {
      marginRight: '0'
   },
});

export default SplitWord;
