import { Component, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';

// import * as PptxGenJS from 'pptxgenjs-angular'

// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
declare var PptxGenJS: any;
declare var html2canvas: any;
declare var jspdf: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    Highcharts: typeof Highcharts = Highcharts; // required
    chartConstructor = 'chart'; // optional string, defaults to 'chart'
    // @ViewChild('contentToConvertIntoPdf') someInput: ElementRef;
    @ViewChild('contentToConvertIntoPdf', { 'static': true }) content: ElementRef;
    lableCat = ['Location Based', 'CLARIFIED Plus Beef/Sexed', 'CLARIFIED Plus Intermediate'];
    datavalue = [210, 247, 233];
    minValue = 190;
    maxValue = 250;
    titleText = 'Change in GPTA Progress Per Calf';
    yAxisText = 'Genetic progress($)';

    chartOptions: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: this.titleText
        },
        xAxis: {
            categories: this.lableCat,
            title: {
                text: null
            }
        },
        yAxis: {
            min: this.minValue,
            max: this.maxValue,
            title: {
                text: this.yAxisText
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [
            {
                data: this.datavalue,
                type: 'column',
                name: 'GPTA Progress'
            }
        ]
    };


    downloadAsPPT() {
        const pptx = new PptxGenJS();
        const slide = pptx.addNewSlide();
        var data1 = [{
            labels: this.lableCat,
            values: this.datavalue
        }
        ];
        const chartOptions = {
            showLegend: false,
            chartColors: ['7cb5ec'],
            x: '50%', y: '50%',
            w: '75%', h: '75%',
            catAxisMaxVal: this.maxValue,
            catAxisMinVal: this.minValue,
            legendPos: 't',
            showTitle: true,
            showValue: true,
            title: this.titleText,
            titleAlign: 'top',
            showValAxisTitle: true,
            valAxisTitle: this.yAxisText
        }

        slide.addChart(pptx.charts.BAR, data1, chartOptions)
        pptx.save('GPTA-PPT');
    }
}
