/*global chrome*/
let item = {
    "id": "addBookmarkToNewTab",
    "title": "Add bookmark",
    "contexts": ["page", "link"]
};
chrome.contextMenus.create(item);

function savetext(text, filename) {
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
}

chrome.contextMenus.onClicked.addListener(function(clickitem){
    if (clickitem.menuItemId == "addBookmarkToNewTab") {
        if (clickitem.pageUrl) {
            mark = {url: clickitem.pageUrl, size: "small", icon: "icon"}
            list = JSON.parse("Bookmarks.json")
            list.push(mark)
            savetext(JSON.stringify(list), "Bookmarks.json")
        }
        if (clickitem.linkUrl) {
            mark = {url: clickitem.linkUrl, size: "small", icon: "icon"}
            list = JSON.parse(localStorage.getItem("Bookmarks"))
            list.push(mark)
            localStorage.setItem("Bookmarks", JSON.stringify(list))
        }
    }
})