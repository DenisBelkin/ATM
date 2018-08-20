const initData = {
    User: {money: 1000, pin: '1234', isBlocked: false},
    pinCounter: {counter: 0},
    ATM: {money: 900}

};

export const getStorageData = (storageName = '') => {//userStorage
    const storageData = JSON.parse(localStorage.getItem(storageName));
    if (storageData === null) {
        localStorage.setItem(storageName, JSON.stringify(initData[storageName]));
        return initData[storageName];
    } else {
        return storageData;
    }
};

export const saveNewData = (storageName = '', newDataKey = 0, newData = {}) => {
    const storageData = getStorageData(storageName);
    storageData[newDataKey] = newData;
    localStorage.setItem(storageName, JSON.stringify(storageData));
    return storageData;
};

