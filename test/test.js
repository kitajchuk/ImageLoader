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
