<template>
  <div class="container mx-auto p-4">
    
    <!-- Loading & Error Messages -->
    <div v-if="isFetching" class="text-center text-gray-500">Fetching Data...</div>
    <div v-else-if="fetchError" class="text-center text-red-500">{{ fetchError }}</div>
    
    <!-- Pond Status Display -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(pond, index) in pondData.results" 
        :key="pond.deviceKey"
        class="w-full p-1"
      >
        <div class="overflow-x-auto">
          <div class="flex justify-center">
            <div
              class="bg-white shadow rounded-lg mb-2 text-xl font-bold border-3 pond-card p-1 cursor-pointer"
              @click="navigateToChart(pond.deviceKey)"
            >
              <h3 class="text-center mb-0">
                {{ pond.location }}
              </h3>
              <div class="flex flex-row justify-between items-center mt-1">
                <img
                  :id="`flow-meter-${pond.deviceKey}`"
                  class="tank-icon"
                  :class="pond.deviceKey"
                  :src="require('@/assets/images/diagrams/icon.png')"
                  alt="Water Level Icon"
                />
                <div class="flex flex-col justify-center items-center w-40">
                  <div>Fill Level <br> {{ pond.fillPercentage }}</div>
                </div>
              </div>
              <div class="flex flex-row justify-between items-center mt-1">
                <div class="flex flex-col justify-center items-center">
                  <img class="w-8" :src="iconSet['battery-' + pond.batteryStatus]" />
                  <p class="mb-0">{{ parseFloat(pond.battery) === 3.84 ? pond.battery : "..." }}</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                  <img class="w-8" :src="iconSet['wifi-' + pond.communicationStatus]" />
                  <p class="mb-0">{{ pond.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPondStatus } from "@/libs/axios"; // Adjust the path as needed
import iconSet from "@/@leecom/app-icons"; 
import InlineSvg from "vue-inline-svg";

export default {
  components: {
    InlineSvg,
  },
  data() {
    return {
      pondData: null,
      isFetching: true,
      fetchError: null,
      iconSet,
    };
  },
  async created() {
    try {
      this.pondData = await fetchPondStatus();
    } catch (error) {
      this.fetchError = "Error retrieving pond data.";
    } finally {
      this.isFetching = false;
    }
  },
  methods: {
    getStatusClass(status) {
      const statusClasses = {
        green: "text-green-600 font-bold",
        red: "text-red-600 font-bold",
        gray: "text-gray-600 font-bold",
      };
      return statusClasses[status] || "text-black";
    },
    navigateToChart(deviceKey) {
      this.$router.push({
        name: "flow-meters",
        query: { deviceKey },
      });
    },
    handleSvgMount() {
      this.pondData.results.forEach((pond) => {
        // Handle any SVG-related actions post-mount
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.pond-card {
  border-color: #000000;
  max-width: 300px;
}

.tank-icon {
  max-height: 78px;
}
</style>
