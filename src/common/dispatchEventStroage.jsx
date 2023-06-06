function dispatchEventStroage() {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    let setEvent = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newValue = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, arguments)
  }
  var orignalremoveItem = localStorage.removeItem;
  localStorage.removeItem = function (key, newValue) {
    var removeItemEvent = new Event("removeItemEvent");
    removeItemEvent.key = key;
    window.dispatchEvent(removeItemEvent);
    orignalremoveItem.apply(this, arguments);
  };
}

export default dispatchEventStroage;
