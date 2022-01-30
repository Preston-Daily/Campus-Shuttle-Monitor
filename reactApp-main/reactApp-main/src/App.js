import React, {useEffect, useState} from 'react'
import { Box, Paper, Typography} from '@material-ui/core/';
import './App.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

let width = getWindowDimensions().width
let height = getWindowDimensions().height

const pathCoordinates = [
  { lat:37.958898,  lng: -91.779952},
  { lat:37.959268,  lng: -91.779986},
  { lat:37.959331,  lng: -91.779963},
  { lat:37.959373,  lng: -91.779868},
  { lat:37.959350,  lng: -91.779074},
  { lat:37.959242,  lng: -91.779069},
  { lat:37.959083,  lng: -91.779101},
  { lat:37.958946,  lng: -91.779283},
  { lat:37.958900,  lng:-91.779962 },

  { lat:37.958788, lng:-91.780284 },
  { lat:37.958725, lng:-91.782458 },
  { lat:37.956821, lng:-91.782872 },
  { lat:37.955573, lng:-91.781023 },
  { lat:37.955412, lng:-91.780594 },
  { lat:37.955260,  lng: -91.780111},
  { lat:37.955184,  lng: -91.779473},
  { lat:37.955167,  lng: -91.777112},
  { lat:37.953323,  lng: -91.777112},
  { lat:37.953331,  lng: -91.776581},

  { lat:37.953716,  lng: -91.775861},
  { lat:37.953724,  lng: -91.775369},
  { lat:37.954553,  lng: -91.775331},
  { lat:37.954558,  lng: -91.775540},
  { lat:37.953735,  lng: -91.775561},

];

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  draggable: true
}

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 37.9585,
  lng: -91.77954,
};

function getZoom (width, height) {
  if(width<height){
    return Math.log((width/0.0038147)) / Math.log(2.0)
  }
  else
{
  return Math.log((height/0.0050147)) / Math.log(2.0)
}
};

var zoom = getZoom(width, height)

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
    }, 3000)

    return()=>clearInterval(interval)
  },[url]);

  return data
};


export default function App() {

  const {isLoaded, loadError} = useLoadScript({ googleMapsApiKey: "AIzaSyAl-m393Vzf4pwpUtJyZrTb1RdtUVRU-_A" })
  
  const data = useFetch('https://realtime-location-gateway-waz932k.uc.gateway.dev/shuttle/IO92')

  var date = new Date();
  var n = date.toDateString();
  var time = date.toLocaleTimeString();

  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Loading Maps";
  if(!data && (n.substring(0, 3) === "Sun" || n.substring(0, 3) === "Sat")){
    return (<div>
      <Box
      bgcolor="#003B49"
      color="white"
      p={1}
      position="absolute"
      top={0}
      left="0"
      right="0"
      borderBottom="4px solid #509E2F"
      zIndex={2000}
      >
        <Typography align='center' variant="h6" component="h1">
          Miner Village Shuttle Monitor
        </Typography>
      </Box>

      <Box
      bgcolor="#003B49"
      color="white"
      p={1}
      position="absolute"
      top="15%"
      left="15%"
      right="15%"
      border="4px solid #FDDA24"
      zIndex={2000}
      >
        <Typography align='center' variant="h5" component="h1">
          <b>The Shuttle is not currently running. Please check back during operating days Monday through Friday.</b>
        </Typography>
      </Box>

      <Box
      bgcolor="#003B49"
      color="black"
      p={1}
      position="absolute"
      bottom={0}
      left="0"
      right="0"
      borderTop="4px solid #509E2F"
      zIndex={2000}
      >
        <Paper align="center">
          <Typography align='center' variant="subtitle1">
            <p>
            Mon - Fri <br></br> 7:30am - 5:00pm <br></br>
            <a href="https://forms.gle/2bXX7ed57Z7ziLGg8" >Please leave us some feedback!</a>
            </p>
          </Typography>
        </Paper>
        
      </Box>

    </div>);
  }
  else if(!data && (n.substring(0, 3) === "Mon" || n.substring(0, 3) === "Tue" || 
                    n.substring(0, 3) === "Wed" || n.substring(0, 3) === "Thu" || n.substring(0, 3) === "Fri")){
    return (<div>
      <Box
      bgcolor="#003B49"
      color="white"
      p={1}
      position="absolute"
      top={0}
      left="0"
      right="0"
      borderBottom="4px solid #509E2F"
      zIndex={2000}
      >
        <Typography align='center' variant="h6" component="h1">
          Miner Village Shuttle Monitor
        </Typography>
      </Box>

      <Box
      bgcolor="#003B49"
      color="white"
      p={1}
      position="absolute"
      top="15%"
      left="15%"
      right="15%"
      border="4px solid #FDDA24"
      zIndex={2000}
      >
        <Typography align='center' variant="h5" component="h1">
          <b>We're sorry, we currently don't have location data for the shuttle.</b>
        </Typography>
      </Box>

      <Box
      bgcolor="#003B49"
      color="black"
      p={1}
      position="absolute"
      bottom={0}
      left="0"
      right="0"
      borderTop="4px solid #509E2F"
      zIndex={2000}
      >
        <Paper align="center">
          <Typography align='center' variant="subtitle1">
            <p>
            Mon - Fri <br></br> 7:30am - 5:00pm <br></br>
            <a href="https://forms.gle/2bXX7ed57Z7ziLGg8" >Please leave us some feedback!</a>
            </p>
          </Typography>
        </Paper>
        
      </Box>

    </div>);
  }
  else{
    return (<div>
      <Box
      bgcolor="#003B49"
      color="white"
      p={1}
      position="absolute"
      top={0}
      left="0"
      right="0"
      borderBottom="4px solid #509E2F"
      zIndex={2000}
      >
        <Typography align='center' variant="h6" component="h1">
          Miner Village Shuttle Monitor
        </Typography>
      </Box>


      <Box
      bgcolor="#003B49"
      color="black"
      p={1}
      position="absolute"
      bottom={0}
      left="0"
      right="0"
      borderTop="4px solid #509E2F"
      zIndex={2000}
      >
        <Paper align="center">
          <Typography align='center' variant="subtitle1">
            <p>
            7:30am - 5:00pm <br></br>
            <a href="https://forms.gle/2bXX7ed57Z7ziLGg8" >Please leave us some feedback!</a>
            </p>
          </Typography>
        </Paper>
        
      </Box>

      <Box zIndex={1800}>
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={zoom-1}
        center={center}
        options = {options}
        >
          <Polyline
          path={pathCoordinates}
          geodesic={true}
          options={{
            strokeColor: "#1e81b0",
            strokeOpacity: 1,
            strokeWeight: Math.min(width, height)/200,
            icons: [{             
              offset: "0",
              repeat: "20px"
              }]
            }}
          />
          <Marker
            position={{  
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
            }}
          />

        </GoogleMap>
      </Box>

    </div>
    );
  }
}