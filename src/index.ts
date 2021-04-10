import bootstrap from "bootstrap";
import "./import-jquery";
import "../scss/custom.scss";
import { PieChartElement } from "./charts";
import { Show } from "./models";
import { ShowProvider, TypeProvider } from "./data";
import { getConfig } from "./environment";

interface ToppingCount {
  Topping: string;
  Slices: number;
}

//Things to do on startup
$(async () => {});
