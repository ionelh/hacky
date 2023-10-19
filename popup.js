const handleBtnClick = () => {
  console.log('CLICKED');
  localStorage.setItem("foo", "bar");
  console.log('fooooo', localStorage.getItem("foo"));
  sessionStorage.setItem("foo", "bar");
  console.log('fooooo session', sessionStorage.getItem("foo"));

  // chrome.storage.local.set({
  //     storageFoo: 'storage bar'
  // }, function () {
  //     chrome.tabs.executeScript({
  //       files : [ "injected.js" ],
  //       world: 'MAIN',
  //     });
  // });
};

const handleDOMContentLoaded = () => {
  document.querySelector('#btn').addEventListener('click', handleBtnClick);
};

addEventListener("DOMContentLoaded", handleDOMContentLoaded);
