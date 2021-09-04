import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {calculateAction, CALCULATE_ERR} from '../redux/action';

const Head = ({navigation}) => {
  const [dia, setDia] = useState('');
  const [len, setLen] = useState('');

  const dispatch = useDispatch();
  const {volume, summ, num, err} = useSelector(state => state.calculateReducer);

  const getData = () => {
    if (len === '' || dia === '') {
      Alert.alert("Yog'och uzunligi va dioganalini kiriting!");
      dispatch({
        type: CALCULATE_ERR,
        payload: "Yog'och uzunligi va dioganalini kiriting!",
      });
    } else if (parseInt(len) < 1 || parseInt(len) > 8.5) {
      dispatch({
        type: CALCULATE_ERR,
        payload: "Yog'och uzunligi 1 va 8.5m oralig'ida bo'lishi kerak!",
      });
    } else {
      dispatch(calculateAction(dia, len));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, width: '100%'}}>
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
        keyboardType="numeric"
        style={styles.input}
        onChangeText={val => setLen(val)}
      />
      <TouchableOpacity onPress={getData} style={styles.press}>
        <Text style={{fontSize: 22, color: '#fff'}}>Hisoblash</Text>
      </TouchableOpacity>
      {volume && volume.length === num ? (
        <View style={styles.wood}>
          <View style={styles.info}>
            <Text style={{fontSize: 20, lineHeight: 30}}>
              Jami: {num} ta yog'och
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Text style={{fontSize: 20, lineHeight: 30}}>
                Umumiy hajm: {Math.round(summ * 1000) / 1000} m
              </Text>
              <Text style={{fontSize: 15, lineHeight: 18}}>3</Text>
            </View>
            <TouchableOpacity
              style={styles.items}
              onPress={() => navigation.navigate('Woods')}>
              <Text style={{fontSize: 22, color: '#fff'}}>Batafsil</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>{err}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  info: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#28C8FF',
    alignItems: 'center',
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
  },
  press: {
    width: '100%',
    height: 45,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28C8FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  wood: {
    width: '100%',
  },
  items: {
    width: '80%',
    height: 50,
    backgroundColor: '#28C8FF',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
});

export default Head;
