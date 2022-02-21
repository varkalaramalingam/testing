<template>
    <div class="container-fluid">
        <div>
            <h2><span v-html="$t('fee_grade_yearly')"/></h2>
            <hr>
            <br>
            <column-chart download="data"  xtitle="Grade" ytitle="Amount" :data="[['Kinder-Garten', 300000],['Grade-1', 400000], ['Grade-2',500000],['Grade-3', 600000],['Grade-4',700000],['Grade-5',800000],['Grade-6',900000],['Grade-7',1000000],['Grade-8',1100000],['Grade-9',1200000],['Grade-10',1300000]]"></column-chart>
        </div>
        <div>
            <h2><span v-html="$t('fee_grade_monthly')"/></h2>
            <hr>
            <br>
            <column-chart download="data"  xtitle="Grade" ytitle="Amount"  :data="[['Kinder-Garten',25000],['Grade-1', 30000], ['Grade-2',35000],['Grade-3', 40000],['Grade-4',45000],['Grade-5',50000],['Grade-6',55000],['Grade-7',60000],['Grade-8',65000],['Grade-9',70000],['Grade-10',75000]]"></column-chart>
        </div>
        <div>
            <h2><span v-html="$t('fee_quarterly')"/></h2>
            <hr>
            <br>
            <column-chart download="data" xtitle="Grade" ytitle="Amount" width="300px" height="500px"  :data="[['Q1', 100000],['Q2', 200000], ['Q3',300000]]"></column-chart>
        </div>
    </div>
</template>