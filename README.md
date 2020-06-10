ProperJS // ImageLoader
=======================

> Bullet-proof lazy-loading images with contextual load conditions.



### Installation

```shell
npm i properjs-imageloader --save-dev
```


### Usage
Given a set of elements on the page such as this. Also see the `test` setup which loads over 40 images from [kitajchuk.com](https://kitajchuk.com).
```html
<img class="image" data-src="https://www.kitajchuk.com/assets/img/kickflip/kickflip_01.png" />
<img class="image" data-src="https://www.kitajchuk.com/assets/img/kickflip/kickflip_02.png" />
<img class="image" data-src="https://www.kitajchuk.com/assets/img/kickflip/kickflip_03.png" />
```

You can pool them into a manager for loading in this manner. The `executor` is what determines the criteria for an image in the pool actually loading, the default is to be within the viewport. The built-in executor uses `getBoundingClientRect()` to check an image or element's position within the viewport.
```javascript
import ImageLoader from "../ImageLoader";

const loader = new ImageLoader({
    elements: document.querySelectorAll( ".image" ),
    property: "data-src", // default
    executor: ( el ) => { // default
        const bounds = el.getBoundingClientRect();

        return (bounds.top < window.innerHeight && bounds.bottom > 0);
    },
    loadType: "async", // default
});

loader.on( "load", ( el ) => {
    console.log( "loaded", el.src );

}).on( "error", ( el ) => {
    console.log( "error", el.src );

}).on( "done", () => {
    console.log( "done" );
});
```
