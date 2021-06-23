<template>
  <div id="app">
    <GmapMap
      :center="center"
      :zoom="15"
      map-style-id="roadmap"
      :options="mapOptions"
      style="width: 100vmax; height: 80vmin"
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
            Hello world!
      </gmap-info-window>
      <GmapMarker
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="openWindow"
        icon='https://images.sendyit.com/web_platform/vendor_type/top/25_freight.png'
      />
    </GmapMap>
  <button @click="geolocate">Detect Location</button>

  <p>Selected Position: {{ marker.position }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      marker: { position: {} },
      center: {},
      infowindow: {},
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
      info_window_open: true
    };
  },
  methods: {
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        this.infowindow = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      console.log(e);
      // this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(15);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      console.log(e);
      // this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    // control the info-window
    openWindow() {
      this.info_window_open = true;
    }
  },
  mounted() {
    this.geolocate();
  },
}
</script>
