<template>
  <div>
    <model-viewer style="height: 750px; width: 100%;" ref="modelViewer" id="hotspot-demo" ar ar-modes="webxr"
      camera-controls tone-mapping="commerce" touch-action="pan-y" :src="`${this.host}/${Product.Model3D.Model3D}`"
      alt="A 3D model of an astronaut." disable-tap ar-scale="fixed" shadow-intensity="2" xr-environment
      skybox-height="2m" skybox-image="../../../public/sky.jpg">
      <button @click="() => { hideTitle(index) }" v-for="(item, index) in Product.Model3D.rating" :key="index"
        ref="handButton" class="hotspot" :slot="`hotspot-${index + 1}`"
        :data-position="`${item.position.x} ${item.position.y} ${item.position.z}`"
        :data-normal="`${item.normal.x} ${item.normal.y} ${item.normal.z}`">
        <div :class="`annotation title-${index} hide`">
          {{ item.title }}
        </div>
      </button>
    </model-viewer>
  </div>
</template>

<script>
export default {
  props: {
    Product: Object
  },
  data() {
    return {
      host: import.meta.env.VITE_PORT,

      handAnnotationPosition: { x: 0, y: 0 },
      rightClickPosition: { x: 0, y: 0, z: 0 },
    };
  },

  methods: {
    hideTitle(index) {
      let title = document.querySelector(`.title-${index}`)
      if (title) {
        if (title.classList.contains('hide')) {
          title.classList.remove('hide')
        } else {
          title.classList.add('hide')
        }
      }
    }

  },
};
</script>

<style scoped>
.hide {
  display: none !important;
}

.Hotspot {
  /* --min-hotspot-opacity: 0; */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
}

.hotspot {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: none;
  background-color: blue;
  box-sizing: border-box;
}

.hotspot[slot='hotspot-hand'] {
  --min-hotspot-opacity: 0;
  background-color: red;
}

.hotspot[slot='hotspot-foot'] {
  /* background-color: transparent; */
  border: 3px solid blue;
}

.hotspot[slot='hotspot-visor'] {
  /* background-color: transparent; */
  border: 3px solid green;
  background-color: green;
}



.annotation {
  background-color: #888888;
  position: fixed;
  border-radius: 10px;
  padding: 10px;
  z-index: 9999;
  width: 180px;
}
</style>
