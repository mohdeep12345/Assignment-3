/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ____Mohdeep Singh__________________ Student ID: ___109600239___________ Date: __18 Feb 2024____________
*
********************************************************************************/




const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id)?.name || "Unknown Theme";

        return {
          ...set,
          theme,
        };
      });

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
}

function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet);
    } else {
      reject(`Unable to find set with set_num: ${setNum}`);
    }
  });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const matchingSets = sets.filter(set => 
        set.theme.toLowerCase() === theme.toLowerCase()
      );
  
      if (matchingSets.length > 0) {
        resolve(matchingSets);
      } else {
        reject(`Unable to find sets with theme: ${theme}`);
      }
    });
  }



const getAllThemes = () => {
    return Promise.resolve(themeData);
};
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };






