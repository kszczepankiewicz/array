'use strict';
const LINK = `https://chatgpt.com/`;
const LOCAL_STORAGE_ITEM_NAME = 'array';

const pushForm = document.getElementById('push-form');
const pushInput = document.getElementById('push-input');
const popButton = document.getElementById('pop-button');
const pushOutput = document.getElementById('push-output');

const addTimestamp = str => `${(new Date).toISOString()} ${str}`;

pushForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = pushInput.value.trim();
    if (!value) return;
    manipulateArr((arr, val) => arr.push(val), addTimestamp(value));
    navigator.clipboard.writeText(value).catch(() => alert('Not copied'));
    window.open(LINK);
});
function manipulateArr(func, value) {
    const arr = getArr();
    func(arr, value);
    renderArr(arr);
    setArr(arr);
}
popButton.addEventListener('click', (e) => {
    e.preventDefault();
    manipulateArr(arr => arr.pop());
});

const renderArr = arr => pushOutput.textContent = arr.join('\n');
const setArr = arr => localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(arr));
const getArr = () => {
    const raw = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
    if (!raw) return [];
    let arr;
    try {
        arr = JSON.parse(raw);
    } catch (error) {
        return [];
    }
    if (!Array.isArray(arr)) return [];
    return arr;
};


renderArr(getArr());
