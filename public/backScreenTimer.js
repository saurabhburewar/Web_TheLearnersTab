
let emptyDict = [];
let activeTabId = null;

chrome.runtime.onStartup.addListener(function() {
    chrome.storage.sync.get("LTTimeBook", (tabsDict) => {
        if (typeof tabsDict.LTTimeBook === 'undefined') {
            chrome.storage.sync.set({LTTimeBook: emptyDict})
        }
    })
})

chrome.tabs.onActivated.addListener((activeInfo) => {
    const currtab = chrome.tabs.get(activeInfo.tabId);
    chrome.storage.sync.set({LTTimeBook: activeInfo.tabId})
    const now = Date.now(); // Unix timestamp in milliseconds
    let flag = 1
    if (currtab.active) {
        let urlObj = (new URL(currtab.url));
        let hostUrl = urlObj.hostname
        chrome.storage.sync.get("LTTimeBook", (tabsDict) => {
            tabsDict.forEach((t) => {
                if (t.url == hostUrl) {
                    t.startTime = now;
                    flag = 0
                } else if (t.startTime != 0) {
                    let newDuration = now - t.startTime;
                    t.duration = t.duration + newDuration
                    t.startTime = 0;
                }
            })
            if (flag == 1) {
                tabsDict.push({id:currtab.id, url:hostUrl, startTime:now, duration:0})
            }
            chrome.storage.sync.set({LTTimeBook: tabsDict})
        })
    }
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    
})


// chrome.tabs.onRemoved.addListener((tabId, removedInfo) => {
//     const currtab = chrome.tabs.get(tabId);
// })

// chrome.windows.onRemoved.addListener(function(windowid) {
//     alert("window closed")
// })