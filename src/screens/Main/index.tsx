import React, { useEffect, useState, useRef } from 'react';
import './Main.scss';

import anime from 'animejs';
import imagesLoaded from 'imagesloaded';
import scrollMonitor from 'scrollmonitor';
import TiltObject from '../../components/TiltObject';

import img1 from './img/1.jpg';
import img4 from './img/4.jpg';
import img3 from './img/3.jpg';
import img2 from './img/2.jpg';
import img5 from './img/5.jpg';
import hellosignapi from './img/sponsor/hellosignapi.svg';

interface Shape {
  path: string;
  pathAlt: string;
  scaleX: number;
  scaleY: number;
  rotate: number;
  tx: number;
  ty: number;
  fill: {
    color: string;
    duration: number;
    easing: string;
  };
  animation: {
    path: {
      duration: number;
      easing: string;
      elasticity?: number;
    };
    svg: {
      duration: number;
      easing: string;
      elasticity?: number;
    };
  };
}

type Shapes = Shape[];

const shapes: Shapes = [
  {
    path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    pathAlt:
      'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    scaleX: 1.3,
    scaleY: 1.8,
    rotate: 70,
    tx: 0,
    ty: -100,
    fill: {
      color: '#342560',
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      svg: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
    },
  },
  {
    path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
    pathAlt:
      'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
    scaleX: 1.9,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 100,
    fill: {
      color: '#d65640',
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      svg: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
    },
  },
  {
    path: 'M 383.8,163.4 C 335.8,352.3 591.6,317.1 608.7,420.8 625.8,524.5 580.5,626 647.3,688 714,750 837.1,760.5 940.9,661.5 1044,562.3 1041,455.8 975.8,393.6 909.8,331.5 854.2,365.4 784.4,328.1 714.6,290.8 771.9,245.2 733.1,132.4 694.2,19.52 431.9,-25.48 383.8,163.4 Z',
    pathAlt:
      'M 383.8,163.4 C 345.5,324.9 591.6,317.1 608.7,420.8 625.8,524.5 595.1,597 647.3,688 699.5,779 837.1,760.5 940.9,661.5 1044,562.3 1068,444.4 975.8,393.6 884,342.8 854.2,365.4 784.4,328.1 714.6,290.8 820.3,237.2 733.1,132.4 645.9,27.62 422.1,1.919 383.8,163.4 Z',
    scaleX: 1.9,
    scaleY: 1.1,
    rotate: 40,
    tx: -100,
    ty: 200,
    fill: {
      color: '#bfb37c',
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      svg: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
    },
  },
  {
    path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    pathAlt:
      'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    scaleX: 1.5,
    scaleY: 2,
    rotate: -20,
    tx: 0,
    ty: -50,
    fill: {
      color: '#1e71bf',
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      svg: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
    },
  },
  {
    path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    pathAlt:
      'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
    scaleX: 1.3,
    scaleY: 1,
    rotate: -70,
    tx: 0,
    ty: 150,
    fill: {
      color: '#44b7a3',
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      svg: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
    },
  },
  {
    path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
    pathAlt:
      'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
    scaleX: 2,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 100,
    fill: {
      color: '#4b66b3',
      duration: 500,
      easing: 'linear',
    },
    animation: {
      path: {
        duration: 2000,
        easing: 'easeOutElastic',
        elasticity: 400,
      },
      svg: {
        duration: 2000,
        easing: 'easeOutQuad',
      },
    },
  },
];

interface ContentsArray {
  imageSrc: string;
  title: string;
  content__author: string;
  content__desc: string;
}

const contentArray: ContentsArray[] = [
  {
    imageSrc: img3,
    title: 'found',
    content__author: 'Jane Westhall',
    content__desc: "Lost or found? That's the question today.",
  },
  {
    imageSrc: img4,
    title: 'bunch',
    content__author: 'Nikimo Westlane',
    content__desc: 'The neverending quest, once and forever.',
  },
  {
    imageSrc: img1,
    title: 'revert',
    content__author: 'Gregory Mourisha',
    content__desc: 'Finding the heart when paradise is lost.',
  },
  {
    imageSrc: img2,
    title: 'east',
    content__author: 'Walter Mastricht',
    content__desc: 'The outer bounds of the world, from within.',
  },
  {
    imageSrc: img5,
    title: 'frank',
    content__author: 'Frank Cherry',
    content__desc: "Frank's work and nothing more.",
  },
];

