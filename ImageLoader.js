import Controller from "properjs-controller";



export default class ImageLoader extends Controller {
    constructor ( options ) {
        super();

        this._executor = options.executor ? options.executor.bind( this ) : this.executor.bind( this );
        this._elements = options.elements || []; // allow empty?
        this._property = options.property || "data-src";
        this._loadType = options.loadType || "async";
        this._numLoaded = 0;
        this._num2Load = this._elements.length;
        this._transitionDelay = options.transitionDelay || 0;
        this._transitionDuration = options.transitionDuration || 400;
        this._resolved = false;

        if ( !this._num2Load ) {
            this.resolve();

        } else if ( this._loadType === "sync" ) {
            this.sync();

        } else {
            this.async();
        }
    }


    executor ( el ) {
        const bounds = el.getBoundingClientRect();

        return (bounds.top < window.innerHeight && bounds.bottom > 0);
    }


    async () {
        this.go(() => {
            if ( this._resolved ) {
                this.stop();

            } else {
                this.handle();
            }
        });
    }


    sync () {
        const syncLoad = () => {
            const elem = this._elements[ this._numLoaded ];

            this._numLoaded++;

            this.load( elem, ( error ) => {
                if ( !error && !this._resolved ) {
                    syncLoad();
                }
            });
        };

        syncLoad();
    }


    load ( element, callback ) {
        let image = null;
        let timeout = null;
        const isFunc = (typeof callback === "function");
        const isImage = (element.nodeName === "IMG");
        const source = element.getAttribute( this._property );

        if ( isImage ) {
            image = element;

        } else {
            image = new Image();
        }

        element.setAttribute( "data-imageloader", false );

        timeout = setTimeout(() => {
            clearTimeout( timeout );

            image.onload = () => {
                this.fire( "load", element );

                if ( !isImage ) {
                    element.style.backgroundImage = `url(${source})`;

                    image = null;
                }

                element.setAttribute( "data-imageloader", true );

                timeout = setTimeout(() => {
                    clearTimeout( timeout );

                    if ( (this._numLoaded === this._num2Load) && !this._resolved ) {
                        this.resolve( true );

                    } else if ( isFunc ) {
                        // Errors first
                        callback( false );
                    }

                }, this._transitionDuration );
            };

            image.onerror = () => {
                this.fire( "error", element );

                if ( (this._numLoaded === this._num2Load) && !this._resolved ) {
                    this.resolve( true );

                } else if ( isFunc ) {
                    // Errors first
                    callback( true );
                }
            };

            image.src = source;

        }, this._transitionDelay );

        return this;
    }


    handle () {
        const elems = this.getNotLoaded();
        const len = elems.length;

        for ( let i = 0; i < len; i++ ) {
            if ( this._executor( elems[ i ] ) ) {
                this._numLoaded++;

                this.load( elems[ i ] );
            }
        }
    }


    getNotLoaded () {
        const elems = [];

        for ( var i = 0; i < this._elements.length; i++ ) {
            if ( !this._elements[ i ].getAttribute( "data-imageloader" ) ) {
                elems.push( this._elements[ i ] );
            }
        }

        return elems;
    }


    resolve () {
        this._resolved = true;
        this.fire( "done" );
    }
}
