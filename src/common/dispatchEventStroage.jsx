import _ from 'lodash';

function dispatchEventStorage() {
  var localStorageMock = (function () {
    var storage = window.localStorage; // 用闭包实现局部对象storage
    return {
      setItem: function (key, value) {
        var setItemEvent = new Event("setItemEvent");
        var oldValue = storage.getItem(key);
        setItemEvent.key = key;
        if (!_.isEqual(oldValue, value)) { // 判断新旧值，新值更新
          setItemEvent.newValue = value;
          setItemEvent.oldValue = oldValue;
          window.dispatchEvent(setItemEvent);
          storage.setItem(key, value);
          return true;
        }
      },
      getItem: function (key) {
        return storage.getItem(key);
      },
      removeItem: function (key) {
        storage.removeItem(key)
        return true;
      },
      clear: function () {
        storage.clear();
        return true;
      },
      get length() { // 添加 length 属性的 getter 方法
        return storage.length;
      },
      key: function (index) {
        return storage.key(index);
      },
      get storage() {
        return storage;
      }
    };
  }(window));

  Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
}

export default dispatchEventStorage;
