'use strict';

const visit = require('unist-util-visit');

module.exports = function tableCellStyle(node) {
  visit(node, 'element', visitor);
  return node;
};

function visitor(node) {
  if (node.tagName !== 'tr' && node.tagName !== 'td' && node.tagName !== 'th') {
    return;
  }
  transformAlign(node);
  transformValign(node);
  transformHeight(node);
  transformWidth(node);
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

function transformAlign(node) {
  if (node.properties.align === undefined) {
    return;
  }
  appendStyle(node, 'text-align', node.properties.align);
  delete node.properties.align;
}

function transformValign(node) {
  if (node.properties.valign === undefined) {
    return;
  }
  appendStyle(node, 'vertical-align', node.properties.valign);
  delete node.properties.valign;
}

function transformHeight(node) {
  if (node.properties.height === undefined) {
    return;
  }
  appendStyle(node, 'height', node.properties.height);
  delete node.properties.height;
}

function transformWidth(node) {
  if (node.properties.width === undefined) {
    return;
  }
  appendStyle(node, 'width', node.properties.width);
  delete node.properties.width;
}
