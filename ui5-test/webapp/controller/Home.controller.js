sap.ui.define(
	[
		"ui5/test/controller/BaseController", 
		"ui5/test/util/formatter",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"sap/m/MessageBox"
	],
	function(BaseController, formatter, JSONModel, MessageToast, MessageBox) {
		"use strict";

		/**
		 * @name	ui5.test.controller.Home
		 * @alias 	ui5.test.controller.Home
		 * @license	Infrabel Private
		 * @constructor
		 * @public
		 * @extends sap.ui.core.mvc.Controller
		 * @class
		 * The HomeController is used as controller for the Home view.<br/>
		 **/
		const HomeController = BaseController.extend(
			"ui5.test.controller.Home",
			/** @lends ui5.test.controller.Home.prototype */
			{
				formatter: formatter,
				constructor: function() {}
			}
		);

		/**
		 * @memberof ui5.test.controller.Home
		 * @method onInit
		 * @public
		 * @instance
		 */
		HomeController.prototype.onInit = function() {
			BaseController.prototype.onInit.apply(this, arguments);
			
			// Initialize the form model
			const oViewModel = new JSONModel({
				newOperation: {
					Operand1: "",
					Operand2: "",
					Operation: "+"
				}
			});
			this.getView().setModel(oViewModel);
			
			// Get the OData model and set it as mainModel
			const oModel = this.getOwnerComponent().getModel();
			this.getView().setModel(oModel, "mainModel");
			
			// Add error handler
			oModel.attachRequestFailed(function(oEvent) {
				const oError = oEvent.getParameter("response");
				console.error("Request failed:", oError);
				MessageToast.show("Une erreur est survenue lors de la communication avec le serveur");
			});

			// Load data
			this.loadOperations();
		};

		HomeController.prototype.onDeleteOperation = function(oEvent) {
			const oItem = oEvent.getParameter("listItem");
			const sPath = oItem.getBindingContext("mainModel").getPath();
			const oModel = this.getView().getModel("mainModel");
			
			MessageBox.confirm("Êtes-vous sûr de vouloir supprimer cette opération ?", {
				title: "Confirmation",
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.OK) {
						oModel.remove(sPath, {
							success: function() {
								MessageToast.show("Opération supprimée avec succès");
								this.loadOperations(); // Recharger la liste
							}.bind(this),
							error: function(oError) {
								MessageToast.show("Erreur lors de la suppression");
								console.error("Delete failed:", oError);
							}
						});
					}
				}.bind(this)
			});
		};

		HomeController.prototype.loadOperations = function() {
			const oModel = this.getView().getModel("mainModel");
			oModel.read("/ZZSHISTORYSet", {
				success: function(oData) {
					console.log("=== Données chargées ===");
					console.log("Nombre total d'opérations:", oData.results.length);
					
					oData.results.forEach((operation, index) => {
						console.log(`\nOpération #${index + 1}:`);
						console.log("Premier opérande:", operation.Operand1);
						console.log("Opération:", operation.Operation);
						console.log("Second opérande:", operation.Operand2);
						console.log("Résultat:", operation.Zzresult);
						console.log("Date de création:", new Date(operation.__metadata.created).toLocaleString());
					});
					
					console.log("\n=== Fin des données ===");
				},
				error: function(oError) {
					console.error("Error loading data:", oError);
					MessageToast.show("Erreur lors du chargement des données");
				}
			});
		};

		HomeController.prototype.calculateResult = function(operand1, operand2, operation) {
			operand1 = parseInt(operand1);
			operand2 = parseInt(operand2);
			
			switch(operation) {
				case "+":
					return operand1 + operand2;
				case "-":
					return operand1 - operand2;
				case "*":
					return operand1 * operand2;
				case "/":
					if (operand2 === 0) {
						throw new Error("Division par zéro impossible");
					}
					return operand1 / operand2;
				default:
					throw new Error("Opération non supportée");
			}
		};

		HomeController.prototype.onSubmitOperation = function() {
			const oViewModel = this.getView().getModel();
			const oNewOperation = oViewModel.getProperty("/newOperation");
			
			// Validate inputs
			if (!oNewOperation.Operand1 || !oNewOperation.Operand2) {
				MessageToast.show("Veuillez remplir tous les champs");
				return;
			}

			try {
				// Calculate result
				const result = this.calculateResult(
					oNewOperation.Operand1,
					oNewOperation.Operand2,
					oNewOperation.Operation
				);

				const oModel = this.getView().getModel("mainModel");
				
				// Prepare data for POST
				const postData = {
					Operand1: parseInt(oNewOperation.Operand1),
					Operand2: parseInt(oNewOperation.Operand2),
					Operation: oNewOperation.Operation,
					Zzresult: result.toString() // Add the calculated result
				};

				console.log("=== Nouvelle opération à créer ===");
				console.log("Données envoyées:", postData);

				oModel.create("/ZZSHISTORYSet", postData, {
					success: function(oData) {
						console.log("=== Opération créée avec succès ===");
						console.log("Données reçues:", oData);
						
						MessageToast.show("Opération créée avec succès");
						
						// Reset form
						oViewModel.setProperty("/newOperation", {
							Operand1: "",
							Operand2: "",
							Operation: "+"
						});
						
						// Reload list
						this.loadOperations();
					}.bind(this),
					error: function(oError) {
						console.error("Error creating operation:", oError);
						MessageToast.show("Erreur lors de la création de l'opération");
					}
				});
			} catch (error) {
				MessageToast.show(error.message);
			}
		};

		return HomeController;
	}
);
