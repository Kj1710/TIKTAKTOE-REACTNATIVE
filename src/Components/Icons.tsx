import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 

type IconsProps = {
  name: string;
};

const Icons = ({ name }: IconsProps) => {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={40} color="black" />;
    case 'cross':
      return <Icon name="times" size={40} color="black" />;
    default:
      // return <Icon name="pencil" size={40} color="light black"/>;
      return null;
      
  }
};

export default Icons;
