<template>
  <div id="app">
    <GmapMap
      :center="center"
      :zoom="17"
      map-style-id="roadmap"
      :options="mapOptions"
      style="width: 100%; height: 80vmin"
      ref="mapRef"
      @click="handleMapClick"
    >
      <gmap-info-window 
        @closeclick="info_window_open=false" 
        :opened="info_window_open" 
        :position="infowindow"
        :options="{
          pixelOffset: {
            width: 0,
            height: -50
          }
        }"
      >
        <custom-info-window />
      </gmap-info-window>
      <GmapMarker
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="openInfoWindow"
        icon='https://images.sendyit.com/web_platform/vendor_type/top/25_freight.png'
      />
    </GmapMap>
  </div>
</template>

<script>
import CustomInfoWindow from "./CustomInfoWindow.vue";

export default {
  name: 'App',
  components: {
    CustomInfoWindow
  },
  data() {
    return {
      marker: { position: { lat: -1.298982, lng: 36.776811 } },
      center: { lat: -1.298982, lng: 36.776811 },
      infowindow: { lat: -1.298982, lng: 36.776811 },
      mapOptions: {
        disableDefaultUI: true,
      },
      driverA_coords: [
        { lat: -1.298982, lng: 36.776811 },
        { lat: -1.297459, lng: 36.776747 },
        { lat: -1.296193, lng: 36.776726 },
        { lat: -1.296097, lng: 36.779236 },
        { lat: -1.296151, lng: 36.777637 },
        { lat: -1.296215, lng: 36.776693 },
        { lat: -1.294252, lng: 36.776586 },
        { lat: -1.294048, lng: 36.776790 },
        { lat: -1.293973, lng: 36.779118 },
        { lat: -1.292622, lng: 36.779075 },
        { lat: -1.291844, lng: 36.779049 }
      ],
      info_marker: null,
      info_window_open: true,

      // For transition
      numDeltas: 100,
      delay: 50, //milliseconds
      i: 0,
      deltaLat: 0,
      deltaLng: 0,
    };
  },
  methods: {
    //detects location from browser
    startLocation() {
      this.marker.position = {
        lat: this.driverA_coords[0].lat,
        lng: this.driverA_coords[0].lng,
      };
      this.infowindow = {
        lat: this.driverA_coords[0].lat,
        lng: this.driverA_coords[0].lng,
      }
      this.center = {
        lat: this.driverA_coords[0].lat,
        lng: this.driverA_coords[0].lng,
      },
      this.panToMarker();
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      console.log(e);
      // this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      console.log(e);
      // this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    // control the info-window
    openInfoWindow() {
      this.info_window_open = !this.info_window_open;
    },

    simulateDriverA() {
      var result = this.driverA_coords[1];
      this.transition(result);
    },

    refreshSimulation() {
      this.startLocation();
    },

    transition(result) {
      this.i = 0;
      this.deltaLat = (result.lat - this.marker.position.lat)/this.numDeltas;
      this.deltaLng = (result.lng - this.marker.position.lng)/this.numDeltas;
      this.moveMarker();
    },

    moveMarker() {
      // Set new coordinates to object
      let new_coords = {
        lat: this.marker.position.lat += this.deltaLat,
        lng: this.marker.position.lng += this.deltaLng
      }

      // Set coordinates to marker and info window
      this.marker.position = {
        lat: new_coords.lat,
        lng: new_coords.lng,
      };
      this.infowindow = {
        lat: new_coords.lat,
        lng: new_coords.lng,
      }
      this.center = {
        lat: new_coords.lat,
        lng: new_coords.lng,
      }

      // Pan the marker
      console.log("Moving to : ", new_coords );
      this.panToMarker();

      if(this.i != this.numDeltas){
        this.i++;
        setTimeout(this.moveMarker, this.delay);
      }
    }
  },
  mounted() {
    this.startLocation();
  },
}
</script>