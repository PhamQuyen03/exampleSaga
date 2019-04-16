const mainTabs = {
  children: [
    {
      component: {
        name: 'News',
        options: {
          bottomTab: {
            text: 'Tab 1',
            selectedTextColor: '#FF0000',
          },
        },
      },
    },
    {
      component: {
        name: 'Personal',
        options: {
          bottomTab: {
            text: 'Tab 2',
            selectedTextColor: '#FF0000',
          },
        },
      },
    },
  ],
  options: {
    bottomTabs: {
      visible: true,
      animate: true,
      drawBehind: false,
      backgroundColor: 'white',
    },
  },
};

export default mainTabs;
