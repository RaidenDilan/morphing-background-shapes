import React, { useEffect, useRef } from 'react';
import './MorphWrapper.scss';
import anime from 'animejs';
import imagesLoaded from 'imagesloaded';
import scrollMonitor from 'scrollmonitor';

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

const SHAPES: Shape[] = [
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

const MorphWrapper = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  let step: number;
  let contentElems: Element[];
  let footer: HTMLDivElement | null;
  let contentElemsTotal: number;

  const initShapeLoop = (pos = 0) => {
    anime.remove(pathRef.current);
    anime({
      targets: pathRef.current,
      easing: 'linear',
      d: [
        { value: SHAPES[pos].pathAlt, duration: 1500 },
        { value: SHAPES[pos].path, duration: 1500 },
      ],
      loop: true,
      fill: {
        value: SHAPES[pos].fill.color,
        duration: SHAPES[pos].fill.duration,
        easing: SHAPES[pos].fill.easing,
      },
      direction: 'alternate',
    });
  };

  const initShapeElement = () => {
    anime.remove(svgRef.current);
    anime({
      targets: svgRef.current,
      duration: 1,
      easing: 'linear',
      scaleX: SHAPES[0].scaleX,
      scaleY: SHAPES[0].scaleY,
      translateX: SHAPES[0].tx + 'px',
      translateY: SHAPES[0].ty + 'px',
      rotate: SHAPES[0].rotate + 'deg',
    });
    initShapeLoop();
  };

  const createScrollWatchers = () => {
    contentElems.forEach((el, pos) => {
      const scrollElementToWatch = (
        pos ? contentElems[pos] : footer
      ) as HTMLDivElement;
      pos = pos ? pos : contentElemsTotal;
      const watcher = scrollMonitor.create(scrollElementToWatch, -300);

      watcher.enterViewport(() => {
        step = pos;
        anime.remove(pathRef.current);
        anime({
          targets: pathRef.current,
          duration: SHAPES[pos].animation.path.duration,
          easing: SHAPES[pos].animation.path.easing,
          elasticity: SHAPES[pos].animation.path.elasticity || 0,
          d: SHAPES[pos].path,
          fill: {
            value: SHAPES[pos].fill.color,
            duration: SHAPES[pos].fill.duration,
            easing: SHAPES[pos].fill.easing,
          },
          complete: () => initShapeLoop(pos),
        });

        anime.remove(svgRef.current);
        anime({
          targets: svgRef.current,
          duration: SHAPES[pos].animation.svg.duration,
          easing: SHAPES[pos].animation.svg.easing,
          elasticity: SHAPES[pos].animation.svg.elasticity || 0,
          scaleX: SHAPES[pos].scaleX,
          scaleY: SHAPES[pos].scaleY,
          translateX: SHAPES[pos].tx + 'px',
          translateY: SHAPES[pos].ty + 'px',
          rotate: SHAPES[pos].rotate + 'deg',
        });
      }, false);

      watcher.exitViewport(() => {
        const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

        if (idx <= contentElemsTotal && step !== idx) {
          step = idx;
          anime.remove(pathRef.current);
          anime({
            targets: pathRef.current,
            duration: SHAPES[idx].animation.path.duration,
            easing: SHAPES[idx].animation.path.easing,
            elasticity: SHAPES[idx].animation.path.elasticity || 0,
            d: SHAPES[idx].path,
            fill: {
              value: SHAPES[idx].fill.color,
              duration: SHAPES[idx].fill.duration,
              easing: SHAPES[idx].fill.easing,
            },
            complete: () => initShapeLoop(idx),
          });
          anime.remove(svgRef.current);
          anime({
            targets: svgRef.current,
            duration: SHAPES[idx].animation.svg.duration,
            easing: SHAPES[idx].animation.svg.easing,
            elasticity: SHAPES[idx].animation.svg.elasticity || 0,
            scaleX: SHAPES[idx].scaleX,
            scaleY: SHAPES[idx].scaleY,
            translateX: SHAPES[idx].tx + 'px',
            translateY: SHAPES[idx].ty + 'px',
            rotate: SHAPES[idx].rotate + 'deg',
          });
        }
      }, false);
    });
  };

  const init = () => {
    footer = document.querySelector('.content--related');
    contentElems = Array.from(document.querySelectorAll('.content-wrap'));
    contentElemsTotal = contentElems.length;

    imagesLoaded(document.body, () => {
      initShapeElement();
      createScrollWatchers();
      document.body.classList.remove('loading');
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="morph-wrap">
      <svg
        ref={svgRef}
        className="morph"
        width="1400"
        height="770"
        viewBox="0 0 1400 770"
      >
        <path
          ref={pathRef}
          d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"
        />
      </svg>
    </div>
  );
};

export default MorphWrapper;
