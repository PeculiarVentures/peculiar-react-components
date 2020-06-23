/* eslint-disable no-param-reassign */

const ATTRIBUTE_NAME = 'data-localization-id';
const ARG_NAME = 'data-localization-arg';

function getTranslatableChildren(element = document.documentElement) {
  return element ? element.querySelectorAll(`*[${ATTRIBUTE_NAME}]`) : [];
}

function getData(messages, key) {
  const path = key.split('.');
  let last = messages;

  for (const k of path) {
    if (!last) {
      console.warn(`# ${key} is undefined.`);

      return '';
    }
    last = last[k];
  }

  return last;
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
  const l = getElementAttributes(element);

  if (!l.id) {
    return false;
  }

  const data = getData(messages, l.id);

  if (!data) {
    console.warn(`# ${l.id} is undefined.`);

    return false;
  }

  if (l.arg) {
    element.setAttribute(l.arg, data);

    return false;
  }

  if (getChildElementCount(element) === 0) {
    element.innerHTML = data;
  } else {
    const textNode = document.createTextNode(data);

    element.insertBefore(textNode, element.firstChild);
  }

  return true;
}

/**
 * @param {object} messages
 * @param {Element} [element]
 */
export default function translateFragment(messages = {}, element = document.documentElement) {
  // check all translatable children (= w/ a `data-localization-id' attribute)
  const children = getTranslatableChildren(element);
  const elementCount = children.length;

  for (let i = 0; i < elementCount; i += 1) {
    translateElement(messages, children[i]);
  }
  // translate element itself if necessary
  translateElement(messages, element);
}
