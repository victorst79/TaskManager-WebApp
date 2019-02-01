<template>
  <div id="app">
	<div id="nav">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="#">
				<img src="./assets/logo_todo.png">
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#"><router-link to="/">Notes</router-link></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><router-link to="/weather">Weather</router-link></a>
				</li>
				</ul>
			</div>
		</nav>
	</div>
	<router-view/>
	<Footer></Footer>
  </div>
</template>

<style>
	body{
		color: white;
		background: #222222 !important;
	}
	nav img{
		width: 50px;
		height: 60px;
	}
	nav a{
		text-decoration: none !important;
		color: white;
	}
	nav a:hover{
		text-decoration: none !important;
		color: #00bb8b;
	}

	nav a:active{
		text-decoration: none !important;
		color: #078565;
	}

</style>

<script>
import Footer from '@/components/Footer.vue'
export default {
	name: 'index',
	components: {
		Footer
	}
}
</script>
