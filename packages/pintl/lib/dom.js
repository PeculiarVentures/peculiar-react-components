/**
 * @author Mihail Zachepilo <mihailzachepilo@gmail.com>
 * @module PIntl/DOM
 */

import * as IntlCore from './core';

const ATTRIBUTE_NAME = 'data-localization-id';
const ARG_NAME = 'data-localization-arg';

function getTranslatableChildren(element = document.documentElement) {
  return element ? element.querySelectorAll(`*[${ATTRIBUTE_NAME}]`) : [];
}

function getElementAttributes(element) {
  if (!(element instanceof HTMLElement)) {
    return {};
  }

  const id = element.getAttribute(ATTRIBUTE_NAME);
  const arg = element.getAttribute(ARG_NAME);

  return { id, arg };
}

function getChildElementCount(element) {
  if (element.children) {
    return element.children.length;
  }
  if (typeof element.childElementCount !== 'undefined') {
    return element.childElementCount;
  }
  let count = 0;

  for (let i = 0; i < element.childNodes.length; i += 1) {
    count += element.nodeType === 1 ? 1 : 0;
  }

  return count;
}

function translateElement(messages, element) {
  const attributes = getElementAttributes(element);

  if (!attributes.id) {
    return false;
  }

  const data = IntlCore.getText(messages, false, attributes.id);

  if (attributes.arg) {
    element.setAttribute(attributes.arg, data);

    return false;
  }

  const textNode = document.createTextNode(data);

  if (getChildElementCount(element) === 0) {
    if (element.firstChild) {
      element.replaceChild(textNode, element.firstChild);
    } else {
      element.appendChild(textNode);
    }
  } else {
    element.insertBefore(textNode, element.firstChild);
  }

  return true;
}

/**
 * @param {object} messages
 * @param {Element} [element]
 */
export function translateFragment(messages = {}, element = document.documentElement) {
  // check all translatable children (= w/ a `data-localization-id' attribute)
  const children = getTranslatableChildren(element);
  const elementCount = children.length;

  for (let i = 0; i < elementCount; i += 1) {
    translateElement(messages, children[i]);
  }
  // translate element itself if necessary
  translateElement(messages, element);
}
