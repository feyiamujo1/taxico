export const getSavedState = (itemKey: string) => {
  let savedState = {};
  try {
    let savedItem = localStorage.getItem(itemKey);
    if (typeof savedItem === "string") {
      return JSON.parse(savedItem);
    }
    return savedState;
  } catch (error) {
    return savedState;
  }
};

export const saveLocalState = (itemKey: string, itemValue: any) => {
  console.log("In local storage the data is - ", JSON.stringify(itemValue));
  localStorage.setItem(itemKey, JSON.stringify(itemValue));
};

export const deleteLocalState = (itemKey: string) => {
  localStorage.removeItem(itemKey);
};
