console.log('!!! service-worker.js', chrome.commands);

// chrome.browserAction.onClicked.addListener(() => {});

// const injectScript = () => chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
//   tabId = tab[0].id;
//
//   chrome.scripting
//     .executeScript({
//       target : {tabId : tabId, allFrames : true},
//       files : [ "injected.js" ],
//       world: 'MAIN',
//     })
//     .then(() => console.log("!!! injected script file"));
// });

function injectedFunction(color) {
  console.log('ORANGEEEE');
  document.body.style.backgroundColor = color;
  window.foo = 'bar';
}

const injectScript = (tab) => {
  tabId = tab.id;

  chrome.scripting
    .executeScript({
      target : {
        tabId : tabId,
        // allFrames : true,
      },
      files : [ "injected.js" ],
      world: 'MAIN',
    })
    .then(() => {
      console.log("!!! injected script file");
    });

  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    world: 'MAIN',
    func : injectedFunction,
    args : [ "orange" ],
  });
};

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'run-foo') {
    injectScript(tab);
  }

  console.log(`Command: ${command}`);
});

chrome.action.onClicked.addListener((tab) => {
  injectScript(tab);
  chrome.action.setPopup(
    { "popup": "popup.html" },
    () => {}
  );
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log('!!! reason', details.reason);
  if(details.reason !== "install" && details.reason !== "update") return;
  // chrome.contextMenus.create({
  //   "id": "sampleContextMenu",
  //   "title": "Sample Context Menu",
  //   "contexts": ["selection"]
  // });
});

// let tabId = null;
// setTimeout(() => chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
//   tabId = tab[0].id;
//
//   chrome.scripting
//     .executeScript({
//       target : {tabId : tabId},
//       files : [ "injected.js" ],
//     })
//     .then(() => console.log("!!! injected script file"));
// }), 2000);

// const tabId = await chrome.tabs.get(tabId);
// console.log('tabId', )




// var callback = function(...args) {
//   console.log('!!! details', args);
// };
// var filter = {
//   urls: ['https://ebanking-ch4.ubs.com/api/v1/schema/payments/orders'],
// };
// var opt_extraInfoSpec = [];
//
// chrome.webRequest.onResponseStarted.addListener(
//   callback,
//   filter,
//   opt_extraInfoSpec
// );
