/*global chrome*/ 

let contextMenuItem = {
    "id": "addbookmark",
    "title": "Add Bookmark",
    "contexts": ["page"]
};

let contextchilds = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "LTBookmarks_changed") {
        chrome.contextMenus.removeAll();
        chrome.storage.sync.get("LTBookmarks", (result) => {
            if(result.LTBookmarks) {
                chrome.contextMenus.create(contextMenuItem);
                contextchilds = result.LTBookmarks;
                for(i=0; i<contextchilds.length; i++) {
                    chrome.contextMenus.create({"id": contextchilds[i].name, "title": contextchilds[i].name, "contexts": ["page"], "parentId": "addbookmark"})
                }
            }
        })
    }
})

chrome.storage.sync.get("LTBookmarks", (result) => {
    if(result.LTBookmarks) {
        chrome.contextMenus.create(contextMenuItem);
        contextchilds = result.LTBookmarks;
        for(i=0; i<contextchilds.length; i++) {
            chrome.contextMenus.create({"id": contextchilds[i].name, "title": contextchilds[i].name, "contexts": ["page"], "parentId": "addbookmark"})
        }
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
    console.log("copntext")
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
