sap.ui.define(
	[
		"ui5/test/controller/BaseController"
	],
	function(BaseController) {
		"use strict";

		/**
		 * @name	ui5.test.controller.App
		 * @alias 	ui5.test.controller.App
		 * @constructor
		 * @public
		 * @extends sap.ui.core.mvc.Controller
		 * @class
		 * The basecontroller is inherited by all the controllers of the application. It contains shared functionality that can be triggered
		 * from multiple locations in the app.<br/>
		 **/
		const AppController = BaseController.extend(
			"ui5.test.controller.App",
			/** @lends ui5.test.controller.App.prototype */
			{
				constructor: function() {}
			}
		);

		/**
		 * initializing event handler
		 * @method onInit
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.App
		 * @public
		 */
		AppController.prototype.onInit = function() {};

		return AppController;
	}
);
