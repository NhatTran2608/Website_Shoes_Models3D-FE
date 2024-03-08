<template>
    <div id="container" ref="container" @mousemove="moveImage" @mouseleave="resetImage">
        <div id="image" :style="imageStyle"></div>
    </div>
</template>
  
<script>
export default {
    props: {
        imageUrl: String
    },
    data() {
        return {
            imageStyle: {
                backgroundImage: `url(${this.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transformOrigin: '0 0',
                transform: 'scale(1)', // Bổ sung transform ban đầu
                originalWidth: 0, // Chiều rộng ban đầu của hình ảnh
                originalHeight: 0 // Chiều cao ban đầu của hình ảnh
            }
        };
    },
    mounted() {
        // Lấy kích thước ban đầu của hình ảnh khi component được mounted
        const image = this.$refs.container.querySelector('#image');
        this.imageStyle.originalWidth = image.offsetWidth;
        this.imageStyle.originalHeight = image.offsetHeight;
    },
    methods: {
        moveImage(event) {
            const container = this.$refs.container;
            const containerRect = container.getBoundingClientRect();

            const x = (event.clientX - containerRect.left);
            const y = (event.clientY - containerRect.top);

            // Tính toán vị trí và phóng to
            const zoomX = -(x * 2 - containerRect.width / 2);
            const zoomY = -(y * 2 - containerRect.height / 2);

            this.imageStyle.transform = `translate(${zoomX}px, ${zoomY}px) scale(2.5)`;
        },
        resetImage() {
            this.imageStyle.transform = 'scale(1)'; // Đặt lại kích thước ban đầu
        }
    }
}
</script>
  
<style scoped>
#container {
    position: relative;
    width: 520px;
    /* Đặt kích thước của container theo ý muốn */
    height: 500px;
    /* Đặt kích thước của container theo ý muốn */
    overflow: hidden;
}

#image {
    width: 100%;
    /* Đảm bảo kích thước hình ảnh là 100% của container */
    height: 100%;
    /* Đảm bảo kích thước hình ảnh là 100% của container */
}</style>
  