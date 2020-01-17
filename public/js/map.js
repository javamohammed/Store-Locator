mapboxgl.accessToken =
  "pk.eyJ1IjoiamF2YS1tb2hhbW1lZCIsImEiOiJjazVmZnM3ZWswN2lsM21vNnMxaXpqYnV3In0.n289yFydd24TcxXlQ-z7qg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 6,
  center: [-5.80752, 35.75089]
});

//fetch stores from api
async function   getStores(){
    const response = await fetch('/api/v1/stores')
    const data = await response.json()

   const stores = data.data.map(store => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                store.location.coordinates[0],
                store.location.coordinates[1]
              ]
            },
            properties: {
              storeId: store.storeId,
              icon: "shop"
            }
          };
    })
    console.log(stores);
   loadMap(stores);
}

// load map with stores
function loadMap(stores){
    map.on("load", function() {
      map.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: stores
            /*
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-71.157895, 42.707741]
                },
                properties:{
                    storeId:'001',
                    icon: 'shop'
                }
              }
            ]*/
          }
        },
        layout: {
          "icon-image": "{icon}-15",
          "icon-size": 1.5,
          "text-field": "{storeId}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.9],
          "text-anchor": "top"
        }
      });
    });
}
getStores();