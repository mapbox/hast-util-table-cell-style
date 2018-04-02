'use strict';

const visit = require('unist-util-visit');

const hastCssPropertyMap = {
  align: 'text-align',
  valign: 'vertical-align',
  height: 'height',
  width: 'width'
};

module.exports = function tableCellStyle(node) {
  visit(node, 'element', visitor);
  return node;
};

function visitor(node) {
  if (node.tagName !== 'tr' && node.tagName !== 'td' && node.tagName !== 'th') {
    return;
  }
  Object.keys(hastCssPropertyMap).map(hastName => {
    if (node.properties[hastName] === undefined) {
      return;
    }
    const cssName = hastCssPropertyMap[hastName];
    appendStyle(node, cssName, node.properties[hastName]);
    delete node.properties[hastName];
  });
}

function appendStyle(node, property, value) {
  let prevStyle = (node.properties.style || '').trim();
  if (prevStyle && !/;\s*/.test(prevStyle)) {
    prevStyle = `${prevStyle};`;
  }
  if (prevStyle) {
    prevStyle = `${prevStyle} `;
  }
  const nextStyle = `${prevStyle}${property}: ${value};`;
  node.properties.style = nextStyle;
}
