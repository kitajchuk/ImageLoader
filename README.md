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

<div class="js-lazy-background" data-img-src="http://placehold.it/350x150" style="width:350px;height:150px;display:inline-block;"></div>
<div class="js-lazy-background" data-img-src="http://placehold.it/350x150" style="width:350px;height:150px;display:inline-block;"></div>
```

You can load them asynchronously with `ImageLoader` in this manner:
```javascript
var ImageLoader = require( "properjs-imageloader" );


var imgLoader = new ImageLoader({
    elements: ".js-lazy-image",
    property: "data-img-src"

// Passes you each element in the collection on iteration
}).on( "data", function ( element ) {
    // Here you can perform logic on each element
    // For instance, wait to load them until they are in the viewport
    // Return true to load and false to skip loading until condition is met
    return true;

// Fires when an element loads its image source
}).on( "load", function ( el ) {
    // Handle load success

// Fires when an element fails to load its image source
}).on( "error", function ( el ) {
    // Handle load failure

// Fires when all the images in a collection have been loaded
}).on( "done", function () {
    new ImageLoader({
        elements: ".js-lazy-background",
        property: "data-img-src"

    }).on( "data", function ( element ) {
        return true;
    });
});


// Using the update method
var imgLoader = new ImageLoader({
    elements: ".js-lazy-image",
    property: "data-img-src"

// Passes you each element in the collection on iteration
}).on( "data", function ( element ) {
    return true;

// Lets you update images after having been loaded
}).on( "update", function ( element ) {
    // Perform logic and update an element
});


// When some other async action occurs
imgLoader.update();
```

You can also create normalized data handlers to pass to the loader:
```javascript
// Handler in pseudo code
var onDataHandler = function ( element ) {
    var ret = false;

    if ( elementOffsetTop < (currentWindowScrollY + currentWindowHeight) ) {
        ret = true;
    }

    return ret;
};


// Use the data handler
var imgLoader = new ImageLoader({
    elements: ".js-lazy-image",
    property: "data-img-src"

}).on( "data", onDataHandler );
```

You can kill all instances in the stack for ImageLoader with a static method. This is useful when using [PageController](https://github.com/ProperJS/PageController) from web apps.
```javascript
ImageLoader.killInstances();
```