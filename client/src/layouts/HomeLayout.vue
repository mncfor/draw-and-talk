<template>
  <div>
    <router-view/>
    <Loader v-if="preloader"/>
  </div>
</template>

<script>
import Loader from '@/components/UI/Loader'
export default {
    components: {
        Loader
    },
    computed: {
        preloader(){
            return this.$store.state.preloader
        }
    }
}
</script>

<style>

</style>