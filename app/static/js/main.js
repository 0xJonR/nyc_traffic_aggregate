//jonathan rodriguez
//requires jquery 


$(document).ready(function(){  //function runs first: fetches /locations
  $.getJSON('/locations', onceLocationLoaded); //once /locations loaded, calls onceLocationLoaded
})
$(document).ready(function(){
  $.getJSON('/zipcodes', zipWrapper);
})

function onceLocationLoaded(data){ //callback function once document loads; treat as main()
  console.log("success loading /locations");
  //console.log(data);
  //Plotly.setPlotConfig({mapboxAccessToken:'pk.eyJ1IjoianIzNjciLCJhIjoiY2pueGp1YndkMGQ1NDNrbXhrenk5MzI5ZCJ9.wHFtLi0rHeaG79Sfo1xWEA'});
  loadmaps(data);
  console.log("doing zip now");

}
function loadmaps(locations){ //given list of tuples in json, create maps
  console.log("loadmaps init");
  console.log(locations);
  var latarr = latHelper(locations);
  var lonarr = lonHelper(locations);
  var data = [{
    type:'scattermapbox',
    lat:latarr,
    lon:lonarr,
    mode:'markers',
    marker:{
      size:10
    },
    text:['Accident']
  }]
  var layout = {
    autosize:true,
    hovermode:'closest',
    mapbox:{
      bearing:0,
      center:{
        lat:40.7,
        lon:-73.9
      },
      pitch:0,
      zoom:9.2
    },
  };
 Plotly.setPlotConfig({mapboxAccessToken:'pk.eyJ1IjoianIzNjciLCJhIjoiY2pueGp1YndkMGQ1NDNrbXhrenk5MzI5ZCJ9.wHFtLi0rHeaG79Sfo1xWEA'}); 
 Plotly.plot('mapshit', data, layout);
 console.log("loadmaps complete")
}

/*function latHelper(locs){ deprecated
  var latArr = [];
  for (var i = 0; i<locs.length; i++){
      latArr.push(locs[i][1]); //formated in /locations as (lon, lat) aka [0]=lon [1]=lat
  }
  return latArr;
}*/
function latHelper(locs){
  var latarr = [];
  for(key of locs){
    latarr.push(key[1]);
  }
  console.log(latarr);
  return latarr; //from list of tuples returns list of lats
}
function lonHelper(locs){
  var lonarr = [];
  for(key of locs){
    lonarr.push(key[0]);
  }
  return lonarr; //lathelper but with longitude
}

//zipcode section:
function zipWrapper(zipData){ //gets passed array of zipcodes sorted
  var objCounts = zipTopTen(zipToMap(zipData));
  console.log("objCounts Loaded");
  console.log(objCounts);
  var labib = [];
  var vals = [];
  for (shit of objCounts){
    labib.push(shit['zip']);
    vals.push(shit['count']);
  }
  var data = [{
    values:vals,
    labels:labib,
    type:'pie'
  }];
  var layout = {
    height:400,
    width:500
  };
  Plotly.setPlotConfig({mapboxAccessToken:'pk.eyJ1IjoianIzNjciLCJhIjoiY2pueGp1YndkMGQ1NDNrbXhrenk5MzI5ZCJ9.wHFtLi0rHeaG79Sfo1xWEA'}); //maybe not needed
  Plotly.newPlot('zipshit', data, layout);
}

function zipToMap(zipcodes){ //returns each key, with value matching occurences in array
  var countz = new Map(); //if not in map: append to map: count = 0
  for (shit of zipcodes){
    if (!(countz.has(shit))){ 
      var count = 1;
      countz.set(shit, count);
    }
    else{
      var nc = countz.get(shit);
      nc += 1;
      countz.set(shit, nc);
    } 
  }
  return countz;
} // example data: {10001=>47, 10002=>3, 10003=>4}


function zipTopTen(zipMap){//pass this function zipToMap(zipcodes) 
  var someshit = [];
  for (var i=0; i<10; i++){
    someshit.push(helperSort(zipMap)); //hehe one function call: var topTen = zipTopTen(zipToMap(zipcodes))
  }
  return someshit;
}
function helperSort(iterable){ //returns highest val in array, also removes it
  var max = 0;
  var ke = 0;
  for (var[key, val] of iterable){
    if (val>max){
      max = val;
      ke = key;
    }
  }
  iterable.delete(ke);
  return {
    zip:ke,
    count:max
  };
}