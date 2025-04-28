/*global history */
sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History"
	],
	function(Controller, History) {
		"use strict";

		/**
		 * @name	ui5.test.controller.BaseController
		 * @alias 	ui5.test.controller.BaseController
		 * @license	Infrabel Private
		 * @constructor
		 * @public
		 * @extends sap.ui.core.mvc.Controller
		 * @class
		 * The basecontroller is inherited by all the controllers of the application. It contains shared functionality that can be triggered
		 * from multiple locations in the app.<br/>
		 **/
		const BaseController = Controller.extend(
			"ui5.test.controller.BaseController",
			/**@lends ui5.test.controller.BaseController.prototype */
			{
				navProps:null
			}
		);

		/**
		 * register onRouteMatchedEvent in the basecontroller. You'll need it anyway...
		 * @method onInit
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @public
		 */
		BaseController.prototype.onInit = function() {
			if (this.getRouter()){
				this.getRouter().attachEvent("routeMatched", {}, this.onRouteMatched, this)
			}
		};

		/**
		 * the base handler for on route matched. Simply stores the navigation arguments in a variable, so we can reuse it again later.
		 * @todo can, or should we limit ourselves in this method to only store the child* and parent* arguments?
		 * @method onRouteMatched
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @public
		 */
		BaseController.prototype.onRouteMatched = function(event){
			this.navProps = event.getParameter("arguments") || {};
		},

		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @method getRouter
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @returns {sap.f.routing.Router} the router for this component
		 */
		BaseController.prototype.getRouter = function() {
			return this.getOwnerComponent().getRouter();
		};

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @method getModel
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		BaseController.prototype.getModel = function(sName) {
			return this.getView().getModel(sName);
		};

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @method setModel
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		BaseController.prototype.setModel = function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		};

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @method getResourceBundle
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		BaseController.prototype.getResourceBundle = function() {
			if (this._bundle ) {
				return this._bundle
			}

			this._bundle = this.getOwnerComponent()
				.getModel("i18n")
				.getResourceBundle();

			return this._bundle;
		};

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 * @method onNavBack
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 */
		BaseController.prototype.onNavBack = function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("master", {}, bReplace);
			}
		};

		/**
		 * convenience method for routing, that automatically passes parent and child params (nested components).
		 * @method navTo
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 */
		BaseController.prototype.navTo = function( route, params ){
			let parentChild =  this.navProps || {};
			let resultParams = {};
			params = params || {}; //make sure it's an object

			for( let key in parentChild ){
				resultParams[key] = parentChild[key];
			}

			for( let key in params ){
				resultParams[key] = params[key];
			}

			this.getRouter().navTo(route, resultParams);
		};

		/**
		 * convenience method to retrieve the component startup parameters.
		 * @method getStartupParameters
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 */
		BaseController.prototype.getStartupParameters = function() {
			return (
				this.getOwnerComponent().getComponentData().startupParameters || {}
			);
		};

		/**
		 * Convenience method to add messages in the global messagemanager
		 * @method _addMessage
		 * @private
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @param {map} message - message map
		 * @param {string} message.title
		 * @param {string} message.type
		 * @param {string} message.description
		 * @param {string} message.text
		 *
		 */
		BaseController.prototype._addMessage = function(message){
			sap.ui.getCore().getMessageManager().addMessages(new Message({
				message:message.title,
				description:message.description,
				additionalText:message.text,
				type: message.type || MessageType.Information,
				target: message.target || null,
				processor: message.processor || null
			}) );
		},

		/**
		 * Convenience method to remove messages in the global messagemanager
		 * @method _removeMessagesForBinding
		 * @private
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 * @param {map} message - message map
		 * @param {string} message.title
		 * @param {string} message.type
		 * @param {string} message.description
		 * @param {string} message.text
		 *
		 */
		BaseController.prototype._removeMessagesForBinding = function(bindingPath){
			let messages = this.getModel("messages").getData();

			sap.ui.getCore().getMessageManager().removeMessages(
				messages.filter(function(message){
					return message.target === bindingPath;
				})
			);
		};

		/**
		 * event handler to open up the message manager
		 * @method openMessages
		 * @public
		 * @instance
		 * @memberof ui5.test.controller.BaseController
		 */
		BaseController.prototype.openMessages = function(event){
			let source = event ? event.getSource() : this.byId("messageManager");

			Fragment.load({name:"ui5.test.fragment.MessagePopover", controller:this})
			.then(function(popover){
				popover.setModel(this.getModel("messages"), "messages"); //model propagation
				popover.openBy(source);

				//make sure the popover is self-contained, and destroys itself as soon as it's closed again.
				popover.attachEvent("afterClose", {}, function(){
					popover.destroy();
				});
			}.bind(this));
		};

		return BaseController;
	}
);
