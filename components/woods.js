import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector} from 'react-redux';


const Woods = () => {

    const {volume} = useSelector(state => state.calculateReducer);

    const renderItem = ({item}) => {
        return (
          <View style={styles.flatlist}>
            <Text style={styles.item}>{item.index}</Text>
            <Text style={styles.item}>{item.d}</Text>
            <Text style={styles.item}>{item.len}</Text>
            <Text style={styles.item}>{item.volume}</Text>
          </View>
        );
      };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoWood}>
            
            <View style={styles.infoHead}>
              <Text style={{width: '25%', textAlign: 'center', fontSize: 18}}>
                Yog'och
              </Text>
              <Text style={{width: '25%', textAlign: 'center', fontSize: 18}}>
                Diametr
              </Text>
              <Text style={{width: '25%', textAlign: 'center', fontSize: 18}}>
                Uzunlik
              </Text>
              <Text style={{width: '25%', textAlign: 'center', fontSize: 18}}>
                Hajm
              </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              data={volume}
              renderItem={renderItem}
            />
            
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 10,
      },
   
      infoWood: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#28C8FF',
        paddingVertical: 10,
        backgroundColor:'#fff'
      },
      infoHead: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      },
      flatlist: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
      },
      item: {
        width: '25%',
        textAlign: 'center',
      },
})

export default Woods
