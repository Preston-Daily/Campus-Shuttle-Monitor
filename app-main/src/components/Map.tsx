import React, {useEffect, useState} from 'react'
import MapView from 'react-native-maps'
import {Dimensions, StyleSheet, Text} from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
const height = Dimensions.get('window').height * 0.6
const width = Dimensions.get('window').width * 0.85

const lineCoords = [
  {
    latitude: 37.959170,
    longitude: -91.779020
  },
  {
    latitude: 37.954190,
    longitude: -91.776540
  }
]

const styles = StyleSheet.create({
    map: {
        height,
        width,
        borderRadius: 15
    }
})

const useFetch = url => {
  const [data, setData] = useState(null);

  async function fetchData(){
    const response = await(fetch(url))
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    fetchData()

    const interval=setInterval(() => {
      fetchData()
    }, 6000)

    return()=>clearInterval(interval)
  },[url]);

  return data
};

export const Map = () => {
  const data = useFetch('https://realtime-location-gateway-waz932k.uc.gateway.dev/shuttle/1')

  if(!data){
    return <Text>Loading...</Text>
  }
  else {
    return(
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: 37.956290,
          longitude: -91.779460,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: lineCoords[0].latitude,
            longitude: lineCoords[0].longitude
          }}
          title={"Miner Village"}
          description={"Location of Miner Village"}
          />
        <MapView.Marker
          coordinate={{
            latitude: lineCoords[1].latitude,
            longitude: lineCoords[1].longitude
          }}
          title={"Havener Center"}
          description={"Location of Havener Center"}
        />
        <MapView.Marker
          coordinate={{
            latitude: data.latitude,
            longitude: data.longitude
          }}
          title={"Shuttle"}
          description={"Current shuttle location"}
        />
        <MapViewDirections
          origin={lineCoords[0]}
          destination={lineCoords[1]}
          apikey={"AIzaSyDhhacOch0mmze54b80ZVZTVLKH5PT-b40"} // insert your API Key here
          strokeWidth={4}
          strokeColor="#4A89F3"
        />
      </MapView>
    )
  }
};
