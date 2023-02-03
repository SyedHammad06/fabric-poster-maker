const canvas = new fabric.Canvas('canvas', {
  width: window.innerWidth / 3,
  height: window.innerWidth / 3,
});

/*
 * Setting Background Image
 */
const backgroundImg = document.getElementById('back');

backgroundImg.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (f) => {
    const data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      img.scaleToHeight(canvas.height);
      canvas.centerObject(img);

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        backgroundImageOpacity: 1,
        backgroundImageStretch: false,
      });
    });
  };

  reader.readAsDataURL(file);
});

/*
 * Uploading any image
 */
const image = document.getElementById('image');

image.addEventListener('change', () => {
  const file = image.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      const fabricImg = new fabric.Image(img);
      fabricImg.scaleToWidth(canvas.width / 3);
      canvas.add(fabricImg);
      canvas.renderAll();
    };
  };
  reader.readAsDataURL(file);
});

/*
 * Adding Text
 */
const textBtn = document.getElementById('add-text');
textBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const textInp = document.getElementById('text').value;
  const text = new fabric.Text(textInp, {
    fontSize: 30,
  });
  canvas.add(text);
  canvas.renderAll();
});

/*
 * Uploading SVG / Frames
 */
document.getElementById('frame').addEventListener('change', function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;
    console.log(data);
    fabric.loadSVGFromString(data, function (objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj.scaleToWidth(canvas.width);
      obj.set({ bottom: 0, left: 0, right: 0 });
      canvas.add(obj).renderAll();
    });
  };
  reader.readAsText(file);
});
