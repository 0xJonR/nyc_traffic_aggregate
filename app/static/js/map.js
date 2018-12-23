function setupMapData(anArray){
    var returnArray = [];
    var latArray = [];
    var lonArray = [];
    var textArray = []; //[lat lon text]
    for (var i =0; i<anArray.length;i++){
        latArray.push(anArray[i][0]);
        lonArray.push(anArray[i][1]);
        textArray.push(anArray[i][2]);
    }
    var mapdata = [{
        type:"scattermapbox",
        lat:latArray,
        lon:lonArray,
        mode:'markers',
        marker:{
            size:5,
            color:'rgb(255,0,0)'
        },
        text:textArray
    }];
    return mapdata;
}

function findCenter(anArray){
    var lats = [];
    var lons = [];
    for (var i=0; i<anArray.length;i++){
        lats.push(anArray[i][0]);
        lons.push(anArray[i][1]);
    }
    var latMax = Math.max(...lats); //spread
    var lonMax = Math.max(...lons);
    var latMin = Math.min(...lats);
    var lonMin = Math.min(...lons);
    var a = (latMax+latMin)/2;
    var b = (lonMax+lonMin)/2;
    var ee = [a,b];
    return ee;
}
function setupMapLayout(anArray){
    var centers = findCenter(anArray);
    var CenterLat = centers[0];
    var centerLon = centers[1];
    var layout = {
        mapbox:{
            style:'satellite-streets',
            zoom:11,
            center:{
                lat:CenterLat,
                lon:centerLon
            }
        }
    }
    return layout;
}
 
function getMapParams(Jstr){ //loads map params from JSON
    var obj = JSON.parse(Jstr); //obj is anarray now
    var mapdata = setupMapData(obj);
    var maplayout = setupMapLayout(obj);
    var ax = {
        data:mapdata,
        layout:maplayout
    }
    return ax;
}
function loadMap(){
Plotly.setPlotConfig({ mapboxAccessToken: 'pk.eyJ1IjoianIzNjciLCJhIjoiY2pueGp1YndkMGQ1NDNrbXhrenk5MzI5ZCJ9.wHFtLi0rHeaG79Sfo1xWEA' });
var mapParams = getMapParams(JSON.stringify([[35.6763257, 139.6993177, "Meiji Shrine"],[35.7101456, 139.8105814, "Skytree"],[35.6950532, 139.7017945, "Godzilla Head"]]));
Plotly.plot('map', mapParams.data, mapParams.layout);
}