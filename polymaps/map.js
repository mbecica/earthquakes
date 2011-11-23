var po = org.polymaps,
    map,
    t = 0,
    mapDiv = document.getElementById("map"),
    svg = po.svg("svg");

mapDiv.appendChild(svg);

// create our map
map = po.map()
    .container(svg)
    .center({lat: 20, lon: 0 })
    .zoom(2)

// cloudmade tile url
// http://cloudmade.com/register
var cloudmadeURL = "http://tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/20760/256/{Z}/{X}/{Y}.png";
map.add(po.image()
    .url(po.url(cloudmadeURL)));
    
var earthquakes = po.geoJson();
map.add(
    earthquakes
    .tile(false)
    .clip(false)
    .zoom(2)
    .on("load", earthquakeLoad)
    .on("show", reshow)
);
var dates = [];
var dataF = [];
$.ajax({
  url: "../data/earthquakes.json",
  dataType:"json",
  success: function(data) {
    _.each(data.features, function(d, j) {
      _.each(d.geometry.coordinates, function(g, i) {
        d.geometry.coordinates[i] = parseInt(g);
      });
      d.properties.datetime = Date.parse(d.properties.datetime);
      dates.push(d.properties.datetime);
      dataF.push(d);
    });
    earthquakes.features(data.features);
    $('#slider').attr("min", _.min(dates))
                .attr("max", _.max(dates));
  }
});

function earthquakeLoad(e) {
  _.each(e.features, function(v, d) {
    v.element.setAttribute("r", v.data.properties.magnitude * 3);
    v.element.setAttribute("class", "earthquake");
    $(v.element).hover(function() {showData2(v.data.properties)}, 
      function() {hideData();});
  });
};

function reshow(e) {
    console.log('res');
};

function showData2(v) {
  $('h1').text(v.region);
  $('.mag').find('label').text(v.magnitude);
  $('.depth').find('label').text(v.depth);
  $('h4').show();
};

function hideData() {
  //setTimeout("$('h1').text('');$('h4').hide();", 600);
};

$('#slider').change(sliderChanged);
function sliderChanged(e) {
  t = e.target.value;
  console.log(earthquakes);
  earthquakes.reshow();
  $('#time').text(Date(t));
};
