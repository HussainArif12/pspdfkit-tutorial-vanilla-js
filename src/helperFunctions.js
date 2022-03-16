import "./assets/pspdfkit.js";
async function createTextAnnotation(instance) {
  const annotation = new PSPDFKit.Annotations.TextAnnotation({
    pageIndex: 0,
    text: " World!",
    font: "Helvetica",
    isBold: true,
    horizontalAlign: "center",
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 50,
      top: 200,
      width: 100,
      height: 80,
    }),
    fontColor: PSPDFKit.Color.BLACK,
  });
  const createdAnnotation = await instance.create(annotation);
  return createdAnnotation;
}

async function createInkAnnotation({ instance, x1, y1, x2, y2 }) {
  //extract the List, DrawingPoint, Rect, and InkAnnotation properties from PSPDFKit.
  //these are needed to render annotations onto the screen
  const { List } = PSPDFKit.Immutable;
  const { DrawingPoint, Rect } = PSPDFKit.Geometry;
  const { InkAnnotation } = PSPDFKit.Annotations;
  const annotation = new InkAnnotation({
    pageIndex: 0,
    boundingBox: new Rect({ width: 400, height: 100 }),
    strokeColor: new PSPDFKit.Color({ r: 100, b: 30, g: 255 }), //sets the color of the stroke
    lines: List([
      List([
        new DrawingPoint({ x: x1, y: y1 }),
        new DrawingPoint({ x: x2, y: y2 }),
      ]),
    ]),
  });
  const createdAnnotation = await instance.create(annotation);
  return createdAnnotation;
}
async function createImageAnnotation({ url, instance }) {
  const blob = await fetch(url).then((res) => res.blob());
  const imageAttachmentID = await instance.createAttachment(blob);
  console.log(blob);
  const annotation = await new PSPDFKit.Annotations.ImageAnnotation({
    pageIndex: 0,
    contentType: "image/svg",
    imageAttachmentID,

    description: "Example Image Annotation",
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 10,
      top: 20,
      width: 150,
      height: 150,
    }),
  });
  const createdAnnotation = await instance.create(annotation);

  return createdAnnotation;
}
export { createTextAnnotation, createInkAnnotation, createImageAnnotation };
