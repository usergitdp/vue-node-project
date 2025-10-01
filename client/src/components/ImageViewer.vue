<template>
  <div class="image-viewer">
    <h2>图片查看器</h2>
    <div class="image-list">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="image-item"
        @click="selectImage(image)"
      >
        <img :src="getImageUrl(image)" :alt="image" />
        <p>{{ image }}</p>
      </div>
    </div>
    
    <div v-if="selectedImage" class="selected-image">
      <h3>当前查看: {{ selectedImage }}</h3>
      <img :src="getImageUrl(selectedImage)" :alt="selectedImage" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      selectedImage: null
    };
  },
  created() {
    this.fetchImages();
  },
  methods: {
    fetchImages() {
      fetch('http://localhost:3000/api/images')
        .then(response => response.json())
        .then(data => {
          this.images = data.images;
          if (this.images.length > 0) {
            this.selectedImage = this.images[0];
          }
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    getImageUrl(image) {
      return `http://localhost:3000/images/${image}`;
    }
  }
};
</script>

<style scoped>
.image-viewer {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.image-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}
.image-item {
  cursor: pointer;
  transition: transform 0.2s;
}
.image-item:hover {
  transform: scale(1.05);
}
.image-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}
.selected-image {
  margin-top: 20px;
  text-align: center;
}
.selected-image img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>