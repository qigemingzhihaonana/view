<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<!--缓存tag-->
			<keep-alive>
				<router-view />
			</keep-alive>
		</transition>
	</section>
</template>

<script>
	export default {
		name: 'AppMain',
		computed: {
			//    cachedViews() {
			//      return this.$store.state.tagsView.cachedViews
			//    },
			//    key() {
			//      return this.$route.fullPath
			//    }
		}
	}

</script>

<style scoped>
	.app-main {
		/*84 = navbar + tags-view = 50 +34 */
		min-height: calc(100vh - 84px);
		width: 100%;
		position: relative;
		overflow: hidden;
		margin-left: 172px
	}

</style>
