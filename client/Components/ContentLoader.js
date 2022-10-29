import React from 'react'
import Lottie from 'react-lottie';
import * as data from '../lotties/final.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const ContentLoader = () => {
  return (
    <div
        className='h-full w-full absolute flex items-center justify-center top-0 left-0 opacity-90'
    >
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
        />
    </div>
  )
}

export default ContentLoader