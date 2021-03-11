/*
 * An example of transforming an uploaded image pixel by pixel.
 *
 * Basic implementatin of a solarization filter in which pixels are iniverted based on a given thrershold.
 * This mimics a physical phenomenon where parts of the image are wholly or partially reversed in tone based
 * on extreme overexposure or chemical exposure. 
 *
 * @author Robert C. Duvall, Tony Choi
 */
// convenience variable to avoid repeatedly getting it in each method
let canvas = document.getElementById('imagecanvas');
// global state to keep track of between user interactions
let originalImage = null;
// not strictly needed - cache this version of the image to make it a little faster for interaction
let filteredImage =null;


// load image using user selected by file chooser input element and draw it using SimpleImage class
function loadImage () {
    originalImage = new SimpleImage(document.getElementById('fileInput'));
    originalImage.drawTo(canvas);
    
}

// verify that the image is ready to be solarized before calling the main function
function greenify() {
    // verify user has actually uploaded an image
    if (originalImage != null) {
        // ONE WAY - create filtered image only once (check not needed -- small attempt to optomize "interactive" experience)
        if (filteredImage == null) {
            filteredImage = new SimpleImage(originalImage.getWidth(), originalImage.getHeight());
        }
        
        let threshold = document.getElementById('threshold').value;
        greenifyImage(originalImage, filteredImage, threshold);
        filteredImage.drawTo(canvas);
    }
}


function greenifyImage (source, result, threshold) {
    
    result.forEachPixel(pixel => {
        let srcPixel = source.getPixel(pixel.getX(), pixel.getY());
        
        pixel.setGreen(greenifyValue(srcPixel.getGreen(), threshold));
    
    });
}


function greenifyValue(value, threshold) {
    if (value < threshold) {
        return 255 - value;
    }
    else {
        return value;
    }
}

function resetImage () {
    originalImage.drawTo(canvas);
}

// erase image from canvas by drawing a rectangle over it
function clearCanvas () {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // forget selected image
    originalImage = null;
    filteredImage = null;
}
