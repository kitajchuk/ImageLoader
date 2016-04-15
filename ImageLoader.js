/*!
 *
 * Handle lazy-loading images with contextual load conditions.
 *
 * @ImageLoader
 * @author: kitajchuk
 *
 *
 */
(function ( factory ) {

    if ( typeof exports === "object" && typeof module !== "undefined" ) {
        module.exports = factory();

    } else if ( typeof window !== "undefined" ) {
        window.ImageLoader = factory();
    }

})(function () {

    var Controller = require( "properjs-controller" );


    /**
     *
     * Handle lazy-loading images with unique callback conditions
     * @memberof! <global>
     * @requires raf
     * @constructor ImageLoader
     * @param {object} options Controller settings
     * <ul>
     * <li>elements - The collection of elements to load against</li>
     * <li>property - The property to pull the image source from</li>
     * <li>transitionDelay - The timeout before transition starts</li>
     * <li>transitionDuration - The length of the animation</li>
     * </ul>
     *
     */
    var ImageLoader = function ( options ) {
        var self = this;

        if ( !options ) {
            throw new Error( "ImageLoader Class requires options to be passed" );
        }

        // Up, up and away...
        Controller.call( this );

        /**
         *
         * The Collection to load against
         * @memberof ImageLoader
         * @member _elements
         * @private
         *
         */
        this._elements = options.elements;

        /**
         *
         * The property to get image source from
         * @memberof ImageLoader
         * @member _property
         * @private
         *
         */
        this._property = (options.property || "data-src");

        /**
         *
         * The way to load, async or sync
         * Using "sync" loading requires calling .start() on the instance
         * and the "handle" event will not be utilized, rather each image
         * will be loaded in succession as the previous finishes loading
         * @memberof ImageLoader
         * @member _loadType
         * @private
         *
         */
        this._loadType = (options.loadType || "async");

        /**
         *
         * The current amount of elements lazy loaded
         * @memberof ImageLoader
         * @member _numLoaded
         * @private
         *
         */
        this._numLoaded = 0;

        /**
         *
         * The total amount of elements to lazy load
         * @memberof ImageLoader
         * @member _num2Load
         * @private
         *
         */
        this._num2Load = (this._elements ? this._elements.length : 0);

        /**
         *
         * The delay to execute lazy loading on an element in ms
         * @memberof ImageLoader
         * @member _transitionDelay
         * @default 100
         * @private
         *
         */
        this._transitionDelay = (options.transitionDelay || 100);

        /**
         *
         * The duration on a lazy loaded elements fade in in ms
         * @memberof ImageLoader
         * @member _transitionDuration
         * @default 600
         * @private
         *
         */
        this._transitionDuration = (options.transitionDuration || 400);

        /**
         *
         * This flags that all elements have been loaded
         * @memberof ImageLoader
         * @member _resolved
         * @private
         *
         */
        this._resolved = false;

        // Break out if no elements in collection
        if ( !this._elements.length ) {
            return this;
        }

        // Only run animation frame for async loading
        if ( this._loadType === "async" ) {
            this.initAsync();

        } else {
            this.initSync();
        }
    };


    /**
     *
     * @extends Controller
     *
     */
    ImageLoader.prototype = Object.create( Controller.prototype );


    /**
     *
     * Support asynchronous loading of a set of images
     * @memberof ImageLoader
     * @method initAsync
     *
     */
    ImageLoader.prototype.initAsync = function () {
        var self = this;

        this.go(function () {
            if ( self._resolved ) {
                self.stop();

            } else {
                self.handle();
            }
        });
    };

    /**
     *
     * Support batch synchronous loading of a set of images
     * @memberof ImageLoader
     * @method initSync
     *
     */
    ImageLoader.prototype.initSync = function () {
        var self = this;

        function syncLoad() {
            var elem = self._elements[ self._numLoaded ];

            self._numLoaded++;

            self.load( elem, function ( error ) {
                if ( !error && !self._resolved ) {
                    syncLoad();
                }
            });
        }

        syncLoad();
    };

    /**
     *
     * Perform the image loading and set correct values on element
     * @method load
     * @memberof ImageLoader
     * @param {object} $elem element object
     * @param {function} callback optional callback for each load
     * @fires done
     *
     */
    ImageLoader.prototype.load = function ( element, callback ) {
        var self = this,
            image = null,
            timeout = null,
            isImage = (element.nodeName === "IMG"),
            source = element.getAttribute( this._property );

        element.setAttribute( "data-imageloader", true );

        if ( isImage ) {
            image = element;

        } else {
            image = new Image();
        }

        timeout = setTimeout(function () {
            clearTimeout( timeout );

            image.onload = function () {
                self.fire( "load", element );

                if ( !isImage ) {
                    element.style.backgroundImage = ("url(" + source + ")");

                    image = null;
                }

                timeout = setTimeout(function () {
                    clearTimeout( timeout );

                    if ( (self._numLoaded === self._num2Load) && !self._resolved ) {
                        self._resolve( true );

                    } else if ( typeof callback === "function" ) {
                        // Errors first
                        callback( false );
                    }

                }, self._transitionDuration );
            };

            image.onerror = function () {
                self.fire( "error", element );

                if ( (self._numLoaded === self._num2Load) && !self._resolved ) {
                    self._resolve( true );

                } else if ( typeof callback === "function" ) {
                    // Errors first
                    callback( true );
                }
            };

            image.src = source;

        }, this._transitionDelay );

        return this;
    };

    /**
     *
     * Handles element iterations and loading based on callbacks
     * @memberof ImageLoader
     * @method handle
     * @fires data
     *
     */
    ImageLoader.prototype.handle = function () {
        var elems = this.getNotLoaded(),
            self = this;

        for ( var i = 0, len = elems.length; i < len; i++ ) {
            var elem = elems[ i ];

            // Fires the predefined "data" event
            if ( self.fire( "data", elem ) ) {
                self._numLoaded++;

                self.load( elem );
            }
        }
    };

    /**
     *
     * Get all images in the set that have yet to be loaded
     * @memberof ImageLoader
     * @method getNotLoaded
     *
     */
    ImageLoader.prototype.getNotLoaded = function () {
        var elems = [];

        for ( var i = 0, len = this._elements.length; i < len; i++ ) {
            if ( !this._elements[ i ].getAttribute( "data-imageloader" ) ) {
                elems.push( this._elements[ i ] );
            }
        }

        return elems;
    };

    /**
     *
     * Resolve an instance and remove it from the stack
     * @memberof ImageLoader
     * @method _resolve
     *
     */
    ImageLoader.prototype._resolve = function () {
        // Resolved state
        this._resolved = true;

        // Fires the predefined "done" event
        this.fire( "done" );
    };


    return ImageLoader;


});