<template>
	<component :is='layout'>
		<router-view/>		
	</component>
</template>

<script>
import HomeLayout from '@/layouts/HomeLayout'
import DrawLayout from '@/layouts/DrawLayout'
export default{
	computed: {
		layout(){
			return (this.$route.meta.layout);
		}
	},
	components: {
		HomeLayout, DrawLayout
	}
}
</script>

<style lang="scss">

</style>
