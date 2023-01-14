// ................................Variables
// Mapa Base
var map;
var mapaBase;
var openStreet;

// LOG
var c = console.log.bind(document);

// Auxiliares carga marcadores
var auxCargaInfoAflor = 0;
var allData = L.layerGroup();
var markersRasgos = L.layerGroup();
var markerCentrid = L.layerGroup();
var layerEdit=null;
var layergeojson = null;
var layergeojsonAnterior = null;
var notNewAnterior = false;
var idLayer ='nuevo';
var claseLayer = 'nuevo';
var forma = null;
var searchCtrl;
var editMode = false;
var sidebarLeft = false;
var cutMode = false;
// var arrayAux = [1,2,3,4,5,6,7];
// copiar datos de un formulario
var datosCopiados;
var datosCopiadosRasgos;

var latLoctaion = 0;
var lngLoctaion = 0;

// Opciones del Spin
var spinOpts = {
  lines: 10, // The number of lines to draw
  length: 15, // The length of each line
  width: 10, // The line thickness
  radius: 5, // The radius of the inner circle
  scale: 0.55, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-more', // The CSS animation name for the lines
  direction: -1, // 1: clockwise, -1: counterclockwise
  color: '#f9ae00', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  //top: '50%', // Top position relative to parent
  //left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  //position: 'absolute', // Element positioning
};

// Marcadores estaciones

var markerUGSR = L.AwesomeMarkers.icon({
  icon: 'hammer',
  prefix:'fa',
  markerColor: 'darkred'
});

var markerUGSS = L.AwesomeMarkers.icon({
  icon: 'hammer',
  prefix:'fa',
  markerColor: 'red'
});

var markerControlUGS = L.AwesomeMarkers.icon({
  icon: 'hammer',
  prefix:'fa',
  markerColor: 'orange'
});

var markerSGMF = L.AwesomeMarkers.icon({
  icon: 'mountain-sun',
  prefix:'fa',
  markerColor: 'darkgreen'
});

var markerControlSGMF = L.AwesomeMarkers.icon({
  icon: 'mountain-sun',
  prefix:'fa',
  markerColor: 'green'
});

var markerCat = L.AwesomeMarkers.icon({
  icon: 'hill-rockslide',
  prefix:'fa',
  markerColor: 'cadetblue'
});

var markerInv = L.AwesomeMarkers.icon({
  icon: 'hill-rockslide',
  prefix:'fa',
  markerColor: 'blue'
});

var markerViv = L.AwesomeMarkers.icon({
  icon: 'house-user',
  prefix:'fa',
  markerColor: 'blue'
});

// Variables para pasar de codigo a texto y vis

var tipo_MM = {
  '01' : "Deslizamiento",
  '02' : "Reptación",
  '03' : "Caida",
  '04' : "Flujo",
};
var cod_tipo_MM_point = {
  "01.01.13"	: "Deslizamiento activo verificado (punto)",
  "01.01.14"	: "Deslizamiento activo no verificado (punto)",
  "01.01.15"	: "Deslizamiento inactivo verificado (punto)",
  "01.01.16"	: "Deslizamiento inactivo no verificado (punto)",
  "01.02.13"	: "Caída activa verificada (punto)",
  "01.02.14"	: "Caída activa no verificada (punto)",
  "01.02.15"	: "Caída inactiva verificada (punto)",
  "01.02.16"	: "Caída inactiva no verificada (punto)",
  "01.04.17"	: "Flujo activo verificado (punto)",
  "01.04.18"	: "Flujo activo no verificado (punto)",
  "01.04.19"	: "Flujo inactivo verificado (punto)",
  "01.04.20"	: "Flujo inactivo no verificado (punto)",
}
var tipo_cod_MM_point = {
  "Deslizamiento activo verificado (punto)" : "01.01.13",
  "Deslizamiento activo no verificado (punto)" : "01.01.14",
  "Deslizamiento inactivo verificado (punto)" : "01.01.15",
  "Deslizamiento inactivo no verificado (punto)" : "01.01.16",
  "Caída activa verificada (punto)" : "01.02.13",
  "Caída activa no verificada (punto)" : "01.02.14",
  "Caída inactiva verificada (punto)" : "01.02.15",
  "Caída inactiva no verificada (punto)" : "01.02.16",
  "Flujo activo verificado (punto)" : "01.04.17",
  "Flujo activo no verificado (punto)" : "01.04.18",
  "Flujo inactivo verificado (punto)" : "01.04.19",
  "Flujo inactivo no verificado (punto)" : "01.04.20",
}
var cod_tipo_MM = {
  '01.01.01' : "Deslizamiento activo verificado (escarpe)",
  '01.01.02' : "Deslizamiento activo no verificado (escarpe)",
  '01.01.03' : "Deslizamiento activo verificado (cuerpo)",
  '01.01.04' : "Deslizamiento activo no verificado (cuerpo)",
  '01.01.05' : "Deslizamiento activo verificado",
  '01.01.06' : "Deslizamiento activo no verificado",
  '01.01.07' : "Deslizamiento inactivo verificado (escarpe)",
  '01.01.08' : "Deslizamiento inactivo no verificado (escarpe)",
  '01.01.09' : "Deslizamiento inactivo verificado (cuerpo)",
  '01.01.10' : "Deslizamiento inactivo no verificado (cuerpo)",
  '01.01.11' : "Deslizamiento inactivo verificado",
  '01.01.12' : "Deslizamiento inactivo no verificado",
  '01.01.17' : "Deslizamiento activo verificada (tránsito)",
  '01.01.18' : "Deslizamiento activo no verificada (tránsito)",
  '01.01.19' : "Deslizamiento inactivo verificada (tránsito)",
  '01.01.20' : "Deslizamiento inactivo no verificada (tránsito)",
  '01.02.01' : "Caída activa verificada (escarpe)",
  '01.02.02' : "Caída activa no verificada (escarpe)",
  '01.02.03' : "Caída activa verificada (cuerpo)",
  '01.02.04' : "Caída activa no verificada (cuerpo)",
  '01.02.05' : "Caída activa verificada",
  '01.02.06' : "Caída activa no verificada",
  '01.02.07' : "Caída inactiva verificada (escarpe)",
  '01.02.08' : "Caída inactiva no verificada (escarpe)",
  '01.02.09' : "Caída inactiva verificada (cuerpo)",
  '01.02.10' : "Caída inactiva no verificada (cuerpo)",
  '01.02.11' : "Caída inactiva verificada",
  '01.02.12' : "Caída inactiva no verificada",
  '01.02.17' : "Caída activa verificada (tránsito)",
  '01.02.18' : "Caída activa no verificada (tránsito)",
  '01.02.19' : "Caída inactiva verificada (tránsito)",
  '01.02.20' : "Caída inactiva no verificada (tránsito)",
  '01.03.01' : "Volcamiento activo verificado (escarpe)",
  '01.03.02' : "Volcamiento activo no verificado (escarpe)",
  '01.03.03' : "Volcamiento activo verificado (cuerpo)",
  '01.03.04' : "Volcamiento activo no verificado (cuerpo)",
  '01.03.05' : "Volcamiento activo verificado",
  '01.03.06' : "Volcamiento activo no verificado",
  '01.03.07' : "Volcamiento inactivo verificado (escarpe)",
  '01.03.08' : "Volcamiento inactivo no verificado (escarpe)",
  '01.03.09' : "Volcamiento inactivo verificado (cuerpo)",
  '01.03.10' : "Volcamiento inactivo no verificado (cuerpo)",
  '01.03.11' : "Volcamiento inactivo verificado",
  '01.03.12' : "Volcamiento inactivo no verificado",
  '01.04.01' : "Avenida torrencial verificada (zona tránsito)",
  '01.04.02' : "Avenida torrencial no verificada (zona tránsito)",
  '01.04.03' : "Avenida torrencial verificada (zona depósito)",
  '01.04.04' : "Avenida torrencial no verificada (zona depósito)",
  '01.04.05' : "Flujo activo verificado (escarpe)",
  '01.04.06' : "Flujo activo no verificado (escarpe)",
  '01.04.07' : "Flujo activo verificado (cuerpo)",
  '01.04.08' : "Flujo activo no verificado (cuerpo)",
  '01.04.09' : "Flujo activo verificado",
  '01.04.10' : "Flujo activo no verificado",
  '01.04.11' : "Flujo inactivo verificado (escarpe)",
  '01.04.12' : "Flujo inactivo no verificado (escarpe)",
  '01.04.13' : "Flujo inactivo verificado (cuerpo)",
  '01.04.14' : "Flujo inactivo no verificado (cuerpo)",
  '01.04.15' : "Flujo inactivo verificado ",
  '01.04.16' : "Flujo inactivo no verificado",
  '01.04.21' : "Flujo activo  verificado (tránsito)",
  '01.04.22' : "Flujo activo no verificado (tránsito)",
  '01.04.23' : "Flujo inactivo verificado (tránsito)",
  '01.04.24' : "Flujo inactivo no verificado (tránsito)",
  '01.05.01' : "Reptación superficial verificada",
  '01.05.02' : "Reptación superficial no verificada",
  '01.05.03' : "Reptación profunda verificada",
  '01.05.04' : "Reptación profunda no verificada",
};
var tipo_cod_MM = {
   "Deslizamiento activo verificado (escarpe)" : '01.01.01',
   "Deslizamiento activo no verificado (escarpe)" : '01.01.02',
   "Deslizamiento activo verificado (cuerpo)" : '01.01.03',
   "Deslizamiento activo no verificado (cuerpo)" : '01.01.04',
   "Deslizamiento activo verificado" : '01.01.05',
   "Deslizamiento activo no verificado" : '01.01.06',
   "Deslizamiento inactivo verificado (escarpe)" : '01.01.07',
   "Deslizamiento inactivo no verificado (escarpe)" : '01.01.08',
   "Deslizamiento inactivo verificado (cuerpo)" : '01.01.09',
   "Deslizamiento inactivo no verificado (cuerpo)" : '01.01.10',
   "Deslizamiento inactivo verificado" : '01.01.11',
   "Deslizamiento inactivo no verificado" : '01.01.12',
   "Deslizamiento activo verificado (tránsito)" : '01.01.17',
   "Deslizamiento activo no verificado (tránsito)" : '01.01.18',
   "Deslizamiento inactivo verificado (tránsito)" : '01.01.19',
   "Deslizamiento inactivo no verificado (tránsito)" : '01.01.20',
   "Caída activa verificada (escarpe)" : '01.02.01',
   "Caída activa no verificada (escarpe)" : '01.02.02',
   "Caída activa verificada (cuerpo)" : '01.02.03',
   "Caída activa no verificada (cuerpo)" : '01.02.04',
   "Caída activa verificada" : '01.02.05',
   "Caída activa no verificada" : '01.02.06',
   "Caída inactiva verificada (escarpe)" : '01.02.07',
   "Caída inactiva no verificada (escarpe)" : '01.02.08',
   "Caída inactiva verificada (cuerpo)" : '01.02.09',
   "Caída inactiva no verificada (cuerpo)" : '01.02.10',
   "Caída inactiva verificada" : '01.02.11',
   "Caída inactiva no verificada" : '01.02.12',
   "Caída activa verificada (tránsito)" : '01.02.17',
   "Caída activa no verificada (tránsito)" : '01.02.18',
   "Caída inactiva verificada (tránsito)" : '01.02.19',
   "Caída inactiva no verificada (tránsito)" : '01.02.20',
   "Volcamiento activo verificado (escarpe)" : '01.03.01',
   "Volcamiento activo no verificado (escarpe)" : '01.03.02',
   "Volcamiento activo verificado (cuerpo)" : '01.03.03',
   "Volcamiento activo no verificado (cuerpo)" : '01.03.04',
   "Volcamiento activo verificado" : '01.03.05',
   "Volcamiento activo no verificado" : '01.03.06',
   "Volcamiento inactivo verificado (escarpe)" : '01.03.07',
   "Volcamiento inactivo no verificado (escarpe)" : '01.03.08',
   "Volcamiento inactivo verificado (cuerpo)" : '01.03.09',
   "Volcamiento inactivo no verificado (cuerpo)" : '01.03.10',
   "Volcamiento inactivo verificado" : '01.03.11',
   "Volcamiento inactivo no verificado" : '01.03.12',
   "Avenida torrencial verificada (zona tránsito)" : '01.04.01',
   "Avenida torrencial no verificada (zona tránsito)" : '01.04.02',
   "Avenida torrencial verificada (zona depósito)" : '01.04.03',
   "Avenida torrencial no verificada (zona depósito)" : '01.04.04',
   "Flujo activo verificado (escarpe)" : '01.04.05',
   "Flujo activo no verificado (escarpe)" : '01.04.06',
   "Flujo activo verificado (cuerpo)" : '01.04.07',
   "Flujo activo no verificado (cuerpo)" : '01.04.08',
   "Flujo activo verificado" : '01.04.09',
   "Flujo activo no verificado" : '01.04.10',
   "Flujo inactivo verificado (escarpe)" : '01.04.11',
   "Flujo inactivo no verificado (escarpe)" : '01.04.12',
   "Flujo inactivo verificado (cuerpo)" : '01.04.13',
   "Flujo inactivo no verificado (cuerpo)" : '01.04.14',
   "Flujo inactivo verificado" : '01.04.15',
   "Flujo inactivo no verificado" : '01.04.16',
   "Flujo activo  verificado (tránsito)" : '01.04.21',
   "Flujo activo no verificado (tránsito)" : '01.04.22',
   "Flujo inactivo verificado (tránsito)" : '01.04.23',
   "Flujo inactivo no verificado (tránsito)" : '01.04.24',
   "Reptación superficial verificada" : '01.05.01',
   "Reptación superficial no verificada" : '01.05.02',
   "Reptación profunda verificada" : '01.05.03',
   "Reptación profunda no verificada" : '01.05.04',
};
var cod_name_Rasgo = {
  "02.01.01": "Lomo lineal o lomo de falla",
  "02.01.02": "Silleta de falla",
  "02.01.03": "Valle en copa de vino",
  "02.01.04": "Trinchera de falla",
  "02.01.05": "Basculamiento",
  "02.01.06": "Laguna de falla",
  "02.01.07": "Berma de falla",
  "02.01.08": "Cambio de pendiente",
  "02.01.09": "Drenaje obturado",
  "02.01.10": "Drenaje controlado",
  "02.01.11": "Drenaje deflectado",
  "02.01.12": "Escarpe de falla",
  "02.01.13": "Faceta trapezoidal",
  "02.01.14": "Faceta triangular",
  "02.01.15": "Gancho de flexión",
  "02.01.16": "Hombrera de falla",
  "02.01.17": "Silleta dibujada",
  "02.01.18": "Drenaje desviado",
  "02.01.19": "Gancho de falla",
  "02.01.20": "Cuchilla lineal",
  "02.02.01": "Camino de ganado",
  "02.02.02": "Cicatriz o corona de MM reciente",
  "02.02.03": "Cicatriz o corona de MM antiguo",
  "02.02.04": "Drenaje torrencial",
  "02.02.05": "Escarpe",
  "02.02.06": "Erosión en cárcava (dirección)",
  "02.02.07": "Erosión en cárcava (contorno)",
  "02.02.08": "Erosión en surco",
  "02.02.09": "Escarpe secundario de MM",
  "02.02.10": "Escarpe de caída",
  "02.02.11": "Faceta de erosión",
  "02.02.12": "Grietas de tensión",
  "02.02.13": "Grietas (longitudinales, transversales o radiales)",
  "02.02.14": "Hondonada",
  "02.02.15": "Lóbulo de solifluxión",
  "02.02.16": "Erosión remontante",
  "02.04.01": "Erosión lateral",
  "02.04.02": "Escarpe de terraza",
  "02.04.03": "Meandro abandonado",
  "02.04.04": "Punto de quiebre",
  "02.04.05": "Estrechamiento de drenaje",
  "02.04.06": "Dirección de avance por desborde",
  "02.04.07": "Dirección de flujo",
  "02.09.01": "Cantera activa",
  "02.09.02": "Cantera inactiva",
  "02.09.03": "Corte de talud",
};
var cod_ambiente = {
  "02.01" : "Estructural",
  "02.02" : "Denudacional",
  "02.03" : "Volcánico",
  "02.04" : "Fluvial",
  "02.05" : "Glacial",
  "02.06" : "Marino",
  "02.07" : "Eólico",
  "02.08" : "Kárstico",
  "02.09" : "Antrópico",
};
var cod_mpios = {
  "17013" :"Aguadas",
  "17050" :"Aranzazu",
  "17272" :"Filadelfia",
  "17444" :"Marquetali",
  "17614" :"Riosucio",
  "17777" :"Supía",
  "ALL" : "Completa"
}

// ---------> Datos
// Declaración del objeto 'CapaDatos'
function CapaDatos(capa, figuras, database, active, clase, name, color) {
  this.capa = capa;
  this.figuras = figuras;
  this.database = database;
  this.active = active;
  this.clase = clase;
  this.name = name;
  this.color = color;
  this.CargarCapaDatos = CargarCapaDatos;
}

var capasDatos = [
  // new CapaDatos(null,[],null,0,'procesos','Procesos Morfodinámicos','#2ecc71'),
  // new CapaDatos(null,[],null,0,'rasgos','Rasgos','#f1c40f'),
  new CapaDatos(null,[],null,0,'estaciones','Cargar Estaciones','#f1c40f'),
  // new CapaDatos(null,[],null,0,'procesos','Procesos Morfodinámicos Puntos','#2ecc71'),
  // new CapaDatos(L.layerGroup(),[],null,0,'query','Realizar Query','#8e44ad'),
  // new CapaDatos(null,[],null,0,'geologia','UGS','#8e44ad'),
  // new CapaDatos(null,[],null,0,'morfo','Morfometría','#410000'),
];
var capasEst = [
  new CapaDatos( L.layerGroup() ,[],null,1,'ugs','UGS Rocas y Suelos','#2ecc71'),
  new CapaDatos( L.layerGroup() ,[],null,1,'sgmf','SGMF','#f1c40f'),
  new CapaDatos( L.layerGroup() ,[],null,1,'cat','Catálogos','#f1c40f'),
  new CapaDatos( L.layerGroup() ,[],null,1,'inv','Inventarios','#8e44ad'),
  new CapaDatos( L.layerGroup() ,[],null,1,'vivienda','Vivienda','#410000'),
  new CapaDatos( L.layerGroup() ,[],null,1,'otro','Sin Tipo','#410000'),
  new CapaDatos( L.layerGroup() ,[],null,1,'query','Capa Query','#410000'),
];

function CargarDatos() {

  for (let i = 0; i < capasDatos.length; i++) {
    
      $("#list_aflora").append(
        '<li class="content-list first">'+
            '<label class="switch">'+
                '<input type="checkbox" id="forma_' + i + '" onChange="toggleDatos(id)">'+
                '<span class="slider round"></span>'+
            '</label>'+
            '<a>  ' + capasDatos[i].name + '</a>'+
        '</li>'
      );
      $("#forma_"+i).prop("checked", false);
    
    
    
  }
  $("#lista_capas_descargar").append(
    '<br>'+
    '<label for="capa_descarga">Capa a Descargar: </label>' +
    '<select id="capa_descarga" class="form-control select-mpios">' +
        '<option value="0">Procesos Morfodinámicos</option>' +
        '<option value="1">Rasgos</option>' +
        '<option value="2">Estaciones</option>' +
    '</select>'+
    '<label for="mpio_descarga">Descargar por Clase: </label>' +
    '<select id="mpio_descarga" class="form-control select-mpios">' +
        '<option value="polygon">Polígonos</option>' +
        '<option value="point">Puntos</option>' +
    '</select>'+
    '<label for="tipo_descarga">Descargar en Formato: </label>' +
    '<select id="tipo_descarga" class="form-control select-mpios">' +
        '<option value="shp">Shapefile</option>' +
        '<option value="geojson">GeoJSON</option>' +
    '</select>'+
    '<a class="btn-descargar" id="clase_descarga" onclick="CargarDatosDescarga(id, this)" type="button" >  <i class="fas fa-layer-group"></i>   Cargar la Capa </a>'+
    '<a class="btn-descargar" id="clase_descarga" onclick="DescargarDatos(id, this)" type="button" >  <i class="fas fa-file-download"></i>   Descargar </a>'
  );
}

function toggleDatos(id) {
  var num = id.split("_")[1];
  console.log(capasDatos[num].active)
  if (capasDatos[num].active == 0) {
    capasDatos[num].active = 2;
    capasDatos[num].CargarCapaDatos();
  } else if (capasDatos[num].active == 1){
    capasDatos[num].active = 2;
    capasDatos[num].capa.addTo(map);
  } else if (capasDatos[num].active == 2){
    capasDatos[num].active = 1;
    map.removeLayer(capasDatos[num].capa);
  }

}

function toggleDatosEst(id) {
  var num = id.split("_")[1];
  console.log(capasEst[num].active)
  if (capasEst[num].active == 1){
    capasEst[num].active = 2;
    capasEst[num].capa.addTo(map);
  } else if (capasEst[num].active == 2){
    capasEst[num].active = 1;
    map.removeLayer(capasEst[num].capa);
  }

}

function CargarCapaDatos() {
  map.spin(true, spinOpts);
  this.capa = L.layerGroup();
  // var markers = L.markerClusterGroup();
  // this.capa.addTo(map);
  if (this.clase == 'estaciones') {
    database.ref().child('EstacionesCampo').get().then((snapshot) => {
      if (snapshot.exists()) {
        this.database = snapshot.val();
        estaciones = snapshot.val();
        console.log(snapshot.val());
        for (let i = 0; i < this.database.cont.cont; i++) {
          if (this.database['estacion_'+i]?.activo) {
            var point = L.marker([this.database['estacion_'+i]['Norte'], this.database['estacion_'+i]['Este']]).toGeoJSON();
            // console.log(point);
            var auxmarker;
            var auxFormatosPopUp = "";
            var auxcapa = ""
            var auxtipo = this.database['estacion_'+i]['TipoEstacion'];
            var auxtipoup = auxtipo.toUpperCase();

            if (auxtipoup.includes('UGS')){
              auxcapa = "ugs"
            }
            else if (auxtipoup.includes('SGMF')){
              auxcapa = "sgmf"
            }
            else if (auxtipoup.includes('Vivienda')){
              auxcapa = "vivienda"
            }
            else if (auxtipoup.includes('CMM') || auxtipoup.includes('CATÁLOGO') || auxtipoup.includes('CATALOGO')){
              auxcapa = "cat"
            }
            else if (auxtipoup.includes('IMM') || auxtipoup.includes('INVENTARIO')){
              auxcapa = "inv"
            }
            else{
              auxcapa = "otro"
            }

            if ( (auxtipo.includes('Punto') || auxtipo.includes('punto') ) && (auxtipo.includes('UGS') || auxtipo.includes('ugs'))) {
              auxmarker = markerControlUGS;
            }
            else if ( (auxtipo.includes('Punto') || auxtipo.includes('punto') ) && (auxtipo.includes('SGMF') || auxtipo.includes('sgmf'))) {
              auxmarker = markerControlSGMF;
            }
            else if (auxtipo.includes('SGMF') || auxtipo.includes('sgmf') || this.database['estacion_'+i]['Propietario'] ==="Maria Areiza Rodríguez") {
              auxmarker = markerControlSGMF;
            }
            else if (auxtipo.includes('UGS') || auxtipo.includes('ugs') ) {
              auxmarker = markerControlUGS;
            }
            else if (auxtipoup.includes('IMM')) {
              auxmarker = markerInv;
            }
            else if (auxtipoup.includes('Vivienda')) {
              auxmarker = markerViv;
            }

            if (this.database['estacion_'+i]['Formularios']['count_UGS_Rocas']>0) {
              for (let k = 0; k < this.database['estacion_'+i]['Formularios']['count_UGS_Rocas']; k++) {
                auxFormatosPopUp += 'UGSR' + this.database['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['noformato'] + ', ';   
              }
              auxmarker = markerUGSR;
              auxcapa = "ugs"
            }
            if (this.database['estacion_'+i]['Formularios']['count_UGS_Suelos']>0) {
              for (let k = 0; k < this.database['estacion_'+i]['Formularios']['count_UGS_Suelos']; k++) {
                auxFormatosPopUp += 'UGSS' + this.database['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['noformato'] + ', ';   
              }
              auxmarker = markerUGSS;
              auxcapa = "ugs"
            }
            if (this.database['estacion_'+i]['Formularios']['count_SGMF']>0) {
              for (let k = 0; k < this.database['estacion_'+i]['Formularios']['count_SGMF']; k++) {
                auxFormatosPopUp += 'SGMF' + this.database['estacion_'+i]['Formularios']['Form_SGMF']['Form_SGMF_'+k]['noformato'] + ', ';   
              }
              auxmarker = markerSGMF;
              auxcapa = "sgmf"
            }
            if (this.database['estacion_'+i]['Formularios']['count_CATALOGO']>0) {
              for (let k = 0; k < this.database['estacion_'+i]['Formularios']['count_CATALOGO']; k++) {
                auxFormatosPopUp += 'CATALOGO_' + this.database['estacion_'+i]['Formularios']['Form_CATALOGO']['Form_CATALOGO_'+k]['ID_PARTE'] + ', ';   
              }
              auxmarker = markerCat;
              auxcapa = "cat"
            }
            if (this.database['estacion_'+i]['Formularios']['count_INVENTARIO']>0) {
              for (let k = 0; k < this.database['estacion_'+i]['Formularios']['count_INVENTARIO']; k++) {
                auxFormatosPopUp += 'INVENTARIO_' + this.database['estacion_'+i]['Formularios']['Form_INVENTARIO']['Form_INVENTARIO_'+k]['ID_PARTE'] + ', ';   
              }
              auxmarker = markerInv;
              auxcapa = "inv"
            }
            if (this.database['estacion_'+i]['Formularios']['count_VIVIENDA']>0) {
              for (let k = 0; k < this.database['estacion_'+i]['Formularios']['count_VIVIENDA']; k++) {
                auxFormatosPopUp += 'VIVIENDA_' + this.database['estacion_'+i]['Formularios']['Form_VIVIENDA']['Form_VIVIENDA_'+k]['idformatoValpa'] + ', ';   
              }
              auxmarker = markerViv;
              auxcapa = "vivienda"
            }

            L.extend(point.properties, {
              id: i,
              Estacion: this.database['estacion_'+i]['Estacion'],
              Fecha: this.database['estacion_'+i]['Fecha'],
              TipoEstacion: this.database['estacion_'+i]['TipoEstacion'],
              Propietario: this.database['estacion_'+i]['Propietario'],
              Observaciones: this.database['estacion_'+i]['Observaciones'],
              Este: this.database['estacion_'+i]['Este'],
              Norte: this.database['estacion_'+i]['Norte'],
              Altitud: this.database['estacion_'+i]['Altitud'],
              Formatos: auxFormatosPopUp
            });
            this.figuras.push(point);
            // console.log(i);
            var puntico = L.geoJson(point,{
                onEachFeature: function (feature, layer) {
                  feature.layer = layer;
                  layer.bindPopup(popupEstaciones);
                  layer.setIcon(auxmarker);
                }
              })
              .bindPopup(popupEstaciones)
              .addTo(this.capa)
              .addTo(allData);
              // .on('click', function(e) {
              //   EditExist(e);
              // });    
              
              if (auxcapa === "ugs"){
                puntico.addTo(capasEst[0].capa)
              }
              else if (auxcapa === "sgmf"){
                puntico.addTo(capasEst[1].capa)
              }
              else if (auxcapa === "cat"){
                puntico.addTo(capasEst[2].capa)
              }
              else if (auxcapa === "inv"){
                puntico.addTo(capasEst[3].capa)
              }
              else if (auxcapa === "vivienda"){
                puntico.addTo(capasEst[4].capa)
              }
              else{
                puntico.addTo(capasEst[5].capa)
              }
              
          }
          else{
            this.figuras.push(null);
          }
        }

        console.log(this.figuras);
        console.log(this.capa.toGeoJSON());
        console.log(allData.toGeoJSON());
        searchCtrl.indexFeatures(allData.toGeoJSON(), ['Estacion', 'TipoEstacion', 'Formatos', 'Propietario','nombreclase','id','ID_MOV','ENCUESTAD','TIPO_MOV1','ID_PARTE','Tipo_MM','VEREDA','Propietario','Nom_Rasgo','Cod_Rasgo','Nom_UGS','Tipo','TipoRocaSuelo','Vereda','Cod_SGMF','Nom_SGMF','Forma','NOM_MUN']);
        map.spin(false);

        for (let j = 0; j < capasEst.length; j++) {
          if (capasEst[j].clase === "query") {
            $("#list_aflora").append(
              '<li class="content-list est">'+
                  '<label class="switch">'+
                      '<input type="checkbox" id="est_' + j + '" onChange="toggleDatosEst(id)">'+
                      '<span class="slider round"></span>'+
                  '</label>'+
                  '<a>  ' + capasEst[j].name + '</a>'+
                  '<div class="d-inline">'+
                      '<button class="btn btn-secondary ml-1" type="button" id="peticionesQuery" data-toggle="modal" data-target="#id-Query-Estaciones">Realizar Query</button>'+
                  '</div>'+
              '</li>'
            );
            $("#list_aflora").parent().css("max-height"," 402px")
          }
          else {
            $("#list_aflora").append(
              '<li class="content-list est">'+
                  '<label class="switch">'+
                      '<input type="checkbox" id="est_' + j + '" onChange="toggleDatosEst(id)">'+
                      '<span class="slider round"></span>'+
                  '</label>'+
                  '<a>  ' + capasEst[j].name + '</a>'+
              '</li>'
            );
            $("#list_aflora").parent().css("max-height"," 384px")
          }
        }

        //var tagged = turf.tag(this.capa.toGeoJSON(), alturas, 'MPIO_CNMBR', 'MUNICIPIO');
        //console.log(tagged);
        
        // var capita = this.capa.toGeoJSON()
        // for (let index = 0; index < capita.features.length; index++) {
        //   capita.features[index].properties.MUN = alturas.features[index].properties.MPIO_CNMBR;
        // }
        // console.log(capita);
        // DepurarDatosEstaciones(capita)

        
      } else {
        console.log("No data available");
      }
      
    }).catch((error) => {
      console.error(error);
    });
    
  } else {
    this.capa.addTo(map);
    database.ref().child('features/'+this.clase).get().then((snapshot) => {
      if (snapshot.exists()) {
        this.database = snapshot.val();
        console.log(snapshot.val());
        for (let i = 0; i < this.database.count.count; i++) {
          if (this.database['feature_'+i]?.activo) {
            this.figuras.push(this.database['feature_'+i]['layergeojson']);
            var style = {
              weight: 3,
              color : this.color,
              dashArray: '0'
            }
            if (this.clase == 'procesos') {
              style.dashArray = '6,6';
              if (this.database['feature_'+i]['layergeojson'].properties['ACTIVIDAD'] == '1') {
                style.dashArray = '0';
              }
              this.database['feature_'+i]['layergeojson'].properties['COD_SIMMA'] = this.database['feature_'+i]['layergeojson'].properties['COD_SIMMA']+''
            }
            L.extend(this.database['feature_'+i]['layergeojson'].properties, {
              id: this.database["feature_"+i]["id"]+'',
              clase: this.clase,
              nombreclase: this.name
            });
            // console.log(i);
            L.geoJson(this.database['feature_'+i]['layergeojson'],{
                onEachFeature: function (feature, layer) {
                  feature.layer = layer;
                  layer.bindPopup(popupFiguras);
                }
              })
              .setStyle(style)
              .bindPopup(popupFiguras)
              .addTo(this.capa)
              .addTo(allData)
              .on('click', function(e) {
                EditExist(e);
              });  
              
              // markers.addLayer(mark);
          }
        }
        // map.addLayer(markers);
        console.log(this.figuras);
        console.log(this.capa.toGeoJSON());
        console.log(allData.toGeoJSON());
        searchCtrl.indexFeatures(allData.toGeoJSON(), ['nombreclase','id','ID_MOV','COD_SIMMA','ENCUESTAD','TIPO_MOV1','ID_PARTE','Tipo_MM','VEREDA','Propietario','Nom_Rasgo','Cod_Rasgo','Nom_UGS','Tipo','TipoRocaSuelo','Vereda','Cod_SGMF','Nom_SGMF','Forma','NOM_MUN']);
        map.spin(false);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}

// ****PESTAÑA DESCARGAR DATOS

// Función para cargar los datos desde Descargar Datos y dejarlos almacenados
function CargarDatosDescarga(id, obj){
  const num_descarga = parseInt($("#capa_descarga").val());
  if (capasDatos[num_descarga].active == 0) {
    capasDatos[num_descarga].active = 2;
    capasDatos[num_descarga].CargarCapaDatos();
    $("#forma_"+num_descarga).prop("checked", true);
  } else if (capasDatos[num_descarga].active == 1) {
    capasDatos[num_descarga].active = 2;
    capasDatos[num_descarga].capa.addTo(map);
    $("#forma_"+num_descarga).prop("checked", true);
  }
}

function DescargarDatos(id, obj) {
  const num_descarga = parseInt($("#capa_descarga").val());
  if (capasDatos[num_descarga].active == 0) {
    alert("Por favor active la capa que desea descargar.")
  } else{
    let filtroDescarga = $("#mpio_descarga").val();
    let filtrotipo = $("#tipo_descarga").val();
    if (capasDatos[num_descarga].clase == 'estaciones') {
      DescargarDatosJSON(capasDatos[num_descarga].figuras, capasDatos[num_descarga].clase, filtroDescarga, filtrotipo )
    }
    else{
      DescargarDatosJSON(capasDatos[num_descarga].database, capasDatos[num_descarga].clase, filtroDescarga, filtrotipo )
    }
  }
}

// Función para descargar un archivo
function saveToFile(content, filename) {
  var file = filename + '.json';
  console.log(content)
  saveAs(new File([JSON.stringify(content, getCircularReplacer())], file, {
    type: "text/plain;charset=utf-8"
  }), file);
}

//Función que filtra los datos según el mpio seleccionado y construye el geojson
function DescargarDatosJSON(baseDatos, clase, filtro, filtrotipo){
  let capas = L.layerGroup();
  let copiaDatos = {...baseDatos}

  if(clase === "procesos"){
    for (let j = 0; j < copiaDatos["count"]["count"]; j++) {
      if (copiaDatos["feature_"+j]?.activo && copiaDatos["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'LineString') {
        var temp = copiaDatos["feature_"+j]["layergeojson"];
        if(filtro == "polygon"){
          if(copiaDatos['feature_'+j]["layergeojson"]["geometry"]["type"] == 'Polygon'){
            L.geoJson(temp).addTo(capas);
          }
        }
        else {
          if(copiaDatos['feature_'+j]["layergeojson"]["geometry"]["type"] == 'Point'){
            L.geoJson(temp).addTo(capas);
          }
        }
      }
    }
  }
  else if(clase === "rasgos"){
    for (let j = 0; j < copiaDatos["count"]["count"]; j++) {
      if (copiaDatos["feature_"+j]["activo"] && copiaDatos["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'Polygon') {
        let temp = copiaDatos["feature_"+j]["layergeojson"];
        if(filtro == "ALL"){
          temp["properties"].COD_MUN = temp["properties"].COD_MUN+"";
          L.geoJson(temp).addTo(capas);
        }else if(copiaDatos['feature_'+j]["layergeojson"]["properties"].COD_MUN == filtro){
          temp["properties"].COD_MUN = temp["properties"].COD_MUN+"";
          L.geoJson(temp).addTo(capas);
        }
      }
    }
  }
  else if(clase === "estaciones"){
    for (est in copiaDatos) {
      if (copiaDatos[est]!==null) {
        let temp = copiaDatos[est];
        
          L.geoJson(temp).addTo(capas);
        
      }
    }
  }

  
  console.log(copiaDatos);
  console.log(capas);
  let archivoFinal = capas.toGeoJSON();
  console.log(archivoFinal);
  //Eliminar el campos no deseados
  for(let k= 0; k < archivoFinal.features.length; k++ ){
    delete archivoFinal["features"][k].layer;
    delete archivoFinal["features"][k]["properties"]["_feature"];
    delete archivoFinal["features"][k]["properties"]["id"];
    delete archivoFinal["features"][k]["properties"]["clase"];
    delete archivoFinal["features"][k]["properties"]["nombreclase"];

    delete archivoFinal["features"][k]["properties"].codigo;
    delete archivoFinal["features"][k]["properties"].descripcion;
    delete archivoFinal["features"][k]["properties"].fecha;
    delete archivoFinal["features"][k]["properties"].nombre;
    delete archivoFinal["features"][k]["properties"].propietario;
    delete archivoFinal["features"][k]["properties"].zona;

    delete archivoFinal["features"][k]["properties"].CR;
    delete archivoFinal["features"][k]["properties"].Visible_25;
    delete archivoFinal["features"][k]["properties"].Propietari;

    archivoFinal["features"][k]["id"] = k;
  }

  if (filtrotipo === 'shp') {
    var options = {
      folder: 'Capa_'+ clase+ "_" + filtro + '_' +dateFormat(new Date(),'Y-m-d'),
      types: {
          point: clase+ "_" + filtro + '_' +dateFormat(new Date(),'Y-m-d'),
          polygon: clase+ "_" + filtro + '_' +dateFormat(new Date(),'Y-m-d'),
          polyline: clase+ "_" + filtro + '_' +dateFormat(new Date(),'Y-m-d')
      }
  }
    shpwrite.download(archivoFinal, options);
  } else {
    saveToFile(archivoFinal, 'Capa_'+ clase + "_" + filtro + '_'+dateFormat(new Date(),'Y-m-d')); //Generar el archivo descargable
  }

  capas = null;
  copiaDatos = null;
  
}

// Función para eliminar el error de referencia cíclica de un json
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

// Función que define los popup de las figuras según su clase
function popupFiguras(layer) {
  if (!editMode) {
    if (layer.feature.properties.clase == 'procesos') {
      var tipo;
      if (layer.feature.properties.TIPO_MOV1 == '01') {
        tipo='Deslizamiento';
      }else if (layer.feature.properties.TIPO_MOV1 == '02') {
        tipo='Reptación';
      }else if (layer.feature.properties.TIPO_MOV1 == '03') {
        tipo='Caida';
      }else if (layer.feature.properties.TIPO_MOV1 == '04') {
        tipo='Flujo';
      }else {
        tipo='Tipo no definido';
      }
      if (layer.feature.properties.nombre === undefined) {     
        // console.log(layer.toGeoJSON());   
        auxLayerCentroid = layer.toGeoJSON();
    
        var gradLng = Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0])
        gradLng = (gradLng<0) ? gradLng*-1 : gradLng;
        var gradLat = Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1])
        gradLat = (gradLat<0) ? gradLat*-1 : gradLat;
        console.log(gradLng, gradLat);
        var minLng = Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[0]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0]))*60);
        minLng = (minLng<0) ? minLng*-1 : minLng;
        var minLat = Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[1]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1]))*60);
        minLat = (minLat<0) ? minLat*-1 : minLat;
        console.log(minLng, minLat);
        var segLng =Math.trunc((Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[0]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0]))*60) - (turf.getCoord(turf.centroid(auxLayerCentroid))[0]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0]))*60)*60);
        segLng = (segLng<0) ? segLng*-1 : segLng;
        var segLat =Math.trunc((Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[1]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1]))*60) - (turf.getCoord(turf.centroid(auxLayerCentroid))[1]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1]))*60)*60);
        segLat = (segLat<0) ? segLat*-1 : segLat;
        console.log(segLng, segLat);
        var corregidaLgn = '-' + gradLng + '°' + ((minLng<10)? '0'+minLng : minLng) + "'" + ((segLng<10)? '0'+segLng : segLng) + '"';
        var corregidaLat = '0' + gradLat + '°' + ((minLat<10)? '0'+minLat : minLat) + "'" + ((segLat<10)? '0'+segLat : segLat) + '"';
        console.log(corregidaLgn);
        console.log(corregidaLat);
      
        
        return L.Util.template('<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              '<strong>ID_MOV</strong>: {ID_MOV}.<br>'+
                              '<strong>Tipo de MM</strong>: '+tipo+'.<br>'+
                              '<strong>Subtipo</strong>: {SUBTIPO_1}.<br>'+
                              '<strong>ID_PARTE</strong>: {ID_PARTE}.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'+
                              '<strong>Encuestador</strong>: {ENCUESTAD}.<br>'+
                              '<strong>Centroide</strong>: '+ corregidaLgn + ', ' + corregidaLat +'<br>', layer.feature.properties);
      }else{
        return L.Util.template('<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              '<strong>ID_MOV</strong>: {nombre}.<br>'+
                              // '<strong>Propietario</strong>: {propietario}.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'+
                              '<strong>Esta forma debe ser actualizada con los datos del respectivo formulario</strong>', layer.feature.properties);
      }
  
    }else if (layer.feature.properties.clase == 'geomorfo') {
      return L.Util.template('<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              '<strong>Nombre</strong>: {SGMF_NAME}.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'+
                              '<strong>Propietario</strong>: {Propietario}.<br>', layer.feature.properties);
    }else if (layer.feature.properties.clase == 'rasgos') {
      return L.Util.template('<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              '<strong>Nombre</strong>:'+ cod_name_Rasgo[layer.feature.properties.Nom_Rasgo] +'.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'
                              // '<strong>Propietario</strong>: {Propietario}.<br>'
                              , layer.feature.properties);
    }else if (layer.feature.properties.clase == 'geologia') {
      return L.Util.template( //'<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              // '<strong>Nombre UGS</strong>: {Nom_UGS}.<br>'+
                              // '<strong>Tipo de Unidad</strong>: {Tipo}.<br>'+
                              // '<strong>Tipo</strong>: {TipoRocaSuelo}.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'
                              // '<strong>Propietario</strong>: {Propietario}.<br>'
                              , layer.feature.properties); 
    }else if (layer.feature.properties.clase == 'estructuras') {
      return L.Util.template('<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'+
                              '<strong>Nombre</strong>: {NombreLineamiento}.<br>', layer.feature.properties);
    }else if (layer.feature.properties.clase == 'morfo') {
      return L.Util.template('<p><strong>Clase</strong>: {nombreclase}.<br>'+ 
                              '<strong>{Forma}</strong><br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>'+
                              '<strong>Propietario</strong>: {Propietario}.<br>', layer.feature.properties);
    }
  }
}

function popupEstaciones(layer) {
  console.log(layer.feature.layer._latlng);
  if (!editMode) {

    var feature =  capasDatos[0].database["estacion_"+layer.feature.properties.id];

    if(feature["Formularios"].count_UGS_Rocas>0){
      for (let j = 0; j < feature["Formularios"].count_UGS_Rocas; j++) {
        if (feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].activo) {
          var formato = feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]; 
          if (formato["gsi"] !== undefined) {
            var calificacion = "";
            switch (formato["gsi"]) {
              case "0-20":
                calificacion = "Muy Mala";
                break;
              case "20-40":
                calificacion = "Mala";
                break;
              case "40-60":
                calificacion = "Regular";
                break;
              case "60-80":
                calificacion = "Buena";
                break;
              case "80-100":
                calificacion = "Muy Buena";
                break;
              default:
                calificacion = "No Aplica";
                break;
            }

            return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+ 
                            '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                            '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                            '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                            '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                            '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                            '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                            '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                            '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                            '<strong>Calidad de la Roca</strong>: '+calificacion+', (GSI:'+ formato["gsi"] +').<br>'+
                            '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties);
          }
        }
        else{
          return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+
                                  '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                                  '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                                  '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                                  '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                                  '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                                  '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                                  '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                                  '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                                  '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties
                                );
        }
      }
    }
    else if(feature["Formularios"].count_CATALOGO>0){
      var tipos = "";
      for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
        if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
          var formato = feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]; 
          if (tipos!=="") {
            tipos += '.<br>';
          }
          tipos += "Catálogo: "+formato.ID_PARTE+" Tipo MM 1: "+formato.TIPO_MOV1;
        }
      }
      if (tipos !== "") {
        return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+ 
                            '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                            '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                            '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                            '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                            '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                            '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                            '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                            '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                            '<strong>Tipo de MM 1</strong>: '+tipos+'.<br>'+
                            '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties);
      }
      else{
        return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+
                                '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                                '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                                '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                                '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                                '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                                '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                                '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                                '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                                '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties
                              );
      }
    }
    else if(feature["Formularios"].count_INVENTARIO>0){
      var tipos = "";
      for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
        if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
          var formato = feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]; 
          if (tipos!=="") {
            tipos += '.<br>';
          }
          tipos += "Inventario: "+formato.ID_PARTE+" Tipo MM 1: "+formato.TIPO_MOV1;
        }
      }
      if (tipos !== "") {
        return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+ 
                            '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                            '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                            '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                            '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                            '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                            '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                            '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                            '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                            '<strong>Tipo de MM 1</strong>: '+tipos+'.<br>'+
                            '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties);
      }
      else{
        return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+
                                '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                                '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                                '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                                '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                                '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                                '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                                '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                                '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                                '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties
                              );
      }
    }
    else{
      return L.Util.template( '<p><strong>Estacion</strong>: '+layer.feature.properties.Estacion+'.<br>'+
                              '<strong>TipoEstacion</strong>: '+layer.feature.properties.TipoEstacion+'.<br>'+
                              '<strong>Formatos</strong>: '+layer.feature.properties.Formatos+'.<br>'+
                              '<strong>Propietario</strong>: '+layer.feature.properties.Propietario+'.<br>'+
                              '<strong>Observaciones</strong>: '+layer.feature.properties.Observaciones+'.<br>'+
                              '<strong>Fecha</strong>: '+layer.feature.properties.Fecha+'.<br>'+
                              '<strong>['+layer.feature.properties.Norte+', '+layer.feature.properties.Este+']</strong><br>'+
                              '<strong>Altitud</strong>: '+layer.feature.properties.Altitud+'.<br>'+
                              '<strong>ID en la base de datos</strong>: '+layer.feature.properties.id+'.<br>'+
                              '<strong><button class="estilo-modales-1" data-toggle="modal" data-target="#modal-estaciones" data-whatever="'+layer.feature.properties.id+'_'+ layer.feature.layer._latlng.lat +'_'+ layer.feature.layer._latlng.lng +'">Ver Detalles de la Estación</button></strong><br>', layer.feature.properties
                            );
    }

    }
}

$('#modal-estaciones').on('shown.bs.modal', function (e) {
  var button = $(e.relatedTarget) // Button that triggered the modal
  const data = button.data('whatever').split("_");
  const id = data[0];
  const lat = data[1];
  const lng = data[2];
  FotosAnexasFiles = {};
  idsFormatos = {};
  primerForm = true;
  primerForm1 = true;
  $("#myTabs").empty();
  $("#myTabsContent").empty();
  $("#contenedorFotos").empty();
  $("#contenedorFotosLib").empty();

  const feature = estaciones["estacion_" + id];
  var formatos='';

  if(feature["Formularios"].count_UGS_Rocas>0){
    for (let j = 0; j < feature["Formularios"].count_UGS_Rocas; j++) {
      if (feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].activo) {
        formatos += "UGSR" + feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].noformato+', '; 
      }
    }
  }
  if(feature["Formularios"].count_UGS_Suelos>0){
    for (let j = 0; j < feature["Formularios"].count_UGS_Suelos; j++) {
      if (feature["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].activo) {
        formatos += "UGSS" + feature["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].noformato + ', '; 
      }
    }
  }
  if(feature["Formularios"].count_SGMF>0){
    for (let j = 0; j < feature["Formularios"].count_SGMF; j++) {
      if (feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j].activo) {
        formatos += "SGMF" + feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j].noformato + ', '; 
      }
    }
  }
  if(feature["Formularios"].count_CATALOGO>0){
    for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
      if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
        formatos += "CATALOGO_" + feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].ID_PARTE + ', '; 
      }
    }
  }
  if(feature["Formularios"].count_INVENTARIO>0){
    for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
      if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
        formatos += "INVENTARIO_" + feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ID_PARTE + ', '; 
      }
    }
  }

  if ((formatos == '')) {
    formatos = "Ninguno";
  }else{
    formatos = formatos.substring(0, formatos.length - 2);
  }

  $("#id-edit-estaciones").html("Registro con ID "+ id)
  // pasa las celdas capturadas al form modal de rasgos para su edicion
  $("#estaciones-id").val(id);
  $('#est-fecha-1').val(feature.Fecha);        
  $('#est-estacion-1').val(feature.Estacion);
  $('#est-tipoEstacion-1').val(feature.TipoEstacion);                
  $('#est-formatos-1').val(formatos);
  $('#est-norte-1').val(lat);
  $('#est-este-1').val(lng);
  $('#est-altura-1').val(feature.Altitud);
  $('#est-fotos-1').val(feature.Fotos);
  $('#est-fotosLib-1').val(feature.FotosLib);
  $('#est-observaciones-1').val(feature.Observaciones);
  if (feature.TextoLibreta !== undefined) {
    $('#est-textollib-1').val(feature.TextoLibreta);
  }
  else{
    $('#est-textollib-1').val("");
  }
  $('#est-propietario-3').val(feature.Propietario);

  $("#btnModalEditar").val(id);

  GraficarEstacion(true, id, false);
});

$("#btnModalEditar").click(function (e) { 
  e.preventDefault();

  const id = $("#btnModalEditar").val();

  let idEstaciones = $.trim($('#estaciones-id').val()); 
  let fechaEst = $.trim($('#est-fecha-1').val());
  let EstacionEst = $.trim($('#est-estacion-1').val()); 
  let tipoEstacionEst  = $.trim($('#est-tipoEstacion-1').val());
  // let formatoEst = $.trim($('#est-formatos-1').val());
  let norteEst = $.trim($('#est-norte-1').val());
  let esteEst = $.trim($('#est-este-1').val());
  let alturaEst = $.trim($('#est-altura-1').val());
  let fotosEst = $.trim($('#est-fotos-1').val());
  let fotosLibEst = $.trim($('#est-fotosLib-1').val());
  let observaEst = $.trim($('#est-observaciones-1').val());
  let textoLibreta = $.trim($('#est-textollib-1').val());
  let propietarioEst = $.trim($('#est-propietario-3').val());

  var datosEnvio = {
    activo : true,
    Fecha: fechaEst,
    Estacion : EstacionEst,
    TipoEstacion : tipoEstacionEst,
    Norte : norteEst,
    Este : esteEst,
    Altitud : alturaEst,
    Fotos  : fotosEst,
    FotosLib  : fotosLibEst,
    Observaciones : observaEst,
    TextoLibreta : textoLibreta,
    Propietario : propietarioEst
  }

  if (estaciones['estacion_'+id]['FotosGenerales'] !== undefined) {
    datosEnvio['FotosGenerales'] = estaciones['estacion_'+id]['FotosGenerales'];
  }
  if (estaciones['estacion_'+id]['FotosLibreta'] !== undefined) {
    datosEnvio['FotosLibreta'] = estaciones['estacion_'+id]['FotosLibreta'];
  }
  datosEnvio['Formularios'] = GuardarEstacion(true, id);
  console.log(datosEnvio);
  delete datosEnvio.Tipo;
            
  database.ref().child('EstacionesCampo/estacion_'+id).update(datosEnvio); 
  estaciones['estacion_'+id] = datosEnvio;

  SubirFotosAnexas(id, true);

  $('#modal-estaciones').modal('hide');

  alert("Estación Guardada con Exito")
  
});

$('#add-est-btn-edit').click(function (e) { 
  const id = $("#btnModalEditar").val();
  console.log(id);
  e.preventDefault();
  GraficarEstacion(false, id, true);  
});

var auxCapaQuery = false;

$("#ejecutar-query").click(function(e){
  e.preventDefault();
  if (auxCapaQuery) {
    map.removeLayer(capasEst[5].capa);
    capasEst[5].capa = L.layerGroup();
  }
  var estQuery = QueryEjecutarVisor(capasDatos[0].database);
  for (let i = 0; i < estQuery.length; i++) {
    var estaci = capasDatos[0].database["estacion_"+estQuery[i]];
    var point = L.marker([estaci['Norte'], estaci['Este']]).toGeoJSON();
    var auxmarker;
    var auxFormatosPopUp = "";
    var auxcapa = ""
    var auxtipo = estaci['TipoEstacion'];
    var auxtipoup = auxtipo.toUpperCase();
    if (auxtipoup.includes('UGS')){
      auxcapa = "ugs"
    }
    else if (auxtipoup.includes('Vivienda')){
      auxcapa = "vivienda"
    }
    else if (auxtipoup.includes('SGMF')){
      auxcapa = "sgmf"
    }
    else if (auxtipoup.includes('CMM') || auxtipoup.includes('CATÁLOGO') || auxtipoup.includes('CATALOGO')){
      auxcapa = "cat"
    }
    else if (auxtipoup.includes('IMM') || auxtipoup.includes('INVENTARIO')){
      auxcapa = "inv"
    }
    else{
      auxcapa = "otro"
    }

    if ( (auxtipo.includes('Punto') || auxtipo.includes('punto') ) && (auxtipo.includes('UGS') || auxtipo.includes('ugs'))) {
      auxmarker = markerControlUGS;
    }
    else if ( (auxtipo.includes('Punto') || auxtipo.includes('punto') ) && (auxtipo.includes('SGMF') || auxtipo.includes('sgmf'))) {
      auxmarker = markerControlSGMF;
    }
    else if (auxtipo.includes('SGMF') || auxtipo.includes('sgmf') || estaci['Propietario'] ==="Maria Areiza Rodríguez") {
      auxmarker = markerControlSGMF;
    }
    else if (auxtipo.includes('UGS') || auxtipo.includes('ugs') ) {
      auxmarker = markerControlUGS;
    }
    else if (auxtipoup.includes('IMM')) {
      auxmarker = markerInv;
    }
    else if (auxtipoup.includes('Vivienda')) {
      auxmarker = markerViv;
    }

    if (estaci['Formularios']['count_UGS_Rocas']>0) {
      for (let k = 0; k < estaci['Formularios']['count_UGS_Rocas']; k++) {
        auxFormatosPopUp += 'UGSR' + estaci['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['noformato'] + ', ';   
      }
      auxmarker = markerUGSR;
      auxcapa = "ugs"
    }
    if (estaci['Formularios']['count_UGS_Suelos']>0) {
      for (let k = 0; k < estaci['Formularios']['count_UGS_Suelos']; k++) {
        auxFormatosPopUp += 'UGSS' + estaci['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['noformato'] + ', ';   
      }
      auxmarker = markerUGSS;
      auxcapa = "ugs"
    }
    if (estaci['Formularios']['count_SGMF']>0) {
      for (let k = 0; k < estaci['Formularios']['count_SGMF']; k++) {
        auxFormatosPopUp += 'SGMF' + estaci['Formularios']['Form_SGMF']['Form_SGMF_'+k]['noformato'] + ', ';   
      }
      auxmarker = markerSGMF;
      auxcapa = "sgmf"
    }
    if (estaci['Formularios']['count_CATALOGO']>0) {
      for (let k = 0; k < estaci['Formularios']['count_CATALOGO']; k++) {
        auxFormatosPopUp += 'CATALOGO_' + estaci['Formularios']['Form_CATALOGO']['Form_CATALOGO_'+k]['ID_PARTE'] + ', ';   
      }
      auxmarker = markerCat;
      auxcapa = "cat"
    }
    if (estaci['Formularios']['count_INVENTARIO']>0) {
      for (let k = 0; k < estaci['Formularios']['count_INVENTARIO']; k++) {
        auxFormatosPopUp += 'INVENTARIO_' + estaci['Formularios']['Form_INVENTARIO']['Form_INVENTARIO_'+k]['ID_PARTE'] + ', ';   
      }
      auxmarker = markerInv;
      auxcapa = "inv"
    }

    L.extend(point.properties, {
      id: estQuery[i],
      Estacion: estaci['Estacion'],
      Fecha: estaci['Fecha'],
      TipoEstacion: estaci['TipoEstacion'],
      Propietario: estaci['Propietario'],
      Observaciones: estaci['Observaciones'],
      Este: estaci['Este'],
      Norte: estaci['Norte'],
      Altitud: estaci['Altitud'],
      Formatos: auxFormatosPopUp
    });
    capasEst[5].figuras.push(point);
    // console.log(i);
    var puntico = L.geoJson(point,{
        onEachFeature: function (feature, layer) {
          feature.layer = layer;
          layer.bindPopup(popupEstaciones);
          layer.setIcon(auxmarker);
        }
      })
      .bindPopup(popupEstaciones)
      .addTo(capasEst[5].capa)
      .addTo(allData); 

  }
  capasEst[5].capa.addTo(map);
  capasEst[5].active = 2;
  auxCapaQuery = true;
  $('#id-Query-Estaciones').modal('hide');
  $("#est_5").prop("checked", true);
})


// ---------> Municipios

var municipios = [
  'Aguadas',
  'Aranzazu',
  'Filadelfia',
  'Marquetalia',
  'Riosucio',
  'Supía'
];
var mapas25k = [

  new Mapa(null,'Aguadas','Subunidades Geomorfológicas',0,0,0.25,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/SGMF_Aguadas/FeatureServer/0'),
  new Mapa(null,'Aranzazu','Subunidades Geomorfológicas',0,0,0.25,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/SGMF_Aranzazu/FeatureServer/0'),
  new Mapa(null,'Filadelfia','Subunidades Geomorfológicas',0,0,0.25,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/SGMF_Filadelfia/FeatureServer/0'),
  new Mapa(null,'Marquetalia','Subunidades Geomorfológicas',0,0,0.25,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/SGMF_Marquetalia/FeatureServer/0'),
  new Mapa(null,'Riosucio','Subunidades Geomorfológicas',0,0,0.25,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/SGMF_Riosucio/FeatureServer/0'),
  new Mapa(null,'Supía','Subunidades Geomorfológicas',0,0,0.25,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/SGMF_Supia/FeatureServer/0'),


  new Mapa(null,'Aguadas','Unidades Geológicas Superficiales',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/UGS_Aguadas/FeatureServer/2'),
  new Mapa(null,'Aranzazu','Unidades Geológicas Superficiales',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/UGS_Aranzazu/FeatureServer/2'),
  new Mapa(null,'Filadelfia','Unidades Geológicas Superficiales',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/UGS_Filadelfia/FeatureServer/2'),
  new Mapa(null,'Marquetalia','Unidades Geológicas Superficiales',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/UGS_Marquetalia/FeatureServer/2'),
  new Mapa(null,'Riosucio','Unidades Geológicas Superficiales',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/UGS_Riosucio/FeatureServer/2'),
  new Mapa(null,'Supía','Unidades Geológicas Superficiales',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/UGS_Supia/FeatureServer/2'),
  
  new Mapa(null,'Aguadas','Cobertura Actual',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Cobertura_Aguadas/FeatureServer/0'),
  new Mapa(null,'Aranzazu','Cobertura Actual',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Cobertura_Aranzazu/FeatureServer/0'),
  new Mapa(null,'Filadelfia','Cobertura Actual',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Cobertura_Filadelfia/FeatureServer/0'),
  new Mapa(null,'Marquetalia','Cobertura Actual',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Cobertura_Marquetalia/FeatureServer/0'),
  new Mapa(null,'Riosucio','Cobertura Actual',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Cobertura_Riosucio/FeatureServer/0'),
  new Mapa(null,'Supía','Cobertura Actual',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Cobertura_Supia/FeatureServer/0'),
  
  new Mapa(null,'Aguadas','Cobertura Anterior',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaAnt_Aguadas/FeatureServer/0'),
  new Mapa(null,'Aranzazu','Cobertura Anterior',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaAnt_Aranzazu/FeatureServer/0'),
  new Mapa(null,'Filadelfia','Cobertura Anterior',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaAnt_Filadelfia/FeatureServer/0'),
  new Mapa(null,'Marquetalia','Cobertura Anterior',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaAnt_Marquetalia/FeatureServer/0'),
  new Mapa(null,'Riosucio','Cobertura Anterior',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaAnt_Riosucio/FeatureServer/0'),
  new Mapa(null,'Supía','Cobertura Anterior',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaAnt_Supia/FeatureServer/0'),
  
  new Mapa(null,'Aguadas','Cobertura Multitemporal',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaMult_Aguadas/FeatureServer/0'),
  new Mapa(null,'Aranzazu','Cobertura Multitemporal',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaMult_Aranzazu/FeatureServer/0'),
  new Mapa(null,'Filadelfia','Cobertura Multitemporal',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaMult_Filadelfia/FeatureServer/0'),
  new Mapa(null,'Marquetalia','Cobertura Multitemporal',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaMult_Marquetalia/FeatureServer/0'),
  new Mapa(null,'Riosucio','Cobertura Multitemporal',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaMult_Riosucio/FeatureServer/0'),
  new Mapa(null,'Supía','Cobertura Multitemporal',0,0,0.5,'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/CoberturaMult_Supia/FeatureServer/0'),
  
  new Mapa(null,'Aguadas','Veredas de Aguadas',0,0,0.25,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Veredas_Aguadas1/FeatureServer/0'),
  new Mapa(null,'Aranzazu','Veredas de Aranzazu',0,0,0.25,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Veredas_Aranzazu/FeatureServer/0'),
  new Mapa(null,'Filadelfia','Veredas de Filadelfia',0,0,0.25,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Veredas_Filadelfia/FeatureServer/0'),
  new Mapa(null,'Marquetalia','Veredas de Marquetalia',0,0,0.25,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Veredas_Marquetalia/FeatureServer/0'),
  new Mapa(null,'Riosucio','Veredas de Riosucio',0,0,0.25,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Veredas_Riosucio1/FeatureServer/0'),
  new Mapa(null,'Supía','Veredas de Supía',0,0,0.25,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Veredas_Supia/FeatureServer/0'),
];

function CargarMunicipios() {
  for (let i = 0; i < municipios.length; i++) {
    $("#lista_muni").append(
      '<li>'+
        '<button type="button" class="collapsible coll_muni">'+municipios[i]+'</button>'+
          '<div class="content cont_munis_'+municipios[i]+'" id="cont_munis_'+municipios[i]+'">'+
            '<ul id="lista_'+municipios[i]+'">'+
              '<li>'+
                '<button type="button" class="collapsible coll_infoSec_'+municipios[i]+'">Información Secundaria</button>'+
                '<div class="content cont_munis_'+municipios[i]+'">'+
                    '<ul id="lista_infoSec_'+municipios[i]+'">'+
                        
                    '</ul>'+
                '</div> '+
              '</li>'+
            '</ul>'+
        '</div>'+
      '</li>'
    );    
  }
  for (let i = 0; i < mapas25k.length; i++) {

    if (mapas25k[i].name.split(' ')[0] === 'Veredas') {
      mapas25k[i].capa = L.esri.featureLayer({
        url: mapas25k[i].url,
      }).bindPopup(function (layer) {
        // console.log(layer.feature.properties);
          return L.Util.template('<p><strong>Código de la Vereda</strong>: {CODIGO_VER}.<br>'+ 
                                  '<strong>Nombre de la Vereda</strong>: {NOMBRE_VER}.<br>', layer.feature.properties);

      }).bindTooltip(function (layer) {
          return 'Vereda: '+layer.feature.properties['NOMBRE_VER'];
        }, 
        {
            permanent: false, 
            direction: 'top',
            sticky: true,
        }
      ); 
    }else{
      mapas25k[i].capa = L.esri.featureLayer({
        url: mapas25k[i].url,
        onEachFeature: function(feature, layer) {
          if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
              return k + ": " + feature.properties[k];
            }).join("<br />"), {
              maxHeight: 200
            });
          }
        }
      })
      // .bindPopup(function (layer) {
      //   // console.log(layer.feature.properties);
      //   if(mapas25k[i].name=='Unidades Geológicas Superficiales'){
      //     return L.Util.template('<p><strong>Código UGS</strong>: {Cod_UGS}.<br>'+ 
      //                             '<strong>Nombre UGS</strong>: {Nom_UGS}.<br>'+ 
      //                             '<strong>Descripción</strong>: {Descripcion}.<br>', layer.feature.properties);
      //   }else if(mapas25k[i].name=='Subunidades Geomorfológicas'){
      //     return L.Util.template('<p><strong>Subunidad</strong>: {Cod_SGMF}.<br>'+ 
      //                             '<strong>Nombre</strong>: {Nom_SGMF}.<br>'+ 
      //                             '<strong>Ambiente</strong>: '+ cod_ambiente[layer.feature.properties.Ambiente] +'.<br>', layer.feature.properties);
      //   }else if(mapas25k[i].name=='Cobertura Uso'){
      //     return L.Util.template('<p><strong>Nombre</strong> : '+ layer.feature.properties.Nom_Cob +'.<br>'+
      //                             '<strong>Código</strong> : '+ layer.feature.properties.Cod_Cob +'.<br>'+ 
      //                             '<strong>Nivel 1</strong> : '+ layer.feature.properties.N1_Cob +'.<br>'+ 
      //                             '<strong>Nivel 2</strong> : '+ layer.feature.properties.N2_Cob +'.<br>'+ 
      //                             '<strong>Nivel 3</strong> : '+ layer.feature.properties.N3_Cob +'.<br>'+
      //                             '<strong>Nivel 4</strong> : '+ layer.feature.properties.N4_Cob +'.<br>'+
      //                             '<strong>Nivel 5</strong> : '+ layer.feature.properties.N5_Cob +'.<br>', layer.feature.properties);
      //   }
        
      // }); 
    }


    // Dibujando el acordion y los botones de los mapas ugs 25k
      var content = '<li class="content-list first">'+
                        '<label class="switch">'+
                            '<input type="checkbox" id="btnGeo25k_'+mapas25k[i].alias+'_'+i+'">'+
                            '<span class="slider round"></span>'+
                        '</label>'+
                        ' '+ mapas25k[i].name+
                        '<div class="slidecontainer">'+
                            '<input type="range" min="0" max="100" value="50" class="sliderb" id="transp_'+mapas25k[i].alias+'_'+i+'">'+
                            '<p>Transparencia: <span id="valTransp_'+mapas25k[i].alias+'_'+i+'"></span>%</p>'+
                        '</div>'+
                    '</li>';
    
    $("#lista_"+mapas25k[i].alias).append(content);
  
    var slider = $("#transp_"+mapas25k[i].alias+"_"+i)[0];
    var output = $("#valTransp_"+mapas25k[i].alias+"_"+i)[0];
    output.innerHTML = slider.value;
    slider.oninput = function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      var output = $("#valTransp_"+mapas25k[id].alias+"_"+id)[0];
      output.innerHTML = this.value;
      mapas25k[id].transp = (100 - parseInt(this.value)) / 100;
      if (mapas25k[id].capa != null && mapas25k[id].active == 1) {
        mapas25k[id].capa.setStyle({fillOpacity : mapas25k[id].transp});
      }
    } 
    
    $("#btnGeo25k_"+mapas25k[i].alias+"_"+i).click(function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      if (mapas25k[id].active == 0) {
        mapas25k[id].active = 1;
        mapas25k[id].CargarCapaMapa();
      } else if (mapas25k[id].active == 1) {
        mapas25k[id].active = 0;
        mapas25k[id].RemoverCapaMapa();
      }
    }); 
    
  }
}

// ---------> Insumos
// Declaración del objeto 'Capas'
function Capas(capa, curva, active, name, url) {
  this.capa = capa;
  this.curva = curva;
  this.active = active;
  this.name = name;
  this.url = url;
  this.CargarCapaPlanchas = CargarCapaPlanchas;
}
// Array con el nombre de las planchas topográficas 25K
var namePlanchas = [  
  '166IVC',
  '166IVD',
  '167IIID',
  '167IVC',
  '186IC',
  '186ID',
  '186IIA',
  '186IIB',
  '186IID',
  '186IIIA',
  '186IIIB',
  '186IIIC',
  '186IIID',
  '186IVA',
  '186IVB',
  '186IVC',
  '186IVD',
  '187IB',
  '187ID',
  '187IIA',
  '187IIC',
  '187IVA',
  '188IIIC',
  '188IIID',
  '205IIA',
  '205IIB',
  '205IIC',
  '205IID',
  '206IB',
  '206ID',
  '206IIA',
  '206IIC',
  '207IA',
  '207IB',
];
// Array con las curvas de nivel y drenajes dobles y sencillos de las planchas
var planchas = [
  new Capas(null,1,0,'Curvas166IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel166IVC/MapServer'),
  new Capas(null,0,0,'Drenajes166IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes166IVC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD166IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble166IVC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas166IVD','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel166IVD/MapServer'),
  new Capas(null,0,0,'Drenajes166IVD','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes166IVD/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD166IVD','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble166IVD/FeatureServer/0'),

  new Capas(null,1,0,'Curvas167IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel167IIID/MapServer'),
  new Capas(null,0,0,'Drenajes167IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes167IIID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD167IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble167IIID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas167IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel167IVC/MapServer'),
  new Capas(null,0,0,'Drenajes167IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes167IVC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD167IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble167IVC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IC/MapServer'),
  new Capas(null,0,0,'Drenajes186IC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186ID/MapServer'),
  new Capas(null,0,0,'Drenajes186ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186ID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186ID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IIA/MapServer'),
  new Capas(null,0,0,'Drenajes186IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IIA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IIA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IIB/MapServer'),
  new Capas(null,0,0,'Drenajes186IIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IIB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IIB/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IID/MapServer'),
  new Capas(null,0,0,'Drenajes186IID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IIIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IIIA/MapServer'),
  new Capas(null,0,0,'Drenajes186IIIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IIIA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IIIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IIIA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IIIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IIIB/MapServer'),
  new Capas(null,0,0,'Drenajes186IIIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IIIB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IIIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IIIB/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IIIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IIIC/MapServer'),
  new Capas(null,0,0,'Drenajes186IIIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IIIC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IIIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IIIC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IIID/MapServer'),
  new Capas(null,0,0,'Drenajes186IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IIID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IIID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IVA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IVA/MapServer'),
  new Capas(null,0,0,'Drenajes186IVA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IVA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IVA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IVB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IVB/MapServer'),
  new Capas(null,0,0,'Drenajes186IVB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IVB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IVB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IVB/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IVC/MapServer'),
  new Capas(null,0,0,'Drenajes186IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IVC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IVC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IVC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas186IVD','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel186IVD/MapServer'),
  new Capas(null,0,0,'Drenajes186IVD','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes186IVD/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD186IVD','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble186IVD/FeatureServer/0'),

  new Capas(null,1,0,'Curvas187IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel187IB/MapServer'),
  new Capas(null,0,0,'Drenajes187IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes187IB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD187IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble187IB/FeatureServer/0'),

  new Capas(null,1,0,'Curvas187ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel187ID/MapServer'),
  new Capas(null,0,0,'Drenajes187ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes187ID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD187ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble187ID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas187IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel187IIA/MapServer'),
  new Capas(null,0,0,'Drenajes187IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes187IIA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD187IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble187IIA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas187IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel187IIC/MapServer'),
  new Capas(null,0,0,'Drenajes187IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes187IIC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD187IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble187IIC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas187IVA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel187IVA/MapServer'),
  new Capas(null,0,0,'Drenajes187IVA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes187IVA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD187IVA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble187IVA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas188IIIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel188IIIC/MapServer'),
  new Capas(null,0,0,'Drenajes188IIIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes188IIIC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD188IIIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble188IIIC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas188IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel188IIID/MapServer'),
  new Capas(null,0,0,'Drenajes188IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes188IIID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD188IIID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble188IIID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas205IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel205IIA/MapServer'),
  new Capas(null,0,0,'Drenajes205IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes205IIA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD205IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble205IIA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas205IIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel205IIB/MapServer'),
  new Capas(null,0,0,'Drenajes205IIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes205IIB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD205IIB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble205IIB/FeatureServer/0'),

  new Capas(null,1,0,'Curvas205IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel205IIC/MapServer'),
  new Capas(null,0,0,'Drenajes205IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes205IIC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD205IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble205IIC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas205IID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel205IID/MapServer'),
  new Capas(null,0,0,'Drenajes205IID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes205IID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD205IID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble205IID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas206IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel206IB/MapServer'),
  new Capas(null,0,0,'Drenajes206IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes206IB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD206IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble206IB/FeatureServer/0'),

  new Capas(null,1,0,'Curvas206ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel206ID/MapServer'),
  new Capas(null,0,0,'Drenajes206ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes206ID/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD206ID','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble206ID/FeatureServer/0'),

  new Capas(null,1,0,'Curvas206IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel206IIA/MapServer'),
  new Capas(null,0,0,'Drenajes206IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes206IIA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD206IIA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble206IIA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas206IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel206IIC/MapServer'),
  new Capas(null,0,0,'Drenajes206IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes206IIC/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD206IIC','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble206IIC/FeatureServer/0'),

  new Capas(null,1,0,'Curvas207IA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel207IA/MapServer'),
  new Capas(null,0,0,'Drenajes207IA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes207IA/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD207IA','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble207IA/FeatureServer/0'),

  new Capas(null,1,0,'Curvas207IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Curvas_Nivel207IB/MapServer'),
  new Capas(null,0,0,'Drenajes207IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenajes207IB/FeatureServer/0'),
  new Capas(null,0,0,'DrenajesD207IB','https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Drenaje_Doble207IB/FeatureServer/0'),
];
// Array con las capas de la Información Secundaria
var infoSec = [
  new Mapa(null,'Aguadas','Catálogo SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Catalogo_SIMMA_Aguadas/FeatureServer/0'),
  new Mapa(null,'Aguadas','Inventario SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Inventario_SIMMA_Aguadas/FeatureServer/5'),   
  new Mapa(null,'Aguadas','CORPOCALDAS',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Corpocaldas_Aguadas/FeatureServer/1'),
  new Mapa(null,'Aguadas','Deslizamientos',3,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Deslizamientos_Aguadas/FeatureServer/2'),
  new Mapa(null,'Aguadas','Eventos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Eventos_Aguadas/FeatureServer/3'),   
  new Mapa(null,'Aguadas','Eventos (Polígonos)',3,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Eventos_POMCA_Rio_Arma__Aguadas/FeatureServer/4'),   
  new Mapa(null,'Aguadas','Procesos Erosivos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Puntos_Aguadas/FeatureServer/7'),   
  new Mapa(null,'Aguadas','Procesos Erosivos (Líneas)',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Lineas_Aguadas/FeatureServer/8'),   
  new Mapa(null,'Aguadas','Procesos Morfodinámicos (Líneas)',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Aguadas/FeatureServer/6'),   
  new Mapa(null,'Aguadas','Procesos Morfodinámicos (Polígonos)',3,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Morfodinamicos_Aguadas/FeatureServer/9'),   
  
  new Mapa(null,'Aranzazu','Catálogo SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Catalogo_SIMMA_Aranzazu/FeatureServer/0'),   
  new Mapa(null,'Aranzazu','Inventario SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Inventario_SIMMA_Aranzazu/FeatureServer/3'),   
  new Mapa(null,'Aranzazu','CORPOCALDAS',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Corpocaldas_Aranzazu/FeatureServer/1'),   
  new Mapa(null,'Aranzazu','Eventos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Eventos_PT_Aranzazu/FeatureServer/2'),   
  new Mapa(null,'Aranzazu','Movimientos en Masa',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/MM_Aranzazu/FeatureServer/4'),   
  new Mapa(null,'Aranzazu','Procesos Erosivos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Puntos_Aranzazu/FeatureServer/7'),   
  new Mapa(null,'Aranzazu','Procesos Erosivos (Líneas)',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Lineas_Aranzazu/FeatureServer/8'),   
  new Mapa(null,'Aranzazu','Procesos Morfodinámicos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Puntos_Aranzazu/FeatureServer/5'),   
  new Mapa(null,'Aranzazu','Procesos Morfodinámicos (Polígonos)',3,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Poly_Aranzazu/FeatureServer/6'),   
  
  new Mapa(null,'Filadelfia','Catálogo SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Catalogo_SIMMA_Filadelfia/FeatureServer/0'),   
  new Mapa(null,'Filadelfia','Inventario SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Inventario_SIMMA_Filadelfia/FeatureServer/2'),   
  new Mapa(null,'Filadelfia','CORPOCALDAS',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Corpocaldas_Filadelfia/FeatureServer/1'),   
  new Mapa(null,'Filadelfia','Movimientos en Masa',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/MM_Filadelfia/FeatureServer/3'),   
  new Mapa(null,'Filadelfia','Procesos Erosivos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Puntos_Filadelfia/FeatureServer/5'),   
  new Mapa(null,'Filadelfia','Procesos Morfodinámicos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Puntos_Filadelfia/FeatureServer/4'),   
  
  new Mapa(null,'Marquetalia','Catálogo SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Catalogo_SIMMA_Marquetalia/FeatureServer/0'),   
  new Mapa(null,'Marquetalia','Inventario SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Inventario_SIMMA_Marquetalia/FeatureServer/3'),   
  new Mapa(null,'Marquetalia','CORPOCALDAS',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Corpocaldas_Marquetalia/FeatureServer/1'),   
  new Mapa(null,'Marquetalia','Eventos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Eventos_Marquetalia/FeatureServer/2'),   
  new Mapa(null,'Marquetalia','Procesos Erosivos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Marquetalia/FeatureServer/6'),   
  new Mapa(null,'Marquetalia','Procesos Reptación',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Reptacion_Marquetalia/FeatureServer/7'),   
  new Mapa(null,'Marquetalia','Procesos Morfodinámicos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Proceso_Puntos_Marquetalia/FeatureServer/5'),   
  new Mapa(null,'Marquetalia','Procesos Morfodinámicos (Polígonos)',3,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Poly_Marquetalia/FeatureServer/4'),   

  new Mapa(null,'Riosucio','Catálogo SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Catalogo_SIMMA_Riosucio/FeatureServer/0'),   
  new Mapa(null,'Riosucio','Inventario SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Inventario_SIMMA_Riosucio/FeatureServer/4'),   
  new Mapa(null,'Riosucio','CORPOCALDAS',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Corpocaldas_Riosucio/FeatureServer/2'),   
  new Mapa(null,'Riosucio','Deslizamientos Activos',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Centroides_Deslizamientos_Activos_Riosucio/FeatureServer/1'),   
  new Mapa(null,'Riosucio','Eventos (Puntos)',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Eventos_Puntos_Riosucio/FeatureServer/3'),   
  new Mapa(null,'Riosucio','Procesos Erosivos (Líneas)',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Erosivos_Riosucio/FeatureServer/6'),   
  new Mapa(null,'Riosucio','Procesos Morfodinámicos (Líneas)',2,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Procesos_Lineas_Riosucio/FeatureServer/5'),   

  new Mapa(null,'Supía','Catálogo SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Catalogo_SIMMA_Supia/FeatureServer/0'),   
  new Mapa(null,'Supía','Inventario SIMMA',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Inventario_SIMMA_Supia/FeatureServer/4'),   
  new Mapa(null,'Supía','CORPOCALDAS',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Corpocaldas_Supia/FeatureServer/1'),   
  new Mapa(null,'Supía','Deslizamientos Activos',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Deslizamientos_Activos_Supia/FeatureServer/2'),   
  new Mapa(null,'Supía','Movimientos en Masa',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/MM_Supia/FeatureServer/3'),   
  new Mapa(null,'Supía','Puntos de Verificación Rurales',1,0,0, 'https://services7.arcgis.com/gTVMpnerZFjZtXQb/arcgis/rest/services/Puntos_Verificacion_Rurales_Supia/FeatureServer/5'),   
];
// Array com las grillas de las planchas 25k
var insumosGenerales = [
  // new Mapa(null,'municipios','Municipios Zona de Estudio',1,0,0.5, municipio),
  new Mapa(null,'umi','Unidad Morfodinámica Independiente',1,0,0.5, umi),
  new Mapa(null,'dagran','Área de Influencia DAGRAN',1,0,0.5, cuencaDAGRAN),
  new Mapa(null,'cuerposAgua','Cuerpos de Agua',1,0,0.5, cuerposAgua),
  new Mapa(null,'casas','Casas',1,0,0.5, casas),

];
var insumosImagenes = [
  new Mapa(null,'planetscope','Planet_201512_201605',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Planet_201512_201605_mosaico_tif/MapServer'),
  new Mapa(null,'planetscope','Planet_201705_201711',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Planet_201706_201711_mosaico_tif/MapServer'),
  new Mapa(null,'planetscope','Planet_202006_202008',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Planet_202006_202008_mosaico_tif/MapServer'),
];
var morfometrias = [
  new Mapa(null,'hillAlos','Hillshade - ALOS PALSAR',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/HILL_ALOS1/MapServer'),
  new Mapa(null,'hillTopo','Hillshade - Curvas de Nivel',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/HILL_TOPO_tif/MapServer'),
  new Mapa(null,'slope','Pendientes',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Pendiente/MapServer'),
];
// Función para dibujar los botones y acordiones de los insumos
function CargarInsumos() {

  // Cargando las Curvas de nivel y Drenajes dobles y sencillos de las planchas 25K de la Zona de Estudio
  // for (let i = 0; i < namePlanchas.length; i++) {
    
  //   var content = '<li>'+
  //                   '<button type="button" class="collapsible coll_plancha">Plancha '+ namePlanchas[i] +'</button>'+
  //                     '<div class="content">'+
  //                       '<ul>';
  //   var aux = 3 * i;
  //   for (let j = 0; j < 3; j++) {
  //     var capa = planchas[j+aux];
  //     content += '<li class="content-list first">'+
  //                   '<div class="group_plancha">'+
  //                       '<label class="switch">'+
  //                           '<input type="checkbox" id="btn_'+capa.name+'">'+
  //                           '<span class="slider round"></span>'+
  //                       '</label>';
  //     if (j==0) {
  //       content += '<a class="a_plancha">Curvas de Nivel</a>';
  //     }else{
  //       if (j==1) {
  //         content += '<a class="a_plancha">Drenajes</a>';
  //       }else{
  //         content += '<a class="a_plancha">Drenajes Dobles</a>';
  //       }
  //     }
  //     content +=  '</div>'+
  //               '</li>'
  //   }
  //   content +=    '</ul>'+
  //               '</div>'+
  //             '</li>';
  //   $("#lista_insumos").append(content);
    
  // }
  // for (let i = 0; i < planchas.length; i++) {
  //   $("#btn_"+planchas[i].name).click(function () {
  //     if (planchas[i].active == 0) {
  //       planchas[i].active = 1;
  //       planchas[i].CargarCapaPlanchas();
  //     } else if (planchas[i].active == 1) {
  //       planchas[i].active = 0;
  //       map.removeLayer(planchas[i].capa);
  //     }
  //   }); 
  // }

  // Cargando las capas de la Información Secundaria
  // for (let i = 0; i < infoSec.length; i++) {

  //   var content = '<li class="content-list first">'+
  //                   '<div class="group_plancha">'+
  //                       '<label class="switch">'+
  //                           '<input type="checkbox" id="btn_infoSec_'+i+'">'+
  //                           '<span class="slider round"></span>'+
  //                       '</label>'+
  //                       '<a class="a_plancha">'+infoSec[i].name+'</a>'
  //                   '</div>'+
  //                 '</li>'
    
  //   $("#lista_infoSec_"+infoSec[i].alias).append(content);
    
  //   $("#btn_infoSec_"+i).click(function () {
  //     var id = parseInt($(this).attr('id').split('_')[2]);
  //     if (infoSec[id].active == 0) {
  //       infoSec[id].active = 2;
  //       infoSec[id].CargarCapaInfoSec();
  //     } else if (infoSec[id].active == 1) {
  //       infoSec[id].active = 2;
  //       infoSec[id].capa.addTo(map);
  //     } else if (infoSec[id].active == 2) {
  //       infoSec[id].active = 1;
  //       map.removeLayer(infoSec[id].capa);
  //     }
  //   }); 
  // }

  // Cargando Insumos generales
  for (let i = 0; i < insumosGenerales.length; i++) {
    
    if (insumosGenerales[i].aux == 4) {
      insumosGenerales[i].capa = L.esri.basemapLayer('ImageryLabels');
      $("#lista_generales").append(
        '<li class="content-list first">'+
          '<label class="switch">'+
              '<input type="checkbox" id="btn_'+insumosGenerales[i].alias +'_'+i+'">'+
              '<span class="slider round"></span>'+
          '</label>'+
          ' '+insumosGenerales[i].name+
        '</li>'
      );
    } else{
      if (insumosGenerales[i].aux == 2) {
        insumosGenerales[i].capa = L.esri.tiledMapLayer({
          url: insumosGenerales[i].url
        });
        
        $("#lista_generales").append(
          '<li class="content-list first">'+
            '<label class="switch">'+
                '<input type="checkbox" id="btn_'+insumosGenerales[i].alias +'_'+i+'">'+
                '<span class="slider round"></span>'+
            '</label>'+
            ' '+insumosGenerales[i].name+
          '</li>'
        );
      }
      else if(insumosGenerales[i].aux == 3){
        insumosGenerales[i].capa = L.esri.featureLayer({
          url: insumosGenerales[i].url,
        }).bindPopup(function (layer) {
          // console.log(layer.feature.properties);
          if(insumosGenerales[i].name=='Lineamientos 25K'){
            return L.Util.template('<p><strong>Código</strong>: {Codigo}.<br>'+ 
                                  '<strong>Nombre</strong>: '+ layer.feature.properties.NombreLineamiento + '.<br>'+ 
                                  '<strong>Comentarios</strong>: '+ layer.feature.properties.Comentarios +'.<br>', layer.feature.properties);
          }else if(insumosGenerales[i].name=='Pliegues'){
            return L.Util.template('<p><strong>Código</strong>: {Codigo}.<br>'+ 
                                    '<strong>Tipo</strong>: '+ ( (layer.feature.properties.Tipo == '3')? 'Anticlinal Inferido' : (layer.feature.properties.Tipo == '73') ? 'Sinclinal' : (layer.feature.properties.Tipo == '75') ? 'Sinclinal Inferido' : '' ) +'.<br>', layer.feature.properties);
          }
          
          
        });

        // Dibujando el acordion y los botones de los mapas ugs 25k
        var content = '<li class="content-list first">'+
            '<label class="switch">'+
                '<input type="checkbox" id="btnGeo25k_'+insumosGenerales[i].alias+'_'+i+'">'+
                '<span class="slider round"></span>'+
            '</label>'+
            ' '+ insumosGenerales[i].name+
            '<div class="slidecontainer">'+
                '<input type="range" min="0" max="100" value="50" class="sliderb" id="transp_'+insumosGenerales[i].alias+'_'+i+'">'+
                '<p>Transparencia: <span id="valTransp_'+insumosGenerales[i].alias+'_'+i+'"></span>%</p>'+
            '</div>'+
        '</li>';

        $("#lista_generales").append(content);

          var slider = $("#transp_"+insumosGenerales[i].alias+"_"+i)[0];
          var output = $("#valTransp_"+insumosGenerales[i].alias+"_"+i)[0];
          output.innerHTML = slider.value;
          slider.oninput = function () {
          var id = parseInt($(this).attr('id').split('_')[2]);
          var output = $("#valTransp_"+insumosGenerales[id].alias+"_"+id)[0];
          output.innerHTML = this.value;
          insumosGenerales[id].transp = (100 - parseInt(this.value)) / 100;
          if (insumosGenerales[id].capa != null && insumosGenerales[id].active == 1) {
            insumosGenerales[id].capa.setStyle({fillOpacity : insumosGenerales[id].transp});
          }
        } 

        $("#btnGeo25k_"+insumosGenerales[i].alias+"_"+i).click(function () {
          var id = parseInt($(this).attr('id').split('_')[2]);
          if (insumosGenerales[id].active == 0) {
            insumosGenerales[id].active = 1;
            insumosGenerales[id].CargarCapaMapa();
          } else if (insumosGenerales[id].active == 1) {
            insumosGenerales[id].active = 0;
            insumosGenerales[id].RemoverCapaMapa();
          }
        }); 
      }
      else{
        var text;
        var propiedad;
        var color;
        var weight;
        if (insumosGenerales[i].name == 'Casas') {
          text ='Casas: ';
          propiedad ='Nombre';
          color = '#ffffff';
          weight = 3;
        } else if (insumosGenerales[i].name == 'Unidad Morfodinámica Independiente') {
          text ='Zona de Estudio: ';
          propiedad ='Nombre';
          color = '#bb0221';
          weight = 3;
        } else if (insumosGenerales[i].name == 'Cuerpos de Agua') {
          text ='Zona de Estudio: ';
          propiedad ='Nombre';
          color = '#36a7e9';
          weight = 3;
        } else if (insumosGenerales[i].name == 'Área de Influencia DAGRAN') {
          text ='Zona de Estudio: ';
          propiedad ='Nombre';
          color = '#50a000';
          weight = 3;
        }
  
        insumosGenerales[i].capa = new L.geoJson(insumosGenerales[i].url, {
          snapIgnore: true,
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                if(insumosGenerales[i].name == 'Zona de Estudio'){
                  return k + ": " + feature.properties[k];
                }
                else{
                  if( k == "description" ){
                    return feature.properties["description"];
                  }
                }
              })
              .join(""), {
                maxHeight: 200
              }
              );
            }
          }
        }).setStyle({color: color, weight: weight}); 

        $("#lista_generales").append(
          '<li class="content-list first">'+
            '<label class="switch">'+
                '<input type="checkbox" id="btn_'+insumosGenerales[i].alias +'_'+i+'">'+
                '<span class="slider round"></span>'+
            '</label>'+
            ' '+insumosGenerales[i].name+
            '<div class="slidecontainer">'+
                '<input type="range" min="0" max="100" value="50" class="sliderb" id="transp_'+insumosGenerales[i].alias+'_'+i+'">'+
                '<p>Transparencia: <span id="valTransp_'+insumosGenerales[i].alias+'_'+i+'"></span>%</p>'+
            '</div>'+
          '</li>'
        );
      
        var slider = $("#transp_"+insumosGenerales[i].alias+'_'+i)[0];
        var output = $("#valTransp_"+insumosGenerales[i].alias+'_'+i)[0];
        output.innerHTML = slider.value;
        slider.oninput = function () {
          var id = parseInt($(this).attr('id').split('_')[2]);
          var output = $("#valTransp_"+insumosGenerales[id].alias+"_"+id)[0];
          output.innerHTML = this.value;
          insumosGenerales[id].transp = (100 - parseInt(this.value)) / 100;
          if (insumosGenerales[id].capa != null && insumosGenerales[id].active == 1) {
              insumosGenerales[id].capa.setStyle({opacity : insumosGenerales[id].transp});
          }
        }
      }
    }
    $("#btn_"+insumosGenerales[i].alias+'_'+i).click(function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      if (insumosGenerales[id].active == 0) {
        insumosGenerales[id].active = 1;
        if(insumosGenerales[id].aux == 1){
          insumosGenerales[id].CargarCapaMapa();
        } else{
          insumosGenerales[id].capa.addTo(map);
        }
      } else if (insumosGenerales[id].active == 1) {
        insumosGenerales[id].active = 0;
        insumosGenerales[id].RemoverCapaMapa();
      }
    });

  }
  
   // Cargando Morfometrias
  // for (let i = 0; i < morfometrias.length; i++) {
    
  //   if (morfometrias[i].aux == 2) {
  //     morfometrias[i].capa = L.esri.tiledMapLayer({
  //       url: morfometrias[i].url
  //     });
      
  //     $("#lista_morfos").append(
  //       '<li class="content-list first">'+
  //         '<label class="switch">'+
  //             '<input type="checkbox" id="btn_'+morfometrias[i].alias +'_'+i+'">'+
  //             '<span class="slider round"></span>'+
  //         '</label>'+
  //         ' '+morfometrias[i].name+
  //       '</li>'
  //     );
  //   }
    
  //   $("#btn_"+morfometrias[i].alias+'_'+i).click(function () {
  //     var id = parseInt($(this).attr('id').split('_')[2]);
  //     if (morfometrias[id].active == 0) {
  //       morfometrias[id].active = 1;
  //       if(morfometrias[id].aux == 1){
  //         morfometrias[id].CargarCapaMapa();
  //       } else{
  //         morfometrias[id].capa.addTo(map);
  //       }
  //     } else if (morfometrias[id].active == 1) {
  //       morfometrias[id].active = 0;
  //       morfometrias[id].RemoverCapaMapa();
  //     }
  //   });

  // }

  // Cargando Morfometrias
  // for (let i = 0; i < insumosImagenes.length; i++) {
    
  //   if (insumosImagenes[i].aux == 2) {
  //     insumosImagenes[i].capa = L.esri.tiledMapLayer({
  //       url: insumosImagenes[i].url
  //     });
      
  //     $("#lista_imagenes").append(
  //       '<li class="content-list first">'+
  //         '<label class="switch">'+
  //             '<input type="checkbox" id="btn_'+insumosImagenes[i].alias +'_'+i+'">'+
  //             '<span class="slider round"></span>'+
  //         '</label>'+
  //         ' '+insumosImagenes[i].name+
  //       '</li>'
  //     );
  //   }
    
  //   $("#btn_"+insumosImagenes[i].alias+'_'+i).click(function () {
  //     var id = parseInt($(this).attr('id').split('_')[2]);
  //     if (insumosImagenes[id].active == 0) {
  //       insumosImagenes[id].active = 1;
  //       if(insumosImagenes[id].aux == 1){
  //         insumosImagenes[id].CargarCapaMapa();
  //       } else{
  //         insumosImagenes[id].capa.addTo(map);
  //       }
  //     } else if (insumosImagenes[id].active == 1) {
  //       insumosImagenes[id].active = 0;
  //       insumosImagenes[id].RemoverCapaMapa();
  //     }
  //   });

  // }

  Acordiones();
}
// Funciones para cargar las capas de los insumos
function CargarCapaPlanchas() {
    if (this.curva == 1) {
      this.capa = L.esri.tiledMapLayer({
        url: this.url
      }).addTo(map);
    }else{
      this.capa = L.esri.featureLayer({
        url: this.url,
        simplifyFactor: 1,
        precision: 5,
        // style: {color: $('#cp_' + this.name).colorpicker('getValue')}
      }).bindPopup(function (layer) {
        return L.Util.template('<p><strong>Nombre:</strong> {NOMBRE_GEO}.<br>', layer.feature.properties);
      }).addTo(map);
    }
    // this.capa.on('mouseout', function (e) {
    //   document.getElementById('info-pane').innerHTML = 'Hover to Inspect';
    // });
    this.capa.on('mouseover', function (e) {
      //alert(e.layer.feature.properties.ALTURA_SOB);
    });

}
function CargarCapaInfoSec() {
    
    this.capa = L.esri.Cluster.featureLayer({
      url: this.url, 
      onEachFeature: function(feature, layer) {
        if (feature.properties) {
          layer.bindPopup(Object.keys(feature.properties).map(function(k) {
            return k + ": " + feature.properties[k];
          }).join("<br />"), {
            maxHeight: 200
          });
        }
      }
    }).addTo(map);

}

// ---------> Mapas
// Declaración del objeto 'Mapa'
function Mapa(capa, alias, name, aux, active, transp, url) {
  this.capa = capa;
  this.alias = alias;
  this.name = name;
  this.aux = aux;
  this.active = active;
  this.transp = transp;
  this.url = url;
  this.CargarCapaMapa = CargarCapaMapa;
  this.RemoverCapaMapa = RemoverCapaMapa;
  this.CargarCapaInfoSec = CargarCapaInfoSec;
}
// Variables y Array de los Mapas
var atlasGeoWMS;
var mapasGenerales =[
  // new Mapa(null,'UGS100K','Mapa UGS 100K de la Zona',0,0,0.5,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/UGS_Unificado100k/FeatureServer/0'),
  // new Mapa(null,'Macrou','Mapa de Macrounidades Geomorfológicas',0,0,0.5,'https://services3.arcgis.com/wdDpgpE04Gj1AYXe/arcgis/rest/services/Macrounidades/FeatureServer/0'),
  new Mapa(null,'Geocol','Mapa Geológico de Colombia',0,0,0.5,null),
  new Mapa(null,'Fallas','Mapa de Fallas Regionales',0,0,0.5,null),
];

// Función para Mostrar los Mapas
function CargarCapaMapa() {
  this.capa.addTo(map);
  if (this.name == 'Mapa Geológico de Colombia' || this.name == 'Mapa de Fallas Regionales') {
    this.capa.setOpacity(this.transp);
  } else {
    this.capa.setStyle({fillOpacity : this.transp});
  }
}
// Función para Remover los Mapas
function RemoverCapaMapa() {
  map.removeLayer(this.capa);
}
// Función para Dibujar botones y Cargar los Mapas además establecer la Opacidad
function CargarMapas() {
  // Cargando las Capas del Mapa Geológico Colombiano
  var MySource = L.WMS.Source.extend({
    'showFeatureInfo': function (latlng, info) {
      if (!this._map) {
        return;
      }
      var esto = info.split("\n").join("");
      esto = esto.split("</th>").join("");
      esto = esto.split("<tr>").join("");
      esto = esto.split("</tr>").join("");
      esto = esto.split("</td>").join("");
      var separadores = ['<th>', '<td>'];
      var array = esto.split(new RegExp(separadores.join('|'), 'g'));
      var mensaje = "Vacio";
      var y = latlng + "";
      y = y.replace("LatLng", "");
      y = y.replace("(", "");
      y = y.replace(")", "");
      if (array.length == 1) {
        mensaje = "<b>Latitud y Longitud:</b> [" + y + "] ";
      }

      if (array.length == 21) {
        mensaje = "<b><big>Unidad Cronoestratigráfica</big></b> <br>" +
          "<b>Símbolo: </b>" + array[13] + "<br>" +
          "<b>Litología: </b>" + array[14] + "<br>" +
          "<b>Edad: </b>" + array[15] + "<br>";
        if (array[16].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[16] + "<br>";
        }
        if (array[17].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[17] + "<br>";
        }
        mensaje = mensaje + "<b>Latitud y Longitud:</b> [" + y + "] ";
      }

      if (array.length == 15) {
        if (array[4].length == 16) {
          mensaje = "<b><big>Falla</big></b> <br>" +
            "<b>Tipo: </b>" + array[10] + "<br>";
        }
        if (array[11].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[11] + "<br>";
        }
        if (array[12].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[12] + "<br>";
        }
      }

      if (array.length == 35) {
        mensaje = "<b><big>Unidad Cronoestratigráfica</big></b> <br>" +
          "<b>Símbolo: </b>" + array[13] + "<br>" +
          "<b>Litología: </b>" + array[14] + "<br>" +
          "<b>Edad: </b>" + array[15] + "<br>";
        if (array[16].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[16] + "<br>";
        }
        if (array[17].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[17] + "<br>";
        }
        mensaje = mensaje + "<b>Latitud y Longitud:</b> [" + y + "] <br>";

        if (array[24].length == 16) {
          mensaje = mensaje + "<b><big>Falla</big></b> <br>" +
            "<b>Tipo: </b>" + array[30] + "<br>";
        }
        if (array[31].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[31] + "<br>";
        }
        if (array[32].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[32] + "<br>";
        }
      }

      this._map.openPopup(mensaje, latlng);

    }
  });
  atlasGeoWMS = new MySource("https://srvags.sgc.gov.co/arcgis/services/Atlas_Geologico_2015/Atlas_Geologico_Colombiano_2015/MapServer/WMSServer?", {
    opacity: 0.5,
    format: 'image/png',
    transparent: true,
    version: '1.3.0', //wms version (ver get capabilities)
    info_format: "text/html",
    attribution: "Servicio Geológico Colombiano"
  });
  
  for (let i = 0; i < mapasGenerales.length; i++) {
    if (mapasGenerales[i].name == 'Mapa Geológico de Colombia') {
      mapasGenerales[i].capa = atlasGeoWMS.getLayer("0");
    } else if (mapasGenerales[i].name == 'Mapa de Fallas Regionales') {
      mapasGenerales[i].capa = atlasGeoWMS.getLayer("2");
    } else {
      mapasGenerales[i].capa = L.esri.featureLayer({
        url: mapasGenerales[i].url,
      }).bindPopup(function (layer) {
        if (mapasGenerales[i].name == 'Mapa UGS 100K de la Zona') {
          return L.Util.template('<p><strong>'+layer.feature.properties.Código+'</strong>: {Unidad}.<br>'+ 
                                    '<strong>Litología</strong>: '+layer.feature.properties.Litología+'.<br>'+
                                    '<strong>Textura-Fábrica</strong>: {TextFabric}.<br>'+
                                    '<strong>Resistencia</strong>: {Resistenci}.<br>', layer.feature.properties);
        }else if(mapasGenerales[i].name == 'Mapa de Macrounidades Geomorfológicas'){
          return L.Util.template('<p><strong>Relieve</strong>: {Relieve}.<br>'+ 
                                  '<strong>Macrounidad</strong>: {Macrounida}.<br>', layer.feature.properties);
        }
      });
    }

    $("#ul_mapas").append(
      '<li class="content-list first">'+
        '<label class="switch">'+
            '<input type="checkbox" id="btn_'+mapasGenerales[i].alias +'_'+i+'">'+
            '<span class="slider round"></span>'+
        '</label>'+
        ' '+mapasGenerales[i].name+
        '<div class="slidecontainer">'+
            '<input type="range" min="0" max="100" value="50" class="sliderb" id="transp_'+mapasGenerales[i].alias+'_'+i+'">'+
            '<p>Transparencia: <span id="valTransp_'+mapasGenerales[i].alias+'_'+i+'"></span>%</p>'+
        '</div>'+
      '</li>'
    );

    var slider = $("#transp_"+mapasGenerales[i].alias+'_'+i)[0];
    var output = $("#valTransp_"+mapasGenerales[i].alias+'_'+i)[0];
    output.innerHTML = slider.value;
    slider.oninput = function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      var output = $("#valTransp_"+mapasGenerales[id].alias+"_"+id)[0];
      output.innerHTML = this.value;
      mapasGenerales[id].transp = (100 - parseInt(this.value)) / 100;
      if (mapasGenerales[id].capa != null && mapasGenerales[id].active == 1) {
        if (mapasGenerales[id].name == 'Mapa Geológico de Colombia' || mapasGenerales[id].name == 'Mapa de Fallas Regionales') {
          mapasGenerales[id].capa.setOpacity(mapasGenerales[id].transp);
        } else {
          mapasGenerales[id].capa.setStyle({fillOpacity : mapasGenerales[id].transp});
        }
      }
    }
    $("#btn_"+mapasGenerales[i].alias+'_'+i).click(function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      if (mapasGenerales[id].active == 0) {
        mapasGenerales[id].active = 1;
        mapasGenerales[id].CargarCapaMapa();
      } else if (mapasGenerales[id].active == 1) {
        mapasGenerales[id].active = 0;
        mapasGenerales[id].RemoverCapaMapa();
      }
    });
  }  
}

// ................................Función PPAL

$(document).ready(function () {

  //------> Cargando Entidad Mapa (Leaflet)
  map = L.map('map', {preferCanvas: true}).setView([5.64, -75.633], 13);
  // Añadiendo carreteras al mapa base
  // mapaBaseLabels1 = L.esri.basemapLayer('ImageryTransportation');
  // map.addLayer(mapaBaseLabels1);
  markerCentrid.addTo(map)
    
  //------> Cargando dos de los Mapa Base
  // Cargando el OSM
  openStreet = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  });
  // Cargando el Google Maps
  google = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'Google',
            maxZoom: 21
  });
  // Estableciendo como mapa base el Google Maps
  setBasemap("Google");

  //------> Cargando Controladores de las Herramientas del Visor
  // Cargando la Escala
  CargarEscala();
  // Cargando la Herramienta de Regla
  CargarRegla();
  // Cargando los Logos
  CargarLogos();
  // Cargando la Herramienta de Dibujo
  CargarDraw();
  // Cargando la Barra de Busqueda
  CargarSearch();
  // Cargando Herramienta de Estilos
  CargarStyles();

  //------> Cargando los Datos, Municipio,Insumos y Mapas del Área de Estudio
  // Cargando los Botones de los Datos del Visor
  CargarDatos();
  // Cargando los Municipios con sus insumos y mapas
  // CargarMunicipios();
  // Cargando Insumos
  CargarInsumos();
  // Cargando Mapas
  CargarMapas();
  // Cargando Botón Split
  CargarBtnSplit();

  CargarLocation();
  // Acordiones()
  // Mostrando los municipios de la zona de estudio

  insumosGenerales[0].capa.addTo(map);
  insumosGenerales[0].active = 1;
  $("#btn_umi_0").prop("checked", true);
  // insumosGenerales[2].capa.addTo(map);
  // insumosGenerales[2].active = 1;
  // $("#btn_hillAlos_2").prop("checked", true);
  


});
 

// ................................Funciones para Cargar los Controladores de las Herramientas del Visor

// Escala
function CargarEscala() {
  L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft'
  }).addTo(map);
}

// Regla
function CargarRegla() {
  var options = {
    position: 'topleft',         // Leaflet control position option
    circleMarker: {               // Leaflet circle marker options for points used in this plugin
      color: 'red',
      radius: 2
    },
    lineStyle: {                  // Leaflet polyline options for lines used in this plugin
      color: 'red',
      dashArray: '1,6'
    },
    lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
      display: 'meters',              // This is the display value will be shown on the screen. Example: 'meters'
      decimal: 2,                 // Distance result will be fixed to this value. 
      factor: 1000,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
      label: 'Distancia:'           
    },
    angleUnit: {
      display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
      decimal: 2,                 // Bearing result will be fixed to this value.
      factor: null,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
      label: 'Azimut:'
    }
  };
  L.control.ruler(options).addTo(map);
}

// Logos
function CargarLogos() {
  for (let i = 0; i < 1; i++) {

    var url;
    var position;
    var width;
    if(i == 0){
      url = '../images/LOGO_FINAL_V2.png';
      position = 'bottomleft';
      width = '75px';
    }else if(i == 1){
      url = '../images/logo_SGC_blanco.png';
      position = 'bottomright';
      width = '150px';
    }
    L.control.Watermark = L.Control.extend({
      onAdd:function(map){
        var img = L.DomUtil.create('img');
        img.src = url;
        img.style.width = width;
        return img;
      },
      onRemove:function(map){},
    });
    L.control.watermark = function(opts){
      return new L.control.Watermark(opts);
    };
    L.control.watermark({position: position}).addTo(map);
  }
}

// Dibujo
function CargarDraw() {
  var drawnPolygons = L.featureGroup().addTo(map);
  var drawnLines = L.featureGroup().addTo(map);
  var polygons = [];
  drawnItems = L.featureGroup().addTo(map);
  map.pm.setLang('es');
  map.on('pm:create', function (e) {
    // console.log('create primero');
    if (!cutMode) {
      var layer = e.layer;
      var geojson = layer.toGeoJSON();

      console.log(turf.getCoord(turf.centroid(geojson)));
      
      
      var geom = turf.getGeom(geojson);
      if (geom.type == 'Polygon') {
        polygons.push(geom);
        drawnPolygons.addLayer(layer);
      }else{
        drawnItems.addLayer(layer);
      }
      layer.on('click', EditNew);
    } else{
      var layer = e.layer;
      var geojson = layer.toGeoJSON();
      var geom = turf.getGeom(geojson);
      if (geom.type == 'Polygon') {
        polygons.push(geom);
        drawnPolygons.addLayer(layer);
      } else if (geom.type == 'LineString') {
        var line = geom;
        drawnLines.addLayer(layer).on('click', EditNew);
        drawnPolygons.clearLayers();
        var newPolygons = [];
        polygons.forEach(function(polygon, index) {
          var cutDone = false;
          var layer;
          var upperCut = cutPolygon(polygon, line, 1, 'upper');
          var lowerCut = cutPolygon(polygon, line, -1, 'lower');
          if ((upperCut != null) && (lowerCut != null)) {
            cutMode = false;
            drawnLines.clearLayers();
            layer = L.geoJSON(upperCut, {
              style: function(feature) {
                return {
                  color: 'red'
                };
              }
            }).addTo(drawnPolygons).on('click', EditNew);
            layer = L.geoJSON(lowerCut, {
              style: function(feature) {
                return {
                  color: '#3388ff'
                };
              }
            }).addTo(drawnPolygons).on('click', EditNew);
            cutDone = true;
          }
          if (cutDone) {
            newPolygons.push(upperCut.geometry);
            newPolygons.push(lowerCut.geometry);
          } else {
            drawnLines.clearLayers();
            newPolygons.push(polygon);
            layer = L.geoJSON(polygon, {
              style: function(feature) {
                return {
                  color: '#3388ff'
                };
              }
            }).addTo(drawnPolygons).on('click', EditNew);
          }
        });
        polygons = newPolygons;
      }
    }
  });
  map.on('pm:drawstart', (e) => {
    editMode = true;
  });
  map.on('pm:drawend', (e) => {
    editMode = false;
    cutMode = false;
    // console.log('end primero');
  });
  map.pm.addControls({
    position: 'topright',
    drawMarker: true,
    drawPolyline: true,
    drawRectangle: false,
    drawPolygon: true,
    drawCircle: false,
    drawCircleMarker: false,
    editMode: false,
    dragMode:true,
    cutPolygon:false,
    removalMode: false,
    rotateMode: false
  });
}

// Barra de Busqueda
function CargarSearch() {
  searchCtrl = L.control.fuseSearch()
  searchCtrl.addTo(map);
  $(".leaflet-fusesearch-control a").append('<i class="icon_search fas fa-search-location"></i>');
  $(".leaflet-fusesearch-panel").height($(window).height()-$("header").height()-20);  
  $(window).resize(function () { 
    $(".leaflet-fusesearch-panel").height($(window).height()-$("header").height()-20);
  });
}

// Estilos
function CargarStyles() {
  var styleEditor = L.control.styleEditor({
    openOnLeafletDraw: true,
    showTooltip: false,
    position: 'topright',
    useGrouping: false
  });
  map.addControl(styleEditor);
}

//Location
function CargarLocation(){
  map.addControl(L.control.locate({
    locateOptions: {
            enableHighAccuracy: true,
            maxZoom: 18,
            position: 'topleft',
            flyTo: true,
            showCompass: true,
            strings: {
              title: "Localización",
              metersUnit: "metros",
              feetUnit: "feet",
              popup: "Tu estás aproximadamente a {distance} {unit} al rededor de este punto: [lat: "+latLoctaion+', lng: '+lngLoctaion+']',
              outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
            }
  }})).on('locationfound', function(e){
        latLoctaion = e.latitude;
        lngLoctaion = e.longitude; 
        console.log(latLoctaion, lngLoctaion);
        
      })
      .on('locationerror', function(e){
        console.log(e);
        alert("Location access denied.");
      });

      $(".leaflet-control-locate-location-arrow").append('<i class="fas fa-location-arrow"></i>');
}

// Boton Split
function CargarBtnSplit() {

  map.pm.Toolbar.copyDrawControl('Line', {
    name: 'LineCopy',
    block: 'edit',
    title: 'Cortar Polígonos',
    className: 'cut',
    onClick: () => {
      console.log('click primero');
      cutMode = true;
    },
  });

  $(".cut").append('<span class="fa fa-cut cuts"></span>');

}

function cutPolygon(polygon, line, direction, id) {
  var j;
  var polyCoords = [];
  var cutPolyGeoms = [];
  var retVal = null;

  if ((polygon.type != 'Polygon') || (line.type != 'LineString')) return retVal;

  var intersectPoints = turf.lineIntersect(polygon, line);
  var nPoints = intersectPoints.features.length;
  if ((nPoints == 0) || ((nPoints % 2) != 0)) return retVal;

  var offsetLine = turf.lineOffset(line, (0.01 * direction), {
    units: 'kilometers'
  });

  for (j = 0; j < line.coordinates.length; j++) {
    polyCoords.push(line.coordinates[j]);
  }
  for (j = (offsetLine.geometry.coordinates.length - 1); j >= 0; j--) {
    polyCoords.push(offsetLine.geometry.coordinates[j]);
  }
  polyCoords.push(line.coordinates[0]);
  var thickLineString = turf.lineString(polyCoords);
  var thickLinePolygon = turf.lineToPolygon(thickLineString);

  var clipped = turf.difference(polygon, thickLinePolygon);
  for (j = 0; j < clipped.geometry.coordinates.length; j++) {
    var polyg = turf.polygon(clipped.geometry.coordinates[j]);
    var overlap = turf.lineOverlap(polyg, line, {
      tolerance: 0.005
    });
    if (overlap.features.length > 0) {
      cutPolyGeoms.push(polyg.geometry.coordinates);
    }
  }

  if (cutPolyGeoms.length == 1)
    retVal = turf.polygon(cutPolyGeoms[0], {
      id: id
    });
  else if (cutPolyGeoms.length > 1) {
    retVal = turf.multiPolygon(cutPolyGeoms, {
      id: id
    });
  }

  return retVal;
}


// ................................Funciones de los formularios

// Función para resaltar la figura seleccionada
function ResaltarFeat(newFeat, notNew) {
  map.removeLayer(markersRasgos);
  console.log(newFeat.toGeoJSON());
  var colorNew = '#3388ff';
  var colorSelect = '#fff';
  if (!editMode) {
    if(layergeojsonAnterior==newFeat){
  
    }else if(layergeojsonAnterior == null){
      layergeojsonAnterior = newFeat
      notNewAnterior = notNew;
    }else if (notNewAnterior){
      layergeojsonAnterior.pm.disable();
      if (layergeojsonAnterior.feature.properties.clase == 'procesos') {
        var auxLayergeojsonAnterior = layergeojsonAnterior.toGeoJSON();
        var geom = turf.getGeom(auxLayergeojsonAnterior);
        if (geom.type == 'Polygon') {
          layergeojsonAnterior.setStyle({weight:3, color : capasDatos[0].color, fillColor: capasDatos[0].color, fillOpacity:0.2})
        }
      }else if (layergeojsonAnterior.feature.properties.clase == 'rasgos') {
        layergeojsonAnterior.setStyle({weight:3, color : capasDatos[1].color, fillColor: capasDatos[2].color, fillOpacity:0.2})
      }else if (layergeojsonAnterior.feature.properties.clase == 'geologia') {
        layergeojsonAnterior.setStyle({weight:3, color : capasDatos[2].color, fillColor: capasDatos[3].color, fillOpacity:0.2})
      }else if (layergeojsonAnterior.feature.properties.clase == 'morfo') {
        layergeojsonAnterior.setStyle({weight:3, color : capasDatos[3].color, fillColor: capasDatos[5].color, fillOpacity:0.2})
      }else{
        layergeojsonAnterior.setStyle({weight:3, color : colorNew, fillColor: colorNew, fillOpacity:0.2})
      }
    }else{
      layergeojsonAnterior.pm.disable();
      layergeojsonAnterior.setStyle({weight:3, color : colorNew, fillColor: colorNew, fillOpacity:0.2})
    }
    layergeojsonAnterior = newFeat;
    notNewAnterior = notNew;
    var auxLayerCentroid = newFeat.toGeoJSON();
    var geom = turf.getGeom(auxLayerCentroid);
    if (geom.type == 'Polygon') {
      newFeat.setStyle({weight:6, color : colorSelect, fillColor: colorSelect, fillOpacity:0.2})
    }
    
    if (geom.type == 'Polygon') {
      L.geoJSON(turf.centroid(auxLayerCentroid)).bindPopup(popupCentroid).addTo(markerCentrid);
      
      function popupCentroid() {
        var gradLng = Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0])
        gradLng = (gradLng<0) ? gradLng*-1 : gradLng;
        var gradLat = Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1])
        gradLat = (gradLat<0) ? gradLat*-1 : gradLat;
        console.log(gradLng, gradLat);
        var minLng = Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[0]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0]))*60);
        minLng = (minLng<0) ? minLng*-1 : minLng;
        var minLat = Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[1]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1]))*60);
        minLat = (minLat<0) ? minLat*-1 : minLat;
        console.log(minLng, minLat);
        var segLng =Math.trunc((Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[0]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0]))*60) - (turf.getCoord(turf.centroid(auxLayerCentroid))[0]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[0]))*60)*60);
        segLng = (segLng<0) ? segLng*-1 : segLng;
        var segLat =Math.trunc((Math.trunc((turf.getCoord(turf.centroid(auxLayerCentroid))[1]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1]))*60) - (turf.getCoord(turf.centroid(auxLayerCentroid))[1]-Math.trunc(turf.getCoord(turf.centroid(auxLayerCentroid))[1]))*60)*60);
        segLat = (segLat<0) ? segLat*-1 : segLat;
        console.log(segLng, segLat);
        var corregidaLgn = '-' + gradLng + '°' + ((minLng<10)? '0'+minLng : minLng) + "'" + ((segLng<10)? '0'+segLng : segLng) + '"';
        var corregidaLat = '0' + gradLat + '°' + ((minLat<10)? '0'+minLat : minLat) + "'" + ((segLat<10)? '0'+segLat : segLat) + '"';
        console.log(corregidaLgn);
        console.log(corregidaLat);

        return corregidaLgn + ', ' + corregidaLat;
      }
      

    }else{
      markerCentrid = L.layerGroup();
    }
  
    newFeat.pm.enable({
      allowSelfIntersection: true,
    });
    newFeat.on('pm:edit', (e) => {
      layergeojson = e.layer.toGeoJSON();
    });
  }
}

// Función que se llama al seleccionar una figura nueva
function EditNew() {
  console.log("nuevo");
  idLayer = "nuevo";
  claseLayer = "nuevo";
  layerEdit = this;
  layergeojson = this.toGeoJSON();
  // console.log(layergeojson);
  // console.log(layergeojson.type);
  ResaltarFeat(this, false);
  if(layergeojson.type == 'FeatureCollection'){
    layergeojson = layergeojson.features[0];
    delete layergeojson.properties.id;
  }
  // console.log(layergeojson);

    $("#IPM_IDMOV").val('');
    $("#IPM_ENCU").val(uname);
    $("#IPM_CODSIMMA").val(0);
    $("#IPM_FECREP").val(dateFormat(new Date(),'Y-m-d'));
    $("#IPM_FECMOV").val('');
    $("#IPM_CONFEC").val('05');
    $("#IPM_FINFOSEC").val('');
    $("#IPM_ANOFUE").val('');
    $("#IPM_DPTO").val('CALDAS');
    $("#IPM_REFGEO").val('');
    $("#IPM_VEREDA").val('');
    $("#IPM_TMM1").val('01');
    TipoIPM("IPM_TMM1");
    $("#IPM_TMM2").val('No Aplica');
    TipoIPM("IPM_TMM2");
    $("#IPM_ACTIVIDAD").val('0');
    TipoIPM("IPM_ACTIVIDAD");
    $("#IPM_ESTACT").val('04');
    $("#IPM_ESTILO").val('05');
    $("#IPM_DISTMM").val('05');
    $("#IPM_PARTE").val('01');
    $("#IPM_IDPART").val('');
    $("#IPM_ETIQUETA").val('');
    $("#IPM_LITO").val('');
    $("#IPM_DIRECCION").val('');
    $("#IPM_LONGITUD").val('');
    $("#IPM_ANCHO").val('');
    $("#IPM_PROF").val('Superficia');
    $("#IPM_ESPESOR").val(0);
    $("#IPM_TAMBLOQ").val(0);
    $("#IPM_COBUSO").val('');
    $("#IPM_GMF").val('');
    $("#IPM_IMPORT").val('Alta');
    $("#IPM_ELEMEXP").val('');
    $("#IPM_DANO").val('');
    $("#IPM_AMEPOT").val('');
    $("#IPM_VERICAM").val('0');
    $("#IPM_OBSERV").val('');
    $("#IPM_CUENCA").val('');
    $("#IPM_IDFORMAT").val('');
    $("#IPM_CODMM").val('01.01.01');
    $("#IPM_MAPA").val('01');
    $("#IPM_CODNAMEMUN").val('17013 - AGUADAS');
    TipoIPM1();
  
    $("#RGMF_Propietario").val(uname);
    $("#RGMF_CODNAME").val('02.01.01');
    $("#RGMF_DESCRI").val('');
    $("#RGMF_TIPO").val('01');
    $("#RGMF_AMBIENT").val('02.01');
    $("#RGMF_VISIBLE").val('1');
    $("#RGMF_MAPA").val('02');
    $("#RGMF_CODNAMEMUN").val('17013 - AGUADAS');
  
    $("#UGS_PROPIETARIO").val(uname);
    $("#UGS_NAME").val('');
    $("#UGS_CALIDAD").val('No Aplica');
    $("#UGS_DESCRI").val('');
    $("#UGS_MAPA").val('02');

    $("#UGS_VEREDA").val('');
    $("#UGS_tipo").val('Suelo');
    $("#UGS_tiporocasuelo").val('Residual');
    TipoUGS();
    $("#UGS_relieverela").val('Muy bajo');
    $("#UGS_inclinacionladera").val('Plana >5');
    $("#UGS_observa").val('');

    if (!sidebarLeft) {
      Recarga();
    }
}

// Función que se llama al seleccionar una figura ya existente
function EditExist(e) {
  console.log("existe");
  console.log(e.layer);
  layerEdit = e.layer; 
  layergeojson = e.layer.toGeoJSON();
  idLayer = layergeojson.properties.id;
  claseLayer = layergeojson.properties.clase;
  ResaltarFeat(e.layer, true);
  console.log(e.layer.toGeoJSON());
  if (claseLayer == 'procesos') {
    $("#IPM_IDMOV").val(layergeojson.properties.ID_MOV);
    $("#IPM_ENCU").val(layergeojson.properties.ENCUESTAD);
    $("#IPM_CODSIMMA").val(layergeojson.properties.COD_SIMMA);
    $("#IPM_FECREP").val(layergeojson.properties.FECHA_REP);
    $("#IPM_FECMOV").val(layergeojson.properties.FECHA_MOV);
    $("#IPM_CONFEC").val(layergeojson.properties.ConfiFechaMM);
    $("#IPM_FINFOSEC").val(layergeojson.properties.FTE_INFSEC);
    $("#IPM_ANOFUE").val(layergeojson.properties.ANOS);
    $("#IPM_DPTO").val(layergeojson.properties.DPTO);
    $("#IPM_REFGEO").val(layergeojson.properties.REF_GEOGRF);
    $("#IPM_VEREDA").val(layergeojson.properties.VEREDA);
    $("#IPM_TMM1").val(layergeojson.properties.TIPO_MOV1);
    TipoIPM("IPM_TMM1");
    $("#IPM_TMM2").val(layergeojson.properties.TIPO_MOV2);
    TipoIPM("IPM_TMM2");

    $("#IPM_SMM1").val(layergeojson.properties.SUBTIPO_1);
    $("#IPM_SMM2").val(layergeojson.properties.SUBTIPO_2);
    $("#IPM_ACTIVIDAD").val(layergeojson.properties.ACTIVIDAD);
    TipoIPM("IPM_ACTIVIDAD");
    $("#IPM_ESTACT").val(layergeojson.properties.ESTADO_ACT);
    $("#IPM_ESTILO").val(layergeojson.properties.ESTILO);
    $("#IPM_DISTMM").val(layergeojson.properties.DISTRIBUC);
    $("#IPM_PARTE").val(layergeojson.properties.PARTE);
    $("#IPM_IDPART").val(layergeojson.properties.ID_PARTE);
    $("#IPM_ETIQUETA").val(layergeojson.properties.ETIQUETA);
    $("#IPM_LITO").val(layergeojson.properties.LITOLOGIA);
    $("#IPM_DIRECCION").val(layergeojson.properties.DIRECCION);
    $("#IPM_LONGITUD").val(layergeojson.properties.LONGITUD);
    $("#IPM_ANCHO").val(layergeojson.properties.ANCHO);
    $("#IPM_PROF").val(layergeojson.properties.PROF);
    $("#IPM_ESPESOR").val(layergeojson.properties.ESPESOR);
    $("#IPM_TAMBLOQ").val(layergeojson.properties.TAM_BLOQUE);
    $("#IPM_COBUSO").val(layergeojson.properties.COB_USO);
    $("#IPM_GMF").val(layergeojson.properties.AN_GMF);
    $("#IPM_IMPORT").val(layergeojson.properties.IMPORTANC);
    $("#IPM_ELEMEXP").val(layergeojson.properties.ELEM_EXPUE);
    $("#IPM_DANO").val(layergeojson.properties.DANO);
    $("#IPM_AMEPOT").val(layergeojson.properties.AME_POT);
    $("#IPM_VERICAM").val(layergeojson.properties.VERIF_CAM);
    $("#IPM_OBSERV").val(layergeojson.properties.OBSERVAC);
    $("#IPM_CUENCA").val(layergeojson.properties.CUENCA);
    $("#IPM_IDFORMAT").val(layergeojson.properties.ID_FORMAT);
    $("#IPM_CODMM").val(layergeojson.properties.Cod_MM);
    // $("#IPM_CODMM").val(layergeojson.properties.Tipo_MM);
    $("#IPM_MAPA").val(layergeojson.properties.Mapa);
    $("#IPM_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
    TipoIPM1();
  }

  if (claseLayer == 'geomorfo') {
    $("#SGMF_Propietario").val(layergeojson.properties.Propietario);
    $("#SGMF_NAME").val(layergeojson.properties.Nom_SGMF);
    $("#SGMF_CODE").val(layergeojson.properties.Cod_SGMF);
    $("#SGMF_AMBIENT").val(layergeojson.properties.Ambiente);
    $("#SGMF_DESCRI").val(layergeojson.properties.Descripcion);
    $("#SGMF_MAPA").val(layergeojson.properties.Mapa);
    $("#SGMF_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
  }

  if (claseLayer == 'rasgos') {
    $("#RGMF_Propietario").val(layergeojson.properties.Propietario);
    $("#RGMF_CODNAME").val(layergeojson.properties.Cod_Rasgo);
    $("#RGMF_DESCRI").val(layergeojson.properties.Descripcion);
    $("#RGMF_TIPO").val(layergeojson.properties.Tipo);
    $("#RGMF_AMBIENT").val(layergeojson.properties.Ambiente);
    $("#RGMF_VISIBLE").val(layergeojson.properties.Visible_25K);
    $("#RGMF_MAPA").val(layergeojson.properties.Mapa);
    $("#RGMF_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
  
    
    //L.marker(layergeojson.geometry.coordinates[0]).addTo(map);
    
    var pos = [layergeojson.geometry.coordinates[0][1], layergeojson.geometry.coordinates[0][0]];
    map.removeLayer(markersRasgos);
    markersRasgos= L.layerGroup();
    var marker = L.marker(pos)
    // console.log(pos);
    // console.log(marker);
    marker.bindPopup('Inicio del Rasgo');
    marker.addTo(markersRasgos);
    markersRasgos.addTo(map);
  

  }

  if (claseLayer == 'geologia') {
    $("#UGS_PROPIETARIO").val(layergeojson.properties.Propietario);
    $("#UGS_NAME").val(layergeojson.properties.Nom_UGS);
    //$("#UGS_CODE").val(layergeojson.properties.Cod_UGS);
    $("#UGS_CALIDAD").val(layergeojson.properties.Calidad_roca);
    $("#UGS_DESCRI").val(layergeojson.properties.Descripcion);
    $("#UGS_MAPA").val(layergeojson.properties.Mapa);
    $("#UGS_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
    $("#UGS_VEREDA").val(layergeojson.properties.Vereda);
    $("#UGS_tipo").val(layergeojson.properties.Tipo);
    $("#UGS_tiporocasuelo").val(layergeojson.properties.TipoRocaSuelo);
    TipoUGS();
    $("#UGS_codtipo").val(layergeojson.properties.Cod_UGS + ' - '+ layergeojson.properties.TipoUGS);
    // $("#UGS_tiposuelo option[value='"+ layergeojson.properties.TipoSuelo +"']").attr("selected",true);
    // $("#UGS_tono option[value='"+ layergeojson.properties.Tono +"']").attr("selected",true);
    // $("#UGS_textura option[value='"+ layergeojson.properties.Textura +"']").attr("selected",true);
    // $("#UGS_densidad option[value='"+ layergeojson.properties.Densidad +"']").attr("selected",true);
    // $("#UGS_homogeneidad option[value='"+ layergeojson.properties.Homogeneidad +"']").attr("selected",true);
    // $("#UGS_orientacion option[value='"+ layergeojson.properties.Orientacion +"']").attr("selected",true);
    // $("#UGS_incision option[value='"+ layergeojson.properties.Incision +"']").attr("selected",true);
    // $("#UGS_control option[value='"+ layergeojson.properties.ControlEstruc +"']").attr("selected",true);
    $("#UGS_formacima").val(layergeojson.properties.FormaCima);
    $("#UGS_relieverela").val(layergeojson.properties.RelieveRelativo);
    $("#UGS_inclinacionladera").val(layergeojson.properties.InclinacionLadera);
    $("#UGS_formaladera").val(layergeojson.properties.FormaLadera);
    $("#UGS_observa").val(layergeojson.properties.Observaciones);


  }
  
  if (claseLayer == 'estructuras') {
    $("#LIN_CODE").val(layergeojson.properties.Codigo);
    $("#LIN_TIPO").val(layergeojson.properties.Tipo);
    $("#LIN_NOM").val(layergeojson.properties.NombreLineamiento);
    $("#LIN_COMENT").val(layergeojson.properties.Comentarios);
  }

  if (!sidebarLeft) {
    Recarga();
  }
}
function EditExistAux() {
  console.log("existe");
  console.log(this);
  layerEdit = this; 
  layergeojson =this.toGeoJSON();
  idLayer = layergeojson.properties.id;
  claseLayer = layergeojson.properties.clase;
  ResaltarFeat(this, true);
  console.log(this.toGeoJSON());
  if (claseLayer == 'procesos') {
    $("#IPM_IDMOV").val(layergeojson.properties.ID_MOV);
    $("#IPM_ENCU").val(layergeojson.properties.ENCUESTAD);
    $("#IPM_CODSIMMA").val(layergeojson.properties.COD_SIMMA);
    $("#IPM_FECREP").val(layergeojson.properties.FECHA_REP);
    $("#IPM_FECMOV").val(layergeojson.properties.FECHA_MOV);
    $("#IPM_CONFEC").val(layergeojson.properties.ConfiFechaMM);
    $("#IPM_FINFOSEC").val(layergeojson.properties.FTE_INFSEC);
    $("#IPM_ANOFUE").val(layergeojson.properties.ANOS);
    $("#IPM_DPTO").val(layergeojson.properties.DPTO);
    $("#IPM_REFGEO").val(layergeojson.properties.REF_GEOGRF);
    $("#IPM_VEREDA").val(layergeojson.properties.VEREDA);
    $("#IPM_TMM1").val(layergeojson.properties.TIPO_MOV1);
    TipoIPM("IPM_TMM1");
    $("#IPM_TMM2").val(layergeojson.properties.TIPO_MOV2);
    TipoIPM("IPM_TMM2");

    $("#IPM_SMM1").val(layergeojson.properties.SUBTIPO_1);
    $("#IPM_SMM2").val(layergeojson.properties.SUBTIPO_2);
    $("#IPM_ACTIVIDAD").val(layergeojson.properties.ACTIVIDAD);
    TipoIPM("IPM_ACTIVIDAD");
    $("#IPM_ESTACT").val(layergeojson.properties.ESTADO_ACT);
    $("#IPM_ESTILO").val(layergeojson.properties.ESTILO);
    $("#IPM_DISTMM").val(layergeojson.properties.DISTRIBUC);
    $("#IPM_PARTE").val(layergeojson.properties.PARTE);
    $("#IPM_IDPART").val(layergeojson.properties.ID_PARTE);
    $("#IPM_ETIQUETA").val(layergeojson.properties.ETIQUETA);
    $("#IPM_LITO").val(layergeojson.properties.LITOLOGIA);
    $("#IPM_DIRECCION").val(layergeojson.properties.DIRECCION);
    $("#IPM_LONGITUD").val(layergeojson.properties.LONGITUD);
    $("#IPM_ANCHO").val(layergeojson.properties.ANCHO);
    $("#IPM_PROF").val(layergeojson.properties.PROF);
    $("#IPM_ESPESOR").val(layergeojson.properties.ESPESOR);
    $("#IPM_TAMBLOQ").val(layergeojson.properties.TAM_BLOQUE);
    $("#IPM_COBUSO").val(layergeojson.properties.COB_USO);
    $("#IPM_GMF").val(layergeojson.properties.AN_GMF);
    $("#IPM_IMPORT").val(layergeojson.properties.IMPORTANC);
    $("#IPM_ELEMEXP").val(layergeojson.properties.ELEM_EXPUE);
    $("#IPM_DANO").val(layergeojson.properties.DANO);
    $("#IPM_AMEPOT").val(layergeojson.properties.AME_POT);
    $("#IPM_VERICAM").val(layergeojson.properties.VERIF_CAM);
    $("#IPM_OBSERV").val(layergeojson.properties.OBSERVAC);
    $("#IPM_CUENCA").val(layergeojson.properties.CUENCA);
    $("#IPM_IDFORMAT").val(layergeojson.properties.ID_FORMAT);
    $("#IPM_CODMM").val(layergeojson.properties.Cod_MM);
    // $("#IPM_CODMM").val(layergeojson.properties.Tipo_MM);
    $("#IPM_MAPA").val(layergeojson.properties.Mapa);
    $("#IPM_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
  }

  if (claseLayer == 'geomorfo') {
    $("#SGMF_Propietario").val(layergeojson.properties.Propietario);
    $("#SGMF_NAME").val(layergeojson.properties.Nom_SGMF);
    $("#SGMF_CODE").val(layergeojson.properties.Cod_SGMF);
    $("#SGMF_AMBIENT").val(layergeojson.properties.Ambiente);
    $("#SGMF_DESCRI").val(layergeojson.properties.Descripcion);
    $("#SGMF_MAPA").val(layergeojson.properties.Mapa);
    $("#SGMF_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
  }

  if (claseLayer == 'rasgos') {
    $("#RGMF_Propietario").val(layergeojson.properties.Propietario);
    $("#RGMF_CODNAME").val(layergeojson.properties.Cod_Rasgo);
    $("#RGMF_DESCRI").val(layergeojson.properties.Descripcion);
    $("#RGMF_TIPO").val(layergeojson.properties.Tipo);
    $("#RGMF_AMBIENT").val(layergeojson.properties.Ambiente);
    $("#RGMF_VISIBLE").val(layergeojson.properties.Visible_25K);
    $("#RGMF_MAPA").val(layergeojson.properties.Mapa);
    $("#RGMF_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
  
    
    //L.marker(layergeojson.geometry.coordinates[0]).addTo(map);
    
    var pos = [layergeojson.geometry.coordinates[0][1], layergeojson.geometry.coordinates[0][0]];
    map.removeLayer(markersRasgos);
    markersRasgos= L.layerGroup();
    var marker = L.marker(pos)
    // console.log(pos);
    // console.log(marker);
    marker.bindPopup('Inicio del Rasgo');
    marker.addTo(markersRasgos);
    markersRasgos.addTo(map);
  

  }

  if (claseLayer == 'geologia') {
    $("#UGS_PROPIETARIO").val(layergeojson.properties.Propietario);
    $("#UGS_NAME").val(layergeojson.properties.Nom_UGS);
    //$("#UGS_CODE").val(layergeojson.properties.Cod_UGS);
    $("#UGS_CALIDAD").val(layergeojson.properties.Calidad_roca);
    $("#UGS_DESCRI").val(layergeojson.properties.Descripcion);
    $("#UGS_MAPA").val(layergeojson.properties.Mapa);
    $("#UGS_CODNAMEMUN").val(layergeojson.properties.COD_MUN + ' - ' + layergeojson.properties.NOM_MUN);
    $("#UGS_VEREDA").val(layergeojson.properties.Vereda);
    $("#UGS_tipo").val(layergeojson.properties.Tipo);
    $("#UGS_tiporocasuelo").val(layergeojson.properties.TipoRocaSuelo);
    TipoUGS();
    $("#UGS_codtipo").val(layergeojson.properties.Cod_UGS + ' - '+ layergeojson.properties.TipoUGS);
    // $("#UGS_tiposuelo option[value='"+ layergeojson.properties.TipoSuelo +"']").attr("selected",true);
    // $("#UGS_tono option[value='"+ layergeojson.properties.Tono +"']").attr("selected",true);
    // $("#UGS_textura option[value='"+ layergeojson.properties.Textura +"']").attr("selected",true);
    // $("#UGS_densidad option[value='"+ layergeojson.properties.Densidad +"']").attr("selected",true);
    // $("#UGS_homogeneidad option[value='"+ layergeojson.properties.Homogeneidad +"']").attr("selected",true);
    // $("#UGS_orientacion option[value='"+ layergeojson.properties.Orientacion +"']").attr("selected",true);
    // $("#UGS_incision option[value='"+ layergeojson.properties.Incision +"']").attr("selected",true);
    // $("#UGS_control option[value='"+ layergeojson.properties.ControlEstruc +"']").attr("selected",true);
    $("#UGS_formacima").val(layergeojson.properties.FormaCima);
    $("#UGS_relieverela").val(layergeojson.properties.RelieveRelativo);
    $("#UGS_inclinacionladera").val(layergeojson.properties.InclinacionLadera);
    $("#UGS_formaladera").val(layergeojson.properties.FormaLadera);
    $("#UGS_observa").val(layergeojson.properties.Observaciones);


  }
  
  if (claseLayer == 'estructuras') {
    $("#LIN_CODE").val(layergeojson.properties.Codigo);
    $("#LIN_TIPO").val(layergeojson.properties.Tipo);
    $("#LIN_NOM").val(layergeojson.properties.NombreLineamiento);
    $("#LIN_COMENT").val(layergeojson.properties.Comentarios);
  }

  if (!sidebarLeft) {
    Recarga();
  }
}

// Función para modificar los textos: pone mayúscula en cada palabra
function ArreglarMayus(text) {
  text = text.toLowerCase();
  var output = '';
  var input = text;
  var words = input.split(/\s+/); //Convertira el valor en un array, donde el separador es 1 o mas espacios en blanco

  $.each(words, function(index, value) {
    var a = value.charAt(); //Sacamos la primera letra
    var b = value.slice(1); //Sacamos el resto de la palabra
    var word = a.toUpperCase() + b; //Pasamos la primera letra a mayúscula y concatenamos
    
    output += word;
    
    // Si no es el ultimo item, agregamos un espacio en blanco
    if(index != (words.length - 1)){
      output += ' ';
    }
  })
  return output;
}

// Función para guardar una figura en la clase procesos
$("#procesosSave").click(function (e) { 
  e.preventDefault();

  if (layergeojson !== null && (claseLayer == 'nuevo' || claseLayer == 'procesos')) {
    console.log(layergeojson);
    claseLayer = 'procesos';
    if (layergeojson.geometry.type !== "LineString") {
      var aux_ok = true
      var campo = '';
      var cont = 0;
      if ($("#IPM_IDMOV").val().replace(/ /g,'') === '') {
        aux_ok = false;
        campo += 'ID Movimiento, ';
        cont++;
      }
      if ($("#IPM_FINFOSEC").val().replace(/ /g,'') === '') {
        aux_ok = false;
        campo += 'Fuente Información Secundaria, ';
        cont++;
      }
      if ($("#IPM_DIRECCION").val().replace(/ /g,'') === '') {
        aux_ok = false;
        campo += 'Dirección, ';
        cont++;
      }
      if ($("#IPM_LONGITUD").val().replace(/ /g,'') === '') {
        aux_ok = false;
        campo += 'Longitud, ';
        cont++;
      }
      if ($("#IPM_ANCHO").val().replace(/ /g,'') === '') {
        aux_ok = false;
        campo += 'Ancho, ';
        cont++;
      }
      var mensaje = (cont>1) ? 'los campos: ' : 'el campo: ';
      if (aux_ok) {
        if (capasDatos[0].capa !== null) {
          var feature_aux = undefined;
          feature_aux = capasDatos[0].figuras.find(feature_aux => feature_aux.properties.ID_PARTE === $("#IPM_IDPART").val());
          //console.log(feature_aux)
          if (feature_aux !== undefined) {
            if (idLayer == feature_aux.properties.id) {
              GuardarProcesos();
            } else{
              alert('El campo "ID de la Parte del MM" ya existe. Por favor modifique la Parte del Movimiento o el ID del Movimiento.')
            }
          } else{
            GuardarProcesos();
          }

        }else{
          alert('Active la capa de Procesos para poder guardar esta Forma')
        }
      } else {
        alert('Asegurese de llenar ' + mensaje + campo + 'antes de guardar el polígono. Además verifique si el resto de los campos se encuentran bien diligenciados.')
      }
    } else{
      alert('Esta capa solo admite polígonos');
    }
    
  }
  if (layergeojson == null) {
    alert("Seleccione la figura a guardar")
  }
  if (claseLayer != 'procesos' && claseLayer != 'nuevo') {
    alert("La figura no pertenece a esta clase")
  }

  function GuardarProcesos() {
  
    if ($("#IPM_TMM2").val() !=='No Aplica') {
      L.extend(layergeojson.properties, {
        TIPO_MOV2: $("#IPM_TMM2").val(),
        SUBTIPO_2: $("#IPM_SMM2").val(),
      });
    }
    if (layergeojson.properties.ESTE_ESC !== undefined) {
      L.extend(layergeojson.properties, {
        ESTE_ESC: layergeojson.properties.ESTE_ESC,
      });
    }
    if (layergeojson.properties.NORTE_ESC !== undefined) {
      L.extend(layergeojson.properties, {
        NORTE_ESC: layergeojson.properties.NORTE_ESC,
      });
    }
    if (layergeojson.properties.ESTE_CUERP !== undefined) {
      L.extend(layergeojson.properties, {
        ESTE_CUERP: layergeojson.properties.ESTE_CUERP,
      });
    }
    if (layergeojson.properties.NORTE_CUER !== undefined) {
      L.extend(layergeojson.properties, {
        NORTE_CUER: layergeojson.properties.NORTE_CUER,
      });
    }
    if (layergeojson.properties.ESTE !== undefined) {
      L.extend(layergeojson.properties, {
        ESTE: layergeojson.properties.ESTE
      });
    }
    if (layergeojson.properties.ALTITUD !== undefined) {
      L.extend(layergeojson.properties, {
        ALTITUD: layergeojson.properties.ALTITUD
      });
    }
    if (layergeojson.properties.NORTE !== undefined) {
      L.extend(layergeojson.properties, {
        NORTE: layergeojson.properties.NORTE
      });
    }
    if (layergeojson.properties.AREA_M !== undefined) {
      L.extend(layergeojson.properties, {
        AREA_M: layergeojson.properties.AREA_M
      });
    }
    if (layergeojson.properties.VOLUMEN !== undefined) {
      L.extend(layergeojson.properties, {
        VOLUMEN: layergeojson.properties.VOLUMEN
      });
    }
    
    L.extend(layergeojson.properties, {
      ID_MOV: $("#IPM_IDMOV").val(),
      ENCUESTAD: ArreglarMayus($("#IPM_ENCU").val()),
      COD_SIMMA: $("#IPM_CODSIMMA").val(),
      FECHA_REP: $("#IPM_FECREP").val(),
      FECHA_MOV: $("#IPM_FECMOV").val(),
      ConfiFechaMM: $("#IPM_CONFEC").val().split(' - ')[0],
      FTE_INFSEC: $("#IPM_FINFOSEC").val(),
      ANOS: $("#IPM_ANOFUE").val(),
      DPTO: $("#IPM_DPTO").val(),
      REF_GEOGRF: $("#IPM_REFGEO").val(),
      VEREDA: ArreglarMayus($("#IPM_VEREDA").val()),
      TIPO_MOV1: $("#IPM_TMM1").val().split(' - ')[0],
      // TIPO_MOV2: $("#IPM_TMM2").val(),
      SUBTIPO_1: $("#IPM_SMM1").val(),
      // SUBTIPO_2: $("#IPM_SMM2").val(),
      ACTIVIDAD: $("#IPM_ACTIVIDAD").val() == "" ? $("#IPM_ACTIVIDAD").val() : $("#IPM_ACTIVIDAD").val().split(' - ')[0],
      ESTADO_ACT: $("#IPM_ESTACT").val() == null ? '' : $("#IPM_ESTACT").val().split(' - ')[0],
      ESTILO: $("#IPM_ESTILO").val() == null ? '' : $("#IPM_ESTILO").val().split(' - ')[0],
      DISTRIBUC: $("#IPM_DISTMM").val() == null ? '' : $("#IPM_DISTMM").val().split(' - ')[0],
      PARTE: $("#IPM_PARTE").val() == "00" ? $("#IPM_PARTE").val() : $("#IPM_PARTE").val().split(' - ')[0],
      ID_PARTE: $("#IPM_IDPART").val(),
      ETIQUETA: $("#IPM_ETIQUETA").val(),
      LITOLOGIA: $("#IPM_LITO").val(),
      DIRECCION: $("#IPM_DIRECCION").val(),
      LONGITUD: $("#IPM_LONGITUD").val(),
      ANCHO: $("#IPM_ANCHO").val(),
      PROF: $("#IPM_PROF").val(),
      ESPESOR: $("#IPM_ESPESOR").val(),
      TAM_BLOQUE: $("#IPM_TAMBLOQ").val(),
      COB_USO: $("#IPM_COBUSO").val(),
      AN_GMF: $("#IPM_GMF").val(),
      IMPORTANC: $("#IPM_IMPORT").val(),
      ELEM_EXPUE: $("#IPM_ELEMEXP").val(),
      DANO: $("#IPM_DANO").val(),
      AME_POT: $("#IPM_AMEPOT").val(),
      VERIF_CAM: $("#IPM_VERICAM").val().split(' - ')[0],
      OBSERVAC: $("#IPM_OBSERV").val(),
      CUENCA: $("#IPM_CUENCA").val(),
      ID_FORMAT: $("#IPM_IDFORMAT").val(),
      Cod_MM: $("#IPM_CODMM").val().split(' - ')[0],
      Tipo_MM: $("#IPM_CODMM").val().split(' - ')[0],
      Mapa: $("#IPM_MAPA").val(),
      COD_MUN: $("#IPM_CODNAMEMUN").val().split(' - ')[0],
      NOM_MUN: $("#IPM_CODNAMEMUN").val().split(' - ')[1],
      
    });
    if (layerEdit.feature === undefined) {
      layerEdit.feature = layergeojson;
    }

    console.log(layerEdit);
    
    database.ref().child("features/procesos/count").get().then((snapshot) => {
      if (snapshot.exists()) {
        if (idLayer == "nuevo") {
          var aux = snapshot.val();
          idLayer = aux["count"];
          claseLayer == 'procesos';
          layerEdit.off('click', EditNew); 
          layerEdit.on('click', EditExistAux); 
          var newCount = parseInt(aux["count"])+1;
          database.ref('features/procesos/count').set({
            count : newCount
          });
          database.ref('features/procesos/feature_'+aux["count"]).set({
            id: aux["count"],
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }else{
          
          delete layergeojson.properties.codigo;
          delete layergeojson.properties.descripcion;
          delete layergeojson.properties.fecha;
          delete layergeojson.properties.nombre;
          delete layergeojson.properties.propietario;
          delete layergeojson.properties.zona;
          delete layergeojson.layer;
          delete layergeojson.properties._feature;
          console.log(layergeojson);
          database.ref('features/procesos/feature_' + idLayer).set({
            id: idLayer,
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
});

// Función para guardar una figura en la clase rasgos
$("#rasgosSave").click(function (e) { 
  e.preventDefault();
 
  if (layergeojson !== null && (claseLayer == 'nuevo' || claseLayer == 'rasgos')) {

    claseLayer = 'rasgos';

    L.extend(layergeojson.properties, {
      Propietario: $("#RGMF_Propietario").val(),
      Cod_Rasgo: $("#RGMF_CODNAME").val(),
      Nom_Rasgo: $("#RGMF_CODNAME").val(),
      Descripcion: $("#RGMF_DESCRI").val(),
      Tipo: $("#RGMF_TIPO").val(),
      Ambiente: $("#RGMF_AMBIENT").val(),
      Visible_25K: $("#RGMF_VISIBLE").val(),
      Mapa: $("#RGMF_MAPA").val(),
      COD_MUN: $("#RGMF_CODNAMEMUN").val().split(' - ')[0],
      NOM_MUN: $("#RGMF_CODNAMEMUN").val().split(' - ')[1],
    });
    database.ref().child("features/rasgos/count").get().then((snapshot) => {
      if (snapshot.exists()) {
        if (idLayer == "nuevo") {
          var aux = snapshot.val();
          var newCount = parseInt(aux["count"])+1;
          database.ref('features/rasgos/count').set({
            count : newCount
          });
          database.ref('features/rasgos/feature_'+aux["count"]).set({
            id: aux["count"],
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }else{
          delete layergeojson.layer;
          delete layergeojson.properties._feature;
          console.log(layergeojson);
          database.ref('features/rasgos/feature_' + idLayer).set({
            id: idLayer,
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }
  if (layergeojson == null) {
    alert("Seleccione la figura a guardar")
  }
  if (claseLayer != 'rasgos' && claseLayer != 'nuevo') {
    alert("La figura no pertenece a esta clase")
  }
});

// Función para guardar una figura en la clase geologia
$("#ugsSave").click(function (e) { 
  e.preventDefault();
 
  if (layergeojson !== null && (claseLayer == 'nuevo' || claseLayer == 'geologia')) {

    claseLayer = 'geologia';
    if ($("#UGS_CALIDAD").val().split(' - ')[0] !=='No Aplica') {
      L.extend(layergeojson.properties, {
        Calidad_roca: $("#UGS_CALIDAD").val().split(' - ')[0],
      });
    }
    L.extend(layergeojson.properties, {
      Propietario: $("#UGS_PROPIETARIO").val(),
      Nom_UGS: $("#UGS_NAME").val(),
      Cod_UGS: $("#UGS_codtipo").val().split(' - ')[0],
      // Calidad_roca: $("#UGS_CALIDAD").val().split(' - ')[0],
      Descripcion: $("#UGS_DESCRI").val(),
      Mapa: $("#UGS_MAPA").val().split(' - ')[0],
      COD_MUN: $("#UGS_CODNAMEMUN").val().split(' - ')[0],
      NOM_MUN: $("#UGS_CODNAMEMUN").val().split(' - ')[1],

      Vereda: $("#UGS_VEREDA").val(),
      Tipo: $("#UGS_tipo").val(),
      TipoRocaSuelo: $("#UGS_tiporocasuelo").val(),
      TipoUGS : $("#UGS_codtipo").val().split(' - ')[1],
      // Tono: $("#UGS_tono").val(),
      // Textura: $("#UGS_textura").val(),
      // Densidad: $("#UGS_densidad").val(),
      // Homogeneidad: $("#UGS_homogeneidad").val(),
      // Orientacion: $("#UGS_orientacion").val(),
      // Incision: $("#UGS_incision").val(),
      // ControlEstruc: $("#UGS_control").val(),
      FormaCima: $("#UGS_formacima").val(),
      RelieveRelativo: $("#UGS_relieverela").val(),
      InclinacionLadera: $("#UGS_inclinacionladera").val(),
      FormaLadera: $("#UGS_formaladera").val(),
      Observaciones: $("#UGS_observa").val(),
    });


    database.ref().child("features/geologia/count").get().then((snapshot) => {
      if (snapshot.exists()) {
        if (idLayer == "nuevo") {
          var aux = snapshot.val();
          var newCount = parseInt(aux["count"])+1;
          database.ref('features/geologia/count').set({
            count : newCount
          });
          database.ref('features/geologia/feature_'+aux["count"]).set({
            id: aux["count"],
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }else{

          delete layergeojson.properties.codigo;
          delete layergeojson.properties.descripcion;
          delete layergeojson.properties.fecha;
          delete layergeojson.properties.nombre;
          delete layergeojson.properties.propietario;
          delete layergeojson.properties.zona;
          delete layergeojson.layer;
          delete layergeojson.properties._feature;

          database.ref('features/geologia/feature_' + idLayer).set({
            id: idLayer,
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }
  if (layergeojson == null) {
    alert("Seleccione la figura a guardar")
  }
  if (claseLayer != 'geologia' && claseLayer != 'nuevo') {
    alert("La figura no pertenece a esta clase")
  }
});

// Función para guardar una figura en la clase geomorfo
$("#morfoSave").click(function (e) { 
  e.preventDefault();
 
  if (layergeojson !== null && (claseLayer == 'nuevo' || claseLayer == 'morfo')) {
    
    claseLayer = 'morfo';

    L.extend(layergeojson.properties, {
      Forma: forma,
      Propietario: uname     
    });
    database.ref().child("features/morfo/count").get().then((snapshot) => {
      if (snapshot.exists()) {
        if (idLayer == "nuevo") {
          var aux = snapshot.val();
          var newCount = parseInt(aux["count"])+1;
          database.ref('features/morfo/count').set({
            count : newCount
          });
          database.ref('features/morfo/feature_'+aux["count"]).set({
            id: aux["count"],
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }else{
          delete layergeojson.layer;
          delete layergeojson.properties._feature;
          database.ref('features/morfo/feature_' + idLayer).set({
            id: idLayer,
            uid: uid,
            activo: true,
            layergeojson : layergeojson
          });
          alert("Guardado con Éxito");
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }
  if (layergeojson == null) {
    alert("Seleccione la figura a guardar")
  }
  if (claseLayer != 'morfo' && claseLayer != 'nuevo') {
    alert("La figura no pertenece a esta clase")
  }
});

// Función para eliminar una figura
$("#deleteFeat").click(function (e) { 
  e.preventDefault();
  if (univel == 'admin' || univel > 1) {
    delete layergeojson.properties.nombreclase;
    delete layergeojson.properties.clase;
    delete layergeojson.properties.id;
    delete layergeojson.properties.codigo;
    delete layergeojson.properties.descripcion;
    delete layergeojson.properties.fecha;
    delete layergeojson.properties.nombre;
    delete layergeojson.properties.propietario;
    delete layergeojson.properties.zona;
    delete layergeojson.layer;
    delete layergeojson.properties._feature;
    database.ref('features/'+claseLayer+'/feature_'+idLayer).set({
      id: idLayer,
      uid: uid,
      activo: false,
      layergeojson : layergeojson
    });
    map.removeLayer(layerEdit);
    alert('Borrado con Exito');
  } else{
    alert('Usted no posee los permisos necesarios para borrar esta Figura');
  }  

});


// ................................Funciones para Cargar y Cambiar el Mapa Base 

function setBasemap(basemap) {

  var basemap = basemaps.value;

  if (mapaBase) {
    map.removeLayer(mapaBase);
  }

  if (basemap != 'Street' && basemap != 'Google' && basemap != 'Hillshade' ) {
    mapaBase = L.esri.basemapLayer(basemap);
  }

  if (basemap == 'Street') {
    mapaBase = openStreet;
  }
  if (basemap == 'Google') {
    mapaBase = google;
    mapaBaseLabels = L.esri.basemapLayer('ImageryLabels');
    map.addLayer(mapaBaseLabels);
  }
  
  if (basemap == 'Hillshade') {
    mapaBase = L.esri.Vector.vectorBasemapLayer('ArcGIS:Hillshade:Light', {
      apiKey : 'AAPK858e9fb220874181a8cee37c6c7c05e0JFjKsdmGsd2C7oV31x1offnFB9ia6ew61D9N_tANtlZny5LFO1hIU6Xj2To6eiUp',
    });
    mapaBase.addTo(map);
  }
  map.addLayer(mapaBase);

  if (mapaBaseLabels) {
    map.removeLayer(mapaBaseLabels);
  }

  if (basemap == 'ShadedRelief' ||
    basemap == 'Gray' ||
    basemap == 'DarkGray' ||
    basemap == 'Imagery'
  ) {
    mapaBaseLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(mapaBaseLabels);
  }
}


// ................................Funciones de las Barras Laterales

// Funciones para cargar Barra Lateral Izquierda

function Recarga() {
  if (!$('.btn-afloramiento').hasClass('active')) {
    $('body').attr('class','izq');
  }
  setTimeout(function(){ sidebarControl('afloramiento') },20);
}

// Funciones para Abrir y Cerrar SideBars
$(".btn-afloramiento").click(function (e) { 
  e.preventDefault();
  setTimeout(function(){ sidebarControl('afloramiento') },20);
});

$(".btn-capas").click(function (e) { 
  e.preventDefault();
  sidebarControl('capas');
});

function sidebarControl(btn) {
  if (btn=='capas') {
    if ($('.btn-capas').hasClass('active')) {
      $('.btn-capas').toggleClass('active');
      $('.sidebar-right').toggleClass('active');
      $('body').toggleClass('overy_not');
    }else{
      if ($('.btn-afloramiento').hasClass('active')) {
        $('.btn-afloramiento').toggleClass('active');
        $('.sidebar-left').toggleClass('active');
        $('body').toggleClass('overy_not');
      }
      $('.btn-capas').toggleClass('active');
      $('.sidebar-right').toggleClass('active');
      $('body').toggleClass('overy_not');
    }
  }
  if (btn=='afloramiento') {
    if ($('.btn-afloramiento').hasClass('active')) {
      sidebarLeft = false;
      $('.btn-afloramiento').toggleClass('active');
      $('.sidebar-left').toggleClass('active');
      $('body').toggleClass('overy_not');
    }else{
      if ($('.btn-capas').hasClass('active')) {
        $('.btn-capas').toggleClass('active');
        $('.sidebar-right').toggleClass('active');
        $('body').toggleClass('overy_not');
      }
      sidebarLeft = true;
      $('.btn-afloramiento').toggleClass('active');
      $('.sidebar-left').toggleClass('active');
      $('body').toggleClass('overy_not');
    }
  }
}

$(".sb-close-l").click(function () {
  auxCargaInfoAflor=0;
  setTimeout(function(){ sidebarControl('afloramiento') },20);
});

$(".sb-close-r").click(function () {
  sidebarControl('capas');
});

// Función para el funcionamiento de los acordiones de las barras
function Acordiones() {

  var coll = $(".collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
  
  var coll = $(".coll_ins");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_ins");
      document.getElementById("cont_ins").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
    });
  }
  
  var coll = $(".coll_plancha");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_plancha");
      document.getElementById("cont_plancha").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
      var content = $(".cont_ins");
      document.getElementById("cont_ins").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';
    });
  }
  
  var coll = $(".coll_muni");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_muni");
      document.getElementById("cont_muni").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
    });
  }

  for (let j = 0; j < municipios.length; j++) {
    var coll = $(".coll_infoSec_"+municipios[j]);
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        var content = $(".cont_munis_"+municipios[j]);
        document.getElementById("cont_munis_"+municipios[j]).style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
        var content = $(".cont_muni");
        document.getElementById("cont_muni").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';
      });
    }    
  }

  var coll = $(".coll_descarga");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_descargas");
      document.getElementById("cont_descargas").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
    });
  }

}

// ------> Funciones que controlan los valores de los Selects en la barra izquierda
// Funciones para UGS
function TipoUGS() {

  $("#UGS_tiporocasuelo").empty();

  if ($("#UGS_tipo").val() == 'Roca') {
    $("#UGS_tiporocasueloLabel").html('Tipo de Roca');
    $("#UGS_tiporocasuelo").append(
      '<option value="Ígnea">Ígnea</option>'+
      '<option value="Sedimentaria">Sedimentaria</option>'+
      '<option value="Metamórfica">Metamórfica</option>'+
      '<option value="Volcanosedimentaria">Volcanosedimentaria</option>'
    );

    $("#UGS_formacima").empty().append(
      '<option value="Aguda">Aguda</option>'+
      '<option value="Subaguda">Subaguda</option>'+
      '<option value="Redondeada">Redondeada</option>'+
      '<option value="Subredondeada">Subredondeada</option>'+
      '<option value="Plana">Plana</option>'
    )
    $("#UGS_formaladera").empty().append(
      '<option value="Recta">Recta</option>'+
      '<option value="Cóncava">Cóncava</option>'+
      '<option value="Convexa">Convexa</option>'+
      '<option value="Irregular o escalonada">Irregular o escalonada</option>'+
      '<option value="Compleja">Compleja</option>'
    )
    $("#UGS_CALIDAD").empty().append(
      '<option value="1">1 - Muy Mala</option>'+
      '<option value="2">2 - Mala</option>'+
      '<option value="3">3 - Regular</option>'+
      '<option value="4">4 - Buena</option>'+
      '<option value="5">5 - Muy Buena</option>'
    )

    // $("#UGS_CALIDAD option").filter(function(){
    //   return $.trim($(this).val()) ==  'No Aplica'
    // }).remove();


  }else{
    $("#UGS_tiporocasueloLabel").html('Tipo de Suelo');
    $("#UGS_tiporocasuelo").append(
      '<option value="Residual">Residual</option>'+
      '<option value="Volcanosedimentario">Volcanosedimentario</option>'+
      '<option value="Coluvial">Coluvial</option>'+
      '<option value="Aluvial">Aluvial</option>'+
      '<option value="Aluvio - Torrencial">Aluvio - Torrencial</option>'
    );

    $("#UGS_formacima").empty().append(
      '<option value="No Aplica">No Aplica</option>'
    )
    $("#UGS_formaladera").empty().append(
      '<option value="No Aplica">No Aplica</option>'
    )
    $("#UGS_CALIDAD").empty().append(
      '<option value="No Aplica">No Aplica</option>'
    )
  }
  
  TipoUGS1(); 
}

function TipoUGS1() {
  $("#UGS_codtipo").empty();

  if ($("#UGS_tiporocasuelo").val() == "Ígnea") {
    $("#UGS_codtipo").append(
      '<option value="Rd - Roca Dura">Rd - Roca Dura</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Sedimentaria") {
    $("#UGS_codtipo").append(
      '<option value="Ri - Roca Intermedia">Ri - Roca Intermedia</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Metamórfica") {
    $("#UGS_codtipo").append(
      '<option value="Rb - Roca Blanda">Rb - Roca Blanda</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Volcanosedimentaria") {
    $("#UGS_codtipo").append(
      '<option></option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Residual") {
    $("#UGS_codtipo").append(
      '<option value="Sr - Residual">Sr - Residual</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Volcanosedimentario") {
    $("#UGS_codtipo").append(
      '<option value="Svi-Svo-Svc - Ignimbritas, oleada piroclástica, caídas piroclásticas">Svi-Svo-Svc - Ignimbritas, oleada piroclástica, caídas piroclásticas</option>'+
      '<option value="Svl-Sva - Lahar, avalancha de escombros">Svl-Sva - Lahar, avalancha de escombros</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Aluvial") {
    $("#UGS_codtipo").append(
      '<option value="Sar-Saca - Aluviones recientes y de cauce activo">Sar-Saca - Aluviones recientes y de cauce activo</option>'+
      '<option value="Sall - Llanura aluvial">Sall - Llanura aluvial</option>'+
      '<option value="Saa-Sac - Abanicos o conos">Saa-Sac - Abanicos o conos</option>'+
      '<option value="Sat - Terrazas">Sat - Terrazas</option>'+
      '<option value="Saft - Fluviotorrenciales">Saft - Fluviotorrenciales</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Coluvial") {
    $("#UGS_codtipo").append(
      '<option value="Sco - Coluvial">Sco - Coluvial</option>'+
      '<option value="Saa-Sac - Talus, Serrubios">Saa-Sac - Talus, Serrubios</option>'+
      '<option value="S - Flujos (lodo, tierra, escombros)">S - Flujos (lodo, tierra, escombros)</option>'
    )
  }else if ($("#UGS_tiporocasuelo").val() == "Aluvio - Torrencial") {
    $("#UGS_codtipo").append(
      '<option></option>'
    )
  }
  
}
// Funcion para Procesos
function TipoIPM(id) {
  if (id == "IPM_TMM1") {
    $("#IPM_SMM1").empty();
    $("#IPM_PARTE").empty();
  
    if ($("#IPM_TMM1").val() == '01') {
      $("#IPM_SMM1").append(
        '<option value="Rotacional">Rotacional</option>'+
        '<option value="Traslacional">Traslacional </option>'
        // '<option value="Deslizamiento en cuña">Deslizamiento en cuña</option>'+
        // '<option value="Deslizamiento traslacional en cuña">Deslizamiento traslacional en cuña</option>'+
        // '<option value="Deslizamiento traslacional planar">Deslizamiento traslacional planar</option>'+
        // '<option value="Deslizamiento licuación de arena">Deslizamiento licuación de arena</option>'+
        // '<option value="Deslizamiento licuación de limo">Deslizamiento licuación de limo</option>'+
        // '<option value="Deslizamiento licuación detritos">Deslizamiento licuación detritos</option>'+
        // '<option value="Deslizamiento licuación roca fracturada">Deslizamiento licuación roca fracturada</option>'+
        // '<option value="Deslizamiento por flujo">Deslizamiento por flujo</option>'
      );
      $("#IPM_PARTE").append(
        '<option value="00">00 - Punto</option>'+
        '<option value="01">01 - Escarpe</option>'+
        '<option value="02">02 - Tránsito</option>'+
        '<option value="03">03 - Depósito</option>'+
        '<option value="04">04 - Cuerpo</option>'+
        '<option value="05">05 - Indefinido</option>'
      );
    }else if ($("#IPM_TMM1").val() == '04') {
      $("#IPM_SMM1").append(
        '<option value="Flujo de Lodo">Flujo de Lodo</option>'+
        '<option value="Flujo de lodo">Flujo de lodo</option>'+
        '<option value="Flujo de Tierra">Flujo de Tierra</option>'+
        '<option value="Flujo de tierra">Flujo de tierra</option>'+
        '<option value="Flujo de Detritos">Flujo de Detritos</option>'+
        '<option value="Flujo de detritos">Flujo de detritos</option>'
      );
      $("#IPM_PARTE").append(
        '<option value="00">00 - Punto</option>'+
        '<option value="01">01 - Escarpe</option>'+
        '<option value="02">02 - Tránsito</option>'+
        '<option value="03">03 - Depósito</option>'+
        '<option value="04">04 - Cuerpo</option>'+
        '<option value="05">05 - Indefinido</option>'
      );
    }else if ($("#IPM_TMM1").val() == '03') {
      $("#IPM_SMM1").append(
        '<option value="Caída de Suelo">Caída de Suelo</option>'+
        '<option value="Caída de Roca">Caída de Roca</option>'
      );
      $("#IPM_PARTE").append(
        '<option value="00">00 - Punto</option>'+
        '<option value="01">01 - Escarpe</option>'+
        '<option value="02">02 - Tránsito</option>'+
        '<option value="03">03 - Depósito</option>'+
        '<option value="04">04 - Cuerpo</option>'+
        '<option value="05">05 - Indefinido</option>'
      );
    }else if ($("#IPM_TMM1").val() == '02') {
      $("#IPM_SMM1").append(
        '<option value="Reptación de Suelos">Reptación de Suelos</option>'+
        '<option value="Reptación de suelos">Reptación de suelos</option>'+
        '<option value="Solifluxión">Solifluxión</option>'
      );
      $("#IPM_PARTE").append(
        '<option value="00">00 - Punto</option>'+
        '<option value="04">04 - Cuerpo</option>'+
        '<option value="05">05 - Indefinido</option>'
      );
    }
    TipoIPM1();
  }
  if (id == "IPM_TMM2") {
    $("#IPM_SMM2").empty();
  
    if ($("#IPM_TMM2").val() == 'Deslizamiento') {
      $("#IPM_SMM2").append(
        '<option value="Rotacional">Rotacional</option>'+
        '<option value="Traslacional">Traslacional </option>'
      );
    }else if ($("#IPM_TMM2").val() == 'Flujo') {
      $("#IPM_SMM2").append(
        '<option value="Flujo de Lodo">Flujo de Lodo</option>'+
        '<option value="Flujo de lodo">Flujo de lodo</option>'+
        '<option value="Flujo de Tierra">Flujo de Tierra</option>'+
        '<option value="Flujo de tierra">Flujo de tierra</option>'+
        '<option value="Flujo de Detritos">Flujo de Detritos</option>'+
        '<option value="Flujo de detritos">Flujo de detritos</option>'
      );
    }else if ($("#IPM_TMM2").val() == 'Caída') {
      $("#IPM_SMM2").append(
        '<option value="Caída de Suelo">Caída de Suelo</option>'+
        '<option value="Caída de Roca">Caída de Roca</option>'
      );
    }else if ($("#IPM_TMM2").val() == 'Reptación') {
      $("#IPM_SMM2").append(
        '<option value="Reptación de Suelos">Reptación de Suelos</option>'+
        '<option value="Reptación de suelos">Reptación de suelos</option>'+
        '<option value="Solifluxión">Solifluxión</option>'
      );
    }else if ($("#IPM_TMM2").val() == 'No Aplica') {
      $("#IPM_SMM2").append(
        '<option value="No Aplica">No Aplica</option>'
      );
    }
  }
  if (id == "IPM_ACTIVIDAD") {
    $("#IPM_ESTACT").empty();
  
    if ($("#IPM_ACTIVIDAD").val() == '0') {
      $("#IPM_ESTACT").append(
        '<option value="04">04 - Latente</option>' +
        '<option value="05">05 - Estabilizado</option>'+
        '<option value="06">06 - Relicto</option>'
      );
    }else if ($("#IPM_ACTIVIDAD").val() == '1') {
      $("#IPM_ESTACT").append(
        '<option value="01">01 - Activo</option>'+
        '<option value="02">02 - Reactivado</option>'+
        '<option value="03">03 - Suspendido</option>'
      );
    }
    TipoIPM1();
  }
  if(id == "IPM_IDMOV" || id == "IPM_PARTE"){
    $("#IPM_IDPART").val($("#IPM_IDMOV").val() + '-' + $("#IPM_PARTE").val());
    TipoIPM1();
  }

}

function TipoIPM1() {

  var etiqueta ='';

  // Etiqueta

  if ($("#IPM_TMM1").val() == '01') {
    etiqueta = 'd';
  }else if ($("#IPM_TMM1").val() == '04') {
    etiqueta = 'f';
  }else if ($("#IPM_TMM1").val() == '03') {
    etiqueta = 'c';
  }else if ($("#IPM_TMM1").val() == '02') {
    etiqueta = 'r';
    etiqueta += ($("#IPM_PROF").val() == 'Profundo') ? 'p' : 's';
  }

  if ($("#IPM_SMM1").val() == 'Rotacional') {
    etiqueta += 'r'
    etiqueta += ($("#IPM_PROF").val() == 'Profundo') ? 'p' : 's';
  } else if ($("#IPM_SMM1").val() == 'Traslacional') {
    etiqueta += 't'
    etiqueta += ($("#IPM_PROF").val() == 'Profundo') ? 'p' : 's';
  } else if ($("#IPM_SMM1").val() == 'Caída de Suelo' || $("#IPM_SMM1").val() == 'Caída de suelo') {
    etiqueta += 's'
  } else if ($("#IPM_SMM1").val() == 'Caída de Roca' || $("#IPM_SMM1").val() == 'Caída de roca') {
    etiqueta += 'r'
  } else if ($("#IPM_SMM1").val() == 'Flujo de lodo' || $("#IPM_SMM1").val() == 'Flujo de Lodo') {
    etiqueta += 'l'
  } else if ($("#IPM_SMM1").val() == 'Flujo de tierra' || $("#IPM_SMM1").val() == 'Flujo de Tierra') {
    etiqueta += 't'
  } else if ($("#IPM_SMM1").val() == 'Flujo de detritos' || $("#IPM_SMM1").val() == 'Flujo de Detritos') {
    etiqueta += 'd'
  }

  if ($("#IPM_TMM1").val() !== '02') {
    if ($("#IPM_PARTE").val() == '01') {
      etiqueta += '-e'
    } else if ($("#IPM_PARTE").val() == '03' || $("#IPM_PARTE").val() == '04') {
      etiqueta += '-d'
    } else if ($("#IPM_PARTE").val() == '05') {
      etiqueta += '-n'
    } 
  }
  $("#IPM_ETIQUETA").val(etiqueta);

  // Tipo y Código MM

  var tipo = '';
  if ($("#IPM_PARTE").val() !== "00"){
    if ($("#IPM_TMM1").val() == '01') {
      tipo = 'Deslizamiento';
      tipo += ($("#IPM_ACTIVIDAD").val() == '0') ? ' inactivo' : ' activo';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificado' : ' verificado';
    }else if ($("#IPM_TMM1").val() == '04') {
      tipo = 'Flujo';
      tipo += ($("#IPM_ACTIVIDAD").val() == '0') ? ' inactivo' : ' activo';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificado' : ' verificado';
    }else if ($("#IPM_TMM1").val() == '03') {
      tipo = 'Caída';
      tipo += ($("#IPM_ACTIVIDAD").val() == '0') ? ' inactiva' : ' activa';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificada' : ' verificada';
    }else if ($("#IPM_TMM1").val() == '02') {
      tipo = 'Reptación';
      tipo += ($("#IPM_PROF").val() == 'Superficia') ? ' superficial' : ' profunda';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificada' : ' verificada';
    }
  
    if ($("#IPM_TMM1").val() !== '02') {
      if ($("#IPM_PARTE").val() == '01') {
        tipo += ' (escarpe)';
      }else if ($("#IPM_PARTE").val() == '02') {
        tipo += ' (tránsito)';
      }else if ($("#IPM_PARTE").val() == '03' || $("#IPM_PARTE").val() == '04') {
        tipo += ' (cuerpo)';
      }
    }
    
    $("#IPM_CODMM").val(tipo_cod_MM[tipo]);
  }
  else if ($("#IPM_PARTE").val() == "00"){
    if ($("#IPM_TMM1").val() == '01') {
      tipo = 'Deslizamiento';
      tipo += ($("#IPM_ACTIVIDAD").val() == '0') ? ' inactivo' : ' activo';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificado' : ' verificado';
    }else if ($("#IPM_TMM1").val() == '04') {
      tipo = 'Flujo';
      tipo += ($("#IPM_ACTIVIDAD").val() == '0') ? ' inactivo' : ' activo';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificado' : ' verificado';
    }else if ($("#IPM_TMM1").val() == '03') {
      tipo = 'Caída';
      tipo += ($("#IPM_ACTIVIDAD").val() == '0') ? ' inactiva' : ' activa';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificada' : ' verificada';
    }else if ($("#IPM_TMM1").val() == '02') {
      tipo = 'Reptación';
      tipo += ($("#IPM_PROF").val() == 'Superficia') ? ' superficial' : ' profunda';
      tipo += ($("#IPM_VERICAM").val() == '0') ? ' no verificada' : ' verificada';
    }
  
    tipo += ' (punto)';
    
    $("#IPM_CODMM").val(tipo_cod_MM_point[tipo]);
  }

  console.log(tipo);

}
// Funcion para Morfometría
$("input[name=Formas]").click(function () {    

  document.getElementById("content-morfo").style.maxHeight = '500px';

  if($('input:radio[name=Formas]:checked').val() == 'formaLadera'){
    $("#MORFO_formaCresta").empty();
    $("#MORFO_formaValle").empty();
    $("#MORFO_formaLadera").empty();
    $("#MORFO_formaLadera").append(
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-ladera" id="fomaLadera1" value="Rectilínea" >'+
          '<img src="images/Morfo/linea.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaLadera1">'+
              'Rectilínea'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-ladera" id="fomaLadera2" value="Cóncava" >'+
          '<img src="images/Morfo/concava.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaLadera2">'+
              'Cóncava'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-ladera" id="fomaLadera3" value="Convexa" >'+
          '<img src="images/Morfo/convexa.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaLadera3">'+
              'Convexa'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-ladera" id="fomaLadera4" value="Irregular" >'+
          '<img src="images/Morfo/irregular.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaLadera4">'+
              'Irregular'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-ladera" id="fomaLadera5" value="Compleja">'+
          '<img src="images/Morfo/compleja.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaLadera5">'+
              'Compleja'+
          '</label>'+
      '</div>'
    );

    $("input[name=forma-ladera]").click(function () {  
      forma = 'Forma de Ladera: ' + $('input:radio[name=forma-ladera]:checked').val();
    });

  }else if($('input:radio[name=Formas]:checked').val() == 'formaCresta'){
    $("#MORFO_formaLadera").empty();
    $("#MORFO_formaValle").empty();
    $("#MORFO_formaCresta").empty();
    $("#MORFO_formaCresta").append(
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-cresta" id="fomaCresta1" value="Aguda" >'+
          '<img src="images/Morfo/aguda.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaCresta1">'+
              'Aguda'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-cresta" id="fomaCresta2" value="Redondeada" >'+
          '<img src="images/Morfo/redondeada.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaCresta2">'+
              'Redondeada'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-cresta" id="fomaCresta3" value="Plana" >'+
          '<img src="images/Morfo/plana.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaCresta3">'+
              'Plana'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-cresta" id="fomaCresta4" value="Plana Disectada" >'+
          '<img src="images/Morfo/planadisectada.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaCresta4">'+
              'Plana Disectada'+
          '</label>'+
      '</div>'
    );

    $("input[name=forma-cresta]").click(function () {  
      forma = 'Forma de Cresta: ' + $('input:radio[name=forma-cresta]:checked').val();
    });

  }else if($('input:radio[name=Formas]:checked').val() == 'formaValle'){
    $("#MORFO_formaLadera").empty();
    $("#MORFO_formaCresta").empty();
    $("#MORFO_formaValle").empty();
    $("#MORFO_formaValle").append(
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-valle" id="fomaValle1" value="Artesa" >'+
          '<img src="images/Morfo/artesa.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaValle1">'+
              'Artesa'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-valle" id="fomaValle2" value="Forma de V" >'+
          '<img src="images/Morfo/v.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaValle2">'+
              'Forma de V'+
          '</label>'+
      '</div>'+
      '<div class="form-check opt">'+
          '<input class="form-check-input inputs-formas" type="radio" name="forma-valle" id="fomaValle3" value="Forma de U" >'+
          '<img src="images/Morfo/u.png" class="img-morfo"/>'+
          '<label class="form-check-label" for="fomaValle3">'+
              'Forma de U'+
          '</label>'+
      '</div>'
    );

    $("input[name=forma-valle]").click(function () {  
      forma = 'Forma de Valle: ' + $('input:radio[name=forma-valle]:checked').val();
    });

  };
  
});


// ................................Funciones para carga de archivos
// Función para la carga de archivos KML
function handleFileKML(f) {
  var reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {

      fetch(e.target.result)
        .then(res => res.text())
        .then(kmltext => {
          // Create new kml overlay
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');
          const track = new L.KML(kml);
          console.log(track.toGeoJSON());
          track.setStyle({opacity : 1});  
          track.addTo(map);  
          map.fitBounds(track.getBounds());
          featureFiles.push(track);
          GraficarBotonFiles(f);
          // $(".leaflet-pane .leaflet-marker-pane img").attr("src", "tupapaaaa");
          // var vals = $(".leaflet-pane.leaflet-marker-pane img").attr("src");
          
          // console.log(vals);
          $(".leaflet-pane.leaflet-marker-pane img").each(function(index) {
            // console.log(index + ": " + $(this).text());
            // console.log($(this).attr("src"));
            if ($(this).attr("src") == "http://download.avenza.com/images/pdfmaps_icons/green_pin.png" ) {
              $(this).attr("src", "../images/green_pin.png");
            }
            if ($(this).attr("src") == "http://download.avenza.com/images/pdfmaps_icons/red_pin.png" ) {
              $(this).attr("src", "../images/red_pin.png");
            }
            if ($(this).attr("src") == "http://download.avenza.com/images/pdfmaps_icons/yellow_pin.png" ) {
              $(this).attr("src", "../images/yellow_pin.png");
            }
            if ($(this).attr("src") == "http://download.avenza.com/images/pdfmaps_icons/gray_pin.png" ) {
              $(this).attr("src", "../images/gray_pin.png");
            }
            if ($(this).attr("src") == "http://download.avenza.com/images/pdfmaps_icons/blue_pin.png" ) {
              $(this).attr("src", "../images/blue_pin.png");
            }
            if ($(this).attr("src") == "http://download.avenza.com/images/pdfmaps_icons/Rangers.png" ) {
              $(this).attr("src", "../images/Rangers.png");
            }
          });
        });
    };
  })(f);
  reader.readAsDataURL(f); 
}
// Función para la carga de archivos SHP comprimidos en .zip
function handleFileSHP(f) {
  var reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {

      var shpfile = new L.Shapefile(e.target.result, {
        onEachFeature: function(feature, layer) {
          if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
              return k + ": " + feature.properties[k];
            }).join("<br />"), {
              maxHeight: 200
            });
          }
        }
      });
      shpfile.setStyle({opacity : 1});  
      shpfile.addTo(map);  
      // map.fitBounds(shpfile.getBounds());
      featureFiles.push(shpfile);
      GraficarBotonFiles(f);
      shpfile.once("data:loaded", function() {
        console.log("finished loaded shapefile");
        console.log(shpfile.toGeoJSON());
      });   

    };
  })(f);
  reader.readAsArrayBuffer(f);
}
// Función para la carga de archivos GeoJSON
function handleFileGeoJSON(f) {
  
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {

        var obj = JSON.parse(e.target.result);
        
        var geoJSON = new L.geoJson(obj, {
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
              }).join("<br />"), {
                maxHeight: 200
              });
            }
          }
        });
        geoJSON.setStyle({opacity : 1});  
        geoJSON.addTo(map);  
        map.fitBounds(geoJSON.getBounds());
        featureFiles.push(geoJSON);
        GraficarBotonFiles(f);
      };
    })(f);
    reader.readAsText(f);
  
}
// Función para la carga de archivos Raster con extensión .tif
function handleFileRaster(f) {
  
  var reader = new FileReader();
  reader.readAsArrayBuffer(f);
  reader.onloadend = function() {
    var arrayBuffer = reader.result;
    parseGeoraster(arrayBuffer).then(georaster => {

      console.log("georaster:", georaster);
      var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.7,
          resolution: 256
      });
      console.log("layer:", layer);
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      featureFiles.push(layer);
      GraficarBotonFilesRaster(f);
    });
  };
  
}
// Funciones que controlan el input donde se suben los archivos
$('#files').change(function(evt) {
  var files = evt.target.files; // FileList object

  for (var i = 0, f; f = files[i]; i++) {
    if (f.name.slice(-3) === 'zip') {
      handleFileSHP(f);
    }else if (f.name.slice(-3) === 'kml') {
      handleFileKML(f);
    }else if (f.name.slice(-4) === 'json') {
      handleFileGeoJSON(f);
    }else if (f.name.slice(-3) === 'tif') {
      handleFileRaster(f);
    }else{
      alert('Tipo de archivo incorrecto');
    }
  }
});
var featureFiles = [];
var featuresCount = 0;
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

function GraficarBotonFiles(f) {
  $("#list").append(
    '<li class="content-list first">'+
      '<label class="switch">'+
          '<input type="checkbox" checked id="file_' + featuresCount + '" onChange="toggleDatosFiles(id)">'+
          '<span class="slider round"></span>'+
      '</label>'+
      '<a>  '+escape(f.name)+'</a>'+
      '<div id="cp_'+ featuresCount +'" class="input-group inp_plancha" data-color="rgb(255, 255, 255)">'+
        '<span class="input-group-text colorpicker-input-addon span_plancha"><i></i></span>'+
      '</div>'+
      '<div class="slidecontainer">'+
          '<input type="range" min="0" max="100" value="0" class="sliderb" id="transp_file_'+featuresCount+'">'+
          '<p>Transparencia: <span id="valTransp_file_'+featuresCount+'"></span>%</p>'+
      '</div>'+
    '</li>'
  );
  var slider = $("#transp_file_"+featuresCount)[0];
  var output = $("#valTransp_file_"+featuresCount)[0];
  output.innerHTML = slider.value;
  slider.oninput = function () {
    var id = parseInt($(this).attr('id').split('_')[2]);
    var output = $("#valTransp_file_"+id)[0];
    output.innerHTML = this.value;
    var transpa = (100 - parseInt(this.value)) / 100;
    if ($('#file_' + id).prop('checked')) {
      featureFiles[id].setStyle({opacity : transpa});
    }
  }
  $('#cp_'+featuresCount).colorpicker().on('colorpickerChange colorpickerCreate', function (e) {
    var id = parseInt($(this).attr('id').split('_')[1]);
    if ($('#file_' + id).prop('checked')) {
      featureFiles[id].setStyle({
        color: e.value,
        fillColor: e.value
      });
    }
  });
  document.getElementById("archi").style.maxHeight = $("#archi").height()+150+"px";
  $("#archi").height($("#archi").height()+150);
  featuresCount++;
}
function GraficarBotonFilesRaster(f) {
  $("#list").append(
    '<li class="content-list first">'+
      '<label class="switch">'+
          '<input type="checkbox" checked id="file_' + featuresCount + '" onChange="toggleDatosFiles(id)">'+
          '<span class="slider round"></span>'+
      '</label>'+
      '<a>  '+escape(f.name)+'</a>'+
    '</li>'
  );
  document.getElementById("archi").style.maxHeight = $("#archi").height()+100+"px";
  $("#archi").height($("#archi").height()+100);
  featuresCount++;
}
function toggleDatosFiles(id){
  var num = id.split("_")[1];
  console.log('entra');
  if ($('#'+id).prop('checked')){
    featureFiles[num].addTo(map);
  } else{
    map.removeLayer(featureFiles[num]);
  }
}


// ................................Funciones para el manejo y edición de la base de datos
//CambiarCampoSegunID();
function CambiarCampoSegunID() {
  var auxClase = [];
  var cont=0;

  // var ids = [
  //   
  // ];
  // for (let i = 0; i < ids.length; i++) {
    
  //   for (let j = 0; j < base_clase["count"]["count"]; j++) {
  //     if (base_clase["feature_"+j]["layergeojson"]["properties"]["ID_MOV"] == ids[i]) {
  //       var aux = base_clase["feature_"+j]["layergeojson"]["properties"]["REF_GEOGRF"].toLowerCase();
  //       aux = aux.split(" ");
  //       var a = aux[0].charAt(); //Sacamos la primera letra
  //       var b = aux[0].slice(1); //Sacamos el resto de la palabra
  //       var word = a.toUpperCase() + b;
  //       aux[0] = word;
  //       aux = aux.join(" ");
  //       auxClase.push(base_clase["feature_"+j]["layergeojson"]["properties"]["REF_GEOGRF"])
  //       base_clase["feature_"+j]["layergeojson"]["properties"]["REF_GEOGRF"] = aux;
  //       auxClase.push(aux);
  //     }
  //   }
    
  // }

  // console.log(auxClase);

  // var auxClase = [];
  // for (let j = 0; j < base_clase["count"]["count"]; j++) {
    
  //   var aux = base_clase["feature_"+j]["layergeojson"]["properties"]["VEREDA"];
  //   if (aux !== undefined) {
  //     auxClase.push(aux);
  //     aux = aux.split("-");
  //     aux = aux.join(" - ");
  //     base_clase["feature_"+j]["layergeojson"]["properties"]["VEREDA"] = ArreglarMayus(aux);
  //     auxClase.push(base_clase["feature_"+j]["layergeojson"]["properties"]["VEREDA"]);
  //   }

  //   base_clase["feature_"+j]["layergeojson"]["properties"]["Mapa"] = "01";
  //   base_clase["feature_"+j]["layergeojson"]["properties"]["DPTO"] = "CALDAS";
  //   if(base_clase["feature_"+j]["layergeojson"]["properties"]["NOM_MUN"] !== undefined){
  //     base_clase["feature_"+j]["layergeojson"]["properties"]["NOM_MUN"] = base_clase["feature_"+j]["layergeojson"]["properties"]["NOM_MUN"].toUpperCase();
  //   }
    
  // }

  //console.log(auxClase);



  // var infoSec = [];


  //   for (let j = 0; j < base_clase["count"]["count"]; j++) {
  //     var aux = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"];
  //     if (base_clase["feature_"+j]["activo"] && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'LineString' && aux !== undefined && aux !== '' && !aux.includes('Image') && aux !== 'Geovisor' && !aux.includes('Fotografía') && !aux.includes('F') && !aux.includes('ANAGLIFO') && !aux.includes('Anaglifo') && !aux.includes('oo') && aux.length == 16 ) {
  //       infoSec.push(aux);
  //       aux = aux.split('-');
  //       if(aux[1]=='1152'){
  //         base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = 'Fotografías aéreas IGAC ' + aux[2] +'_'+ aux[3] +' Vuelo R-'+ aux[1] +' (01/01/1990)'
  //       }
  //       else if(aux[1]=='1151'){
  //         base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = 'Fotografías aéreas IGAC ' + aux[2] +'_'+ aux[3] +' Vuelo R-'+ aux[1] +' (01/07/1989)'
  //       }
  //       infoSec.push(base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"]);
  //     }
  //   }

  // console.log(infoSec);
  // console.log(base_clase);


  // for (let j = 0; j < base_clase["count"]["count"]; j++) {
  //   if (base_clase["feature_"+j]["layergeojson"]["properties"]["ENCUESTAD"] == 'Natalia Pino') {
  //     var aux = base_clase["feature_"+j]["layergeojson"]["properties"]["ID_MOV"].split('NP');
  //     aux = aux.join('');
  //     aux = parseInt(aux);
  //     if (aux >= 70 && aux <= 285) {
  //       if (base_clase["feature_"+j]["layergeojson"]["properties"]["ID_MOV"] == newGeoJSON['features'][cont].properties.ID_MOV) {
  //         base_clase["feature_"+j]["layergeojson"]["properties"]["PARTE"] = newGeoJSON['features'][cont].properties.PARTE;
  //         cont++;
  //       }
  //     }
  //     auxClase.push(base_clase["feature_"+j]["layergeojson"]["properties"]["ID_MOV"]);
  //     auxClase.push(base_clase["feature_"+j]["layergeojson"]["properties"]["PARTE"]);
  //   }
  // }

  // for (let i = 1167; i < 1300; i++) {

  //   aux = i+1;
  //   base_clase["feature_"+i]["layergeojson"]["properties"] = base_clase["feature_"+aux]["layergeojson"]["properties"] ;
  //   if (i===1299) {
  //     base_clase["feature_1299"]["layergeojson"]["geometry"] = aguadas["features"][193]["geometry"] ;
  //   } 
    
  // }
  
  // var basesita = base_clase;
  

  //var capita = L.layerGroup().addTo(map);

  // for (let i = 1167; i < 1301; i++) {
    
  //     L.extend(basesita['feature_'+i]['layergeojson'].properties, {
  //       id: basesita['feature_'+i]["id"],
  //       clase: 'procesos',
  //       nombreclase: 'Procesos Morfodinámicos'
  //     });
  //     L.geoJson(basesita['feature_'+i]['layergeojson'],{
  //       onEachFeature: function (feature, layer) {
  //         feature.layer = layer;
  //         layer.bindPopup(popupFiguras);
  //       }
  //     })
  //     .bindPopup(popupFiguras)
  //     .addTo(capita);
    
  // }

  for (let j = 0; j < base_clase["count"]["count"]; j++) {
    var text = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"]; 
    //console.log(base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"]);
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(";").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(";  ").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(";   ").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split("  ;  ").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(" ; ").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(";; ").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(", ").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(",").join("; ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(";  ").join("; ");
    // base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"] = base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"].split(";").join("; ");
    // console.log(base_clase["feature_"+j]["layergeojson"]["properties"]["FTE_INFSEC"]);
    
    base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"] = base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"].split(",").join(", ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"] = base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"].split(";").join(", ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"] = base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"].split(" y").join(", ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"] = base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"].split(" Y").join(", ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"] = base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"].split(",  ").join(", ");
    base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"] = base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"].split(",   ").join(", ");
    console.log(base_clase["feature_"+j]["layergeojson"]["properties"]["ANOS"]);


    var tipo = base_clase["feature_"+j]["layergeojson"]['properties'].TIPO_MOV1;
    var subtipo = base_clase["feature_"+j]["layergeojson"]['properties'].SUBTIPO_1;
    var profundidad = base_clase["feature_"+j]["layergeojson"]['properties'].PROF;
    var parte = base_clase["feature_"+j]["layergeojson"]['properties'].PARTE;
    var actividad = base_clase["feature_"+j]["layergeojson"]['properties'].ACTIVIDAD;
    var verificado = base_clase["feature_"+j]["layergeojson"]['properties'].VERIF_CAM;
    var etiqueta =''


    if (tipo == '01') {
      etiqueta = 'd';
    }else if (tipo == '04') {
      etiqueta = 'f';
    }else if (tipo == '03') {
      etiqueta = 'c';
    }else if (tipo == '02') {
      etiqueta = 'r';
      etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
    }

    if (subtipo == 'Rotacional') {
      etiqueta += 'r'
      etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
    } else if (subtipo == 'Traslacional') {
      etiqueta += 't'
      etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
    } else if (subtipo == 'Caída de Suelo') {
      etiqueta += 's'
    } else if (subtipo == 'Caída de Roca') {
      etiqueta += 'r'
    } else if (subtipo == 'Flujo de lodo') {
      etiqueta += 'l'
    } else if (subtipo == 'Flujo de tierra') {
      etiqueta += 't'
    } else if (subtipo == 'Flujo de detritos') {
      etiqueta += 'd'
    }

    if (tipo !== '02') {
      if (parte == '01') {
        etiqueta += '-e'
      } else if (parte == '03' || parte == '04') {
        etiqueta += '-d'
      } else if (parte == '05') {
        etiqueta += '-n'
      } 
    }
    base_clase["feature_"+j]["layergeojson"]['properties'].ETIQUETA = etiqueta;

    var tipoMM = '';

    if (tipo == '01') {
      tipoMM = 'Deslizamiento';
      tipoMM += (actividad == '0') ? ' inactivo' : ' activo';
      tipoMM += (verificado == '0') ? ' no verificado' : ' verificado';
    }else if (tipo == '04') {
      tipoMM = 'Flujo';
      tipoMM += (actividad == '0') ? ' inactivo' : ' activo';
      tipoMM += (verificado == '0') ? ' no verificado' : ' verificado';
    }else if (tipo == '03') {
      tipoMM = 'Caída';
      tipoMM += (actividad == '0') ? ' inactiva' : ' activa';
      tipoMM += (verificado == '0') ? ' no verificada' : ' verificada';
    }else if (tipo == '02') {
      tipoMM = 'Reptación';
      tipoMM += (profundidad == 'Superficia') ? ' superficial' : ' profunda';
      tipoMM += (verificado == '0') ? ' no verificada' : ' verificada';
    }

    if (tipo !== '02') {
      if (parte == '01') {
        tipoMM += ' (escarpe)';
      }else if (parte == '02') {
        tipoMM += ' (tránsito)';
      }else if (parte == '03' || parte == '04') {
        tipoMM += ' (cuerpo)';
      }
    }
    base_clase["feature_"+j]["layergeojson"].properties.Cod_MM = tipo_cod_MM[tipoMM];
    base_clase["feature_"+j]["layergeojson"].properties.Tipo_MM = tipo_cod_MM[tipoMM];

  
  }


  console.log(base_clase);
  // console.log(basesita);
  // console.log(capita.toGeoJSON());
  // searchCtrl.indexFeatures(capita.toGeoJSON(), ['nombreclase','id','ID_MOV','ENCUESTAD','TIPO_MOV1','ID_PARTE','Tipo_MM','VEREDA','Propietario','Nom_Rasgo','Cod_Rasgo','Nom_UGS','Tipo','TipoRocaSuelo','Vereda','Cod_SGMF','Nom_SGMF','Forma','NOM_MUN']);

}

// GuardarNuevoProceso(alturas,'procesos',3331);
function GuardarNuevoProceso(newGeoJSON, newClase, count) {
  var newCount = count;
  // newGeoJSON={'features' : []};
  // var baseClase = [];
  // for (let ind = 0; ind < movSubir.length; ind++) {
  //   if (!baseClase.includes(movSubir[ind])) {
  //     baseClase.push(movSubir[ind]);
  //   }
  // }
  // for (let ind = 0; ind < baseClase.length; ind++) {
  //   for (let j = 0; j < base_clase["count"]["count"]; j++) {
  //     if (base_clase["feature_"+j]["activo"] && baseClase[ind]==base_clase["feature_"+j]["layergeojson"]["properties"]["ID_MOV"]) {
  //       newGeoJSON['features'].push(base_clase["feature_"+j]["layergeojson"])
  //     }
  //   }
  // }

  // var numViejos = ['2922','2924','2925']
  // var numNuevos = ['2689','2691','2692']

  // for (let ind = 0; ind < numViejos.length; ind++) {
  //   console.log(base_clase["feature_"+numViejos[ind]]);
  // }


  for (let i = 0; i < newGeoJSON['features'].length; i++) {
    delete newGeoJSON['features'][i].properties.FID;
    delete newGeoJSON['features'][i].properties.OBJECTID;
    delete newGeoJSON['features'][i].properties.F11;
    delete newGeoJSON['features'][i].properties.COD;
    delete newGeoJSON['features'][i].properties.DPTOMPIO;
    delete newGeoJSON['features'][i].properties.CODIGO_VER;
    delete newGeoJSON['features'][i].properties.NOM_DEP;
    delete newGeoJSON['features'][i].properties.NOMB_MPIO;
    delete newGeoJSON['features'][i].properties.Shape_Leng;
    delete newGeoJSON['features'][i].properties.Shape_Area;
    delete newGeoJSON['features'][i].id;
    delete newGeoJSON['features'][i].properties.Nom_SGMF;
    delete newGeoJSON['features'][i].properties.Cod_SGMF;
    delete newGeoJSON['features'][i].properties.Ambiente;
    delete newGeoJSON['features'][i].properties.Descripcio;

    // console.log("CapaNueva: "+newGeoJSON['features'][i].properties.ID_MOV + " ; Actual: " + base_clase["feature_"+i]["layergeojson"].properties.ID_MOV);

    newGeoJSON['features'][i].properties.ID_PARTE = newGeoJSON['features'][i].properties.ID_MOV + '-' + newGeoJSON['features'][i].properties.PARTE

    // database.ref('features/'+newClase+'/feature_'+newCount).set({
    //   id: newCount,
    //   activo : true,
    //   uid: '',
    //   layergeojson : newGeoJSON['features'][i],
    // });
      
    newCount++;
  }
  
  // console.log(movSubir);
  // console.log(baseClase);
  console.log(newCount);
  console.log(newGeoJSON);
  // database.ref('features/'+newClase+'/count').set({
  //   count : newCount
  // });

}

//GuardarNuevoRasgo(alturas,'rasgos',8416);
function GuardarNuevoRasgo(newGeoJSON, newClase, count) {
  var newCount = count;
  for (let i = 0; i < newGeoJSON['features'].length; i++) {
    delete newGeoJSON['features'][i].properties.FID;
    delete newGeoJSON['features'][i].properties.OBJECTID_1;
    delete newGeoJSON['features'][i].properties.OBJECTID;
    delete newGeoJSON['features'][i].properties.Shape_Leng;
    delete newGeoJSON['features'][i].properties.Shape_Le_1;
    delete newGeoJSON['features'][i].properties.Name;
    delete newGeoJSON['features'][i].properties.Cod;
    delete newGeoJSON['features'][i].properties.F10;
    delete newGeoJSON['features'][i].id;
    

    var cod_mpio1s = {
      "AGUADAS": "17013" ,
      "ARANZAZU": "17050" ,
      "FILADELFIA": "17272" ,
      "MARQUETALIA": "17444" ,
      "RIOSUCIO": "17614" ,
      "SUPIA": "17777" ,
      "NA":""
    }



    newGeoJSON['features'][i].properties.Nom_Rasgo = newGeoJSON['features'][i].properties.Cod_Rasgo;
    newGeoJSON['features'][i].properties.COD_MUN = cod_mpio1s[newGeoJSON['features'][i].properties.NOM_MUN];

    // console.log(newGeoJSON['features'][i].properties.COD_MUN);
    // console.log(newGeoJSON['features'][i].properties.NOM_MUN);
    
    // database.ref('features/'+newClase+'/feature_'+newCount).set({
    //   id: newCount,
    //   activo : true,
    //   uid: 'oK5YiHYUkEUq1U9YDcy8NCkNaHq1',
    //   layergeojson : newGeoJSON['features'][i],
    // });

      newCount++;
  }

  console.log(newGeoJSON);
  // database.ref('features/'+newClase+'/count').set({
  //   count : newCount
  // });
}

// Otros();
function Otros() {

  var idpartes = [];
  var idpartesrepetidos = [];
  var vieja = [];

  for (let j = 0; j < base_clase["count"]["count"]; j++) {
    
    if (base_clase["feature_"+j]["layergeojson"]["COD_SIMMA"] != alturas["feature_"+j]["layergeojson"]["COD_SIMMA"]){
      console.log(j)
    }
    
  }

  // var nueva = {"count" : {"count": 0} };
  // var newCount = 0;
  // for (let i = 0; i < alturas["features"].length; i++) {


  //   if (!idpartes.includes(alturas["features"][i]["properties"]["ID_PARTE"])) {
  //     idpartes.push(alturas["features"][i]["properties"]["ID_PARTE"]);
  //   }else{
  //     idpartesrepetidos.push(alturas["features"][i]["properties"]["ID_PARTE"])
  //   }

  //   var auxLayer = vieja.find((layerVieja)=> layerVieja.properties.ID_PARTE == alturas["features"][i]["properties"]["ID_PARTE"]);

  //   alturas["features"][i]["properties"]["LITOLOGIA"] = auxLayer.properties.LITOLOGIA;
  //   console.log(auxLayer.properties.ID_PARTE);

  //   delete alturas["features"][i]["properties"]["OBJECTID"];
  //   delete alturas["features"][i]["properties"]["Shape_Leng"];
  //   delete alturas["features"][i]["properties"]["Shape_Area"];
  //   nueva["feature_"+newCount] = {};
  //   nueva["feature_"+newCount]["layergeojson"] = alturas["features"][i];
  //   nueva["feature_"+newCount]["id"] = newCount;
  //   nueva["feature_"+newCount]["activo"] = true;
  //   nueva["feature_"+newCount]["uid"] = "";
  //   newCount++
  // }
  // nueva["count"]["count"] = newCount;
  // console.log(idpartesrepetidos);
  // console.log(vieja);
  // console.log(alturas);
  // console.log(nueva);

}

// PrepararIPMparaSubir()
function PrepararIPMparaSubir() {
  var nueva = {"count" : {"count": 0} };
  var newCount = 0;
  for (let i = 0; i < alturas["features"].length; i++) {
    delete alturas["features"][i]["properties"]["OBJECTID"];
    delete alturas["features"][i]["properties"]["Shape_Leng"];
    delete alturas["features"][i]["properties"]["Shape_Area"];
    delete alturas["features"][i]["properties"]["RASTERVALU"];
    delete alturas["features"][i]["properties"]["Area"];
    delete alturas["features"][i]["properties"]["Obs"];
    alturas["features"][i]["properties"]["ID_FORMAT"] = "SIMMA"+alturas["features"][i]["properties"]["COD_SIMMA"];
    if (alturas["features"][i]["properties"]["ID_PARTE"] == undefined) {
      alturas["features"][i]["properties"]["PARTE"] = "00";
      alturas["features"][i]["properties"]["ID_PARTE"] = alturas["features"][i]["properties"]["ID_MOV"]+"-"+alturas["features"][i]["properties"]["PARTE"];
    }
    nueva["feature_"+newCount] = {};
    nueva["feature_"+newCount]["layergeojson"] = alturas["features"][i];
    nueva["feature_"+newCount]["id"] = newCount;
    nueva["feature_"+newCount]["activo"] = true;
    nueva["feature_"+newCount]["uid"] = "";
    newCount++
  }
  nueva["count"]["count"] = newCount;
  console.log(alturas);
  console.log(nueva);
}

//CambiarPropierties();
function CambiarPropierties(){
  // var newproces = L.layerGroup();
  var cont = 0;
  for (let j = 0; j < base_clase["count"]["count"]; j++) {
    if (base_clase["feature_"+j]["activo"]) {
      
      if(base_clase["feature_"+j]["layergeojson"]["properties"].FTE_INFSEC.includes(',')){
        console.log(base_clase["feature_"+j]["layergeojson"]["properties"].FTE_INFSEC);
      }
      // base_clase["feature_"+j]["layergeojson"]["properties"].ALTITUD = alturas["features"][cont]["properties"].ALTITUD;
      
      // cont++;

      // var temp = base_clase["feature_"+j]["layergeojson"];
      // L.geoJson(temp).addTo(newproces);
      
    }

  }
  // console.log(newproces.toGeoJSON());
    // console.log(base_clase);
}

//CambiarSubtipo();
function CambiarSubtipo(){
  for(i=0; i<alturas["count"]["count"];i++){
    base_clase["feature_"+i]["layergeojson"]["properties"]["SUBTIPO_1"] = alturas["feature_"+i]["layergeojson"]["properties"]["SUBTIPO_1"];
    base_clase["feature_"+i]["layergeojson"]["properties"]["SUBTIPO_2"] = alturas["feature_"+i]["layergeojson"]["properties"]["SUBTIPO_2"];
  }
  console.log(base_clase);
}

// BorrandoNoActivos();
function BorrandoNoActivos() {

  var nueva = {"count" : {
    "count": 0
  } };
  var newcount = 0;
  for (let j = 0; j < base_clase["count"]["count"]; j++) {
    //Para Rasgos
    // if (base_clase["feature_"+j]["activo"] && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'Polygon'){
    //Para IPM
    if (base_clase["feature_"+j]["activo"] && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'LineString'){
      nueva["feature_"+newcount] = base_clase["feature_"+j];
      nueva["feature_"+newcount]['id'] = newcount;
      newcount++;
    }
  }
  //nueva["count"] = "count";
  nueva["count"]["count"] = newcount;
  c(base_clase);
  c(nueva);

}

// GenerarProcesosyUGS();
function GenerarProcesosyUGS() {
  var newproces = L.layerGroup();
  var newprocesPoint = L.layerGroup();

  // Codigo para IPM y UGS
    for (let j = 0; j < base_clase["count"]["count"]; j++) {
      if (base_clase["feature_"+j]?.activo && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] == 'Polygon') {
        
        var temp = base_clase["feature_"+j]["layergeojson"];

        delete base_clase['feature_'+j]["layergeojson"].properties.id;
        delete base_clase['feature_'+j]["layergeojson"].properties.clase;
        delete base_clase['feature_'+j]["layergeojson"].properties.nombreclase;
        
        L.geoJson(temp).addTo(newproces);

      }
      if (base_clase["feature_"+j]?.activo && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] == 'Point') {
        
        var temp = base_clase["feature_"+j]["layergeojson"];

        base_clase['feature_'+j]["layergeojson"].properties.PARTE = "";
        base_clase['feature_'+j]["layergeojson"].properties.ID_PARTE = "";
        delete base_clase['feature_'+j]["layergeojson"].properties.id;
        delete base_clase['feature_'+j]["layergeojson"].properties.clase;
        delete base_clase['feature_'+j]["layergeojson"].properties.nombreclase;
        
        L.geoJson(temp).addTo(newprocesPoint);

      }
    }
    console.log(newproces.toGeoJSON());
    console.log(newprocesPoint.toGeoJSON());
    console.log(base_clase);
}

// GenerarRasgos();
function GenerarRasgos() {
  var newproces = L.layerGroup();

  // Codigo para Rasgos
  for (let j = 0; j < base_clase["count"]["count"]; j++) {
    if (base_clase["feature_"+j]["activo"] && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'Polygon') {
      delete base_clase['feature_'+j]["layergeojson"].id;
      delete base_clase['feature_'+j]["layergeojson"].properties.CR;
      delete base_clase['feature_'+j]["layergeojson"].properties.Visible_25;
      delete base_clase['feature_'+j]["layergeojson"].properties.Propietari;
      delete base_clase['feature_'+j]["layergeojson"].properties.id;
      delete base_clase['feature_'+j]["layergeojson"].properties.clase;
      delete base_clase['feature_'+j]["layergeojson"].properties.nombreclase;

      
      var temp = base_clase["feature_"+j]["layergeojson"];
      L.geoJson(temp).addTo(newproces);
    }
  }
  console.log(newproces.toGeoJSON());
  console.log(base_clase);
}

// CalcularIdParteEtiquetaTipoCodMM();
function CalcularIdParteEtiquetaTipoCodMM() {
  movs = []
  for (let j = 0; j < base_clase["count"]["count"]; j++) { 
    var tipo = base_clase["feature_"+j]['layergeojson']['properties'].TIPO_MOV1;
    var subtipo = base_clase["feature_"+j]['layergeojson']['properties'].SUBTIPO_1;
    var profundidad = base_clase["feature_"+j]['layergeojson']['properties'].PROF;
    var parte = base_clase["feature_"+j]['layergeojson']['properties'].PARTE;
    var actividad = base_clase["feature_"+j]['layergeojson']['properties'].ACTIVIDAD;
    var verificado = base_clase["feature_"+j]['layergeojson']['properties'].VERIF_CAM;
    var etiqueta =''

    // if(base_clase["feature_"+j]['layergeojson']['properties'].SUBTIPO_2 == "Rotacional" && verificado == "0"){
    //   movs.push(base_clase["feature_"+j]['layergeojson']['properties'].ID_MOV);
    //   base_clase["feature_"+j]['layergeojson']['properties'].SUBTIPO_2 = "";
    //   base_clase["feature_"+j]['layergeojson']['properties'].TIPO_MOV2 = "";

    // }

    base_clase["feature_"+j]['layergeojson']['properties'].ID_PARTE = base_clase["feature_"+j]['layergeojson']['properties'].ID_MOV +'-'+base_clase["feature_"+j]['layergeojson']['properties'].PARTE;

    if (tipo == '01') {
      etiqueta = 'd';
    }else if (tipo == '04') {
      etiqueta = 'f';
    }else if (tipo == '03') {
      etiqueta = 'c';
    }else if (tipo == '02') {
      etiqueta = 'r';
      etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
    }

    if (subtipo == 'Rotacional') {
      etiqueta += 'r'
      etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
    } else if (subtipo == 'Traslacional') {
      etiqueta += 't'
      etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
    } else if (subtipo == 'Caída de Suelo') {
      etiqueta += 's'
    } else if (subtipo == 'Caída de Roca') {
      etiqueta += 'r'
    } else if (subtipo == 'Flujo de lodo' || subtipo == 'Flujo de Lodo') {
      etiqueta += 'l'
    } else if (subtipo == 'Flujo de tierra' || subtipo == 'Flujo de Tierra') {
      etiqueta += 't'
    } else if (subtipo == 'Flujo de detritos' || subtipo == 'Flujo de Detritos') {
      etiqueta += 'd'
    }

    if (tipo !== '02') {
      if (parte == '01') {
        etiqueta += '-e'
      } else if (parte == '03' || parte == '04') {
        etiqueta += '-d'
      } else if (parte == '05') {
        etiqueta += '-n'
      } 
    }
    base_clase["feature_"+j]['layergeojson']['properties'].ETIQUETA = etiqueta;

    var tipoMM = '';

    if (tipo == '01') {
      tipoMM = 'Deslizamiento';
      tipoMM += (actividad == '0') ? ' inactivo' : ' activo';
      tipoMM += (verificado == '0') ? ' no verificado' : ' verificado';
    }else if (tipo == '04') {
      tipoMM = 'Flujo';
      tipoMM += (actividad == '0') ? ' inactivo' : ' activo';
      tipoMM += (verificado == '0') ? ' no verificado' : ' verificado';
    }else if (tipo == '03') {
      tipoMM = 'Caída';
      tipoMM += (actividad == '0') ? ' inactiva' : ' activa';
      tipoMM += (verificado == '0') ? ' no verificada' : ' verificada';
    }else if (tipo == '02') {
      tipoMM = 'Reptación';
      tipoMM += (profundidad == 'Superficia') ? ' superficial' : ' profunda';
      tipoMM += (verificado == '0') ? ' no verificada' : ' verificada';
    }

    if (tipo !== '02') {
      if (parte == '01') {
        tipoMM += ' (escarpe)';
      }else if (parte == '02') {
        tipoMM += ' (tránsito)';
      }else if (parte == '03' || parte == '04') {
        tipoMM += ' (cuerpo)';
      }
    }
    base_clase["feature_"+j]['layergeojson']['properties'].Cod_MM = tipo_cod_MM[tipoMM];
    base_clase["feature_"+j]['layergeojson']['properties'].Tipo_MM = tipo_cod_MM[tipoMM];
  }
  console.log(base_clase);
  console.log(movs);
}

$("#cargar-form-proc").click(function(e){
  e.preventDefault();
  var encontrado = false;

  if(estaciones === undefined){
    alert("Por favor active la capa de Estaciones");
    $("#tooltip-cargar").html("Cargue la capa de Estaciones");
  }
  else{
    var idBuscar = $("#IPM_IDMOV").val();
    $("#tooltip-cargar").html("Buscando en Estaciones...");
    for (let i = 0; i < estaciones["cont"]["cont"]; i++) {
      if (encontrado) {
        break;
      }
      var feature = estaciones["estacion_" + i];
      if (feature.activo) {
        // console.log(i);
        if(feature["Formularios"].count_CATALOGO>0){
          for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
            if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
              var formato = feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]; 
              if(idBuscar === formato["ID_PARTE"]){
                cargarDatosCAT(formato);
                console.log("encontrado");
                encontrado = true;
                break;
              }
            }
          }
        }
        if(feature["Formularios"].count_INVENTARIO>0){
          for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
            if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
              var formato = feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]; 
              if(idBuscar === formato["ID_PARTE"]){
                cargarDatosINV(formato);
                console.log("encontrado");
                encontrado = true;
                break;
              }
            }
          }
        } 
      }
    }
  }

  setTimeout(()=>{
    $("#tooltip-cargar").html("Cargar Datos Desde Estaciones")
  },2000)
  
  //console.log(datosCopiados);

})

var MM_tipo = {
  "Deslizamiento" : '01',
  "Reptación" : '02',
  "Caída" : '03',
  "Flujo" : '04',
};
var mpios_cod = {
  "AGUADAS" : "17013 - AGUADAS",
  "ARANZAZU" : "17050 - ARANZAZU",
  "FILADELFIA" : "17272 - FILADELFIA",
  "MARQUETALIA" : "17444 - MARQUETALIA",
  "RIOSUCIO" : "17614 - RIOSUCIO",
  "SUPIA" : "17777 - SUPÍA",
}

var cober = {
  "0" : "Veg. Herbácea",
  "1" : "Bosque/Selva",
  "2" : "Matorrales",
  "3" : "Cuerpo de agua",
  "4" : "Cultivos",
  "5" : "Construcciones",
  "6" : "Pastos",
  "7" : "Sin cobertura",
}

var usos ={
  "0" : "Ganaderia",
  "1" : "Agrícola",
  "2" : "Recreación",
  "3" : "Vivienda",
  "4" : "Mineria",
  "5" : "Área protegida",
  "6" : "Vias",
  "7" : "Zona arqueológica",
  "8" : "Zona Industrial",
  "9" : "Sin uso",
}

var auxact = {
  "Activo" : "01",
  "Reactivado" : "02",
  "Suspendido" : "03",
  "Latente" : "04",
  "Estabilizado" : "05",
  "Relicto" : "06"
}

var confifecha = {
  "Exacta" : "01",
  "Certeza mes y año" : "02",
  "Certeza Año" : "03",
  "Confiabilidad baja" : "04",
  "Incierta" : "05",
}

var auxestilo = {
  "Complejo" : "01",
  "Compuesto" : "02",
  "Múltiple" : "03",
  "Sucesivo" : "04",
  "Único" : "05",
}

var auxdistri = {
  "Retrogresivo" : "01",
  "Avanzado" : "02",
  "Ensanchado" : "03",
  "Confinado" : "04",
  "Creciente" : "05",
  "Decreciente" : "06",
  "Movil" : "07",
}

function cargarDatosINV(formato) {
  $("#IPM_ENCU").val(formato["ENCUESTAD"]);
  $("#IPM_CODSIMMA").val(formato["COD_SIMMA"]);
  $("#IPM_FECREP").val(CorregirFechasPorImpedidos(formato["FECHA_REP"]));
  $("#IPM_FECMOV").val(CorregirFechasPorImpedidos(formato["FECHA_MOV"]));
  $("#IPM_CONFEC").val(confifecha[formato["ConfiFechaMM"]]);
  $("#IPM_FINFOSEC").val(formato["FTE_INFSEC"]);
  $("#IPM_REFGEO").val(formato["REF_GEOGRF"]);
  $("#IPM_VEREDA").val(formato["VEREDA"]);

  $("#IPM_TMM1").val(MM_tipo[formato["TIPO_MOV1"]]);

  $("#IPM_TMM2").val(formato["TIPO_MOV2"]);
  TipoIPM("IPM_TMM1");
  TipoIPM("IPM_TMM2");
  if (formato["ESTADO_ACT"] === "Latente" || formato["ESTADO_ACT"] === "Estabilizado" || formato["ESTADO_ACT"] === "Relicto") {
    $("#IPM_ACTIVIDAD").val("0");
  }
  else{
    $("#IPM_ACTIVIDAD").val("1");
  }
  TipoIPM("IPM_ACTIVIDAD");
  $("#IPM_ESTILO").val(auxestilo[formato["ESTILO"]]);
  $("#IPM_DISTMM").val(auxdistri[formato["DISTRIBUC"]]);
  $("#IPM_LITO").val(formato["LITOLOGIA"]);
  $("#IPM_DIRECCION").val(formato["morfogeneral5"]);
  $("#IPM_LONGITUD").val(formato["morfogeneral1"]);
  $("#IPM_ANCHO").val(formato["morfodimensiones1"]);
  $("#IPM_ESPESOR").val(formato["morfodimensiones4"]);

  var auxcobuso = "Cobertura: ";
  for (let i = 0; i < 8; i++) {
    if (formato["cobertura"+i] !== "") {
      auxcobuso += cober[i]+": "+ formato["cobertura"+i]+"%, ";
    }  
  }
  auxcobuso = auxcobuso.substring(0, auxcobuso.length - 2);
  auxcobuso += ". Uso: ";
  for (let i = 0; i < 10; i++) {
    if (formato["usosuelo"+i] !== "") {
      auxcobuso += usos[i]+": "+ formato["usosuelo"+i]+"%, ";
    }  
  }
  auxcobuso = auxcobuso.substring(0, auxcobuso.length - 2);
  
  $("#IPM_COBUSO").val(auxcobuso);
  auxcobuso = "";

  $("#IPM_GMF").val(formato["AN_GMF"]);
  $("#IPM_IMPORT").val(formato["IMPORTANC"]);

  var auxDanos = "";
  if (formato["DANOS"]["count"] > 0) {
    for (let i = 1; i <= formato["DANOS"]["count"]; i++) {
      auxDanos += "Daño: ("+formato["DANOS"]["DANOS_"+i]["clasedano"].split(":")[0]+")("+formato["DANOS"]["DANOS_"+i]["tiposdano"].split(":")[0]+")" +": "+formato["DANOS"]["DANOS_"+i]["tipodano"]+ " "+ formato["DANOS"]["DANOS_"+i]["cantidaddano"]+" "+ formato["DANOS"]["DANOS_"+i]["unidaddano"]+", Valor(US$): "+formato["DANOS"]["DANOS_"+i]["valordano"]+".";
    }
  }

  $("#IPM_DANO").val(auxDanos);

  $("#IPM_AMEPOT").val(formato["apreciacionriesgo"]);
  $("#IPM_VERICAM").val("1");
  $("#IPM_OBSERV").val(formato["notas"]);
  $("#IPM_IDFORMAT").val("SIMMA"+formato["COD_SIMMA"]);

  $("#IPM_CODNAMEMUN").val(mpios_cod[formato["NOM_MUN"]]);

  setTimeout(()=>{
    if (formato["SUBTIPO_1"].split(" ")[0] === "Deslizamiento") {
      formato["SUBTIPO_1"] = ArreglarMayus(formato["SUBTIPO_1"].split(" ")[1])
    }
    if (formato["SUBTIPO_2"].split(" ")[0] === "Deslizamiento") {
      formato["SUBTIPO_2"] = ArreglarMayus(formato["SUBTIPO_2"].split(" ")[1])
    }
    $("#IPM_SMM1").val(formato["SUBTIPO_1"])
    $("#IPM_SMM2").val(formato["SUBTIPO_2"])
    $("#IPM_ESTACT").val(auxact[formato["ESTADO_ACT"]]);
  },50)
}

function cargarDatosCAT(formato) {
  $("#IPM_ENCU").val(formato["ENCUESTAD"]);
  $("#IPM_CODSIMMA").val(formato["COD_SIMMA"]);
  $("#IPM_FECREP").val(CorregirFechasPorImpedidos(formato["FECHA_REP"]));
  $("#IPM_FECMOV").val(CorregirFechasPorImpedidos(formato["FECHA_MOV"]));
  $("#IPM_CONFEC").val(confifecha[formato["ConfiFechaMM"]]);
  $("#IPM_FINFOSEC").val(formato["FTE_INFSEC"]);
  $("#IPM_REFGEO").val(formato["REF_GEOGRF"]);
  $("#IPM_VEREDA").val(formato["VEREDA"]);

  $("#IPM_TMM1").val(MM_tipo[formato["TIPO_MOV1"]]);

  $("#IPM_TMM2").val(formato["TIPO_MOV2"]);
  TipoIPM("IPM_TMM1");
  TipoIPM("IPM_TMM2");

  $("#IPM_IMPORT").val(formato["IMPORTANC"]);

  var auxDanos = "";
  if (formato["DANOS"]["count"] > 0) {
    for (let i = 1; i <= formato["DANOS"]["count"]; i++) {
      auxDanos += "Daño: ("+formato["DANOS"]["DANOS_"+i]["clasedano"].split(":")[0]+")("+formato["DANOS"]["DANOS_"+i]["tiposdano"].split(":")[0]+")" +": "+formato["DANOS"]["DANOS_"+i]["tipodano"]+ " "+ formato["DANOS"]["DANOS_"+i]["cantidaddano"]+" "+ formato["DANOS"]["DANOS_"+i]["unidaddano"]+", Valor(US$): "+formato["DANOS"]["DANOS_"+i]["valordano"]+".";
    }
  }

  $("#IPM_DANO").val(auxDanos);

  $("#IPM_VERICAM").val("1");
  $("#IPM_OBSERV").val(formato["notas"]);
  $("#IPM_IDFORMAT").val("SIMMA"+formato["COD_SIMMA"]);

  $("#IPM_CODNAMEMUN").val(mpios_cod[formato["NOM_MUN"]]);

  setTimeout(()=>{
    if (formato["SUBTIPO_1"].split(" ")[0] === "Deslizamiento") {
      formato["SUBTIPO_1"] = ArreglarMayus(formato["SUBTIPO_1"].split(" ")[1])
    }
    if (formato["SUBTIPO_2"].split(" ")[0] === "Deslizamiento") {
      formato["SUBTIPO_2"] = ArreglarMayus(formato["SUBTIPO_2"].split(" ")[1])
    }
    $("#IPM_SMM1").val(formato["SUBTIPO_1"])
    $("#IPM_SMM2").val(formato["SUBTIPO_2"])
  },50)
}

$("#copiar-form-proc").click(function(e){
  e.preventDefault();
  $("#tooltip-copiar").html("Copiado!")
  $("#pegar-form-proc")
    .addClass("habilitar-pegar")
    .css("cursor", "pointer");
  datosCopiados = {
    idMovimiento_: $("#IPM_IDMOV").val(),
    encuestador_ : $("#IPM_ENCU").val(),
    codSIMMA_ : $("#IPM_CODSIMMA").val(),
    fechaCreacion_ : $("#IPM_FECREP").val(),
    fechaMovimiento_: $("#IPM_FECMOV").val(),
    confFecha_ : $("#IPM_CONFEC").val(),
    fuenteInfoSec_ : $("#IPM_FINFOSEC").val(),
    anioFuente_ :$("#IPM_ANOFUE").val(),
    departamento_ : $("#IPM_DPTO").val(),
    refGeografica_ : $("#IPM_REFGEO").val(),
    vereda_ : $("#IPM_VEREDA").val(),
    tipoMM1_ : $("#IPM_TMM1").val(),
    subTipoMM1_ : $("#IPM_SMM1").val(),
    tipoMM2_ : $("#IPM_TMM2").val(),
    subTipoMM2_ : $("#IPM_SMM2").val(),
    actividad_ : $("#IPM_ACTIVIDAD").val(),
    estadoActividad_ : $("#IPM_ESTACT").val(),
    estilo_ : $("#IPM_ESTILO").val(),
    distribucionMov_ : $("#IPM_DISTMM").val(),
    parteMov_ : $("#IPM_PARTE").val(),
    idParteMov_ : $("#IPM_IDPART").val(),
    etiqueta_ : $("#IPM_ETIQUETA").val(),
    litologia_ : $("#IPM_LITO").val(),
    direccion_ : $("#IPM_DIRECCION").val(),
    longitud_ : $("#IPM_LONGITUD").val(),
    ancho_ : $("#IPM_ANCHO").val(),
    profundidad_ : $("#IPM_PROF").val(),
    espesor_ : $("#IPM_ESPESOR").val(),
    tamBloque_ : $("#IPM_TAMBLOQ").val(),
    coberturaUso_ : $("#IPM_COBUSO").val(),
    geomorfologia_ : $("#IPM_GMF").val(),
    importancia_ : $("#IPM_IMPORT").val(),
    elementosExpuestos_ : $("#IPM_ELEMEXP").val(),
    dano_ : $("#IPM_DANO").val(),
    amenazaPotencial_ : $("#IPM_AMEPOT").val(),
    verificacionCampo_ : $("#IPM_VERICAM").val(),
    observaciones_ : $("#IPM_OBSERV").val(),
    cuenca_ : $("#IPM_CUENCA").val(),
    idFormato_ : $("#IPM_IDFORMAT").val(),
    codTipoMM_ : $("#IPM_CODMM").val(),
    mapa_ : $("#IPM_MAPA").val(),
    codNombreMpio_ : $("#IPM_CODNAMEMUN").val(),
  }

  setTimeout(()=>{
    $("#tooltip-copiar").html("Copiar formulario")
  },2000)
  
  //console.log(datosCopiados);

})

$("#pegar-form-proc").click(function(e){
  e.preventDefault();
  if(datosCopiados){
    $("#IPM_IDMOV").val(datosCopiados["idMovimiento_"]);
    $("#IPM_ENCU").val(datosCopiados["encuestador_"]);
    $("#IPM_CODSIMMA").val(datosCopiados["codSIMMA_"]);
    $("#IPM_FECREP").val(datosCopiados["fechaCreacion_"]);
    $("#IPM_FECMOV").val(datosCopiados["fechaMovimiento_"]);
    $("#IPM_CONFEC").val(datosCopiados["confFecha_"]);
    $("#IPM_FINFOSEC").val(datosCopiados["fuenteInfoSec_"]);
    $("#IPM_ANOFUE").val(datosCopiados["anioFuente_"]);
    $("#IPM_DPTO").val(datosCopiados["departamento_"]);
    $("#IPM_REFGEO").val(datosCopiados["refGeografica_"]);
    $("#IPM_VEREDA").val(datosCopiados["vereda_"]);
    $("#IPM_TMM1").val(datosCopiados["tipoMM1_"]);
    $("#IPM_TMM2").val(datosCopiados["tipoMM2_"]);
    TipoIPM("IPM_TMM1");
    TipoIPM("IPM_TMM2");
    $("#IPM_ACTIVIDAD").val(datosCopiados["actividad_"]);
    TipoIPM("IPM_ACTIVIDAD");
    $("#IPM_ESTILO").val(datosCopiados["estilo_"]);
    $("#IPM_DISTMM").val(datosCopiados["distribucionMov_"]);
    $("#IPM_PARTE").val(datosCopiados["parteMov_"]);
    $("#IPM_IDPART").val(datosCopiados["idParteMov_"]);
    $("#IPM_ETIQUETA").val(datosCopiados["etiqueta_"]);
    $("#IPM_LITO").val(datosCopiados["litologia_"]);
    $("#IPM_DIRECCION").val(datosCopiados["direccion_"]);
    $("#IPM_LONGITUD").val(datosCopiados["longitud_"]);
    $("#IPM_ANCHO").val(datosCopiados["ancho_"]);
    $("#IPM_PROF").val(datosCopiados["profundidad_"]);
    $("#IPM_ESPESOR").val(datosCopiados["espesor_"]);
    $("#IPM_TAMBLOQ").val(datosCopiados["tamBloque_"]);
    $("#IPM_COBUSO").val(datosCopiados["coberturaUso_"]);
    $("#IPM_GMF").val(datosCopiados["geomorfologia_"]);
    $("#IPM_IMPORT").val(datosCopiados["importancia_"]);
    $("#IPM_ELEMEXP").val(datosCopiados["elementosExpuestos_"]);
    $("#IPM_DANO").val(datosCopiados["dano_"]);
    $("#IPM_AMEPOT").val(datosCopiados["amenazaPotencial_"]);
    $("#IPM_VERICAM").val(datosCopiados["verificacionCampo_"]);
    $("#IPM_OBSERV").val(datosCopiados["observaciones_"]);
    $("#IPM_CUENCA").val(datosCopiados["cuenca_"]);
    $("#IPM_IDFORMAT").val(datosCopiados["idFormato_ "]);
    $("#IPM_CODMM").val(datosCopiados["codTipoMM_"]);
    $("#IPM_MAPA").val(datosCopiados["mapa_"]);
    $("#IPM_CODNAMEMUN").val(datosCopiados["codNombreMpio_"]);

    setTimeout(()=>{
      $("#IPM_SMM1").val(datosCopiados["subTipoMM1_"])
      $("#IPM_SMM2").val(datosCopiados["subTipoMM2_"])
      $("#IPM_ESTACT").val(datosCopiados["estadoActividad_"]);
    },50)
  }
  
})

$("#copiar-form-rasgos").click(function(e){
  e.preventDefault();
  $("#tooltip-copiar-rasgos").html("Copiado!")
  $("#pegar-form-rasgos")
    .addClass("habilitar-pegar")
    .css("cursor", "pointer");
  datosCopiadosRasgos = {
    propietario_: $("#RGMF_Propietario").val(),
    codNameRasgo_ : $("#RGMF_CODNAME").val(),
    descripcion_ : $("#RGMF_DESCRI").val(),
    tipo_ : $("#RGMF_TIPO").val(),
    ambiente_: $("#RGMF_AMBIENT").val(),
    visible25k_ : $("#RGMF_VISIBLE").val(),
    mapa_ : $("#RGMF_MAPA").val(),
    codNameMuni_ :$("#RGMF_CODNAMEMUN").val(),
  }

  setTimeout(()=>{
    $("#tooltip-copiar-rasgos").html("Copiar formulario")
  },2000)
  
  //console.log(datosCopiados);

})

$("#pegar-form-rasgos").click(function(e){
  e.preventDefault();
  if(datosCopiadosRasgos){
    $("#RGMF_Propietario").val(datosCopiadosRasgos["propietario_"]);
    $("#RGMF_CODNAME").val(datosCopiadosRasgos["codNameRasgo_"]);
    $("#RGMF_DESCRI").val(datosCopiadosRasgos["descripcion_"]);
    $("#RGMF_TIPO").val(datosCopiadosRasgos["tipo_"]);
    $("#RGMF_AMBIENT").val(datosCopiadosRasgos["ambiente_"]);
    $("#RGMF_VISIBLE").val(datosCopiadosRasgos["visible25k_"]);
    $("#RGMF_MAPA").val(datosCopiadosRasgos["mapa_"]);
    $("#RGMF_CODNAMEMUN").val(datosCopiadosRasgos["codNameMuni_"]);
  }
  
})

$("#reverse-form-rasgos").click(function(e){
  e.preventDefault(); 
  if (claseLayer == 'rasgos') {
      $("#tooltip-reverse-rasgos").html("Coordenadas Invertidas, Guarde los cambios");
      // arrayAux = arrayAux.reverse()
      // console.log(arrayAux);
      console.log(layergeojson.geometry.coordinates[0]);
      layergeojson.geometry.coordinates.reverse();
      console.log(layergeojson.geometry.coordinates[0]);
  
      var pos = [layergeojson.geometry.coordinates[0][1], layergeojson.geometry.coordinates[0][0]];
      map.removeLayer(markersRasgos);
      markersRasgos= L.layerGroup();
      var marker = L.marker(pos)
      // console.log(pos);
      // console.log(marker);
      marker.bindPopup('Inicio del Rasgo');
      marker.addTo(markersRasgos);
      markersRasgos.addTo(map);
      // console.log(markersRasgos);
    }else{
      $("#tooltip-reverse-rasgos").html("Esto no es un Rasgo!!")
    }

  setTimeout(()=>{
    $("#tooltip-reverse-rasgos").html("Invertir sentido de las coordenadas")
  },2000)
  


})

$("#datosEstaciones").click(function (e) { 
  e.preventDefault();
  GenerarXLSX();  
});

function GenerarXLSX() {
  // var workbook = XLSX.readFile(filename, opts);

  // var pruebaJSON = 
  // [
  //   {
  //     "id": {
  //       "bioguide": "W000178",
  //       "govtrack": 411351,
  //       "icpsr_prez": 99869
  //     },
  //     "name": {
  //       "first": "George",
  //       "last": "Washington"
  //     },
  //     "bio": {
  //       "birthday": "1732-02-22",
  //       "gender": "M"
  //     },
  //     "terms": [
  //       {
  //         "type": "prez",
  //         "start": "1789-04-30",
  //         "end": "1793-03-04",
  //         "party": "no party",
  //         "how": "election"
  //       },
  //       {
  //         "type": "prez",
  //         "start": "1793-03-04",
  //         "end": "1797-03-04",
  //         "party": "no party",
  //         "how": "election"
  //       }
  //     ]
  //   },
  //   {
  //     "id": {
  //       "bioguide": "A000039",
  //       "govtrack": 400699,
  //       "icpsr_prez": 99870
  //     },
  //     "name": {
  //       "first": "John",
  //       "last": "Adams"
  //     },
  //     "bio": {
  //       "birthday": "1735-10-19",
  //       "gender": "M"
  //     },
  //     "terms": [
  //       {
  //         "type": "viceprez",
  //         "start": "1789-04-21",
  //         "end": "1793-03-04",
  //         "party": "Federalist",
  //         "how": "election"
  //       },
  //       {
  //         "type": "viceprez",
  //         "start": "1793-03-04",
  //         "end": "1797-03-04",
  //         "party": "Federalist",
  //         "how": "election"
  //       },
  //       {
  //         "type": "prez",
  //         "start": "1797-03-04",
  //         "end": "1801-03-04",
  //         "party": "Federalist",
  //         "how": "election"
  //       }
  //     ]
  //   }
  // ]
  // /* set up an async GET request */
  // var req = new XMLHttpRequest();
  // req.open("GET", "data/LIB.xlsx", true);
  // req.responseType = "arraybuffer";

  // req.onload = function(e) {
  //   /* parse the data when it is received */
  //   var data = new Uint8Array(req.response);
  //   var workbook = XLSX.read(data, {type:"array"});
  //   /* DO SOMETHING WITH workbook HERE */
  //   console.log(workbook);

  //   const prez = pruebaJSON.filter(row => row.terms.some(term => term.type === "prez"));

  //   console.log(prez);
  //   /* flatten objects */
  //   const rows = prez.map(row => ({
  //     name: row.name.first + " " + row.name.last,
  //     birthday: row.bio.birthday
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(rows);

  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  //   /* fix headers */
  //   XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  //   /* calculate column width */
  //   const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  //   worksheet["!cols"] = [ { wch: max_width } ];

  //   XLSX.writeFile(workbook, "Presidents.xlsx");

  // };
  // req.send();
  var rows = [];

  if(estaciones === undefined){
    alert("Por favor active la capa de Estaciones");
  }else{
    for (let i = 0; i < estaciones["cont"]["cont"]; i++) {
      const feature = estaciones["estacion_" + i];
      if (feature.activo) {
        var formatos='';
    
        if(feature["Formularios"].count_UGS_Rocas>0){
          for (let j = 0; j < feature["Formularios"].count_UGS_Rocas; j++) {
            if (feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].activo) {
              formatos += "UGSR" + feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].noformato+', '; 
            }
          }
        }
        if(feature["Formularios"].count_UGS_Suelos>0){
          for (let j = 0; j < feature["Formularios"].count_UGS_Suelos; j++) {
            if (feature["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].activo) {
              formatos += "UGSS" + feature["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].noformato + ', '; 
            }
          }
        }
        if(feature["Formularios"].count_SGMF>0){
          for (let j = 0; j < feature["Formularios"].count_SGMF; j++) {
            if (feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j].activo) {
              formatos += "SGMF" + feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j].noformato + ', '; 
            }
          }
        }
        if(feature["Formularios"].count_CATALOGO>0){
          for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
            if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
              formatos += "CATALOGO_" + feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].ID_PARTE + ', '; 
            }
          }
        }
        if(feature["Formularios"].count_INVENTARIO>0){
          for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
            if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
              formatos += "INVENTARIO_" + feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ID_PARTE + ', '; 
            }
          }
        }
    
        if ((formatos == '')) {
          formatos = "Ninguno";
        }else{
          formatos = formatos.substring(0, formatos.length - 2);
        }
    
        var auxrow = [];
        
        auxrow.push(feature.Fecha);
        auxrow.push(feature.Estacion);
        auxrow.push(feature.TipoEstacion);
        auxrow.push(formatos);
        auxrow.push(feature.Este);
        auxrow.push(feature.Norte);
        auxrow.push(feature.Altitud);
        auxrow.push(feature.Fotos);
        auxrow.push(feature.FotosLib);
        auxrow.push(feature.Observaciones);
        auxrow.push(feature.Propietario);
    
        rows.push(auxrow);
      }
      
    }
  
  
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estaciones");
  
    workbook.Props = {
      Title: "Estaciones",
      Subject: "ACTUALIZACIÓN DEL MAPA NACIONAL DE AMENAZA POR MOVIMIENTOS EN MASA 1:25K - BLOQUE 05",
      Author: "Universidad Nacional de Colombia - Sede Medellín",
      CreatedDate: dateFormat(new Date(),'Y-m-d')
    };
  
    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [["Fecha", "Estaciones", "Tipo de Estación", "Formatos", "Este", "Norte", "Altitud", "Fotografías", "Fotografías Libreta", "Observaciones", "Propietario"]], { origin: "A1" });
  
    /* calculate column width */
    // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    console.log(worksheet);
    worksheet["!cols"] = [{wpx : 80},{wpx : 80},{ wpx : 150 },{ wpx : 150 },{wpx : 100},{wpx : 100},{wpx : 100},{ wpx : 200 },{ wpx : 200 },{ wpx : 250 },{ wpx : 150 }];
    // worksheet["!rows"] = [{hpx : 80},{wpx : 80},{ hpx : 150 },{ wpx : 150 },{wpx : 100},{wpx : 100},{wpx : 100},{ wpx : 200 },{ wpx : 200 },{ wpx : 250 }];
    worksheet['!outline'] = [{'above':true}, {'left':false}];
    /* create an XLSX file and try to save to Presidents.xlsx */
    var nombreArchivo = "Estaciones_"+dateFormat(new Date(),'Y-m-d')+".xlsx"
    XLSX.writeFile(workbook, nombreArchivo);
  }



}

function CorregirFechasPorImpedidos(fechamov) {
  // console.log(fechamov);
  var fechaevento = "";
  if(!fechamov.includes("In")){
    if(!fechamov.includes("cier")){
      if (fechamov.includes("-")){
        var aux = fechamov.split(" ")[0];
        var aux1 = aux.split("-");
        if (aux1[0].length == 4) {
          fechaevento = aux1[0]+'-'+aux1[1]+'-'+aux1[2];
        }
        else if(aux1[0].length == 1){
            aux1[0] = "0" + aux1[0];
            fechaevento = aux1[2]+'-'+aux1[1]+'-'+aux1[0];
        }
      }
      else if (fechamov.includes("/")){
        var aux = fechamov.split(" ")[0];
        var aux1 = aux.split("/");
        if (aux1[0].length == 4) {
          fechaevento = aux1[0]+'-'+aux1[1]+'-'+aux1[2];
        }
        else{
          if(aux1[0].length == 1){
            aux1[0] = "0" + aux1[0];
          }
          fechaevento = aux1[2]+'-'+aux1[1]+'-'+aux1[0];
        }
      }
      else if (fechamov.includes("de") && fechamov.split(" ").length == 5){
        var aux = fechamov.split(" ");
        aux[2] = aux[2].toUpperCase();
        if(aux[2]=="ENERO"){
          aux[2] = "01";
        }
        else if(aux[2]=="FEBRERO"){
          aux[2] = "02";
        }
        else if(aux[2]=="MARZO"){
          aux[2] = "03";
        }
        else if(aux[2]=="ABRIL"){
          aux[2] = "04";
        }
        else if(aux[2]=="MAYO"){
          aux[2] = "05";
        }
        else if(aux[2]=="JUNIO"){
          aux[2] = "06";
        }
        else if(aux[2]=="JULIO"){
          aux[2] = "07";
        }
        else if(aux[2]=="AGOSTO"){
          aux[2] = "08";
        }
        else if(aux[2]=="SEPTIEMBRE"){
          aux[2] = "09";
        }
        else if(aux[2]=="OCTUBRE"){
          aux[2] = "10";
        }
        else if(aux[2]=="NOVIEMBRE"){
          aux[2] = "11";
        }
        else if(aux[2]=="DICIEMBRE"){
          aux[2] = "12";
        }

        if(aux[0].length == 1){
          aux[0] = "0" + aux[0];
        }
        if(aux[4].length == 2){
          aux[4] = "20" + aux[4];
        }

        fechaevento = aux[4]+'-'+aux[2]+'-'+aux[0];
      }
      else if (fechamov.includes("de") && fechamov.split(" ").length == 4){
        var aux = fechamov.split(" ");
        aux[1] = aux[1].toUpperCase();
        if (aux[1] == "DE") {
          aux[1] = aux[0];
          aux[1] = aux[1].toUpperCase();
        }
        if(aux[1]=="ENERO"){
          aux[1] = "01";
        }
        else if(aux[1]=="FEBRERO"){
          aux[1] = "02";
        }
        else if(aux[1]=="MARZO"){
          aux[1] = "03";
        }
        else if(aux[1]=="ABRIL"){
          aux[1] = "04";
        }
        else if(aux[1]=="MAYO"){
          aux[1] = "05";
        }
        else if(aux[1]=="JUNIO"){
          aux[1] = "06";
        }
        else if(aux[1]=="JULIO"){
          aux[1] = "07";
        }
        else if(aux[1]=="AGOSTO"){
          aux[1] = "08";
        }
        else if(aux[1]=="SEPTIEMBRE"){
          aux[1] = "09";
        }
        else if(aux[1]=="OCTUBRE"){
          aux[1] = "10";
        }
        else if(aux[1]=="NOVIEMBRE"){
          aux[1] = "11";
        }
        else if(aux[1]=="DICIEMBRE"){
          aux[1] = "12";
        }


        if(aux[2].length == 2){
          aux[2] = "20" + aux[2];
        }
        fechaevento = aux[2]+'-'+aux[1]+'-01';
      }
      else if (fechamov.includes("de") && fechamov.split(" ").length == 3){
        var aux = fechamov.split(" ");
        aux[1] = aux[1].toUpperCase();
        if (aux[1] == "DE") {
          aux[1] = aux[0];
          aux[1] = aux[1].toUpperCase();
        }
        if(aux[1]=="ENERO"){
          aux[1] = "01";
        }
        else if(aux[1]=="FEBRERO"){
          aux[1] = "02";
        }
        else if(aux[1]=="MARZO"){
          aux[1] = "03";
        }
        else if(aux[1]=="ABRIL"){
          aux[1] = "04";
        }
        else if(aux[1]=="MAYO"){
          aux[1] = "05";
        }
        else if(aux[1]=="JUNIO"){
          aux[1] = "06";
        }
        else if(aux[1]=="JULIO"){
          aux[1] = "07";
        }
        else if(aux[1]=="AGOSTO"){
          aux[1] = "08";
        }
        else if(aux[1]=="SEPTIEMBRE"){
          aux[1] = "09";
        }
        else if(aux[1]=="OCTUBRE"){
          aux[1] = "10";
        }
        else if(aux[1]=="NOVIEMBRE"){
          aux[1] = "11";
        }
        else if(aux[1]=="DICIEMBRE"){
          aux[1] = "12";
        }


        if(aux[2].length == 2){
          aux[2] = "20" + aux[2];
        }
        fechaevento = aux[2]+'-'+aux[1]+'-01';
      }
      else if (fechamov.includes("de") && fechamov.split(" ").length == 2){
        var aux = fechamov.split(" ");
        aux[0] = aux[0].toUpperCase();
        if(aux[0]=="ENERO"){
          aux[0] = "01";
        }
        else if(aux[0]=="FEBRERO"){
          aux[0] = "02";
        }
        else if(aux[0]=="MARZO"){
          aux[0] = "03";
        }
        else if(aux[0]=="ABRIL"){
          aux[0] = "04";
        }
        else if(aux[0]=="MAYO"){
          aux[0] = "05";
        }
        else if(aux[0]=="JUNIO"){
          aux[0] = "06";
        }
        else if(aux[0]=="JULIO"){
          aux[0] = "07";
        }
        else if(aux[0]=="AGOSTO"){
          aux[0] = "08";
        }
        else if(aux[0]=="SEPTIEMBRE"){
          aux[0] = "09";
        }
        else if(aux[0]=="OCTUBRE"){
          aux[0] = "10";
        }
        else if(aux[0]=="NOVIEMBRE"){
          aux[0] = "11";
        }
        else if(aux[0]=="DICIEMBRE"){
          aux[0] = "12";
        }


        if(aux[1].length == 2){
          aux[1] = "20" + aux[1];
        }
        fechaevento = aux[1]+'-'+aux[0]+'-01';
      }
      else if (!fechamov.includes("de") && !fechamov.includes("-") && fechamov.split(" ").length == 3){
        var aux = fechamov.split(" ");
        aux[1] = aux[1].toUpperCase();

        if(aux[1]=="ENERO"){
          aux[1] = "01";
        }
        else if(aux[1]=="FEBRERO"){
          aux[1] = "02";
        }
        else if(aux[1]=="MARZO"){
          aux[1] = "03";
        }
        else if(aux[1]=="ABRIL"){
          aux[1] = "04";
        }
        else if(aux[1]=="MAYO"){
          aux[1] = "05";
        }
        else if(aux[1]=="JUNIO"){
          aux[1] = "06";
        }
        else if(aux[1]=="JULIO"){
          aux[1] = "07";
        }
        else if(aux[1]=="AGOSTO"){
          aux[1] = "08";
        }
        else if(aux[1]=="SEPTIEMBRE"){
          aux[1] = "09";
        }
        else if(aux[1]=="OCTUBRE"){
          aux[1] = "10";
        }
        else if(aux[1]=="NOVIEMBRE"){
          aux[1] = "11";
        }
        else if(aux[1]=="DICIEMBRE"){
          aux[1] = "12";
        }


        if(aux[2].length == 2){
          aux[2] = "20" + aux[2];
        }
        fechaevento = aux[2]+'-'+aux[1]+'-'+aux[0];
      }
      else if (!fechamov.includes("de") && !fechamov.includes("-") && fechamov.split(" ").length == 2){
        var aux = fechamov.split(" ");
        aux[0] = aux[0].toUpperCase();
        if(aux[0]=="ENERO"){
          aux[0] = "01";
        }
        else if(aux[0]=="FEBRERO"){
          aux[0] = "02";
        }
        else if(aux[0]=="MARZO"){
          aux[0] = "03";
        }
        else if(aux[0]=="ABRIL"){
          aux[0] = "04";
        }
        else if(aux[0]=="MAYO"){
          aux[0] = "05";
        }
        else if(aux[0]=="JUNIO"){
          aux[0] = "06";
        }
        else if(aux[0]=="JULIO"){
          aux[0] = "07";
        }
        else if(aux[0]=="AGOSTO"){
          aux[0] = "08";
        }
        else if(aux[0]=="SEPTIEMBRE"){
          aux[0] = "09";
        }
        else if(aux[0]=="OCTUBRE"){
          aux[0] = "10";
        }
        else if(aux[0]=="NOVIEMBRE"){
          aux[0] = "11";
        }
        else if(aux[0]=="DICIEMBRE"){
          aux[0] = "12";
        }


        if(aux[1].length == 2){
          aux[1] = "20" + aux[1];
        }
        fechaevento = aux[1]+'-'+aux[0]+'-01';
      }
      else{
        fechaevento = fechamov;
      }
      // console.log(fechaevento);
      return fechaevento;
    }
  }
}

// DepurarDatosEstaciones()
function DepurarDatosEstaciones() {

  var aflor = {'Natural':0,'Corte superficial':1,'Excavación subterránea':2,'Trinchera, Apique':3}
  var gsi = {'0-20':0,'20-40':1,'40-60':2,'60-80':3,'80-100':4,'No Aplica':5}
  var fabrica = {'Cristalina Masiva':0,'Cristalina Foliada':1,'Clástica Cementada':2,'Clástica Consolidada':3,'Roca de falla/ brecha de falla':4,'No Aplica':5}
  var humedad = {'Seco':0,'Húmedo':1,'Con flujo':2,'No Aplica':3}
  var tamanograno = {'Muy Grueso':0,'Grueso ':1,'Medio':2,'Fino':3,'Muy Fino':4,'No Aplica':5}
  var gradometeo = {'Ninguna':0,'Débil ':1,'Moderada':2,'Alta':3,'Muy Alta':4,'No Aplica':5}
  var resistenciacomp = {'Extremadamente Dura >250':0,'Muy Dura 100-250':1,'Dura 50-100':2,'Moderada 25-50':3,'Blanda 5-25':4,'Muy blanda 1-5':5,'Extremadamente blanda 0,25-1':6,'No Aplica':7}

  var estructuraSuelos = {'Clasto-soportado':0,'Intermedia':1,'Matriz soportado':2,'No Aplica':3};
  var humedadSuelos = {'Seco':0,'Húmedo':1,'Mojado':2,'Muy Mojado':3,'No Aplica':4}
  var relictasSuelos = {'Estructuras heredadas':0,'Fisuras':1,'Grietas':2,'No Aplica':3}
  var orientacionSuelos = {'Isotropía':0,'Anisotropía':1,'Imbricado':2,'No Aplica':3}
  var meteoSuelos = {'Ninguna':0,'Débil':1,'Moderada':2,'Alta':3,'Muy alta':4,'No Aplica':5}
  var gradacionSuelos = {'Normal':0,'Inversa':1,'Normal, solo a la base':2,'Normal,solo al techo':3,'Sin gradación':4,'Compuesto, simétrico':5,'No Aplica':6}
  var seleccionSuelos = {'Muy Pobremente Seleccionado':0,'Pobremente Seleccionado':1,'Moderadamente Seleccionado':2,'Bien Seleccionado':3,'Muy Bien Seleccionado':4,'No Aplica':5}
  var plasticidadSuelos = {'No plástico':0,'Ligeramente Plástico':1,'Plástico':2,'Muy Plástico':3,'No Aplica':4}
  var resistenciaSuelos = {'Muy Blanda Menor a 20':0,'Blanda 20-40':1,'Media 40-75':2,'Alta 75-150':3,'Muy Alta 150-300':4,'Dura > 300':5,'No Aplica':6}
  var compacidadSuelos = {'Débil (suelta)':0,'Moderada (Media)':1,'Fuerte (Densa)':2,'No Aplica':3}

  var confifecha = {"Exacta":0,"Certeza mes y año":1,"Certeza Año":2,"Confiabilidad baja":3,"Incierta":4};
  var tipomov = {"Caída":0,"Volcamiento":1,"Deslizamiento":2,"Flujo":3,"Propagación Lateral":4,"Reptación":5,"Deform. Gravit. Profundas":6,"No Aplica":7};
  var subtipomov1 = {"Caída de Roca":"Z24","Caída de detritos":"Z26","Caída de Suelo":"Z28","Volcamiento flexural de roca":"Z30","Volcamiento de roca":"Z32","Volcamiento macizo rocoso":"Z34","Deslizamiento rotacional":"Z36","Deslizamiento traslacional":"AM24","Deslizamiento en cuña":"AM26","Deslizamiento traslacional en cuña":"AM28","Deslizamiento traslacional planar":"AM30","Avalancha de rocas":"AM32","Flujo de Detritos":"AM34","Flujo de Lodo":"AM36","Deslizamiento por flujo":"AZ24","Avalancha de detritos":"AZ26","Flujo de Tierra":"AZ28","Crecida de detritos":"AZ30","Flujo de turba":"AZ32","Deslizamiento licuación de arena":"AZ34","Deslizamiento licuación de limo":"AZ36","Deslizamiento licuación detritos":"BO24","Deslizamiento licuación roca fracturada":"BO26","Propagación lateral lenta":"BO28","Propagación lateral licuación":"BO30","Reptación de Suelos":"BO32","Solifluxión":"BO34","Gelifluxión (en permafrost)":"BO36", "No Aplica":"No Aplica"};
  var subtipomov2 = {"Caída de Roca":"AA24","Caída de detritos":"AA26","Caída de Suelo":"AA28","Volcamiento flexural de roca":"AA30","Volcamiento de roca":"AA32","Volcamiento macizo rocoso":"AA34","Deslizamiento rotacional":"AA36","Deslizamiento traslacional":"AN24","Deslizamiento en cuña":"AN26","Deslizamiento traslacional en cuña":"AN28","Deslizamiento traslacional planar":"AN30","Avalancha de rocas":"AN32","Flujo de Detritos":"AN34","Flujo de Lodo":"AN36","Deslizamiento por flujo":"BA24","Avalancha de detritos":"BA26","Flujo de Tierra":"BA28","Crecida de detritos":"BA30","Flujo de turba":"BA32","Deslizamiento licuación de arena":"BA34","Deslizamiento licuación de limo":"BA36","Deslizamiento licuación detritos":"BP24","Deslizamiento licuación roca fracturada":"BP26","Propagación lateral lenta":"BP28","Propagación lateral licuación":"BP30","Reptación de Suelos":"BP32","Solifluxión":"BP34","Gelifluxión (en permafrost)":"BP36", "No Aplica":"No Aplica"};
  
  var subtipomov1MM = {"Caída de Roca":"Z47","Caída de detritos":"Z49","Caída de Suelo":"Z51","Volcamiento flexural de roca":"Z53","Volcamiento de roca":"Z55","Volcamiento macizo rocoso":"Z57","Deslizamiento rotacional":"Z59","Deslizamiento traslacional":"AM47","Deslizamiento en cuña":"AM49","Deslizamiento traslacional en cuña":"AM51","Deslizamiento traslacional planar":"AM53","Avalancha de rocas":"AM55","Flujo de Detritos":"AM57","Flujo de Lodo":"AM59","Deslizamiento por flujo":"AZ47","Avalancha de detritos":"AZ49","Flujo de Tierra":"AZ51","Crecida de detritos":"AZ53","Flujo de turba":"AZ55","Deslizamiento licuación de arena":"AZ57","Deslizamiento licuación de limo":"AZ59","Deslizamiento licuación detritos":"BO47","Deslizamiento licuación roca fracturada":"BO49","Propagación lateral lenta":"BO51","Propagación lateral licuación":"BO53","Reptación de Suelos":"BO55","Solifluxión":"BO57","Gelifluxión (en permafrost)":"BO59", "No Aplica":"No Aplica"};
  var subtipomov2MM = {"Caída de Roca":"AA47","Caída de detritos":"AA49","Caída de Suelo":"AA51","Volcamiento flexural de roca":"AA53","Volcamiento de roca":"AA55","Volcamiento macizo rocoso":"AA57","Deslizamiento rotacional":"AA59","Deslizamiento traslacional":"AN47","Deslizamiento en cuña":"AN49","Deslizamiento traslacional en cuña":"AN51","Deslizamiento traslacional planar":"AN53","Avalancha de rocas":"AN55","Flujo de Detritos":"AN57","Flujo de Lodo":"AN59","Deslizamiento por flujo":"BA47","Avalancha de detritos":"BA49","Flujo de Tierra":"BA51","Crecida de detritos":"BA53","Flujo de turba":"BA55","Deslizamiento licuación de arena":"BA57","Deslizamiento licuación de limo":"BA59","Deslizamiento licuación detritos":"BP47","Deslizamiento licuación roca fracturada":"BP49","Propagación lateral lenta":"BP51","Propagación lateral licuación":"BP53","Reptación de Suelos":"BP55","Solifluxión":"BP57","Gelifluxión (en permafrost)":"BP59", "No Aplica":"No Aplica"};
  var edadMM = {"Menor a 1 año":0,"1-5 años":1,"6-10 años":2,"11-15 años":3,"16-20 años":4,"21-30 años":5,"31-40 años":6,"41-60 años":7,"61-80 años":8,"> 80 años":9}
  var estadoMM = {"Activo":0,"Reactivado":1,"Suspendido":2, "Latente":3,"Abandonado":4,"Estabilizado":5,"Relicto":6}
  var estiloMM = {"Complejo":0,"Compuesto":1,"Múltiple":2,"Sucesivo":3,"Único":4}
  var distriMM = {"Retrogresivo":0,"Avanzado":1,"Ensanchado":2,"Confinado":3,"Creciente":4,"Decreciente":5,"Movil":6}
  var espacEstruc = {'>2':"CI", '2-0.6':"CL", '0.6-0.2':"CO", '0.2-0.06':"CS", 'Menor a 0.06':"CW"}
  var humedadMM = { "Mojado":0,"Muy Húmedo":1,"Húmedo":2,"Ligeramente húmedo":3,"Seco":4,'No Aplica':5};
  var plasticidadMM = {"Alta":0,"Media":1,"Baja":2,"No plástico":3,'No Aplica':4};
  var velocidadMM = {"Extr. rápido (>5 m/s)":0,"Muy rápido (>3 m/min)":1,"Rápido (>1.8 m/hr)":2,"Moderado (>13 m/mes)":3,"Lento (>1.6 m/año)":4,"Muy lento (>16 mm/año)":5,"Extr. Lento (Menor a 16 mm/año)":7,'No Aplica':8};
  var sisclasiMM = {"Hutchinson, 1988":0,"Varnes, 1978":1,"Cruden y Varnes, 1996":2,"Hungr et al., 2001":3}
  var modoMM = {"Ondulación":0,"Escalonamiento":1,'No Aplica':2};
  var severidadMM = {"Leve":0,"Media":1,"Severa":2,'No Aplica':3};


  var geologos=[];
  var auxcont = 0;
  for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
    const feature = base_clase["estacion_" + i];
    if(base_clase["estacion_" + i]["FotosGenerales"] == undefined){
      base_clase["estacion_" + i]["FotosGenerales"] = {"FotosURL": {"count": 0}}
    }
    if(base_clase["estacion_" + i]["Fotos"] == undefined){
      base_clase["estacion_" + i]["Fotos"] = "";
    }
    if(base_clase["estacion_" + i]["FotosLibreta"] == undefined){
      base_clase["estacion_" + i]["FotosLibreta"] = {"FotosURL": {"count": 0}}
    }
    if(base_clase["estacion_" + i]["FotosLib"] == undefined){
      base_clase["estacion_" + i]["FotosLib"] = "";
    }
    if (feature.activo) {
      var formatos='';
      
  
      if(feature["Formularios"].count_UGS_Rocas>0){
        for (let j = 0; j < feature["Formularios"].count_UGS_Rocas; j++) {
          if (feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].activo) {
            formatos += "UGSR" + feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].noformato+', '; 

            if (base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamañograno1 !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1 = base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamañograno1;
              delete base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamañograno1;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamañograno2 !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2 = base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamañograno2;
              delete base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamañograno2;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1 = 5
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2 = 5
            }

            // if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo1 === undefined){
            //   console.log(i);
            // }

            if(base_clase["estacion_" + i]["MUN"] == "AGUADAS"){
              base_clase["estacion_" + i]["Propietario"] = "Carlos Andres Benavides Cano"
            }
            if(base_clase["estacion_" + i]["MUN"] == "ARANZAZU"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "FILADELFIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }
            if(base_clase["estacion_" + i]["MUN"] == "MARQUETALIA"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "RIOSUCIO"){
              base_clase["estacion_" + i]["Propietario"] = "Elena Franco García"
            }
            if(base_clase["estacion_" + i]["MUN"] == "SUPIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }

            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].claseaflor = aflor[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].claseaflor];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gsi = gsi[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gsi];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].fabrica1 = fabrica[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].fabrica1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].fabrica2 = fabrica[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].fabrica2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].humedad1 = humedad[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].humedad1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].humedad2 = humedad[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].humedad2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1 = tamanograno[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2 = tamanograno[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo1 = gradometeo[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo2 = gradometeo[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].resistenciacomp1 = resistenciacomp[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].resistenciacomp1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].resistenciacomp2 = resistenciacomp[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].resistenciacomp2];
          
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo1 === undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo1 = "No Aplica";
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].gradometeo2 = "No Aplica";
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1 === undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno1 = "No Aplica";
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2 === undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].tamanograno2 = "No Aplica";
            }

            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]["FotosAnexas"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]["FotosAnexas"] = {"count": 0,"FotosURL": {"count": 0}}
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]["FotosAnexas"]["FotosURL"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]["FotosAnexas"]["FotosURL"] = {"count": 0}
            }
            
          
          }
        }
      }
      if(feature["Formularios"].count_UGS_Suelos>0){
        for (let j = 0; j < feature["Formularios"].count_UGS_Suelos; j++) {
          if (feature["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].activo) {
            formatos += "UGSS" + feature["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].noformato + ', '; 
          
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].claseaflor = aflor[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].claseaflor];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasoporte1 = estructuraSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasoporte1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasoporte2 = estructuraSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasoporte2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].condicionhumedad1 = humedadSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].condicionhumedad1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].condicionhumedad2 = humedadSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].condicionhumedad2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasrelictas1 = relictasSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasrelictas1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasrelictas2 = relictasSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].estructurasrelictas2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].orientacion1 = orientacionSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].orientacion1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].orientacion2 = orientacionSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].orientacion2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].meteorizacionclastos1 = meteoSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].meteorizacionclastos1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].meteorizacionclastos2 = meteoSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].meteorizacionclastos2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].gradacion1 = gradacionSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].gradacion1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].gradacion2 = gradacionSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].gradacion2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].seleccion1 = seleccionSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].seleccion1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].seleccion2 = seleccionSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].seleccion2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].plasticidad1 = plasticidadSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].plasticidad1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].plasticidad2 = plasticidadSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].plasticidad2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].resiscorte1 = resistenciaSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].resiscorte1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].resiscorte2 = resistenciaSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].resiscorte2];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].compacidadsuelosgruesos1 = compacidadSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].compacidadsuelosgruesos1];
            base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].compacidadsuelosgruesos2 = compacidadSuelos[base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].compacidadsuelosgruesos2];
            
            
            if(base_clase["estacion_" + i]["MUN"] == "AGUADAS"){
              base_clase["estacion_" + i]["Propietario"] = "Carlos Andres Benavides Cano"
            }
            if(base_clase["estacion_" + i]["MUN"] == "ARANZAZU"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "FILADELFIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }
            if(base_clase["estacion_" + i]["MUN"] == "MARQUETALIA"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "RIOSUCIO"){
              base_clase["estacion_" + i]["Propietario"] = "Elena Franco García"
            }
            if(base_clase["estacion_" + i]["MUN"] == "SUPIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }


            // console.log(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].dirimbricacion2);
            // console.log(i);
            // auxcont++;
            // console.log(auxcont);
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].dirimbricacion1 === undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].dirimbricacion1 = "";
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].dirimbricacion2 = "";
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].litologiasasociadasopt2exist === undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].litologiasasociadasopt2exist = "false";
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].litologiasasociadasopt1exist === undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j].litologiasasociadasopt1exist = "true";
            }
          

            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j]["FotosAnexas"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j]["FotosAnexas"] = {"count": 0,"FotosURL": {"count": 0}}
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j]["FotosAnexas"]["FotosURL"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j]["FotosAnexas"]["FotosURL"] = {"count": 0}
            }
          }
        }
      }
      if(feature["Formularios"].count_SGMF>0){
        for (let j = 0; j < feature["Formularios"].count_SGMF; j++) {
          if (feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j].activo) {
            formatos += "SGMF" + feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j].noformato + ', '; 
            for (let index = 1; index <= feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j]["SGMF"].count; index++) {
              if (feature["Formularios"]["Form_SGMF"]["Form_SGMF_"+j]["SGMF"]["SGMF_"+index].tipodemm0check == undefined) {
                //console.log("esta: " + i);
              }
              else{
                //auxcont++
              }
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_SGMF"]["Form_SGMF_"+j]["FotosAnexas"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_SGMF"]["Form_SGMF_"+j]["FotosAnexas"] = {"count": 0,"FotosURL": {"count": 0}}
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_SGMF"]["Form_SGMF_"+j]["FotosAnexas"]["FotosURL"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_SGMF"]["Form_SGMF_"+j]["FotosAnexas"]["FotosURL"] = {"count": 0}
            }
          }
        }
      }
      if(feature["Formularios"].count_CATALOGO>0){
        for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
          auxcont++;
          if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {


            formatos += "CATALOGO_" + feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].ID_PARTE + ', '; 
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].ConfiFechaMM = confifecha[base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].ConfiFechaMM];
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].TIPO_MOV1 = tipomov[base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].TIPO_MOV1];
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].TIPO_MOV2 = tipomov[base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].TIPO_MOV2];
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_1 = subtipomov1[base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_1];
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_2 = subtipomov2[base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_2];

            
            if (base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].alturaMM === undefined || base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].alturaMM === "undefined" || base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].alturaMM === "") {
              base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].alturaMM = 0;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].latitudMM === undefined || base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].latitudMM === "undefined" || base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].latitudMM === "") {
              base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].latitudMM = 0;
              // console.log(i);
            }
            // console.log(base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].latitudMM);
            if (base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].longitudMM === undefined || base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].longitudMM === "undefined" || base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].longitudMM === "") {
              base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].longitudMM = 0;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_1 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_1 = "No Aplica";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_2 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].SUBTIPO_2 = "No Aplica";
            }

            var camposdanos = [
              "cantidaddano",
              "clasedano",
              "tipodano",
              "tiposdano",
              "unidaddano",
              "valordano",
            ]

            for (let index = 0; index < base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]["DANOS"].count; index++) {
              var auxi = index +1
              for (let index1 = 0; index1 < camposdanos.length; index1++) {
                if (base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]["DANOS"]["DANOS_"+auxi][camposdanos[index1]] === undefined) {
                  base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]["DANOS"]["DANOS_"+auxi][camposdanos[index1]] = "";
                }
                
              }
              
            }

            var fechamov = base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].FECHA_MOV;          
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].FECHA_MOV = CorregirFechasPorImpedidos(fechamov);

            var fecharep = base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].FECHA_REP;          
            base_clase["estacion_" + i]["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].FECHA_REP = CorregirFechasPorImpedidos(fecharep);
          
            var arrayFotos = base_clase["estacion_" + i]["Fotos"].split(",").length
            if (base_clase["estacion_" + i]["Fotos"].split(",").includes("")){
              arrayFotos = base_clase["estacion_" + i]["Fotos"].split(",").length - 1
            }
            var arrayURL = 0
            for (let ind33 = 0; ind33 < base_clase["estacion_" + i]["FotosGenerales"]["FotosURL"]["count"]; ind33++) {
              if (base_clase["estacion_" + i]["FotosGenerales"]["FotosURL"]["FotoActivo_"+ind33]) {
                arrayURL++;
              }
              
            }

            if (arrayURL != arrayFotos) {
              console.log(i + " ESTACION: "+ base_clase["estacion_" + i]["Estacion"]);
            }
          
          
          }
        }
      }
      if(feature["Formularios"].count_INVENTARIO>0){
        for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
          if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
            formatos += "INVENTARIO_" + feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ID_PARTE + ', '; 
          
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ConfiFechaMM = confifecha[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ConfiFechaMM];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].TIPO_MOV1 = tipomov[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].TIPO_MOV1];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].TIPO_MOV2 = tipomov[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].TIPO_MOV2];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_1 = subtipomov1MM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_1];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_2 = subtipomov2MM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_2];
            // console.log(base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_1);
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].edadmm = edadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].edadmm];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ESTADO_ACT = estadoMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ESTADO_ACT];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ESTILO = estiloMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].ESTILO];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].DISTRIBUC = distriMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].DISTRIBUC];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura0espaciamiento = espacEstruc[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura0espaciamiento];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura1espaciamiento = espacEstruc[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura1espaciamiento];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura2espaciamiento = espacEstruc[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura2espaciamiento];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura3espaciamiento = espacEstruc[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura3espaciamiento];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura4espaciamiento = espacEstruc[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura4espaciamiento];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura5espaciamiento = espacEstruc[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].estructura5espaciamiento];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].humedad1 = humedadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].humedad1];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].humedad2 = humedadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].humedad2];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].plasticidad1 = plasticidadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].plasticidad1];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].plasticidad2 = plasticidadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].plasticidad2];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].velocidad = velocidadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].velocidad];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sisclasificacion = sisclasiMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sisclasificacion];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].morfomodo = modoMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].morfomodo];
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].morfoseveridad = severidadMM[base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].morfoseveridad];

            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_1 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_1 = "No Aplica";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_2 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].SUBTIPO_2 = "No Aplica";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito0check === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito0check = "false";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito1check === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito1check = "false";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito2check === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito2check = "false";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito3check === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito3check = "false";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito4check === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].tipodeposito4check = "false";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM0 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM0 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM1 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM1 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM2 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM2 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM3 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].sismoMM3 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM0 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM0 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM1 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM1 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM2 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM2 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM3 === undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].lluviasMM3 = "";
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].heridos !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].HERIDOS = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].heridos;
              delete base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].heridos;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].vidas !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].VIDAS = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].vidas;
              delete base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].vidas;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].desaparecidos !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].DESAPARECIDOS = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].desaparecidos;
              delete base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].desaparecidos;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].personas !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].PERSONAS = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].personas;
              delete base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].personas;
            }
            if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].familias !== undefined) {
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].FAMILIAS = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].familias;
              delete base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].familias;
            }

            var campos =[
              "causascontrideto0check_1",
              "causascontrideto0check_2",
              "causascontrideto10check_1",
              "causascontrideto10check_2",
              "causascontrideto11check_1",
              "causascontrideto11check_2",
              "causascontrideto12check_1",
              "causascontrideto12check_2",
              "causascontrideto13check_1",
              "causascontrideto13check_2",
              "causascontrideto14check_1",
              "causascontrideto14check_2",
              "causascontrideto15check_1",
              "causascontrideto15check_2",
              "causascontrideto16check_1",
              "causascontrideto16check_2",
              "causascontrideto17check_1",
              "causascontrideto17check_2",
              "causascontrideto18check_1",
              "causascontrideto18check_2",
              "causascontrideto19check_1",
              "causascontrideto19check_2",
              "causascontrideto1check_1",
              "causascontrideto1check_2",
              "causascontrideto20check_1",
              "causascontrideto20check_2",
              "causascontrideto21check_1",
              "causascontrideto21check_2",
              "causascontrideto22check_1",
              "causascontrideto22check_2",
              "causascontrideto23check_1",
              "causascontrideto23check_2",
              "causascontrideto24check_1",
              "causascontrideto24check_2",
              "causascontrideto2check_1",
              "causascontrideto2check_2",
              "causascontrideto3check_1",
              "causascontrideto3check_2",
              "causascontrideto4check_1",
              "causascontrideto4check_2",
              "causascontrideto5check_1",
              "causascontrideto5check_2",
              "causascontrideto6check_1",
              "causascontrideto6check_2",
              "causascontrideto7check_1",
              "causascontrideto7check_2",
              "causascontrideto8check_1",
              "causascontrideto8check_2",
              "causascontrideto9check_1",
              "causascontrideto9check_2",
              "represamientomorfoembalse0",
              "represamientomorfoembalse1",
              "represamientomorfoembalse2",
              "represamientomorfoembalse3",
              "represamientomorfoembalse4",
              "represamientomorfoembalse5",
              "represamientomorfoembalse6",
              "represamientomorfoembalse7",
              "represamientomorfometria0",
              "represamientomorfometria1",
              "represamientomorfometria2",
              "represamientomorfometria3",
              "represamientomorfometria4",
              "represamientomorfometria5",
              "tipomaterial0check_1",
              "tipomaterial0check_2",
              "tipomaterial1check_1",
              "tipomaterial1check_2",
              "tipomaterial2check_1",
              "tipomaterial2check_2",
              "tipomaterial3check_1",
              "tipomaterial3check_2",
              "tipomaterial4check_1",
              "tipomaterial4check_2"
            ]

            for (let index = 0; index < campos.length; index++) {
              if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j][campos[index]] === undefined) {
                base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j][campos[index]] = "";
              }
              
            }

            var camposdanos = [
              "cantidaddano",
              "clasedano",
              "tipodano",
              "tiposdano",
              "unidaddano",
              "valordano",
            ]

            for (let index = 0; index < base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["DANOS"].count; index++) {
              var auxi = index +1
              for (let index1 = 0; index1 < camposdanos.length; index1++) {
                if (base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["DANOS"]["DANOS_"+auxi][camposdanos[index1]] === undefined) {
                  base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["DANOS"]["DANOS_"+auxi][camposdanos[index1]] = "";
                }
                
              }
              
            }


            var fechamov = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].FECHA_MOV;
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].FECHA_MOV = CorregirFechasPorImpedidos(fechamov);

            var fecharep = base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].FECHA_REP;
            base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].FECHA_REP = CorregirFechasPorImpedidos(fecharep);


            if(base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["FotosAnexas"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["FotosAnexas"] = {"count": 0,"FotosURL": {"count": 0}}
            }
            if(base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["FotosAnexas"]["FotosURL"] == undefined){
              base_clase["estacion_" + i]["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]["FotosAnexas"]["FotosURL"] = {"count": 0}
            }
          }
        }
      }

      if(base_clase["estacion_" + i]["TipoEstacion"].toLowerCase().includes("punto") || base_clase["estacion_" + i]["TipoEstacion"].toLowerCase().includes("control")){
        if (base_clase["estacion_" + i]["TipoEstacion"].toLowerCase().includes("ugs")) {
          if(base_clase["estacion_" + i]["MUN"] == "AGUADAS"){
            base_clase["estacion_" + i]["Propietario"] = "Carlos Andres Benavides Cano"
          }
          if(base_clase["estacion_" + i]["MUN"] == "ARANZAZU"){
            base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
          }
          if(base_clase["estacion_" + i]["MUN"] == "FILADELFIA"){
            base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
          }
          if(base_clase["estacion_" + i]["MUN"] == "MARQUETALIA"){
            base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
          }
          if(base_clase["estacion_" + i]["MUN"] == "RIOSUCIO"){
            base_clase["estacion_" + i]["Propietario"] = "Elena Franco García"
          }
          if(base_clase["estacion_" + i]["MUN"] == "SUPIA"){
            base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
          }
        }
      }
  
      if ((formatos == '')) {
        formatos = "";
      }else{
        formatos = formatos.substring(0, formatos.length - 2);
      }
  
      base_clase["estacion_" + i]["Formatos"] = formatos;
      if(base_clase["estacion_" + i]["Propietario"] === "andres mauricio"){
        base_clase["estacion_" + i]["Propietario"] = "Andrés Mauricio Soto";
      }
      if(base_clase["estacion_" + i]["Propietario"] === "MF OM"){
        base_clase["estacion_" + i]["Propietario"] = "Maria Areiza Rodríguez";
      }
      if(base_clase["estacion_" + i]["Propietario"] === "María Areiza Rodríguez"){
        base_clase["estacion_" + i]["Propietario"] = "Maria Areiza Rodríguez";
      }
      if(base_clase["estacion_" + i]["Propietario"] === "Manuela Renteria Cardenas"){
        base_clase["estacion_" + i]["Propietario"] = "Manuela Rentería Cárdenas";
      }
      if(base_clase["estacion_" + i]["Propietario"] === "Jenny Machado"){
        base_clase["estacion_" + i]["Propietario"] = "Jenny Machado Charry";
      }

      if (!geologos.includes(base_clase["estacion_" + i]["Propietario"])) {
        geologos.push(base_clase["estacion_" + i]["Propietario"]);
      }
      
    }
  }
  delete base_clase.cont;
  console.log(geologos);
  console.log(base_clase);
  console.log(auxcont);
}

// GenerarCapaEstaciones()
function GenerarCapaEstaciones() {
  var capaProcesos = L.layerGroup();
  var auxFormatosPopUp = "";
  var contInv = 0;
  var contCat = 0;
  var tematica = '';
  for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
    var feature = base_clase["estacion_" + i];
    if (feature.activo) {
      var point = L.marker([base_clase['estacion_'+i]['Norte'], base_clase['estacion_'+i]['Este']]).toGeoJSON();
      tematica = '';
      if (base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['activo']) {
            auxFormatosPopUp += 'UGSR' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['noformato'] + ', ';   
            tematica = "UGS";
            if(base_clase["estacion_" + i]["MUN"] == "AGUADAS"){
              base_clase["estacion_" + i]["Propietario"] = "Carlos Andres Benavides Cano"
            }
            if(base_clase["estacion_" + i]["MUN"] == "ARANZAZU"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "FILADELFIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }
            if(base_clase["estacion_" + i]["MUN"] == "MARQUETALIA"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "RIOSUCIO"){
              base_clase["estacion_" + i]["Propietario"] = "Elena Franco García"
            }
            if(base_clase["estacion_" + i]["MUN"] == "SUPIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }
          }
        }
      }
      if (base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['activo']) {
            auxFormatosPopUp += 'UGSS' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['noformato'] + ', ';   
            tematica = "UGS";
            if(base_clase["estacion_" + i]["MUN"] == "AGUADAS"){
              base_clase["estacion_" + i]["Propietario"] = "Carlos Andres Benavides Cano"
            }
            if(base_clase["estacion_" + i]["MUN"] == "ARANZAZU"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "FILADELFIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }
            if(base_clase["estacion_" + i]["MUN"] == "MARQUETALIA"){
              base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
            }
            if(base_clase["estacion_" + i]["MUN"] == "RIOSUCIO"){
              base_clase["estacion_" + i]["Propietario"] = "Elena Franco García"
            }
            if(base_clase["estacion_" + i]["MUN"] == "SUPIA"){
              base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
            }
          }
        }
      }
      if (base_clase['estacion_'+i]['Formularios']['count_SGMF']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_SGMF']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_SGMF']['Form_SGMF_'+k]['activo']) {
            auxFormatosPopUp += 'SGMF' + base_clase['estacion_'+i]['Formularios']['Form_SGMF']['Form_SGMF_'+k]['noformato'] + ', ';   
            tematica = "SGMF";
          }
        }
      }
      if (base_clase['estacion_'+i]['Formularios']['count_CATALOGO']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_CATALOGO']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_CATALOGO']['Form_CATALOGO_'+k]['activo']) {
            auxFormatosPopUp += 'SIMMA' + base_clase['estacion_'+i]['Formularios']['Form_CATALOGO']['Form_CATALOGO_'+k]['COD_SIMMA'] + ', ';   
            tematica = "CATALOGO";
          }
        }
      }
      if (base_clase['estacion_'+i]['Formularios']['count_INVENTARIO']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_INVENTARIO']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_INVENTARIO']['Form_INVENTARIO_'+k]['activo']) {
            auxFormatosPopUp += 'SIMMA' + base_clase['estacion_'+i]['Formularios']['Form_INVENTARIO']['Form_INVENTARIO_'+k]['COD_SIMMA'] + ', ';   
            tematica = "INVENTARIO";
          }
        }
      }

      if (tematica == ''){
        if (base_clase['estacion_'+i]['TipoEstacion'].includes("UGS") || base_clase['estacion_'+i]['TipoEstacion'].includes("ugs")) {
          tematica = "UGS";
          if(base_clase["estacion_" + i]["MUN"] == "AGUADAS"){
            base_clase["estacion_" + i]["Propietario"] = "Carlos Andres Benavides Cano"
          }
          if(base_clase["estacion_" + i]["MUN"] == "ARANZAZU"){
            base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
          }
          if(base_clase["estacion_" + i]["MUN"] == "FILADELFIA"){
            base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
          }
          if(base_clase["estacion_" + i]["MUN"] == "MARQUETALIA"){
            base_clase["estacion_" + i]["Propietario"] = "David Zapata Valencia"
          }
          if(base_clase["estacion_" + i]["MUN"] == "RIOSUCIO"){
            base_clase["estacion_" + i]["Propietario"] = "Elena Franco García"
          }
          if(base_clase["estacion_" + i]["MUN"] == "SUPIA"){
            base_clase["estacion_" + i]["Propietario"] = "Daniela Cardona Alzate"
          }
        }
        if (base_clase['estacion_'+i]['TipoEstacion'].includes("SGMF") || base_clase['estacion_'+i]['TipoEstacion'].includes("sgmf")) {
          tematica = "SGMF";
        }
        if (base_clase['estacion_'+i]['TipoEstacion'].includes("CMM") || base_clase['estacion_'+i]['TipoEstacion'].includes("cmm")) {
          tematica = "CATALOGO";
        }
        if (base_clase['estacion_'+i]['TipoEstacion'].includes("IMM") || base_clase['estacion_'+i]['TipoEstacion'].includes("imm")) {
          tematica = "INVENTARIO";
        }
        if (base_clase['estacion_'+i]['TipoEstacion'].includes("AVT") || base_clase['estacion_'+i]['TipoEstacion'].includes("avt")) {
          tematica = "AVT";
        }
      }
      // if (base_clase['estacion_'+i]['Propietario'] == "Jenny Machado") {
        L.extend(point.properties, {
          id: i,
          Estacion: base_clase['estacion_'+i]['Estacion'],
          Fecha: base_clase['estacion_'+i]['Fecha'],
          TipoEstacion: base_clase['estacion_'+i]['TipoEstacion'],
          Propietario: base_clase['estacion_'+i]['Propietario'],
          Observaciones: base_clase['estacion_'+i]['Observaciones'],
          Este: base_clase['estacion_'+i]['Este'],
          Norte: base_clase['estacion_'+i]['Norte'],
          Altitud: base_clase['estacion_'+i]['Altitud'],
          Tematica: tematica,
          Formatos: auxFormatosPopUp
        });
        
        // console.log(i);
        L.geoJson(point).addTo(capaProcesos)
      // }

      auxFormatosPopUp = "";
    }
  }
  console.log(base_clase);
  console.log(capaProcesos.toGeoJSON());
  console.log(contInv);
  console.log(contCat);
}

// GenerarCapaNombreUGS()
function GenerarCapaNombreUGS() {
  var capaProcesos = L.layerGroup();
  var auxFormatosPopUp = "";
  var tematica = '';
  var auxNameUGS = "";
  var auxEstUGS = false;
  
  for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
    var feature = base_clase["estacion_" + i];
    if (feature.activo) {
      tematica = '';
      auxNameUGS = "";
      auxEstUGS = false;
      if (base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['activo']) {
            auxFormatosPopUp += 'UGSR' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['noformato'] + ', ';   
            tematica = "UGS_Rocas";
            auxEstUGS = true;
            auxNameUGS = base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['nombreugs'];
          }
        }
      }
      if (base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']>0) {
        for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']; k++) {
          if (base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['activo']) {
            auxFormatosPopUp += 'UGSS' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['noformato'] + ', ';   
            tematica = "UGS_Suelos";
            auxEstUGS = true;
            auxNameUGS = base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['nombreugs'];
          }
        }
      }

      if (tematica == ''){
        if (base_clase['estacion_'+i]['TipoEstacion'].includes("UGS") || base_clase['estacion_'+i]['TipoEstacion'].includes("ugs")) {
          tematica = "Punto de Control";
          auxEstUGS = true;
        }
      }

      if (auxEstUGS) {
        var point = L.marker([base_clase['estacion_'+i]['Norte'], base_clase['estacion_'+i]['Este']]).toGeoJSON();
  
        L.extend(point.properties, {
          id: i,
          Estacion: base_clase['estacion_'+i]['Estacion'],
          Fecha: base_clase['estacion_'+i]['Fecha'],
          TipoEstacion: base_clase['estacion_'+i]['TipoEstacion'],
          Propietario: base_clase['estacion_'+i]['Propietario'],
          Observaciones: base_clase['estacion_'+i]['Observaciones'],
          Este: base_clase['estacion_'+i]['Este'],
          Norte: base_clase['estacion_'+i]['Norte'],
          Altitud: base_clase['estacion_'+i]['Altitud'],
          Tematica: tematica,
          NombreUGS: auxNameUGS,
          Formatos: auxFormatosPopUp
        });
        // console.log(i);
        L.geoJson(point).addTo(capaProcesos)
      }
      

      auxFormatosPopUp = "";
    }
  }
  console.log(base_clase);
  console.log(capaProcesos.toGeoJSON());
  console.log(contInv);
  console.log(contCat);
}

// GenerarCapaProcesosCampo()
function GenerarCapaProcesosCampo() {
  var capaProcesos = L.layerGroup();
  var capaEstacionesProcesos = L.layerGroup();
  var auxEstaciones = [];
  var auxFormatosPopUp = "";
  var contInv = 0;
  var contCat = 0;
  for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
    var feature = base_clase["estacion_" + i];
    if (feature.activo) {
      if(feature["Formularios"].count_CATALOGO>0){
        for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
          if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
            var formato = feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]; 
            if (parseFloat(formato['latitudMM'])<0) {
              var auxlat = formato['longitudMM']
              formato['longitudMM'] = formato['latitudMM']; 
              formato['latitudMM'] = auxlat; 
            }
            formato['longitudMM'] = formato['longitudMM'].replace(",", ".")
            formato['latitudMM'] = formato['latitudMM'].replace(",", ".")
            var point = L.marker([formato['latitudMM'], formato['longitudMM']]).toGeoJSON();
            const nameProcess = "CAT" + contCat;
            contCat++;

            var auxDanos = "";
            if (formato["DANOS"]["count"] > 0) {
              for (let i = 1; i <= formato["DANOS"]["count"]; i++) {
                auxDanos += "Daño: ("+formato["DANOS"]["DANOS_"+i]["clasedano"].split(":")[0]+")("+formato["DANOS"]["DANOS_"+i]["tiposdano"].split(":")[0]+")" +": "+formato["DANOS"]["DANOS_"+i]["tipodano"]+ " "+ formato["DANOS"]["DANOS_"+i]["cantidaddano"]+" "+ formato["DANOS"]["DANOS_"+i]["unidaddano"]+", Valor(US$): "+formato["DANOS"]["DANOS_"+i]["valordano"]+".";
              }
            }

            L.extend(point.properties, {
              id: nameProcess,
              Estacion: feature['Estacion'],
              Clase: "Catalogo",
              Propietario: feature['Propietario'],
              Este: formato['longitudMM'],
              Norte: formato['latitudMM'],
              TIPO_MOV1: formato.TIPO_MOV1,
              SUBTIPO_1: formato.SUBTIPO_1,
              TIPO_MOV2: formato.TIPO_MOV2,
              SUBTIPO_2: formato.SUBTIPO_2,
              FECHA_MOV: formato.FECHA_MOV,
              FECHA_REP: formato.FECHA_REP,
              ConfiFecha: formato.ConfiFechaMM,
              COD_SIMMA: formato.COD_SIMMA,
              ID_PARTE: formato.ID_PARTE,
              NOM_MUN: formato.NOM_MUN,

              COD_SIMMA: formato.COD_SIMMA,
              DANOS: auxDanos, 

              

              DESAPARECIDOS: formato.DESAPARECIDOS,
              ENCUESTAD: formato.ENCUESTAD,
              FAMILIAS: formato.FAMILIAS,
              FECHA_FUENTE: formato.FECHA_FUENTE,
              FTE_INFSEC: formato.FTE_INFSEC,
              HERIDOS: formato.HERIDOS,
              IMPORTANC: formato.IMPORTANC,
              PERSONAS: formato.PERSONAS,
              REF_GEOGRF: formato.REF_GEOGRF,
              SITIO: formato.SITIO,
              VEREDA: formato.VEREDA,
              VIDAS: formato.VIDAS,
              notas: formato.notas,
              sensoresremotos: formato.sensoresremotos

            });
            // if (formato.ConfiFechaMM == "Exacta") {
            //   L.geoJson(point).addTo(capaProcesos);
            // }
            L.geoJson(point).addTo(capaProcesos);

            if(!auxEstaciones.includes(i)){
              auxEstaciones.push(i);
              var point = L.marker([base_clase['estacion_'+i]['Norte'], base_clase['estacion_'+i]['Este']]).toGeoJSON();

              if (base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']; k++) {
                  auxFormatosPopUp += 'UGSR' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['noformato'] + ', ';   
                }
                auxmarker = markerUGSR;
                auxcapa = "ugs"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']; k++) {
                  auxFormatosPopUp += 'UGSS' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['noformato'] + ', ';   
                }
                auxmarker = markerUGSS;
                auxcapa = "ugs"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_SGMF']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_SGMF']; k++) {
                  auxFormatosPopUp += 'SGMF' + base_clase['estacion_'+i]['Formularios']['Form_SGMF']['Form_SGMF_'+k]['noformato'] + ', ';   
                }
                auxmarker = markerSGMF;
                auxcapa = "sgmf"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_CATALOGO']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_CATALOGO']; k++) {
                  auxFormatosPopUp += 'CATALOGO_' + base_clase['estacion_'+i]['Formularios']['Form_CATALOGO']['Form_CATALOGO_'+k]['ID_PARTE'] + ', ';   
                }
                auxmarker = markerCat;
                auxcapa = "cat"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_INVENTARIO']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_INVENTARIO']; k++) {
                  auxFormatosPopUp += 'INVENTARIO_' + base_clase['estacion_'+i]['Formularios']['Form_INVENTARIO']['Form_INVENTARIO_'+k]['ID_PARTE'] + ', ';   
                }
                auxmarker = markerInv;
                auxcapa = "inv"
              }

              L.extend(point.properties, {
                id: i,
                Estacion: base_clase['estacion_'+i]['Estacion'],
                Fecha: base_clase['estacion_'+i]['Fecha'],
                TipoEstacion: base_clase['estacion_'+i]['TipoEstacion'],
                Propietario: base_clase['estacion_'+i]['Propietario'],
                Observaciones: base_clase['estacion_'+i]['Observaciones'],
                Este: base_clase['estacion_'+i]['Este'],
                Norte: base_clase['estacion_'+i]['Norte'],
                Altitud: base_clase['estacion_'+i]['Altitud'],
                Formatos: auxFormatosPopUp
              });
              auxFormatosPopUp = "";
              
              // console.log(i);
              L.geoJson(point).addTo(capaEstacionesProcesos);
            }



          }
        }
      }
      if(feature["Formularios"].count_INVENTARIO>0){
        for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
          if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
            var formato = feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]; 
            var point = L.marker([feature['Norte'], feature['Este']]).toGeoJSON();
            const nameProcess = "INV" + contInv;
            contInv++;
            L.extend(point.properties, {
              id: nameProcess,
              Estacion: feature['Estacion'],
              Clase: "Inventario",
              Propietario: feature['Propietario'],
              Este: feature['Este'],
              Norte: feature['Norte'],
              TIPO_MOV1: formato.TIPO_MOV1,
              SUBTIPO_1: formato.SUBTIPO_1,
              TIPO_MOV2: formato.TIPO_MOV2,
              SUBTIPO_2: formato.SUBTIPO_2,
              FECHA_MOV: formato.FECHA_MOV,
              FECHA_REP: formato.FECHA_REP,
              ConfiFecha: formato.ConfiFechaMM,
              COD_SIMMA: formato.COD_SIMMA,
              ID_PARTE: formato.ID_PARTE,
              NOM_MUN: formato.NOM_MUN,

              COD_SIMMA: formato.COD_SIMMA,
              DANOS: "", 
              DESAPARECIDOS: formato.DESAPARECIDOS,
              ENCUESTAD: formato.ENCUESTAD,
              FAMILIAS: formato.FAMILIAS,
              FECHA_FUENTE: formato.FECHA_FUENTE,
              FTE_INFSEC: formato.FTE_INFSEC,
              HERIDOS: formato.HERIDOS,
              IMPORTANC: formato.IMPORTANC,
              PERSONAS: formato.PERSONAS,
              REF_GEOGRF: formato.REF_GEOGRF,
              SITIO: formato.SITIO,
              VEREDA: formato.VEREDA,
              VIDAS: formato.VIDAS,
              notas: formato.notas,
              sensoresremotos: formato.sensoresremotos
            });

            // if (formato.ConfiFechaMM == "Exacta") {
            //   L.geoJson(point).addTo(capaProcesos);
            // }
            L.geoJson(point).addTo(capaProcesos);

            if(!auxEstaciones.includes(i)){
              auxEstaciones.push(i);
              var point = L.marker([base_clase['estacion_'+i]['Norte'], base_clase['estacion_'+i]['Este']]).toGeoJSON();

              if (base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Rocas']; k++) {
                  auxFormatosPopUp += 'UGSR' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Rocas']['Form_UGS_Rocas_'+k]['noformato'] + ', ';   
                }
                auxmarker = markerUGSR;
                auxcapa = "ugs"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_UGS_Suelos']; k++) {
                  auxFormatosPopUp += 'UGSS' + base_clase['estacion_'+i]['Formularios']['Form_UGS_Suelos']['Form_UGS_Suelos_'+k]['noformato'] + ', ';   
                }
                auxmarker = markerUGSS;
                auxcapa = "ugs"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_SGMF']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_SGMF']; k++) {
                  auxFormatosPopUp += 'SGMF' + base_clase['estacion_'+i]['Formularios']['Form_SGMF']['Form_SGMF_'+k]['noformato'] + ', ';   
                }
                auxmarker = markerSGMF;
                auxcapa = "sgmf"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_CATALOGO']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_CATALOGO']; k++) {
                  auxFormatosPopUp += 'CATALOGO_' + base_clase['estacion_'+i]['Formularios']['Form_CATALOGO']['Form_CATALOGO_'+k]['ID_PARTE'] + ', ';   
                }
                auxmarker = markerCat;
                auxcapa = "cat"
              }
              if (base_clase['estacion_'+i]['Formularios']['count_INVENTARIO']>0) {
                for (let k = 0; k < base_clase['estacion_'+i]['Formularios']['count_INVENTARIO']; k++) {
                  auxFormatosPopUp += 'INVENTARIO_' + base_clase['estacion_'+i]['Formularios']['Form_INVENTARIO']['Form_INVENTARIO_'+k]['ID_PARTE'] + ', ';   
                }
                auxmarker = markerInv;
                auxcapa = "inv"
              }

              L.extend(point.properties, {
                id: i,
                Estacion: base_clase['estacion_'+i]['Estacion'],
                Fecha: base_clase['estacion_'+i]['Fecha'],
                TipoEstacion: base_clase['estacion_'+i]['TipoEstacion'],
                Propietario: base_clase['estacion_'+i]['Propietario'],
                Observaciones: base_clase['estacion_'+i]['Observaciones'],
                Este: base_clase['estacion_'+i]['Este'],
                Norte: base_clase['estacion_'+i]['Norte'],
                Altitud: base_clase['estacion_'+i]['Altitud'],
                Formatos: auxFormatosPopUp
              });
              auxFormatosPopUp = "";
              // console.log(i);
              L.geoJson(point).addTo(capaEstacionesProcesos);
            }


          }
        }
      }      
    }
  }
  console.log(base_clase);
  console.log(capaProcesos.toGeoJSON());
  console.log(capaEstacionesProcesos.toGeoJSON());
  console.log(contInv);
  console.log(contCat);
}

// GenerarCapaUGSEstrati()
function GenerarCapaUGSEstrati() {
  var capaProcesos = L.layerGroup();
  var contUGSR = 0;
  for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
    var feature = base_clase["estacion_" + i];
    if (feature.activo) {
      if(feature["Formularios"].count_UGS_Rocas>0){
        for (let j = 0; j < feature["Formularios"].count_UGS_Rocas; j++) {
          if (feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j].activo) {
            var formato = feature["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]; 
            if (formato["Discontinuidades"]["count"] !== undefined) {
              if (formato["Discontinuidades"]["count"] > 0) {
                for (let h = 1; h <= formato["Discontinuidades"]["count"]; h++) {
                  var discont = formato["Discontinuidades"]["Discont_"+h]
                  // if (discont["TipoDiscont"] === "9. Estratificación") {
                    var point = L.marker([feature['Norte'], feature['Este']]).toGeoJSON();
                    const nameProcess = "UGS" + contUGSR;
                    contUGSR++;
                    L.extend(point.properties, {
                      id: nameProcess,
                      Estacion: feature['Estacion'],
                      Clase: "Discontinuidad en Formato UGS Rocas",
                      Propietario: feature['Propietario'],
                      Este: feature['Este'],
                      Norte: feature['Norte'],
                      UGS: formato["nombreugs"],
                      Bz: discont["Buzamiento"],
                      DirBz: discont["DirBuzamiento"],
                      NDiscont:h,
                      Observacion: discont["ObservacionesDiscont"]
                    });

                    L.geoJson(point).addTo(capaProcesos);
                  // }
                }
              }
            }
          }
        }
      }
      else if(feature["TipoEstacion"].toLowerCase().includes("punto") && feature["TipoEstacion"].toLowerCase().includes("control") && feature["TipoEstacion"].toLowerCase().includes("ugs")){
        if (feature["Observaciones"].toLowerCase().includes("estrati") || feature["Observaciones"].toLowerCase().includes("/")) {
          console.log(feature["Observaciones"]);
          var point = L.marker([feature['Norte'], feature['Este']]).toGeoJSON();
          const nameProcess = "UGS" + contUGSR;
          contUGSR++;
          L.extend(point.properties, {
            id: nameProcess,
            Estacion: feature['Estacion'],
            Clase: "Discontinuidad en Punto de Control UGS",
            Propietario: feature['Propietario'],
            Este: feature['Este'],
            Norte: feature['Norte'],
            UGS: "",
            Bz: "",
            DirBz: "",
            NDiscont:"",
            Observacion: feature["Observaciones"]
          });

          L.geoJson(point).addTo(capaProcesos);
        }
      }    
    }
  }
  console.log(base_clase);
  console.log(capaProcesos.toGeoJSON());
  console.log(contUGSR);
}


// SubirINVCATaProcesos(2941);
// SubirINVCATaProcesos(2673);
function SubirINVCATaProcesos(cont){
  for (let idfor = 0; idfor < alturas["features"].length; idfor++) {
    

    delete alturas["features"][idfor]["properties"]["Shape_Leng"];
    delete alturas["features"][idfor]["properties"]["Shape_Area"];
    delete alturas["features"][idfor]["properties"]["OBJECTID"];

    var encontrado = false;
    var idBuscar = alturas["features"][idfor]["properties"]["ID_MOV"];
    for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
      if (encontrado) {
        break;
      }
      var feature = base_clase["estacion_" + i];
      if (feature.activo) {
        // console.log(i);
        if(feature["Formularios"].count_CATALOGO>0){
          for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
            if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
              var formato = feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]; 
              if(idBuscar === formato["ID_PARTE"]){
                
                alturas["features"][idfor]["properties"]["ENCUESTAD"] = formato["ENCUESTAD"];
                alturas["features"][idfor]["properties"]["COD_SIMMA"] = formato["COD_SIMMA"];
                alturas["features"][idfor]["properties"]["FECHA_REP"] = CorregirFechasPorImpedidos(formato["FECHA_REP"]);
                alturas["features"][idfor]["properties"]["FECHA_MOV"] = CorregirFechasPorImpedidos(formato["FECHA_MOV"]);
                alturas["features"][idfor]["properties"]["ConfiFechaMM"] = confifecha[formato["ConfiFechaMM"]];
                alturas["features"][idfor]["properties"]["FTE_INFSEC"] = formato["FTE_INFSEC"];
                alturas["features"][idfor]["properties"]["REF_GEOGRF"] = formato["REF_GEOGRF"];
                alturas["features"][idfor]["properties"]["VEREDA"] = formato["VEREDA"];

                alturas["features"][idfor]["properties"]["TIPO_MOV1"] = MM_tipo[formato["TIPO_MOV1"]];

                if (formato["TIPO_MOV2"] === "No Aplica") {
                  formato["TIPO_MOV2"] = "";
                }
                alturas["features"][idfor]["properties"]["TIPO_MOV2"] = formato["TIPO_MOV2"];

                alturas["features"][idfor]["properties"]["IMPORTANC"] = formato["IMPORTANC"];

                var auxDanos = "";
                if (formato["DANOS"]["count"] > 0) {
                  for (let i = 1; i <= formato["DANOS"]["count"]; i++) {
                    auxDanos += "Daño: ("+formato["DANOS"]["DANOS_"+i]["clasedano"].split(":")[0]+")("+formato["DANOS"]["DANOS_"+i]["tiposdano"].split(":")[0]+")" +": "+formato["DANOS"]["DANOS_"+i]["tipodano"]+ " "+ formato["DANOS"]["DANOS_"+i]["cantidaddano"]+" "+ formato["DANOS"]["DANOS_"+i]["unidaddano"]+", Valor(US$): "+formato["DANOS"]["DANOS_"+i]["valordano"]+".";
                  }
                }

                alturas["features"][idfor]["properties"]["DANO"] = auxDanos;

                alturas["features"][idfor]["properties"]["VERIF_CAM"] = "1";
                alturas["features"][idfor]["properties"]["OBSERVAC"] = formato["notas"];
                alturas["features"][idfor]["properties"]["COD_SIMMA"] = "SIMMA"+formato["COD_SIMMA"];

                alturas["features"][idfor]["properties"]["NOM_MUN"] = mpios_cod[formato["NOM_MUN"]].split(" - ")[1];
                alturas["features"][idfor]["properties"]["COD_MUN"] = mpios_cod[formato["NOM_MUN"]].split(" - ")[0];

                if (formato["SUBTIPO_1"].split(" ")[0] === "Deslizamiento") {
                  formato["SUBTIPO_1"] = ArreglarMayus(formato["SUBTIPO_1"].split(" ")[1])
                }
                if (formato["SUBTIPO_2"].split(" ")[0] === "Deslizamiento") {
                  formato["SUBTIPO_2"] = ArreglarMayus(formato["SUBTIPO_2"].split(" ")[1])
                }
                if (formato["SUBTIPO_2"] === "No Aplica") {
                  formato["SUBTIPO_2"] = "";
                }
                alturas["features"][idfor]["properties"]["SUBTIPO_1"] = formato["SUBTIPO_1"];
                alturas["features"][idfor]["properties"]["SUBTIPO_2"] = formato["SUBTIPO_2"];
                alturas["features"][idfor]["properties"]["Mapa"] = "01";
                alturas["features"][idfor]["properties"]["DPTO"] = "CALDAS";
                alturas["features"][idfor]["properties"]["PROF"] = "Superficia";
                alturas["features"][idfor]["properties"]["PARTE"] = "05";
                alturas["features"][idfor]["properties"]["ID_PARTE"] = alturas["features"][idfor]["properties"]["ID_MOV"] + "-05";







                console.log("encontrado");
                encontrado = true;
                break;
              }
            }
          }
        }
        if(feature["Formularios"].count_INVENTARIO>0){
          for (let j = 0; j < feature["Formularios"].count_INVENTARIO; j++) {
            if (feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j].activo) {
              var formato = feature["Formularios"]["Form_INVENTARIO"]["Form_INVENTARIO_"+j]; 
              if(idBuscar === formato["ID_PARTE"]){
                

                alturas["features"][idfor]["properties"]["ENCUESTAD"] = formato["ENCUESTAD"];
                alturas["features"][idfor]["properties"]["COD_SIMMA"] = formato["COD_SIMMA"];
                if (formato["FECHA_REP"] === "incierta") {
                  formato["FECHA_REP"]="";
                }
                if (formato["FECHA_MOV"] === "incierta") {
                  formato["FECHA_MOV"]="";
                }
                alturas["features"][idfor]["properties"]["FECHA_REP"] = CorregirFechasPorImpedidos(formato["FECHA_REP"]);
                alturas["features"][idfor]["properties"]["FECHA_MOV"] = CorregirFechasPorImpedidos(formato["FECHA_MOV"]);
                alturas["features"][idfor]["properties"]["ConfiFechaMM"] = confifecha[formato["ConfiFechaMM"]];
                alturas["features"][idfor]["properties"]["FTE_INFSEC"] = formato["FTE_INFSEC"];
                alturas["features"][idfor]["properties"]["REF_GEOGRF"] = formato["REF_GEOGRF"];
                alturas["features"][idfor]["properties"]["VEREDA"] = formato["VEREDA"];

                alturas["features"][idfor]["properties"]["TIPO_MOV1"] = MM_tipo[formato["TIPO_MOV1"]];


                if (formato["TIPO_MOV2"] === "No Aplica") {
                  formato["TIPO_MOV2"] = "";
                }

                alturas["features"][idfor]["properties"]["TIPO_MOV2"] = formato["TIPO_MOV2"];

                if (formato["ESTADO_ACT"] === "Latente" || formato["ESTADO_ACT"] === "Estabilizado" || formato["ESTADO_ACT"] === "Relicto") {
                  alturas["features"][idfor]["properties"]["ACTIVIDAD"] = "0";
                }
                else{
                  alturas["features"][idfor]["properties"]["ACTIVIDAD"] = "1";
                }
                alturas["features"][idfor]["properties"]["NOM_MUN"] = mpios_cod[formato["NOM_MUN"]].split(" - ")[1];
                alturas["features"][idfor]["properties"]["COD_MUN"] = mpios_cod[formato["NOM_MUN"]].split(" - ")[0];

                
                alturas["features"][idfor]["properties"]["ESTILO"] = auxestilo[formato["ESTILO"]];
                alturas["features"][idfor]["properties"]["DISTRIBUC"] = auxdistri[formato["DISTRIBUC"]];
                alturas["features"][idfor]["properties"]["LITOLOGIA"] = formato["LITOLOGIA"];
                alturas["features"][idfor]["properties"]["DIRECCION"] = formato["morfogeneral5"];
                alturas["features"][idfor]["properties"]["LONGITUD"] = formato["morfogeneral1"];
                alturas["features"][idfor]["properties"]["ANCHO"] = formato["morfodimensiones1"];
                alturas["features"][idfor]["properties"]["ESPESOR"] = formato["morfodimensiones4"];

                var auxcobuso = "Cobertura: ";
                for (let i = 0; i < 8; i++) {
                if (formato["cobertura"+i] !== "") {
                  auxcobuso += cober[i]+": "+ formato["cobertura"+i]+"%, ";
                }  
                }
                auxcobuso = auxcobuso.substring(0, auxcobuso.length - 2);
                auxcobuso += ". Uso: ";
                for (let i = 0; i < 10; i++) {
                if (formato["usosuelo"+i] !== "") {
                  auxcobuso += usos[i]+": "+ formato["usosuelo"+i]+"%, ";
                }  
                }
                auxcobuso = auxcobuso.substring(0, auxcobuso.length - 2);

                alturas["features"][idfor]["properties"]["COB_USO"] = auxcobuso;
                auxcobuso = "";

                alturas["features"][idfor]["properties"]["AN_GMF"] = formato["AN_GMF"];
                alturas["features"][idfor]["properties"]["IMPORTANC"] = formato["IMPORTANC"];

                var auxDanos = "";
                if (formato["DANOS"]["count"] > 0) {
                for (let i = 1; i <= formato["DANOS"]["count"]; i++) {
                  auxDanos += "Daño: ("+formato["DANOS"]["DANOS_"+i]["clasedano"].split(":")[0]+")("+formato["DANOS"]["DANOS_"+i]["tiposdano"].split(":")[0]+")" +": "+formato["DANOS"]["DANOS_"+i]["tipodano"]+ " "+ formato["DANOS"]["DANOS_"+i]["cantidaddano"]+" "+ formato["DANOS"]["DANOS_"+i]["unidaddano"]+", Valor(US$): "+formato["DANOS"]["DANOS_"+i]["valordano"]+".";
                }
                }

                alturas["features"][idfor]["properties"]["DANO"] = auxDanos;

                alturas["features"][idfor]["properties"]["AME_POT"] = formato["apreciacionriesgo"];
                alturas["features"][idfor]["properties"]["VERIF_CAM"] = "1";
                alturas["features"][idfor]["properties"]["OBSERVAC"] = formato["notas"];
                alturas["features"][idfor]["properties"]["ID_FORMAT"] = "SIMMA"+formato["COD_SIMMA"];


                if (formato["SUBTIPO_1"].split(" ")[0] === "Deslizamiento") {
                  formato["SUBTIPO_1"] = ArreglarMayus(formato["SUBTIPO_1"].split(" ")[1])
                }
                if (formato["SUBTIPO_2"].split(" ")[0] === "Deslizamiento") {
                  formato["SUBTIPO_2"] = ArreglarMayus(formato["SUBTIPO_2"].split(" ")[1])
                }
                if (formato["SUBTIPO_2"] === "No Aplica") {
                  formato["SUBTIPO_2"] = "";
                }
                alturas["features"][idfor]["properties"]["SUBTIPO_1"] = formato["SUBTIPO_1"];
                alturas["features"][idfor]["properties"]["SUBTIPO_2"] = formato["SUBTIPO_2"];
                alturas["features"][idfor]["properties"]["ESTADO_ACT"] = auxact[formato["ESTADO_ACT"]];
                alturas["features"][idfor]["properties"]["Mapa"] = "01";
                alturas["features"][idfor]["properties"]["DPTO"] = "CALDAS";
                alturas["features"][idfor]["properties"]["PROF"] = "Superficia";

                if (alturas["features"][idfor]["properties"]["ID_MOV"].includes("-")) {
                  // alturas["features"][idfor]["properties"]["PARTE"] = alturas["features"][idfor]["properties"]["PARTE"];
                  alturas["features"][idfor]["properties"]["ID_MOV"] = alturas["features"][idfor]["properties"]["ID_MOV"].split("-")[0];
                }
                else{
                  alturas["features"][idfor]["properties"]["ID_MOV"] = alturas["features"][idfor]["properties"]["ID_MOV"].split("_")[0];
                  alturas["features"][idfor]["properties"]["PARTE"] = "05";
                }
                alturas["features"][idfor]["properties"]["ID_PARTE"] = alturas["features"][idfor]["properties"]["ID_MOV"].split("_")[0] +"-"+ alturas["features"][idfor]["properties"]["PARTE"];



                console.log("encontrado");
                encontrado = true;
                break;
              }
            }
          }
        } 
      }
    }
    if (encontrado) {
      var tipo = alturas['features'][idfor]['properties'].TIPO_MOV1;
      var subtipo = alturas['features'][idfor]['properties'].SUBTIPO_1;
      var profundidad = alturas['features'][idfor]['properties'].PROF;
      var parte = alturas['features'][idfor]['properties'].PARTE;
      var actividad = alturas['features'][idfor]['properties'].ACTIVIDAD;
      var verificado = alturas['features'][idfor]['properties'].VERIF_CAM;
      var etiqueta =''


      if (tipo == '01') {
        etiqueta = 'd';
      }else if (tipo == '04') {
        etiqueta = 'f';
      }else if (tipo == '03') {
        etiqueta = 'c';
      }else if (tipo == '02') {
        etiqueta = 'r';
        etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
      }

      if (subtipo == 'Rotacional') {
        etiqueta += 'r'
        etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
      } else if (subtipo == 'Traslacional') {
        etiqueta += 't'
        etiqueta += (profundidad == 'Superficia') ? 's' : 'p';
      } else if (subtipo == 'Caída de Suelo') {
        etiqueta += 's'
      } else if (subtipo == 'Caída de Roca') {
        etiqueta += 'r'
      } else if (subtipo == 'Flujo de lodo' || subtipo == 'Flujo de Lodo') {
        etiqueta += 'l'
      } else if (subtipo == 'Flujo de tierra' || subtipo == 'Flujo de Tierra') {
        etiqueta += 't'
      } else if (subtipo == 'Flujo de detritos' || subtipo == 'Flujo de Detritos') {
        etiqueta += 'd'
      }

      if (tipo !== '02') {
        if (parte == '01') {
          etiqueta += '-e'
        } else if (parte == '03' || parte == '04') {
          etiqueta += '-d'
        } else if (parte == '05') {
          etiqueta += '-n'
        } 
      }
      alturas['features'][idfor]['properties'].ETIQUETA = etiqueta;

      var tipoMM = '';

      if (tipo == '01') {
        tipoMM = 'Deslizamiento';
        tipoMM += (actividad == '0') ? ' inactivo' : ' activo';
        tipoMM += (verificado == '0') ? ' no verificado' : ' verificado';
      }else if (tipo == '04') {
        tipoMM = 'Flujo';
        tipoMM += (actividad == '0') ? ' inactivo' : ' activo';
        tipoMM += (verificado == '0') ? ' no verificado' : ' verificado';
      }else if (tipo == '03') {
        tipoMM = 'Caída';
        tipoMM += (actividad == '0') ? ' inactiva' : ' activa';
        tipoMM += (verificado == '0') ? ' no verificada' : ' verificada';
      }else if (tipo == '02') {
        tipoMM = 'Reptación';
        tipoMM += (profundidad == 'Superficia') ? ' superficial' : ' profunda';
        tipoMM += (verificado == '0') ? ' no verificada' : ' verificada';
      }

      if (tipo !== '02') {
        if (parte == '01') {
          tipoMM += ' (escarpe)';
        }else if (parte == '02') {
          tipoMM += ' (tránsito)';
        }else if (parte == '03' || parte == '04') {
          tipoMM += ' (cuerpo)';
        }
      }
      alturas['features'][idfor].properties.Cod_MM = tipo_cod_MM[tipoMM];
      alturas['features'][idfor].properties.Tipo_MM = tipo_cod_MM[tipoMM];
      
    }
  }
  console.log(alturas);

  var newCount = cont;

  for (let ind = 0; ind < alturas["features"].length; ind++) {
    
    // database.ref('features/procesos/feature_'+newCount).set({
    //   id: newCount,
    //   activo : true,
    //   uid: '',
    //   layergeojson : alturas['features'][ind],
    // });

    newCount++;
    
  }

  // database.ref('features/procesos/count').set({
  //   count : newCount
  // });
  
}

// ManejoEstaciones();
function ManejoEstaciones(){
  var ind = 0;
  for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
    var feature = base_clase["estacion_" + i];
    if (feature.activo) {
      base_clase["estacion_" + i]["MUN"] = alturas["features"][ind]["properties"]["MPIO_CNMBR"];
      if(base_clase["estacion_" + i]["MUN"] == null){
        console.log("nullisima: "+ i + ", munis:" + alturas["features"][ind]["properties"]["MPIO_CNMBR"] + " en la posi: " + ind);
      }
      if (i != alturas["features"][ind]["properties"]["id"]) {
        console.log(alturas["features"][ind]["properties"]["id"] + '_' + i);
        console.log("ñooooo");
      }
      ind++;
    }
  }

  console.log(alturas);
  console.log(base_clase);

}

// GenerarTextosUGS()
function GenerarTextosUGS() {
  var ugses = {};
  for (let index = 0; index < alturas["features"].length; index++) {
    const ugs = alturas["features"][index]["properties"];
    if (ugses[ugs.Cod_UGS] !== undefined && ugs.id != 0) {
      ugses[ugs.Cod_UGS].push(ugs.id);
    }
    else {
      ugses[ugs.Cod_UGS] = [];
    }
  }
  console.log(ugses);




  // var estacionesUGS =[];
  // for (let index = 0; index < base_clase["cont"]["cont"]; index++) {
  //   const estacionTL = base_clase["estacion_"+index];
  //   if (estacionTL.activo) {
  //     if(estacionTL["Formularios"].count_UGS_Rocas>0){
  //       for (let j = 0; j < estacionTL["Formularios"].count_UGS_Rocas; j++) {
  //         var formato = estacionTL["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]; 
  //         if (formato.activo) {
  //           if (!estacionesUGS.includes(index) && formato.municipios == "AGUADAS") {
  //             estacionesUGS.push(index);
  //           }
  //         }             
  //       }
  //     }
  //     if(estacionTL["Formularios"].count_UGS_Suelos>0){
  //       for (let j = 0; j < estacionTL["Formularios"].count_UGS_Suelos; j++) {
  //         var formato = estacionTL["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j]; 
  //         if (formato.activo) {
  //           if (!estacionesUGS.includes(index)  && formato.municipios == "AGUADAS") {
  //             estacionesUGS.push(index);
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // estacionesUGS = estacionesUGS.sort();
  // console.log(estacionesUGS);

  // var ugsConEstaciones = {};
  // var ugsSinSiglas = [];
  // var ugsConSiglas = [];

  // for (let iugs = 0; iugs < ugses.length; iugs++) {
  //   var auxEstaciones = [];
  //   for (let iest = 0; iest < estacionesUGS.length; iest++) {
  //     const estacionTL = base_clase["estacion_"+estacionesUGS[iest]];
  //     if(estacionTL["Formularios"].count_UGS_Rocas>0){
  //       for (let j = 0; j < estacionTL["Formularios"].count_UGS_Rocas; j++) {
  //         var formato = estacionTL["Formularios"]["Form_UGS_Rocas"]["Form_UGS_Rocas_"+j]; 
  //         var ugsestacion = "";
  //         if (formato.activo) {
  //           if (formato.nombreugs.split("(")[1] !== undefined) {
  //             ugsestacion = formato.nombreugs.split("(")[1].replace(")","");
  //             if (!ugsConSiglas.includes(ugsestacion)) {
  //               ugsConSiglas.push(ugsestacion);
  //             }
  //           }else{
  //             if (!ugsSinSiglas.includes(formato.nombreugs)) {
  //               ugsSinSiglas.push(formato.nombreugs);
  //             }
  //           }
  //           if (!auxEstaciones.includes(estacionesUGS[iest]) && ugsestacion == ugses[iugs]) {
  //             auxEstaciones.push(estacionesUGS[iest]);
  //           }
  //         }             
  //       }
  //     }
  //     if(estacionTL["Formularios"].count_UGS_Suelos>0){
  //       for (let j = 0; j < estacionTL["Formularios"].count_UGS_Suelos; j++) {
  //         var formato = estacionTL["Formularios"]["Form_UGS_Suelos"]["Form_UGS_Suelos_"+j]; 
  //         var ugsestacion = "";
  //         if (formato.activo) {
  //           if (formato.nombreugs.split("(")[1] !== undefined) {
  //             ugsestacion = formato.nombreugs.split("(")[1].replace(")","");
  //             if (!ugsConSiglas.includes(ugsestacion)) {
  //               ugsConSiglas.push(ugsestacion);
  //             }
  //           }else{
  //             if (!ugsSinSiglas.includes(formato.nombreugs)) {
  //               ugsSinSiglas.push(formato.nombreugs);
  //             }
  //           }
  //           if (!auxEstaciones.includes(estacionesUGS[iest])  && ugsestacion == ugses[iugs]) {
  //             auxEstaciones.push(estacionesUGS[iest]);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   ugsConEstaciones[ugses[iugs]] = auxEstaciones;
  // }

  // console.log(ugsConSiglas.sort());
  // console.log(ugsSinSiglas.sort());
  // console.log(ugsConEstaciones);

}

// DepurarIPM2Catalogos()
function DepurarIPM2Catalogos() {
  var todosProcesos = [];
  var procesosRepetidos = [];
  var procesosUnicos = [];
  var procesosUnicosSIMMA = [];
  var baseIPM = [];
  for (let j = 0; j < alturas["count"]["count"]; j++) {
    if (alturas["feature_"+j]?.activo) {
      const proceso = alturas["feature_"+j]["layergeojson"]["properties"];
      todosProcesos.push(proceso["ID_MOV"])
    }
  }
  for (let j = 0; j < alturas["count"]["count"]; j++) {
    if (alturas["feature_"+j]?.activo) {
      const proceso = alturas["feature_"+j]["layergeojson"]["properties"];
      const cantidad = todosProcesos.filter((n) => n == proceso["ID_MOV"]).length;
      // console.log(cantidad);

      if (!procesosUnicos.includes(proceso["ID_MOV"]) && cantidad == 1) {
        agregarIPM2Catalogo(proceso);
      }
      else if (!procesosUnicos.includes(proceso["ID_MOV"]) && cantidad > 1) {
        if (proceso["PARTE"] == "01") {
          agregarIPM2Catalogo(proceso)
        }
        else {
          procesosRepetidos.push(proceso)
          // console.log(proceso["ID_MOV"]);
        }
      }

      

      if (!procesosUnicosSIMMA.includes(proceso["COD_SIMMA"])) {
        procesosUnicosSIMMA.push(proceso["COD_SIMMA"]+"");
      }
    }
  }

  var procesosResagados = [];

  for (let index = 0; index < procesosRepetidos.length; index++) {
    if(!procesosUnicos.includes(procesosRepetidos[index]["ID_MOV"])){
      // console.log(procesosRepetidos[index]["ID_PARTE"] + ' ____ ' + procesosRepetidos[index]["ALTITUD"]);
      agregarIPM2Catalogo(procesosRepetidos[index])
    }
    
  }

  function agregarIPM2Catalogo(proceso){
    if(proceso["ESTE"] == 0 || proceso["ESTE"] == "" || proceso["ESTE"] == " "){
      // proceso["ESTE"] = turf.getCoord(turf.centroid(alturas["feature_"+j]["layergeojson"]))[0];
      if(proceso["ESTE_ESC"] == 0 || proceso["ESTE_ESC"] == "" || proceso["ESTE_ESC"] == " "){
        proceso["ESTE"] = proceso["ESTE_CUERP"];
      }
      else{
        proceso["ESTE"] = proceso["ESTE_ESC"];
      }
    }
    if(proceso["NORTE"] == 0 || proceso["NORTE"] == "" || proceso["NORTE"] == " "){
      // proceso["NORTE"] = turf.getCoord(turf.centroid(alturas["feature_"+j]["layergeojson"]))[1];
      if(proceso["NORTE_ESC"] == 0 || proceso["NORTE_ESC"] == "" || proceso["NORTE_ESC"] == " "){
        proceso["NORTE"] = proceso["NORTE_CUER"];
      }
      else{
        proceso["NORTE"] = proceso["NORTE_ESC"];
      }
    }
    if (proceso["NORTE"]+"".includes(",")) {
      console.log(proceso["ID_MOV"]);
      
    }
    proceso["NORTE"] = proceso["NORTE"]+"".split(",").join(".");
    proceso["ESTE"] = proceso["ESTE"]+"".split(",").join(".");
    // proceso["ESTE"] = parseFloat(proceso["ESTE"]);
    // proceso["NORTE"] = parseFloat(proceso["NORTE"]);
    let regex = /Mosaico Imágenes PlanetScope \([^)]*\)/i;
    if(regex.exec(proceso["FTE_INFSEC"])!=null) {
      const auxString = regex.exec(proceso["FTE_INFSEC"])[0].split(";").join(",")
      proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].replace(regex, auxString);
      // console.log(proceso["FTE_INFSEC"]);
    }
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("CNES / Airbus").join("CNES/Airbus");
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("CNES/ Airbus").join("CNES/Airbus");
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("  Image").join(" Image");
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("Vuelo").join("Vuelo ");
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("Vuelo  ").join("Vuelo ");
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("Mosaico Imágenes PlanetScope").join("Imágenes PlanetScope");
    proceso["FTE_INFSEC"] = proceso["FTE_INFSEC"].split("Imágenes PlanetScope").join("Mosaico Imágenes PlanetScope");
    if(proceso["FTE_INFSEC"].includes("PlanetScope") && !proceso["FTE_INFSEC"].includes("Mosaico")){
      console.log(proceso["FTE_INFSEC"]);
    }
    // console.log(proceso["FTE_INFSEC"]);
    procesosUnicos.push(proceso["ID_MOV"]);
    proceso["COD_SIMMA"] = parseInt(proceso["COD_SIMMA"])
    baseIPM.push(proceso);
  }


  console.log(procesosUnicos);
  console.log(baseIPM);

  var simmas = [];
  var repetidos= [];
  for (let ind = 0; ind < baseIPM.length; ind++) {
    const element = baseIPM[ind];
    if(!simmas.includes(element['COD_SIMMA'])){
      simmas.push(element['COD_SIMMA']);
    }
    else{
      repetidos.push(element['COD_SIMMA'])
    }
  }
  console.log(repetidos)

  // var catalogosUnicos = [];
  // var catalogoSinIPM = [];



  // var capaProcesos = L.layerGroup();
  // var contCat = 0;

  // for (let i = 0; i < base_clase["cont"]["cont"]; i++) {
  //   var feature = base_clase["estacion_" + i];
  //   if (feature.activo) {
  //     if(feature["Formularios"].count_CATALOGO>0){
  //       for (let j = 0; j < feature["Formularios"].count_CATALOGO; j++) {
  //         if (feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j].activo) {
  //           var formato = feature["Formularios"]["Form_CATALOGO"]["Form_CATALOGO_"+j]; 
  //           catalogosUnicos.push(formato['COD_SIMMA']);
  //           if (!procesosUnicosSIMMA.includes(formato['COD_SIMMA'])) {
  //             catalogoSinIPM.push(formato['COD_SIMMA']);
  //             if (parseFloat(formato['latitudMM'])<0) {
  //               var auxlat = formato['longitudMM']
  //               formato['longitudMM'] = formato['latitudMM']; 
  //               formato['latitudMM'] = auxlat; 
  //             }
  //             formato['longitudMM'] = formato['longitudMM'].replace(",", ".")
  //             formato['latitudMM'] = formato['latitudMM'].replace(",", ".")
  //             var point = L.marker([formato['latitudMM'], formato['longitudMM']]).toGeoJSON();
  //             const nameProcess = "CAT" + contCat;
  //             contCat++;
  //             L.extend(point.properties, {
  //               id: nameProcess,
  //               Estacion: feature['Estacion'],
  //               Clase: "Catalogo",
  //               Propietario: feature['Propietario'],
  //               Este: formato['longitudMM'],
  //               Norte: formato['latitudMM'],
  //               TIPO_MOV1: formato.TIPO_MOV1,
  //               SUBTIPO_1: formato.SUBTIPO_1,
  //               TIPO_MOV2: formato.TIPO_MOV2,
  //               SUBTIPO_2: formato.SUBTIPO_2,
  //               FECHA_MOV: formato.FECHA_MOV,
  //               FECHA_REP: formato.FECHA_REP,
  //               ConfiFecha: formato.ConfiFechaMM,
  //               COD_SIMMA: formato.COD_SIMMA,
  //               ID_PARTE: formato.ID_PARTE,
  //               NOM_MUN: formato.NOM_MUN,
  
  //               COD_SIMMA: formato.COD_SIMMA,
  //               DANOS: "", 
  //               DESAPARECIDOS: formato.DESAPARECIDOS,
  //               ENCUESTAD: formato.ENCUESTAD,
  //               FAMILIAS: formato.FAMILIAS,
  //               FECHA_FUENTE: formato.FECHA_FUENTE,
  //               FTE_INFSEC: formato.FTE_INFSEC,
  //               HERIDOS: formato.HERIDOS,
  //               IMPORTANC: formato.IMPORTANC,
  //               PERSONAS: formato.PERSONAS,
  //               REF_GEOGRF: formato.REF_GEOGRF,
  //               SITIO: formato.SITIO,
  //               VEREDA: formato.VEREDA,
  //               VIDAS: formato.VIDAS,
  //               notas: formato.notas,
  //               sensoresremotos: formato.sensoresremotos
  
  //             });
  //             // if (formato.ConfiFechaMM == "Exacta") {
  //             //   L.geoJson(point).addTo(capaProcesos);
  //             // }
  //             L.geoJson(point).addTo(capaProcesos);
  //           }
  //         }
  //       }
  //     }    
  //   }
  // }
  // console.log(procesosUnicosSIMMA.sort());
  // console.log(catalogosUnicos.sort());
  // console.log(base_clase);
  // console.log(capaProcesos.toGeoJSON());
  // console.log(contCat);

  // console.log(catalogoSinIPM.sort());

}

