import bootstrap from "bootstrap";
import "./import-jquery";
import "../scss/custom.scss";
import { ShowTypeContent } from "./content";
import { getConfig } from "./environment";

//Things to do on startup
$(async () => {
  const config = getConfig();
  const showTypeContent = new ShowTypeContent(config);
  showTypeContent.render("main");
});
