import React from 'react';
import Jumbotron from '../components/Home/Jumbotron';
import Features from '../components/Home/Features';

const Home: React.FC = () => {
  return (
    <div>
      <Jumbotron />
      <Features />
    </div>
  );
};

export default Home;