const Main = () => {
  let step: number;
  let svg: HTMLDivElement | null;
  let shapeEl: SVGPathElement | null;
  let contentElems: Element[];
  let contentLinks: Element[];
  let footer: HTMLDivElement | null;
  let contentElemsTotal: number;

  const initShapeLoop = (pos = 0) => {
    anime.remove(shapeEl);
    anime({
      targets: shapeEl,
      easing: 'linear',
      d: [
        { value: shapes[pos].pathAlt, duration: 1500 },
        { value: shapes[pos].path, duration: 1500 },
      ],
      loop: true,
      fill: {
        value: shapes[pos].fill.color,
        duration: shapes[pos].fill.duration,
        easing: shapes[pos].fill.easing,
      },
      direction: 'alternate',
    });
  };

  const initShapeEl = () => {
    anime.remove(svg);
    anime({
      targets: svg,
      duration: 1,
      easing: 'linear',
      scaleX: shapes[0].scaleX,
      scaleY: shapes[0].scaleY,
      translateX: shapes[0].tx + 'px',
      translateY: shapes[0].ty + 'px',
      rotate: shapes[0].rotate + 'deg',
    });
    initShapeLoop();
  };

  const createScrollWatchers = () => {
    contentElems.forEach((el, pos) => {
      const scrollElemToWatch = (
        pos ? contentElems[pos] : footer
      ) as HTMLDivElement;
      pos = pos ? pos : contentElemsTotal;
      const watcher = scrollMonitor.create(scrollElemToWatch, -300);

      watcher.enterViewport(() => {
        step = pos;
        anime.remove(shapeEl);
        anime({
          targets: shapeEl,
          duration: shapes[pos].animation.path.duration,
          easing: shapes[pos].animation.path.easing,
          elasticity: shapes[pos].animation.path.elasticity || 0,
          d: shapes[pos].path,
          fill: {
            value: shapes[pos].fill.color,
            duration: shapes[pos].fill.duration,
            easing: shapes[pos].fill.easing,
          },
          complete: () => initShapeLoop(pos),
        });

        anime.remove(svg);
        anime({
          targets: svg,
          duration: shapes[pos].animation.svg.duration,
          easing: shapes[pos].animation.svg.easing,
          elasticity: shapes[pos].animation.svg.elasticity || 0,
          scaleX: shapes[pos].scaleX,
          scaleY: shapes[pos].scaleY,
          translateX: shapes[pos].tx + 'px',
          translateY: shapes[pos].ty + 'px',
          rotate: shapes[pos].rotate + 'deg',
        });
      }, false);

      watcher.exitViewport(() => {
        const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

        if (idx <= contentElemsTotal && step !== idx) {
          step = idx;
          anime.remove(shapeEl);
          anime({
            targets: shapeEl,
            duration: shapes[idx].animation.path.duration,
            easing: shapes[idx].animation.path.easing,
            elasticity: shapes[idx].animation.path.elasticity || 0,
            d: shapes[idx].path,
            fill: {
              value: shapes[idx].fill.color,
              duration: shapes[idx].fill.duration,
              easing: shapes[idx].fill.easing,
            },
            complete: () => initShapeLoop(idx),
          });
          anime.remove(svg);
          anime({
            targets: svg,
            duration: shapes[idx].animation.svg.duration,
            easing: shapes[idx].animation.svg.easing,
            elasticity: shapes[idx].animation.svg.elasticity || 0,
            scaleX: shapes[idx].scaleX,
            scaleY: shapes[idx].scaleY,
            translateX: shapes[idx].tx + 'px',
            translateY: shapes[idx].ty + 'px',
            rotate: shapes[idx].rotate + 'deg',
          });
        }
      }, false);
    });
  };

  const init = () => {
    svg = document.querySelector('.morph');
    shapeEl = svg ? svg.querySelector('path') : null;
    contentElems = Array.from(document.querySelectorAll('.content-wrap'));
    contentLinks = Array.from(document.querySelectorAll('.content__link'));
    footer = document.querySelector('.content--related');
    contentElemsTotal = contentElems.length;

    imagesLoaded(document.body, instance => {
      initShapeEl();
      createScrollWatchers();
      document.body.classList.remove('loading');
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="Main">
      <svg className="hidden">
        <symbol id="icon-arrow" viewBox="0 0 24 24">
          <title>arrow</title>
          <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
        </symbol>
        <symbol id="icon-drop" viewBox="0 0 24 24">
          <title>drop</title>
          <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" />
          <path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
        </symbol>
        <symbol id="shape-demo" viewBox="0 0 200 100">
          <title>shape demo</title>
          <path d="M 6.144,74.1 C 20.4,107.4 70.13,94.33 94.22,95.74 121.3,97.41 130.8,101.1 154.7,99.38 178.6,97.72 201.9,78.95 199.4,46.86 197.1,14.96 174.9,4.781 161.4,1.827 147.9,-1.128 119.8,8.284 105.6,8.766 85.34,9.449 81.91,7.628 51.08,2.334 17.26,-3.482 -8.105,40.84 6.144,74.1 Z" />
        </symbol>
      </svg>
      <div className="morph-wrap">
        <svg className="morph" width="1400" height="770" viewBox="0 0 1400 770">
          <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z" />
        </svg>
      </div>
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
          <img className="pater__img" src={hellosignapi} alt="HelloSign API" />
          <h4 className="pater__title">2x Faster Integration Time</h4>
          <p className="pater__desc">
            Embed contracts and agreements into your site or app with a few
            lines of code.
          </p>
        </a>
        <div className="deco deco--title">2017 Westland Exhibition Center</div>
      </div>
      {Array.from(contentArray).map((el, i) => (
        <TiltObject key={i} content={{ ...el, index: i }} />
      ))}
    </main>
  );
};

export default Main;
