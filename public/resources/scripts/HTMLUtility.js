let install = function () {
    HTMLElement.prototype.childOf = function (element) {
        let node = this;

        while(
            node !== document.body.parentNode
        ) {
            //console.debug(node);

            node = node.parentNode;

            if(node === element) {
                return true;
            }
        }

        return false;
    }

    HTMLElement.prototype.delegateFor = function (
        selector,
        eventType,
        handler
    ) {
        let messagePrefix = "\n\nCannot apply event-delegation:\n";
        let message = messagePrefix;

        let self = this;

        let events = [];

        if(typeof eventType === "string") {
            events.push(eventType);
        }
        
        else

        if(eventType instanceof Array) {
            for(let i = 0; i < eventType.length; i++) {
                if(typeof eventType[i] !== "string") {
                    message += "\nArgument 'eventType':";
                    message += "\nMust be an array of strings";
                    message += "\n\n";

                    throw new Error(message);
                }

                events.push(eventType[i]);
            }
        }

        else
        
        {
            message += "\nArgument 'eventType':";
            message += "\nMust be a string or an array of strings";
            message += "\n\n";

            throw new Error(message);
        }

        for(let i = 0; i < events.length; i++) {
            self.addEventListener(
                events[i],
                function(e) {
                    if(selector.length === 0) {
                        let evt = {
                            "originalEvent": e,
                            "source"       : self,
                            "info"         : e.detail
                        };

                        handler(evt);
                    } else {
                        self.querySelectorAll(selector).forEach(function(element) {
                            //console.debug(e.target);
        
                            if(e.target === element || e.target.childOf(element)) {
                                let evt = {
                                    "originalEvent": e,
                                    "source"       : element,
                                    "info"         : e.detail
                                };
        
                                handler(evt);
                            }
                        });
                    }
                }
            );
        }
    }

    HTMLElement.prototype.climbUntil = function (className) {
        let node = this;

        while(
            node !== document.body.parentNode
        ) {
            //console.debug(node);

            node = node.parentNode;

            if(node.classList.contains(className)) {
                return node;
            }
        }

        return null;
    }

    HTMLElement.prototype.descendUntil = function (selector) {
        return this.querySelectorAll(selector);
    }

    HTMLElement.prototype.triggerEvent = function (
        eventType,
        info
    ) {
        let messagePrefix = "\n\nCannot trigger event:\n\n";
        let message = messagePrefix;

        let events = [];

        if(typeof eventType === "string") {
            events.push(eventType);
        }
        
        else

        if(eventType instanceof Array) {
            for(let i = 0; i < eventType.length; i++) {
                if(typeof eventType[i] !== "string") {
                    message += "\nArgument 'eventType':";
                    message += "\nMust be an array of strings";
                    message += "\n\n";

                    throw new Error(message);
                }

                events.push(eventType[i]);
            }
        }

        else
        
        {
            message += "\nArgument 'eventType':";
            message += "\nMust be a string or an array of strings";
            message += "\n\n";

            throw new Error(message);
        }

        for(let i = 0; i < events.length; i++) {
            this.dispatchEvent(new CustomEvent(
                events[i],
                {
                    "bubbles"   : true,
                    "cancelable": true,
                    "detail"    : info
                }
            ));
        }
    }

    HTMLElement.prototype.toButton = function () {
        this.setAttribute(
            "role",
            "button"
        );

        this.setAttribute(
            "tabindex",
            "0"
        );

        this.onkeydown = function (e) {
            //console.debug(e);

            let controller = this;

            let disabled = controller.getData("disabled");
        
            if(disabled) {
                return;
            }
            
            if(e.key === "Enter") {
                controller.click();
            }
        };
    }
};

export { install };