<template>
    <div>
        <highcharts :options="options"  style="height: 600px; width:1200px "></highcharts>
    </div>
</template>
<script>
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import loadSankey from 'highcharts/modules/sankey';
import loadExporting from 'highcharts/modules/exporting';
loadMap(Highcharts);
loadStock(Highcharts);
loadSankey(Highcharts);
loadExporting(Highcharts)
export default{
    data(){
        return{
            options:{
                title: {
        text: 'Highcharts Sankey Diagram'
    },

    series: [{
        keys: ['from', 'to', 'weight'],
        data: [
            ['Telugu', 'Portugal', 1 ],
            ['Telugu', 'France', 1 ],
            ['Telugu', 'Spain', 1 ],
            ['Telugu', 'England', 1 ],
            ['Canada', 'Portugal', 1 ],
            ['Canada', 'France', 5 ],
            ['Canada', 'England', 1 ],
            ['Mexico', 'Portugal', 1 ],
            ['Mexico', 'France', 1 ],
            ['Mexico', 'Spain', 5 ],
            ['Mexico', 'England', 1 ],
            ['USA', 'Portugal', 1 ],
            ['USA', 'France', 1 ],
            ['USA', 'Spain', 1 ],
            ['USA', 'England', 5 ],
            ['Portugal', 'Angola', 2 ],
            ['Portugal', 'Senegal', 1 ],
            ['Portugal', 'Morocco', 1 ],
            ['Portugal', 'South Africa', 3 ],
            ['France', 'Angola', 1 ],
            ['France', 'Senegal', 3 ],
            ['France', 'Mali', 3 ],
            ['France', 'Morocco', 3 ],
            ['France', 'South Africa', 1 ],
            ['Spain', 'Senegal', 1 ],
            ['Spain', 'Morocco', 3 ],
            ['Spain', 'South Africa', 1 ],
            ['England', 'Angola', 1 ],
            ['England', 'Senegal', 1 ],
            ['England', 'Morocco', 2 ],
            ['England', 'South Africa', 7 ],
            ['South Africa', 'China', 5 ],
            ['South Africa', 'India', 1 ],
            ['South Africa', 'Japan', 3 ],
            ['Angola', 'China', 5 ],
            ['Angola', 'India', 1 ],
            ['Angola', 'Japan', 3 ],
            ['Senegal', 'China', 5 ],
            ['Senegal', 'India', 1 ],
            ['Senegal', 'Japan', 3 ],
            ['Mali', 'China', 5 ],
            ['Mali', 'India', 1 ],
            ['Mali', 'Japan', 3 ],
            ['Morocco', 'China', 5 ],
            ['Morocco', 'India', 1 ],
            ['Morocco', 'Japan', 3 ]
        ],
        type: 'sankey',
        name: 'Sankey demo series'
    }]

            }
        }
    }
}
</script>