import { Component, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  // @ViewChild('contentToConvertIntoPdf') someInput: ElementRef;


  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Change in GPTA Progress Per Calf'
  },
  xAxis: {
      categories: ['Location Based', 'CLARIFIED Plus Beef/Sexed', 'CLARIFIED Plus Intermediate'],
      title: {
        text: null
     }
  },
  yAxis: {
      min: 190,
      max: 250,
      title: {
          text: 'Genetic progress($)'
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
     data: [210, 247, 233],
     type: 'column',
     name: 'GPTA Progress'
    }
  ]
  };


  // Download PDF File
  downloadAsPDF(): any {
    setTimeout(() => {
      const data = document.getElementById('contentToConvertIntoPdf');
      html2canvas(data).then(canvas => {
          // Few necessary setting options
          const imgWidth = 180;
          const pageHeight = 395;
          const contentDataURL = canvas.toDataURL('image/png');
          const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
          const position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, (canvas.height * imgWidth / canvas.width));
          pdf.save('GPTAProgress.pdf'); // Generated PDF
      });
  }, 500);
}
}
