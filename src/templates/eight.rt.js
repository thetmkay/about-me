'use strict';
var React = require('react/addons');
var _ = require('lodash');
function repeatPick1(pick, pickIndex) {
    return React.createElement('li', { 'className': 'eight-pick' }, pick);
}
module.exports = function () {
    return React.createElement('section', { 'className': 'eight-mod movies' }, React.createElement('div', { 'className': 'title eight-col' }, this.state.title), React.createElement('div', { 'className': 'feature eight-col' }), React.createElement('div', { 'className': 'list eight-col' }, React.createElement.apply(this, _.flatten([
        'ul',
        {},
        _.map(this.state.eight, repeatPick1.bind(this))
    ]))));
};