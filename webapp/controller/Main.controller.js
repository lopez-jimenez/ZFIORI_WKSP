sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent"
], function (Controller, Filter, FilterOperator, UIComponent) {
	"use strict";

	return Controller.extend("App.ListReportExample.controller.Main", {
		onInit: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Main").attachMatched(this._onObjectMatched, this);
			
		},
		
		onAfterRendering: function(oEvent){
			
			// this.getData([]);
			
		},

		getData: function (iFilter) {

			var OData = this.oView.getModel();
			var model = this.oView.getModel("Data");

			var params = {
				filters: iFilter,

				success: function (oResult) {

					model.setProperty("/Agency", oResult.results);

				},
				error: function (oError) {

				}

			};

			OData.read("/AgencySet", params);

		},
		_onObjectMatched: function (oEvent) {
			this.getData([]);
		},

		onSearch: function (oEvent) {
			var Filters = [];
			var filter;
			var selection = oEvent.getParameter("selectionSet");
			var id;

			for (var i = 0; i < selection.length; i++) {

				id = selection[i].getId().split("-");

				if (id[id.length - 1] === "iAgencynum" && selection[i].getValue() !== "") {
					filter = new Filter("Agencynum", FilterOperator.EQ, selection[i].getValue());
					Filters.push(filter);
				}
				if (id[id.length - 1] === "iName" && selection[i].getValue() !== "") {
					filter = new Filter("Name", FilterOperator.EQ, selection[i].getValue());
					Filters.push(filter);
				}
				if (id[id.length - 1] === "iStreet" && selection[i].getValue() !== "") {
					filter = new Filter("Street", FilterOperator.EQ, selection[i].getValue());
					Filters.push(filter);
				}

			}
			this.getData(Filters);

		},
		onPressItem: function (oEvent) {
			var model = this.oView.getModel("Data");
			var Agency = model.getProperty(oEvent.getSource().getBindingContextPath());
			model.setProperty("/selectedAgency", Agency);

			UIComponent.getRouterFor(this).navTo("Detail", {});

		}
	});
});