import React from 'react'
import SplitText from './components/SplitText';

function App() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};
  return (
    <div>
      



      <SplitText
        text="Hello, Tailwind!"
        className="text-2xl font-semibold text-center"
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </div>
  )
}

export default App
