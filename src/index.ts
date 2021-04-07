import bootstrap from "bootstrap";
import "./import-jquery";
import "../scss/custom.scss";

import { getConfig } from "./environment";

//Things to do on startup
$(() => {
  alert(getConfig().ApiUri);
});
