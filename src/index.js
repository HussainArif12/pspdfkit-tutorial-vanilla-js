import "./assets/pspdfkit.js";
import {
  createInkAnnotation,
  createTextAnnotation,
} from "./helperFunctions.js";
// We need to inform PSPDFKit where to look for its library assets, i.e. the location of the `pspdfkit-lib` directory.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;
async function renderPDF() {
  const instance = await PSPDFKit.load({
    baseUrl,
    container: "#pspdfkit",
    document: "./pspdfkit-web-demo.pdf",
  });

  console.log("PSPDFKit loaded", instance);
  await createTextAnnotation(instance);

  /* createInkAnnotation({ instance, x1: 5, y1: 5, x2: 95, y2: 95 });
  createInkAnnotation({ instance, x1: 95, y1: 5, x2: 5, y2: 95 });
   */ const XFDFData = await instance.exportXFDF();
  console.log(XFDFData);
  createTextAnnotation(instance);
}
await renderPDF();
