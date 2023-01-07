import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface MovementProps {
  movement: {
    img: { translation: { x: number; y: number } };
    title: { translation: { x: number; y: number } };
  };
}

interface TiltObjectProps {
  content: {
    index: number;
    imageSrc: string;
    title: string;
    content__author: string;
    content__desc: string;
  };
  options?: MovementProps;
}

interface TiltObjectState {
  options: MovementProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
const extend = (a: { [key: string]: any }, b: { [key: string]: any }) => {
  for (const key in b) {
    if (Object.prototype.hasOwnProperty.call(b, key)) {
      a[key] = b[key];
    }
  }
  return a;
};

// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos = (e: MouseEvent) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event as unknown as MouseEvent;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

const TiltObject = (props: TiltObjectProps) => {
  const [state, setState] = useState<TiltObjectState>({
    options: {
      movement: {
        img: {
          translation: {
            x: -10,
            y: -20,
          },
        },
        title: {
          translation: {
            x: 25,
            y: 25,
          },
        },
      },
    },
  });

  const elemRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      options: extend({}, state.options) as MovementProps,
    }));
    extend(state.options, props.options as MovementProps);

    elemRef.current?.addEventListener('mousemove', mouseMoveFn);
    elemRef.current?.addEventListener('mouseleave', mouseLeaveFn);
    elemRef.current?.addEventListener('mouseenter', mouseEnterFn);

    return () => {
      elemRef.current?.removeEventListener('mousemove', mouseMoveFn);
      elemRef.current?.removeEventListener('mouseleave', mouseLeaveFn);
      elemRef.current?.removeEventListener('mouseenter', mouseEnterFn);
    };
  }, []);

  const mouseEnterFn = (e: MouseEvent) => {
    anime.remove(imgRef);
    anime.remove(titleRef);
  };

  const mouseMoveFn = (e: MouseEvent) => {
    requestAnimationFrame(() => layout(e));
  };

  const mouseLeaveFn = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      anime({
        targets: [imgRef, titleRef],
        duration: 1500,
        easing: 'easeOutElastic',
        elasticity: 400,
        translateX: 0,
        translateY: 0,
      });
    });
  };

  const layout = (e: MouseEvent) => {
    // Mouse position relative to the document.
    const mousepos = getMousePos(e);
    // Document scrolls.
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    };

    const bounds = elemRef.current?.getBoundingClientRect() as DOMRect;
    // Mouse position relative to the main element (DOM.el).
    const relmousepos = {
      x: mousepos.x - bounds.left - docScrolls.left,
      y: mousepos.y - bounds.top - docScrolls.top,
    };

    // Movement settings for the animatable elements.
    const t = {
      img: state.options.movement.img.translation,
      title: state.options.movement.title.translation,
    };

    const transforms = {
      img: {
        x: ((-1 * t.img.x - t.img.x) / bounds.width) * relmousepos.x + t.img.x,
        y: ((-1 * t.img.y - t.img.y) / bounds.height) * relmousepos.y + t.img.y,
      },
      title: {
        x:
          ((-1 * t.title.x - t.title.x) / bounds.width) * relmousepos.x +
          t.title.x,
        y:
          ((-1 * t.title.y - t.title.y) / bounds.height) * relmousepos.y +
          t.title.y,
      },
    };

    if (titleRef.current) {
      titleRef.current.style.transform =
        'translateX(' +
        transforms.title.x +
        'px) translateY(' +
        transforms.title.y +
        'px)';
    }
    if (imgRef.current) {
      imgRef.current.style.transform =
        'translateX(' +
        transforms.img.x +
        'px) translateY(' +
        transforms.img.y +
        'px)';
    }
  };

  return (
    <div className="content-wrap">
      <div
        ref={elemRef}
        className={`content content--layout content--layout-${props.content.index}`}
      >
        <img
          ref={imgRef}
          className="content__img"
          src={props.content.imageSrc}
          alt="Some image"
        />
        <h3 ref={titleRef} className="content__title">
          {props.content.title}
        </h3>
        <p className="content__author">{props.content.content__author}</p>
        <p className="content__desc">{props.content.content__desc}</p>
        <a href="#" className="content__link">
          Discover
        </a>
      </div>
    </div>
  );
};

export default TiltObject;
