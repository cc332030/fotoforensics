(function(){

  if(window.index) {
    return;
  }

  const page = window.index = {};

  function init(){

    page.mage = document.getElementById("image");
    page.imageToProcess = document.getElementById("imageToProcess");

    page.elaImage = document.getElementById("elaImage");
    page.parentContainer = document.getElementById("analyzer");

    initDrop();
  }

  function initDrop(){

    const body = document.body;

    body.addEventListener("dragenter", function (e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);

    body.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);

    body.addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);

    body.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // 处理拖拽文件的逻辑
    }, false);

    document.body.addEventListener('drop', dropHandler, false);

  }

  function dropHandler(e){

    e.preventDefault();
    e.stopPropagation();

    const df = e.dataTransfer;
    const dropFiles = []; // 存放拖拽的文件对象

    if(df.items !== undefined) {
      // Chrome有items属性，对Chrome的单独处理
      for(var i = 0; i < df.items.length; i++) {
        var item = df.items[i];
        // 用webkitGetAsEntry禁止上传目录
        if(item.kind === "file" && item.webkitGetAsEntry().isFile) {
          var file = item.getAsFile();
          dropFiles.push(file);
        }
      }
    }

    debug('dropFiles', dropFiles);

    if(dropFiles.length > 0) {
      updateImage(dropFiles[0]);
    }

  }

  function getELA(quality, scale) {

    const imageToProcess = page.imageToProcess;
    const elaImage = page.elaImage;
    const parentContainer = page.parentContainer;

    ELA.processImg(parentContainer, imageToProcess, quality, scale, (resultDataURL) => {
      elaImage.src = resultDataURL;
    });
  }

  page.selectImage = function(){

    const image = page.image;
    updateImage(image.files[0]);
  }

  function updateImage(file){

    const imageToProcess = page.imageToProcess;

    const fr = new FileReader();
    fr.onload = function () {
      imageToProcess.src = fr.result;
      setTimeout(getELA);
    }
    fr.readAsDataURL(file);

  }

  init();

})();
