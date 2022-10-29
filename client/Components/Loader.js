import React from 'react'
import Lottie from 'react-lottie';
import * as data from '../lotties/loader.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loader = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-primaries-700'>
      <div
        className='w-11/12 max-w-5xl flex flex-col items-center justify-center'
      >
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    </div>
  )
}

export default Loader