import React, { createRef, PureComponent } from 'react';
import anime from 'animejs';

interface MovementProps {
  movement: {
    img: { translation: { x: number; y: number } };
    title: { translation: { x: number; y: number } };
  };
}

interface TiltObjectProps {
  // el: Element;
  content: {
    imageSrc: string;
    title: string;
    content__author: string;
    content__desc: string;
  };
  options?: MovementProps;
}

interface StyleProps {
  style: {
    WebkitTransform: string;
  };
}

interface TiltObjectState {
  options: MovementProps;
  dom: {
    img: StyleProps | Element | null;
    title: StyleProps | Element | null;
  };
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

export class TiltObject extends PureComponent<
  TiltObjectProps,
  TiltObjectState
> {
  public static defaultProps = {
    options: {
      movement: {
        img: {
          translation: {
            x: -10,
            y: -10,
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
    dom: {
      img: null,
      title: null,
    },
  };

  private elemRef: React.RefObject<HTMLDivElement>;

  constructor(props: TiltObjectProps) {
    super(props);
    this.state = {
      options: {
        movement: {
          img: { translation: { x: -40, y: -40 } },
          title: { translation: { x: 20, y: 20 } },
        },
      },
      dom: {
        img: null,
        title: null,
      },
    };

    this.elemRef = createRef();
    this.layout = this.layout.bind(this);
  }

  componentDidMount() {
    this.setState({ options: extend({}, this.state.options) as MovementProps });
    extend(this.state.options, this.props.options as MovementProps);
    this.setState({
      dom: {
        // img: this.props.el.querySelector('.content__img'),
        // title: this.props.el.querySelector('.content__title'),
        img: document.querySelector('.content__img'),
        title: document.querySelector('.content__title'),
      },
    });

    addEventListener('mousemove', this.mousemoveFn);
    addEventListener('mouseleave', this.mouseleaveFn);
    addEventListener('mouseenter', this.mouseenterFn);
  }

  componentWillUnmount() {
    removeEventListener('mousemove', this.mousemoveFn);
    removeEventListener('mouseleave', this.mouseleaveFn);
    removeEventListener('mouseenter', this.mouseenterFn);
  }

  mouseenterFn = (e: MouseEvent) => {
    anime.remove(this.state.dom.img);
    anime.remove(this.state.dom.title);
  };

  mousemoveFn = (e: MouseEvent) => {
    requestAnimationFrame(() => this.layout(e));
  };

  mouseleaveFn = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      anime({
        targets: [this.state.dom.img, this.state.dom.title],
        duration: 1500,
        easing: 'easeOutElastic',
        elasticity: 400,
        translateX: 0,
        translateY: 0,
      });
    });
  };

  layout = (e: MouseEvent) => {
    // Mouse position relative to the document.
    const mousepos = getMousePos(e);
    // Document scrolls.
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    };

    // const bounds = this.props.el.getBoundingClientRect();
    const bounds = this.elemRef.current?.getBoundingClientRect() as DOMRect;

    // Mouse position relative to the main element (this.DOM.el).
    const relmousepos = {
      x: mousepos.x - bounds.left - docScrolls.left,
      y: mousepos.y - bounds.top - docScrolls.top,
    };

    // Movement settings for the animatable elements.
    const t = {
      img: this.state.options.movement.img.translation,
      title: this.state.options.movement.title.translation,
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

    this.setState(prevState => ({
      ...prevState,
      dom: {
        title: {
          style: {
            WebkitTransform:
              'translateX(' +
              transforms.title.x +
              'px) translateY(' +
              transforms.title.y +
              'px)',
          },
        },
        img: {
          style: {
            WebkitTransform:
              'translateX(' +
              transforms.img.x +
              'px) translateY(' +
              transforms.img.y +
              'px)',
          },
        },
      },
    }));
  };

  render() {
    return (
      <div className="content-wrap">
        <div
          className="content content--layout content--layout-3"
          ref={this.elemRef}
        >
          <img
            className="content__img"
            src={this.props.content.imageSrc}
            alt="Some image"
          />
          <h3 className="content__title">{this.props.content.title}</h3>
          <p className="content__author">
            {this.props.content.content__author}
          </p>
          <p className="content__desc">{this.props.content.content__desc}</p>
          <a href="#" className="content__link">
            Discover
          </a>
        </div>
      </div>
    );
  }
}
