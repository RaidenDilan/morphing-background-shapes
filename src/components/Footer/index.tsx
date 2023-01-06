import React from 'react';
import './Footer.scss';
// import logo from '../../assets/images/logo.svg';
import ItemRevealerImg from './img/related/ItemRevealer.jpg';
import ElasticSVGElementsImg from './img/related/ElasticSVGElements.jpg';

const Footer = () => {
  return (
    // <div className="Footer" data-testid="footer">
    //   <div className="container">
    //     <div className="logo-container">
    //       <img src={logo} alt="Brand Logo" data-testid="brand-logo-img" />
    //     </div>
    //   </div>
    // </div>
    <section className="content content--related">
      <p className="content__info">
        If you enjoyed this demo you might also like:
      </p>
      <a
        className="content__related-item"
        href="https://tympanus.net/Development/ElasticSVGElements/"
      >
        <img className="content__related-img" src={ItemRevealerImg} />
        <h3 className="content__related-title">Elastic SVG Elements</h3>
      </a>
      <a
        className="content__related-item"
        href="https://tympanus.net/Development/ItemRevealer/"
      >
        <img className="content__related-img" src={ElasticSVGElementsImg} />
        <h3 className="content__related-title">Item Revealer</h3>
      </a>
    </section>
  );
};

export default Footer;
