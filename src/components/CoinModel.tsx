'use client';

import dynamic from 'next/dynamic';

const SplineComponent = dynamic(() => import('@/components/SplineComponent'), {
  ssr: false,
  loading: () => null,
});

const CoinModel = () => {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40vw] h-[80vh]">
      <SplineComponent 
        scene="https://prod.spline.design/M3ltW-5pBfvFO6nr/scene.splinecode"
        className="coin-model"
      />
    </div>
  );
};

export default CoinModel; 