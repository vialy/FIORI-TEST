/*global QUnit*/

sap.ui.define(["ui5/test/controller/Home.controller"], function(
	oController
) {
	"use strict";

	QUnit.module("App Controller");

	QUnit.test("I should test the controller", function(assert) {
		var oAppController = new oController();

		oAppController.onInit();
		assert.ok(oAppController);
	});
});
