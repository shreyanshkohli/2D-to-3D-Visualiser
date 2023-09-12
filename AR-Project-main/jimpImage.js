const Jimp = require('jimp');

// Read the image using Jimp
Jimp.read('2d-floor-map.png')
  .then(image => {
    // Get the image width and height
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Create a 2D array to store the pixel values
    const imageArray = [];

    // Iterate over each pixel
    for (let y = 0; y < height; y++) {
      // Create a new row in the array
      imageArray[y] = [];

      for (let x = 0; x < width; x++) {
        // Get the pixel color value
        const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));

        // Calculate the average brightness of the pixel
        const brightness = (pixelColor.r + pixelColor.g + pixelColor.b) / 3;

        // Check if the brightness is above or below a threshold (128)
        if (brightness >= 128) {
          // Above threshold, represents white pixel as '0'
          imageArray[y][x] = '0';
        } else {
          // Below threshold, represents black pixel as '1'
          imageArray[y][x] = '1';
        }
      }
    }

    // Do something with the imageArray
    console.log(imageArray);
  })
  .catch(err => {
    console.error(err);
  });
