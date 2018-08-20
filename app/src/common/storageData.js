const initData = {
    User: {money: 1000, pin: '1234', isBlocked: false},
    pinCounter: {counter: 0},

};

export const getStorageData = (storageName = '') => {//userStorage
    const storageData = JSON.parse(localStorage.getItem(storageName));
    console.log(storageData);
    if (storageData === null) {
        localStorage.setItem(storageName, JSON.stringify(initData[storageName]));
        return initData[storageName];
    } else {
        return storageData;
    }
};

export const saveNewData = (storageName = '', newDataKey = 0, newData = {}) => {
    console.log(storageName, newDataKey, newData)
    const storageData = getStorageData(storageName);
    console.log(storageData)
    storageData[newDataKey] = newData;
    console.log(storageData[newDataKey])
    localStorage.setItem(storageName, JSON.stringify(storageData));
    return storageData;
};

