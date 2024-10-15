import React from 'react';

// import LoaderLogo from 'src/assets/inside/loader-logo.png';
const Loading = () => {
  return (
    <div className="top-[50%] w-full h-full flex items-center justify-center place-content-center animate__animated">
      <span className="w-5 h-5 m-auto mb-10">
        <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
      </span>
    </div>
  );
};

export default Loading;
