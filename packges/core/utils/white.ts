import reportTracker from "../src/report";
export function whiteScreen() {
  const wrapperElements = ['html', 'body', '#app'];
  let emptyPoints = 0;
  function isWrapper(element: any) {
    let selector = getSelecter(element);
    if (wrapperElements.indexOf(selector) != -1) {
      emptyPoints++;
    }
  }
  function getSelecter(element: any) {
    if(element.id) {
      return `#${element.id}`
    } else if (element.className) {
      return `.${element.className.split(" ").filter((item: any) => !!item)}`
    } else {
      return element.nodeName.toLowerCase();
    }
  }
  for (let i = 0 ; i < 9; i++) {
    let xElements = document.elementsFromPoint((window.innerWidth * i) / 10, window.innerHeight / 2)
    let yElements = document.elementsFromPoint(window.innerWidth / 2, (window.innerHeight * 1) / 10)
    isWrapper(xElements[0])
    isWrapper(yElements[0])
  }
  if (emptyPoints > 16) {
    return true;
  } else {
    return false;
  }
}