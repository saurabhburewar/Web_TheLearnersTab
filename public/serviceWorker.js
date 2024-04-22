/*global chrome*/ 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "LTBookmarks_changed") {
        chrome.contextMenus.removeAll();
        chrome.storage.sync.get("LTBookmarks", (result) => {
            if(result.LTBookmarks) {
                chrome.contextMenus.create({ "id": "addbookmark", "title": "Add Bookmark", "contexts": ["page"] });
                const contextchilds = result.LTBookmarks
                contextchilds.forEach((contextElement) => {
                    chrome.contextMenus.create({"id": contextElement.name, "title": contextElement.name, "contexts": ["page"], "parentId": "addbookmark"})
                });
            }
        })
    }
})

chrome.storage.sync.get("LTBookmarks", (result) => {
    if(result.LTBookmarks) {
        chrome.contextMenus.create({ "id": "addbookmark", "title": "Add Bookmark", "contexts": ["page"] });
        const contextchilds = result.LTBookmarks
        contextchilds.forEach((contextElement) => {
            chrome.contextMenus.create({"id": contextElement.name, "title": contextElement.name, "contexts": ["page"], "parentId": "addbookmark"})
        });
    }
})

function uniqueid(){
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<10);

    return (idstr);
}


chrome.contextMenus.onClicked.addListener((clickData) => {
    if(clickData.parentMenuItemId == "addbookmark") {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabData) => {
            chrome.storage.sync.get("LTBookmarks", (result) => {
                let bookmarkgrouplist = result.LTBookmarks;
                let markid = uniqueid()
                let grpname = clickData.menuItemId 
                let group = bookmarkgrouplist.filter(obj => {
                    return obj.name === grpname
                });
                group[0].list.push({group: grpname, id: markid, title: tabData[0].title, url: tabData[0].url})
                chrome.storage.sync.set({LTBookmarks: bookmarkgrouplist}, () => {
                    chrome.storage.sync.get("LTBookmarks", (result) => {
                    })
                })
            })
        })
    }
})



chrome.tabs.onActivated.addListener((activeInfo) => {
    const todaysDate = new Date(new Date().toLocaleDateString())
    const emptyBook = []
    chrome.storage.sync.get("LTDate", (res) => {
        if (!typeof res.LTDate === 'undefined') {
            const oldDate = new Date(res.LTDate);
            if (oldDate < todaysDate) {
                chrome.storage.sync.set({LTTimeBook: emptyBook})
            }
        }
        chrome.storage.sync.set({LTDate: todaysDate.toLocaleDateString()})
    })
    
    chrome.tabs.get(activeInfo.tabId)
    .then((currtab) => {
        if (currtab.active) {
            let urlObj;
            if (currtab.status == 'complete') {
                urlObj = (new URL(currtab.url));
            } else {
                urlObj = (new URL(currtab.pendingUrl));
            }
            let hostUrl = urlObj.hostname
            const now = Date.now(); // Unix timestamp in milliseconds
            chrome.storage.sync.get("LTTimeBook", (tabsDict) => {
                let newDict = tabsDict.LTTimeBook
                if (typeof newDict === 'undefined') {
                    if (urlObj.protocol == "https:") {
                        newDict = []
                        newDict.push({id:currtab.id, url:hostUrl, startTime:now, duration:0})
                    }
                } else {
                    let flag = 1
                    newDict.forEach((t) => {
                        if (t.url == hostUrl) {
                            t.startTime = now;
                            flag = 0
                        } else if (t.startTime != 0) {
                            let newDuration = now - t.startTime;
                            t.duration = t.duration + newDuration
                            t.startTime = 0;
                        }
                    })
                    if (flag == 1 && urlObj.protocol == "https:") {
                        newDict.push({id:currtab.id, url:hostUrl, startTime:now, duration:0})
                    }
                }
                chrome.storage.sync.set({LTTimeBook: newDict})
            })
        }
    })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.get(tabId)
    .then((currtab) => {
        if (currtab.active) {
            let urlObj;
            if (currtab.status == 'complete') {
                urlObj = (new URL(currtab.url));
            } else {
                urlObj = (new URL(currtab.pendingUrl));
            }
            let hostUrl = urlObj.hostname
            const now = Date.now(); // Unix timestamp in milliseconds
            chrome.storage.sync.get("LTTimeBook", (tabsDict) => {
                let newDict = tabsDict.LTTimeBook
                if (typeof newDict === 'undefined') {
                    if (urlObj.protocol == "https:") {
                        newDict = []
                        newDict.push({id:currtab.id, url:hostUrl, startTime:now, duration:0})
                    }
                } else {
                    let flag = 1
                    newDict.forEach((t) => {
                        if (t.url == hostUrl) {
                            t.startTime = now;
                            flag = 0
                        } else if (t.startTime != 0) {
                            let newDuration = now - t.startTime;
                            t.duration = t.duration + newDuration
                            t.startTime = 0;
                        }
                    })
                    if (flag == 1 && urlObj.protocol == "https:") {
                        newDict.push({id:currtab.id, url:hostUrl, startTime:now, duration:0})
                    }
                }
                chrome.storage.sync.set({LTTimeBook: newDict})
            })
        }
    })
})


// // chrome.tabs.onRemoved.addListener((tabId, removedInfo) => {
// //     const currtab = chrome.tabs.get(tabId);
// // })

chrome.windows.onRemoved.addListener((windowid) => {
    chrome.windows.get(windowid)
    .then((closedWin) => {
        const closedTabs = closedWin.tabs
        closedTabs.forEach((cltab) => {
            if (cltab.status == 'complete') {
                urlObj = (new URL(cltab.url));
            } else {
                urlObj = (new URL(cltab.pendingUrl));
            }
            let hostUrl = urlObj.hostname
            const now = Date.now(); // Unix timestamp in milliseconds
            chrome.storage.sync.get("LTTimeBook", (tabsDict) => {
                let newDict = tabsDict.LTTimeBook;
                newDict.forEach((t) => {
                    if (t.url == hostUrl) {
                        let newDuration = now - t.startTime;
                        t.duration = t.duration + newDuration
                        t.startTime = 0;
                    }
                })
                chrome.storage.sync.set({LTTimeBook: newDict})
            })
        })
    })
})