export const CALCULATE = 'CALCULATE';
export const CALCULATE_ERR = 'CALCULATE_ERR';
export const DELETE = 'DELETE';

import {Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'test.db',
  createFromLocation: '~datasqlite.db',
});

export const calculateAction = (d, len) => async dispatch => {
  let volume = [],
    summ = 0;
  const woods = d.split(' ');

  if (woods.every(item => item <= 120 && item >= 10)) {
    for (let i = 0; i < woods.length; i++) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM volume WHERE d=?',
          [woods[i]],
          (tx, results) => {
            const wood = {
              volume: results.rows.item(0)[len],
              d: woods[i],
              index: i + 1,
            };
            volume.push(wood);
            summ = summ + results.rows.item(0)[len];

            if (i === woods.length - 1) {
              dispatch({
                type: CALCULATE,
                payload: {volume, num: woods.length, summ, len},
              });
            }
          },
          err => Alert.alert('Error', 'Bazaga ulanishda xatolik mavjud!'),
        );
      });
    }
  } else {
    Alert.alert('Error', "Diametrlar 10 va 120sm oralig'ida bo'lishi kerak!");
  }
};
