// stories/square.stories.js
import React from 'react';
import Square from './Square';

export default {
  title: 'Square',
  component: Square,
};

const Template = (args) => <Square {...args} />;

export const Blank = Template.bind({});
Blank.args = {
  state: 'blank',
};

export const Selected = Template.bind({});
Selected.args = {
  state: 'selected',
};

export const Hit = Template.bind({});
Hit.args = {
  state: 'hit',
};

export const Miss = Template.bind({});
Miss.args = {
  state: 'miss',
};

export const Ship1 = Template.bind({});
Ship1.args = {
  state: 'ship1',
};

export const Ship2 = Template.bind({});
Ship2.args = {
  state: 'ship2',
};

export const Ship3 = Template.bind({});
Ship3.args = {
  state: 'ship3',
};

export const Ship4 = Template.bind({});
Ship4.args = {
  state: 'ship4',
};

export const Ship1R = Template.bind({});
Ship1R.args = {
  state: 'ship1r',
};

export const Ship2R = Template.bind({});
Ship2R.args = {
  state: 'ship2r',
};

export const Ship3R = Template.bind({});
Ship3R.args = {
  state: 'ship3r',
};

export const Ship4R = Template.bind({});
Ship4R.args = {
  state: 'ship4r',
};