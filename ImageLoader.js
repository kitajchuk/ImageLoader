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

    var raf = window.requestAnimationFrame,
        caf = window.cancelAnimationFrame,
    
        _i,
        _all = 0,
        _num = 0,
        _raf = null,
        _ini = false,
    
        // Holds all "instances"
        // This way we can use a single animator
        _instances = [];
    
    
    // Should support elements as null, undefined, DOMElement, HTMLCollection, string selector
    function setElements( elements ) {
        // Handles string selector
        if ( typeof elements === "string" ) {
            elements = document.querySelectorAll( elements );
    
        // Handles DOMElement
        } else if ( elements && elements.nodeType === 1 ) {
            elements = [ elements ];
        
        } else if ( !elements ) {
            elements = [];
        }
    
        // Default:
        // HTMLCollection / Array
        return elements;
    }
    
    
    // Called when instances are created
    function initializer( instance ) {
        // Increment ALL
        _all = _all + instance._num2Load;
    
        // Private instances array
        _instances.push( instance );
    
        // One stop shopping
        if ( !_ini ) {
            _ini = true;
            animate();
        }
    }
    
    
    // Called on each iteration of the animation cycle
    function animate() {
        if ( _num !== _all ) {
            _raf = raf( animate );
    
            for ( _i = _instances.length; _i--; ) {
                if ( _instances[ _i ]._numLoaded !== _instances[ _i ]._num2Load && _instances[ _i ]._loadType === "async" ) {
                    _instances[ _i ].handle();
                }
            }
    
        } else {
            stop();
        }
    }
    
    
    // Stops the animation cycle queue for loading images
    function stop () {
        caf( _raf );
    
        _raf = null;
        _ini = false;
    }
    
    
    // Simple add class polyfill
    function addClass( el, str ) {
        var newClass = str.split( " " ),
            elsClass = el.className.split( " " );
    
        for ( var i = 0, len = newClass.length; i < len; i++ ) {
            if ( elsClass.indexOf( newClass[ i ] ) === -1 ) {
                elsClass.push( newClass[ i ] );
            }
        }
    
        el.className = elsClass.join( " " );
    }
    
    
    // Simple remove class polyfill
    function removeClass( el, str ) {
        var oldClass = str.split( " " ),
            elsClass = el.className.split( " " );
    
        for ( var i = 0, len = oldClass.length; i < len; i++ ) {
            if ( elsClass.indexOf( oldClass[ i ] ) !== -1 ) {
                elsClass.splice( elsClass.indexOf( oldClass[ i ] ), 1 );
            }
        }
    
        el.className = elsClass.join( " " );
    }
    
    
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
    var ImageLoader = function () {
        return this.init.apply( this, arguments );
    };
    
    
    /**
     *
     * Stop all instances and reset the stack for EVERYTHING
     * @method killInstances
     * @memberof ImageLoader
     *
     */
    ImageLoader.killInstances = function () {
        stop();
        
        _all = 0;
        _num = 0;
        _instances = [];
    };
    
    
    /**
     *
     * ClassName for the element loading state
     * @member IS_LOADING
     * @memberof ImageLoader
     *
     */
    ImageLoader.IS_LOADING = "-is-lazy-loading";
    
    
    /**
     *
     * ClassName for the element transitioning state
     * @member IS_TRANSITION
     * @memberof ImageLoader
     *
     */
    ImageLoader.IS_TRANSITION = "-is-lazy-transition";
    
    
    /**
     *
     * ClassName for the elements loaded state
     * @member IS_LOADED
     * @memberof ImageLoader
     *
     */
    ImageLoader.IS_LOADED = "-is-lazy-loaded";
    
    
    /**
     *
     * ClassName to define the element as having been loaded
     * @member IS_HANDLED
     * @memberof ImageLoader
     *
     */
    ImageLoader.IS_HANDLED = "-is-lazy-handled";
    
    
    ImageLoader.prototype = {
        constructor: ImageLoader,
    
        init: function ( options ) {
            var self = this;
    
            if ( !options ) {
                throw new Error( "ImageLoader Class requires options to be passed" );
            }
    
            /**
             *
             * The Collection to load against
             * @memberof ImageLoader
             * @member _elements
             * @private
             *
             */
            this._elements = setElements( options.elements );
    
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
            this._transitionDuration = (options.transitionDuration || 600);
    
            /**
             *
             * This flags that all elements have been loaded
             * @memberof ImageLoader
             * @member _resolved
             * @private
             *
             */
            this._resolved = false;
    
            /**
             *
             * Defined event namespaced handlers
             * @memberof ImageLoader
             * @member _handlers
             * @private
             *
             */
            this._handlers = {
                data: null,
                load: null,
                done: null,
                error: null,
                update: null
            };
    
            // Break out if no elements in collection
            if ( !this._elements.length ) {
                return this;
            }
    
            // Only run animation frame for async loading
            if ( this._loadType === "async" ) {
                initializer( this );
    
            } else {
                this._syncLoad();
            }
        },
    
        /**
         *
         * Add a callback handler for the specified event name
         * @memberof ImageLoader
         * @method on
         * @param {string} event The event name to listen for
         * @param {function} handler The handler callback to be fired
         *
         */
        on: function ( event, handler ) {
            this._handlers[ event ] = handler;
    
            return this;
        },
        
        /**
         *
         * Fire the given event for the loaded element
         * @memberof ImageLoader
         * @method fire
         * @returns bool
         *
         */
        fire: function ( event, element ) {
            var ret = false;
    
            if ( typeof this._handlers[ event ] === "function" ) {
                ret = this._handlers[ event ].call( this, element );
            }
    
            return ret;
        },
    
        /**
         *
         * Iterate over elements and fire the update handler
         * @memberof ImageLoader
         * @method update
         *
         * @fires update
         *
         */
        update: function () {
            var self = this;
    
            for ( var i = 0, len = this._elements.length; i < len; i++ ) {
                var element = this._elements[ i ];
    
                this.fire( "update", element );
            }
        },
        
        /**
         *
         * Perform the image loading and set correct values on element
         * @method load
         * @memberof ImageLoader
         * @param {object} $elem element object
         * @param {function} callback optional callback for each load
         *
         * @fires done
         *
         */
        load: function ( element, callback ) {
            var self = this,
                image = null,
                timeout = null,
                isImage = (element.nodeName.toLowerCase() === "img"),
                source = element.getAttribute( this._property );
    
            element.setAttribute( "data-imageloader", true );
    
            addClass( element, ImageLoader.IS_LOADING );
    
            if ( isImage ) {
                image = element;
    
            } else {
                image = new Image();
            }
    
            timeout = setTimeout(function () {
                clearTimeout( timeout );
    
                addClass( element, ImageLoader.IS_TRANSITION );
    
                image.onload = function () {
                    self.fire( "load", element );
    
                    if ( !isImage ) {
                        element.style.backgroundImage = ("url(" + source + ")");
    
                        image = null;
                    }
    
                    addClass( element, ImageLoader.IS_LOADED );
    
                    timeout = setTimeout(function () {
                        clearTimeout( timeout );
    
                        removeClass( element, ImageLoader.IS_LOADING + " " + ImageLoader.IS_TRANSITION + " " + ImageLoader.IS_LOADED )
                        addClass( element, ImageLoader.IS_HANDLED );
    
                        if ( (self._numLoaded === self._num2Load) && !self._resolved ) {
                            self._resolveInstance( true );
    
                        } else if ( typeof callback === "function" ) {
                            // Errors first
                            callback( false );
                        }
    
                    }, self._transitionDuration );
                };
    
                image.onerror = function () {
                    self.fire( "error", element );
    
                    if ( (self._numLoaded === self._num2Load) && !self._resolved ) {
                        self._resolveInstance( true );
    
                    } else if ( typeof callback === "function" ) {
                        // Errors first
                        callback( true );
                    }
                };
    
                image.src = source;
    
            }, this._transitionDelay );
    
            return this;
        },
    
        /**
         *
         * Handles element iterations and loading based on callbacks
         * @memberof ImageLoader
         * @method handle
         *
         * @fires handle
         *
         */
        handle: function () {
            var elems = this._getNotLoaded(),
                self = this;
    
            for ( var i = 0, len = elems.length; i < len; i++ ) {
                var elem = elems[ i ];
    
                // Fires the predefined "data" event
                if ( self.fire( "data", elem ) ) {
                    _num++;
    
                    self._numLoaded++;
    
                    self.load( elem );
                }
            }
        },
        
        /**
         *
         * Resolve an instance and remove it from the stack
         * @memberof ImageLoader
         * @method _resolveInstance
         *
         */
        _resolveInstance: function () {
            // Resolved state
            this._resolved = true;
            
            // Fires the predefined "done" event
            this.fire( "done" );
            
            // Purge the instance from the stack
            _instances.splice( _instances.indexOf( this ), 1 );
        },
    
        /**
         *
         * Get all images in the set that have yet to be loaded
         * @memberof ImageLoader
         * @method _getNotLoaded
         * @private
         *
         */
        _getNotLoaded: function () {
            var elems = [];
    
            for ( var i = 0, len = this._elements.length; i < len; i++ ) {
                if ( !this._elements[ i ].getAttribute( "data-imageloader" ) ) {
                    elems.push( this._elements[ i ] );
                }
            }
    
            return elems;
        },
    
        /**
         *
         * Support batch synchronous loading of a set of images
         * @memberof ImageLoader
         * @method _syncLoad
         * @private
         *
         */
        _syncLoad: function () {
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
        }
    };
    
    
    return ImageLoader;


});