import React from 'react';
import helloSignAPI from '../../assets/images/hellosignapi.svg';

const Content = () => {
  return (
    <div className="content content--fixed">
      <header className="codrops-header">
        <div className="codrops-links">
          <svg
            className="decoshape"
            viewBox="0 0 200 100"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <path d="M 10.45,74.41 C 39.4,110.8 72.59,67.27 95.98,68.68 122.3,70.35 131.5,101.4 154.7,99.69 177.9,98.03 200.5,79.26 198.1,47.17 195.9,15.27 174.6,-0.3279 151.8,0.9941 128.6,2.581 126,16.86 107,22.76 88.26,28.67 88.87,12.36 60.37,1.787 31.79,-8.877 -18.61,37.92 10.45,74.41 Z" />
          </svg>
          <a
            className="codrops-icon codrops-icon--prev"
            href="https://tympanus.net/Development/FolderPreviewIdeas/"
            title="Previous Demo"
          >
            <svg className="icon icon--arrow">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </a>
          <a
            className="codrops-icon codrops-icon--drop"
            href="https://tympanus.net/codrops/?p=31190"
            title="Back to the article"
          >
            <svg className="icon icon--drop">
              <use xlinkHref="#icon-drop"></use>
            </svg>
          </a>
        </div>
        <h1 className="codrops-header__title">Morphing Background Shapes</h1>
      </header>
      <nav className="demos">
        <a className="demo" href="index.html">
          <svg className="decoshape" preserveAspectRatio="none">
            <use xlinkHref="#shape-demo"></use>
          </svg>
          Demo 1
        </a>
        <a className="demo demo--current" href="index2.html">
          <svg className="decoshape">
            <use xlinkHref="#shape-demo"></use>
          </svg>
          Demo 2
        </a>
        <a className="demo" href="index3.html">
          <svg className="decoshape">
            <use xlinkHref="#shape-demo"></use>
          </svg>
          Demo 3
        </a>
      </nav>
      <a className="pater" href="http://synd.co/2pHxJny">
        <svg
          className="pater__deco"
          width="300"
          height="240"
          viewBox="0 0 1000 800"
        >
          <path d="M27.4,171.8C73,42.9,128.6,1,128.6,1s0,0,0,0c58.5,0,368.3,0.3,873.2,0.8c38.5,211,42.1,373.5,38.9,476.7c-2.5,80.3-10.6,174.9-76.7,247.8c-15.1,16.6-37.4,41.2-72.8,53.9c-92.4,33.1-173-50.8-283.9-99.4c-224.3-98.4-334.9,51.4-472.2-45.6C-6.3,535.2-14.5,290.6,27.4,171.8z" />
        </svg>
        <img className="pater__img" src={helloSignAPI} alt="HelloSign API" />
        <h4 className="pater__title">2x Faster Integration Time</h4>
        <p className="pater__desc">
          Embed contracts and agreements into your site or app with a few lines
          of code.
        </p>
      </a>
      <div className="deco deco--title">2017 Westland Exhibition Center</div>
    </div>
  );
};

export default Content;
