sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, UIComponent, History, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("App.ListReportExample.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.ListReportExample.view.Detail
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var filters = [];
			var model = this.oView.getModel("Data");
			var Agency = model.getProperty("/selectedAgency");
			
			if(Agency !== undefined &&  Agency !== undefined !== {}){
				var filter = new Filter("Agencynum", FilterOperator.EQ, Agency.Agencynum);
			filters.push(filter);	
			}
			
			
			this.getData(filters);

		},
		getData: function (iFilter) {

			var oData = this.oView.getModel();
			var model = this.oView.getModel("Data");
			var that = this;

			var params = {
				
				filters: iFilter,

				success: function (oResult) {
					model.setProperty("/Bookings", oResult.results);
					that.getCancels(oResult.results);
				},
				error: function (oError) {

				}

			};

			oData.read("/BookingSet", params );
			
		},
		getCancels: function(iBookings){
			var model = this.oView.getModel("Data");
			var ratio = { cancelled : parseFloat(0, 10),
						 departed : parseFloat(0, 10)};
			
			for(var i = 0; i<iBookings.length; i++ ){
				if( iBookings[i].Cancelled !== "" ){
					ratio.cancelled++;
				} else {
					ratio.departed++;
				}
				
			}
			
			model.setProperty("/Ratio", ratio);
			
		},
		onNavBack: function (oEvent) {

			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {

				UIComponent.getRouterFor(this).navTo("Main", {});
			}

		},
		formatConnid: function(input){
			
			
			return parseInt(input, 10);
			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.ListReportExample.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.ListReportExample.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.ListReportExample.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});