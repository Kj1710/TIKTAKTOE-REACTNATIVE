import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the appropriate icon library

type IconsProps = {
  name: string;
};

const Icons = ({ name }: IconsProps) => {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={40} color="black" />;
    case 'cross':
      return <Icon name="times" size={40} color="white" />;
    default:
      return null; // You should return something, even if it's null
  }
};

export default Icons;
