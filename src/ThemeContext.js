import React from 'react';

const ThemeContext = React.createContext({
  bgColor: 'white',
  changeTheme:()=>{}
});

export default ThemeContext