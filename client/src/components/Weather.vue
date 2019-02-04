<template>
    <div class="container weather-info">        
        <div class="row">
            <div class="col-1 icon">
                <img src="../assets/globe.png" class="icon">
            </div>
            <h1 class="col-11">Weather - {{info.name}},{{info.sys.country}}</h1>
            <div class="dropdown-divider col-12"></div>
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Openweather</th>
                        <th scope="col"></th>
                    </tr>                    
                </thead>
                <tbody>
                    <tr>
                        <td>Temperature</td>
                        <td>{{(info.main.temp - 273.15).toFixed(2)}} ºC</td>
                    </tr>
                    <tr>
                        <td>Temperature Max</td>
                        <td>{{(info.main.temp_max - 273.15).toFixed(2)}} ºC</td>
                    </tr>
                    <tr>
                        <td>Temperature Max</td>
                        <td>{{(info.main.temp_min - 273.15).toFixed(2)}} ºC</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{{(info.main.humidity)}} %</td>
                    </tr>
                    <tr>
                        <td>Wind</td>
                        <td>{{3.6}} Km/h</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Other</th>
                        <th scope="col"></th>
                    </tr>                    
                </thead>
                <tbody>
                    <tr>
                        <td>Latitude</td>
                        <td>{{this.latitude}} º</td>
                    </tr>
                    <tr>
                        <td>Longitude</td>
                        <td>{{this.longitude}} º</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Weather',
        data: function(){
            return{
                latitude: "",
                longitude: "",
                info: []                
            }
        },
        methods:{
            successFunction: function(position){
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            },            
            errorFunction: function(){
                alert("ERROR");
            }
        },
        created () {
            this.$http
                .get('https://api.openweathermap.org/data/2.5/weather?q=Granada,ES&APPID=b6b271cf0d64d59d26cc77545481af35')
                // .get('https://api.openweathermap.org/data/2.5/weather?APPID=b6b271cf0d64d59d26cc77545481af35&lat='+this.latitude+'&lon='+this.longitude)
                .then((response) => {(this.info = response.data)})
                .catch((error) => {console.log(error);})
            
        },
        beforeMount: function(){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(this.successFunction, this.errorFunction);
            }else{
                alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
            }
        }
    }
</script>

<style scoped>
    h1,h2,small,p,table{
        color: white !important;
    }

    .icon{
        width: 50px;
        display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
    }

    .info-weather{
        margin-top: 25px;
    }

    thead{
        border-bottom: solid 1px white;
    }
    
    .weather-info{
        margin-top: 25px;
    }
</style>

