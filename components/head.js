import React, {useMemo, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DELETE, calculateAction} from '../redux/action';

const Head = ({navigation}) => {
  const [dia, setDia] = useState('');
  const [len, setLen] = useState('');
  const [summ, setSumm] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const {woods} = useSelector(state => state.calculateReducer);

  const getData = () => {
    if (len === '' || dia === '') {
      Alert.alert('Xatolik', "Yog'och uzunligi va dioganalini kiriting!");
    } else if (parseInt(len) < 1 || parseInt(len) > 8.5) {
      Alert.alert(
        'Xatolik',
        "Yog'och uzunligi 1 va 8.5m oralig'ida bo'lishi kerak!",
      );
    } else {
      dispatch(calculateAction(dia, len));
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.wood}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.text}>Yog'ochlarning uzunligi:</Text>
            <Text style={[styles.text, styles.bold]}>{item.len}m</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Jami yog'ochlar soni:</Text>
            <Text style={[styles.text, styles.bold]}>{item.num}ta</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontSize: 20, lineHeight: 30}}>Umumiy hajm:</Text>
            <View style={styles.cube}>
              <Text style={[styles.text, styles.bold]}>
                {Math.round(item.summ * 1000) / 1000} m
              </Text>
              <Text style={styles.sqr}>3</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.items}
            onPress={() => navigation.navigate('Woods', {data: item})}>
            <Text style={{fontSize: 22, color: '#fff'}}>Batafsil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.items, styles.delete]}
            onPress={() => dispatch({type: DELETE, payload: index})}>
            <Text style={{fontSize: 22, color: '#fff'}}>
              Ushbu qatorni o'chirish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderList = useMemo(() => {
    return (
      <FlatList
        keyExtractor={(e, i) => i.toString()}
        data={woods}
        renderItem={renderItem}
      />
    );
  }, [woods.length]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Diametrga joy tashlab bir nechta yog'ochlarni kiritishingiz mumkin!
      </Text>
      <TextInput
        value={dia}
        placeholder="Diametr"
        style={styles.input}
        onChangeText={val => setDia(val)}
      />
      <TextInput
        value={len}
        placeholder="Uzunlik"
        style={styles.input}
        onChangeText={val => setLen(val)}
      />
      <View style={styles.row}>
        {woods.length > 0 && (
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[styles.press, {backgroundColor: '#34A853'}]}>
            <Text style={{fontSize: 22, color: '#fff'}}>Narxlash</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={getData} style={styles.press}>
          <Text style={{fontSize: 22, color: '#fff'}}>Hisoblash</Text>
        </TouchableOpacity>
      </View>
      {renderList}
      <Modal
        onRequestClose={() => setVisible(false)}
        transparent
        statusBarTranslucent
        visible={visible}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <View style={styles.row}>
              <Text style={[styles.text]}>Umumiy hajm:</Text>
              <Text style={[styles.text, styles.bold]}>
                {woods.reduce(
                  (item, currentValue) => item.summ + currentValue.summ,
                  {summ: 0},
                )}
              </Text>
            </View>

            <Text style={[styles.text]}>Umumiy summa:</Text>
            <Text style={[styles.text, styles.colorTxt]}>
              {Math.floor(
                woods.reduce(
                  (accumulator, currentValue) =>
                    accumulator.summ + currentValue.summ,
                  {summ: 0},
                ) * summ.replace(/\s/g, ''),
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              so'm
            </Text>

            <Text style={{fontSize: 16}}>1m3 yog'och narxini kiriting:</Text>
            <TextInput
              value={summ}
              placeholder="Narxi kiriting"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={text =>
                setSumm(
                  text.replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
                )
              }
            />

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={[styles.press, styles.delete, {flex: 0, marginTop: 15}]}>
              <Text style={{fontSize: 22, color: '#fff'}}>Yopish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  info: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#28C8FF',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#284002',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  press: {
    height: 45,
    flex: 1,
    marginTop: 10,
    backgroundColor: '#28C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  bold: {
    fontWeight: '900',
  },
  colorTxt: {
    fontWeight: '900',
    color: '#32A34F',
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sqr: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '900',
  },
  wood: {
    width: '100%',
  },
  cube: {
    flexDirection: 'row',
  },
  items: {
    height: 50,
    backgroundColor: '#34A853',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  delete: {
    backgroundColor: '#EB563A',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});

export default Head;
