sap.ui.define(["sap/ui/test/Opa5"], function(Opa5) {
	"use strict";

	return Opa5.extend(
		"ui5.test.test.integration.arrangements.Startup",
		{
			iStartMyApp: function(oOptions) {
				oOptions = oOptions || {};

				// start the app with a minimal delay to make tests fast but still async to discover basic timing issues
				oOptions.delay = oOptions.delay || 50;

				// start the app UI component
				this.iStartMyUIComponent({
					componentConfig: {
						name: "ui5.test",
						async: true
					},
					hash: oOptions.hash,
					autoWait: oOptions.autoWait
				});
			}
		}
	);
});
