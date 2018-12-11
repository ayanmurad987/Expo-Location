import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Expo from 'expo';



export default class App extends React.Component {

state ={
  latitude:24.0000000,
  longitude:66.0000000,
  condition:false
}




  

_getLocationAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Expo.Location.getCurrentPositionAsync({});
    this.setState({ location ,condition:true });
    console.log('current location===',location)
    
  }; 

  

 


componentDidMount(){
  this._getLocationAsync()
}

  render() {
  

    return (
      <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Ayan Murad</Text>
      </View>
       {this.state.condition && <Expo.MapView 
        style={{flex:8}}
        initialRegion={{
          latitude:this.state.location.coords.latitude,
          longitude:this.state.location.coords.longitude,
          latitudeDelta: 0.0922 ,
          longitudeDelta: 0.0421 ,
        }}
        >

        <Expo.MapView.Marker
        coordinate={this.state.location.coords}
        title={'Your Location'}
        description={'Ayan Murad Home'}
        pinColor={'green'}
        />

        <Expo.MapView.Marker
        coordinate={this.state}
        title={'Your order in coming'}
        />

        </Expo.MapView>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
});
