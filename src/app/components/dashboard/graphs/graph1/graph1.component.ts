import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css'],
})
export class Graph1Component implements OnInit, OnDestroy {
  private chart!: am4charts.PieChart;

  ngOnInit(): void {
    // Aplicar el tema
    am4core.useTheme(am4themes_animated);

    // Crear el gráfico
    this.chart = am4core.create("chartdiv", am4charts.PieChart);
    this.chart.hiddenState.properties.opacity = 0; // Efecto de entrada

    // Datos del gráfico
    this.chart.data = [
      { country: "Lithuania", value: 401 },
      { country: "Czech Republic", value: 300 },
      { country: "Ireland", value: 200 },
      { country: "México", value: 189 },
      { country: "Germany", value: 165 },
      { country: "Australia", value: 139 },
      { country: "Austria", value: 128 }
    ];

    // Configuración del gráfico
    this.chart.radius = am4core.percent(70);
    this.chart.innerRadius = am4core.percent(40);
    this.chart.startAngle = 180;
    this.chart.endAngle = 360;

    // Crear la serie
    let series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    // Animación de entrada
    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
