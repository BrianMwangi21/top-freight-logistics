<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Vehicle Information</div>
      <p class="text-h6 text--primary">
        {{ vehicle_numberplate }}
      </p>
      <p>{{ vehicle_tonnes }} | {{ vehicle_type }} | {{ vehicle_luggage }}</p>
      <div class="text--primary">
        <span style="color: green">Status</span> : {{ vehicle_status }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    'vehicle_numberplate', 
    'vehicle_tonnes',
    'vehicle_type',
    'vehicle_luggage',
    'vehicle_status'
  ],
}
</script>