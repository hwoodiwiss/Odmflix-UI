import bootstrap from "bootstrap";
import "./import-jquery";
import "../scss/custom.scss";
import { PieChartElement } from "./charts";
import { Show } from "./models";

interface ToppingCount {
  Topping: string;
  Slices: number;
}

//Things to do on startup
$(() => {
  var pie = new PieChartElement<ToppingCount>("pi", "A Pie Chart", [
    { Topping: "Mushrooms", Slices: 3 },
    { Topping: "Onions", Slices: 1 },
    { Topping: "Olives", Slices: 1 },
    { Topping: "Zucchini", Slices: 1 },
    { Topping: "Pepperoni", Slices: 2 },
  ]);
  var pie2 = new PieChartElement<ToppingCount>("pi2", "A Pie Chart", [
    { Topping: "Mushrooms", Slices: 3 },
    { Topping: "Onions", Slices: 1 },
    { Topping: "Olives", Slices: 1 },
    { Topping: "Zucchini", Slices: 1 },
    { Topping: "Pepperoni", Slices: 2 },
  ]);
  var pie3 = new PieChartElement<ToppingCount>("pi3", "A Pie Chart", [
    { Topping: "Mushrooms", Slices: 3 },
    { Topping: "Onions", Slices: 1 },
    { Topping: "Olives", Slices: 1 },
    { Topping: "Zucchini", Slices: 1 },
    { Topping: "Pepperoni", Slices: 2 },
  ]);
  var pie4 = new PieChartElement<ToppingCount>("pi4", "A Pie Chart", [
    { Topping: "Mushrooms", Slices: 3 },
    { Topping: "Onions", Slices: 1 },
    { Topping: "Olives", Slices: 1 },
    { Topping: "Zucchini", Slices: 1 },
    { Topping: "Pepperoni", Slices: 2 },
  ]);

  pie.render("piTarget", { width: 500, height: 400, is3D: true });
  pie2.render("piTarget2", { width: 500, height: 400, is3D: true });
  pie3.render("piTarget3", { width: 500, height: 400, is3D: true });
  pie4.render("piTarget4", { width: 500, height: 400, is3D: true });
});
