ImageLoader
===========

> Handle lazy-loading images with contextual load conditions. Uses animation frames to poll for loading.



## Installation

```shell
npm install properjs-imageloader --save-dev
```


## Usage
Given a set of elements on the page such as this:
```html
<img class="js-lazy-image" data-img-src="http://placehold.it/350x150" />
<img class="js-lazy-image" data-img-src="http://placehold.it/350x150" />
```

You can load them asynchronously with `ImageLoader` in this manner:
```javascript
var ImageLoader = require( "properjs-imageloader" );


var imgLoader = new ImageLoader({
    elements: ".js-lazy-image",
    property: "data-img-src",

    // Mehtod called on animation frame and passed the current element 
    // Perform logic here to determine if the current element should load
    // Return a boolean for this function - default is a noop and loads all immediately
    executor: function ( el ) {}

// Fires when an element loads its image source
}).on( "load", function ( el ) {
    // Handle load success

// Fires when an element fails to load its image source
}).on( "error", function ( el ) {
    // Handle load failure

// Fires when all the images in a collection have been loaded
}).on( "done", function () {
    // All images loaded for instance
});
```

You can also create normalized executors to pass to the loader:
```javascript
// Handler in pseudo code
var onCheckImage = function ( element ) {
    var ret = false;

    if ( elementOffsetTop < (currentWindowScrollY + currentWindowHeight) ) {
        ret = true;
    }

    return ret;
};


// Use the data handler
var imgLoader = new ImageLoader({
    elements: ".js-lazy-image",
    property: "data-img-src",
    executor: onCheckImage
});
```