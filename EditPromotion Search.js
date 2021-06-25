var SearchPromotionOUI = false;
var sView,SearchProm,filter,value,table;
if (typeof(SiebelApp.S_App.SearchPromotionOUI) === "undefined") {
    if (!SearchPromotionOUI) {
        SiebelApp.S_App.SearchPromotionOUI = function() {
		sView = SiebelApp.S_App.GetActiveView().GetName();
		if(sView === "ISS Promotion Edit UI View OUI - Order Sales")
		{
		SearchProm = $('#SearchProm');
        filter = $('#filter');
		if (SearchProm.length == 0 && filter.length == 0)
		{
		sHtml = '<div id="SearchProm" class="SearchProm">';
        sHtml += '<input type="text" name="filter" id="filter" value="" aria-labelledby="Search Promotion" aria-label="Search Promotion:" style="height: 24px; width:100px;" class="siebui-ctrl-input siebui-align-left siebui-input-align-left" maxlength="255" tabindex="0" aria-readonly="false">';
        sHtml += '</div>';
		$(".siebui-epui-detail-applet").prepend(sHtml);
		$('#filter').before("Search keyword or part of (don't use *):");
		$('#filter').after("Search will only be for 0-100 items on this page.Use next/previous for other pages.");
		$('#SearchProm').css('font-weight','bold');
		}
		$('#filter').keyup(function(){
		table = $('.siebui-epui-tr');
		value = document.querySelector('[aria-label="Search Promotion:"]').value.toUpperCase();
		for(i=0;i<table.length;i++){
		if(table[i].innerText.toUpperCase().indexOf(value)>-1)
		{
		$(table[i]).show();
		}
		else
		{
		$(table[i]).hide();
		}
		}
		});
		$('.siebui-epui-tr').bind('DOMSubtreeModified', function(){
        table = $('.siebui-epui-tr');
		value = document.querySelector('[aria-label="Search Promotion:"]').value.toUpperCase();
        if(value != null && value != "" && value != "undefined")
        {
		for(i=0;i<table.length;i++){
		if(table[i].innerText != null && table[i].innerText != "" && table[i].innerText != "undefined")
		{
		if(table[i].innerText.toUpperCase().indexOf(value)>-1)
		{
		$(table[i]).show();
		}
		else
		{
		$(table[i]).hide();
		}
		}
		}
        }
        });
		}
        }
    }
}
if (typeof(SiebelAppFacade.PostLoadExt) == "undefined") {
    Namespace('SiebelAppFacade.PostLoadExt');
    (function() {
        SiebelApp.EventManager.addListner("postload", OnPostload, this);

        function OnPostload() {
            SiebelApp.S_App.SearchPromotionOUI();
        }
    }());
}
