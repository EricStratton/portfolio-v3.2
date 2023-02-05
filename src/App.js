import Cursor from './components/cursor';
import Preloader from './components/preloader';
import useWindowSize from './hooks/usewindowsize';

function App() {
   const { width } = useWindowSize();

   return (
      <div className="App">
         {width > 699 && <Cursor />}
         <Preloader />
      </div>
   );
}

export default App;
