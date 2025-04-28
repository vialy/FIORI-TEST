sap.ui.define(
	[
		"sap/ui/core/UIComponent", 
		"ui5/test/model/models"
	],
	function(UIComponent, models) {
		"use strict";

		/**
		 * @name	ui5.test.Component
		 * @alias 	ui5.test.Component
		 * @license	Infrabel Private
		 * @constructor
		 * @public
		 * @extends sap.ui.core.mvc.Controller
		 * @class
		 * The main component of your app. This also serves as public interface when your component is embedded in another app.<br/>
		 * Be sure to define properties and events that need to be accessible from outside, as well as public methods.<br/>
		 **/
		const Component = UIComponent.extend(
			"ui5.test.Component",
			/**@lends ui5.test.Component.prototype **/ {
				metadata: {
					manifest: "json"
				},
				gitUrl:"https://git/sapfiori/YOURPROJECTHERE"
			}
		);

		/**
		 * @method	init
		 * @license	Infrabel Private
		 * @constructor
		 * @public
		 * @memberof	ui5.test.Component
		 * initialization of manifest, device model (if exists) and router (if exists).<br/>
		 **/
		Component.prototype.init = function() {
			UIComponent.prototype.init.apply(this, arguments);

			// Set the device model
			if (models) {
				this.setModel(models.createDeviceModel(), "device");
			}

			// Initialize the router
			if (this.getRouter() ) {
				this.getRouter().initialize();
			}

			//register messagemodel:
			this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"messages"); //override your default messagemodel
		};

		return Component;
	}
);
