export const CALCULATE = 'CALCULATE';
export const CALCULATE_ERR = 'CALCULATE_ERR';

import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({
  name: 'test.db',
  createFromLocation: '~datasqlite.db',
});

export const calculateAction = (d, len) => dispatch => {
  try {
    let volume = [],
      summ = 0;
    const woods = d.split(' ');
    for (let i = 0; i < woods.length; i++) {
      if (woods[i] < 10 || woods[i] > 120) {
        dispatch({
          type: CALCULATE_ERR,
          payload: "Diametrlar 10 va 120sm oralig'ida bo'lishi kerak!",
        });
        break;
      } else {
        db.transaction(async tx => {
          await tx.executeSql(
            'SELECT * FROM volume WHERE d=?',
            [woods[i]],
            (tx, results) => {
              const wood = {
                volume: results.rows.item(0)[len],
                len: len,
                d: woods[i],
                index: i + 1,
              };
              volume.push(wood);
              summ += results.rows.item(0)[len];
              dispatch({
                type: CALCULATE,
                payload: {volume, num: woods.length, summ},
              });
            },
            err =>
              dispatch({
                type: CALCULATE_ERR,
                payload: 'Bazaga ulanishda xatolik mavjud!',
              }),
          );
        });
      }
    }
    dispatch({
      type: CALCULATE,
      payload: {volume, num: woods.length, summ},
    });
  } catch (err) {
    dispatch({type: CALCULATE_ERR, payload: 'Hisoblashda xatolik yuz berdi!'});
  }
};
