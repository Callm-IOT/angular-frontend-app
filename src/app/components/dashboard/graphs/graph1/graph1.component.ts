import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrl: './graph1.component.css'
})
export class Graph1Component implements OnInit {
  private capacity = 6000;
  private value = 4000;
  private circleSize = 0.8;

  ngOnInit(): void {
    // Configuración de temas
    am4core.useTheme(am4themes_animated);

    // Creación del componente
    let component = am4core.create("chartdiv", am4core.Container);
    component.width = am4core.percent(100);
    component.height = am4core.percent(100);

    let chartContainer = component.createChild(am4core.Container);
    chartContainer.x = am4core.percent(50);
    chartContainer.y = am4core.percent(50);

    let circle = chartContainer.createChild(am4core.Circle);
    circle.fill = am4core.color("#dadada");

    let circleMask = chartContainer.createChild(am4core.Circle);

    let waves = chartContainer.createChild(am4core.WavedRectangle);
    waves.fill = am4core.color("#BFD7B5");
    waves.mask = circleMask;
    waves.horizontalCenter = "middle";
    waves.waveHeight = 10;
    waves.waveLength = 30;
    waves.y = 500;
    circleMask.y = -500;

    component.events.on("maxsizechanged", () => {
      let smallerSize = Math.min(component.pixelWidth, component.pixelHeight);  
      let radius = smallerSize * this.circleSize / 2;

      circle.radius = radius;
      circleMask.radius = radius;
      waves.height = smallerSize;
      waves.width = Math.max(component.pixelWidth, component.pixelHeight);

      let labelRadius = radius + 20;

      setValue(this.value);
    });

    const setValue = (value: number) => {
      let y = -circle.radius - waves.waveHeight + (1 - value / this.capacity) * circle.pixelRadius * 2;
      waves.animate([{property:"y", to:y}, {property:"waveHeight", to:10, from:15}, {property:"x", from:-50, to:0}], 5000, am4core.ease.elasticOut);
      circleMask.animate([{property:"y", to:-y},{property:"x", from:50, to:0}], 5000, am4core.ease.elasticOut);
    };

    // Añade texto y etiquetas
    let label = chartContainer.createChild(am4core.Label);
    label.text = `${this.value} Litros`.toUpperCase();
    label.fill = am4core.color("#fff");
    label.fontSize = 20;
    label.horizontalCenter = "middle";

  }
}
