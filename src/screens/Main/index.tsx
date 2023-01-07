import React from 'react';
import './Main.scss';

import img1 from '../../assets/images/1.jpg';
import img4 from '../../assets/images/4.jpg';
import img3 from '../../assets/images/3.jpg';
import img2 from '../../assets/images/2.jpg';
import img5 from '../../assets/images/5.jpg';

import Hidden from '../../components/Hidden';
import Content from '../../components/Content';
import TiltObject from '../../components/TiltObject';
import MorphWrapper from '../../components/MorphWrapper';

interface Content {
  imageSrc: string;
  title: string;
  content__author: string;
  content__desc: string;
}

const CONTENTS: Content[] = [
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
  return (
    <main className="Main">
      <Hidden />
      <MorphWrapper />
      <Content />
      {Array.from(CONTENTS).map((el, i) => (
        <TiltObject key={i} content={{ ...el, index: i }} />
      ))}
    </main>
  );
};

export default Main;
