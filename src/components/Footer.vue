<template>
    <footer class="page-footer font-small blue pt-4">
        <div class="footer-copyright text-center py-3">
            <small>Developed by <a href="https://github.com/victorst79">Víctor Santaella Torres</a>.</small>
            <br>
            <small>Code available on <a href="https://github.com/victorst79/todolist-vuejs"><i><img src="../assets/github.png"></i> Github</a></small>            
        </div>
	</footer>
</template>

<style>
    footer{
        margin-top: 15px;
        color: white;
        text-decoration: none !important;
    }
    footer a{
        color: #10cb8a;
    }
    i img{
        width: 15px;
        height: 15px;
        color: #10cb8a;
    }
</style>


<script>
export default {
    name: 'Footer'
}
</script>
