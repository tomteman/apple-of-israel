/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */



Ext.onReady(function(){
    Ext.QuickTips.init();


	
    // grab the required employee table from localStorage and deserialize it
    var currentDistrict = localStorage.getItem('currentDistrictViewed');
	
	var myData = JSON.parse(localStorage.getItem(currentDistrict));
	
	
    /**
     * Custom function used for column renderer (handle zero or negative average)
     * @param {Object} val
     */
    function handleZeroAvg(val) {
        if (val <= 0) {
            return '<span style="color:red;">' + " --- " + '</span>';
        }
        return val;
    }


    // create the data store
    var store = new Ext.data.ArrayStore({
        fields: [
			{name: 'id'},
			{name: 'lastName'},
            {name: 'firstName'},
            {name: 'area'},
            {name: 'district'},
            {name: 'startDate', type: 'date', dateFormat: 'd-m-Y'},
            {name: 'applesPicked'},
            {name: 'average'},
            {name: 'topApplePicker'}
        ]
    });
    // manually load local data
    store.loadData(myData);
    // create the Grid
    var grid = new Ext.grid.GridPanel({
        store: store,
        columns: [
            {
                id       : 'lastName',
                header   : 'Last Name', 
                width    : 106, 
                sortable : true, 
                dataIndex: 'lastName'
            },
	        {
                id       : 'firstName',
                header   : 'First Name', 
                width    : 110, 
                sortable : true, 
                dataIndex: 'firstName'
            },
			{
                id       : 'area',
                header   : 'Area', 
                width    : 120, 
                sortable : true, 
                dataIndex: 'area'
            },
            {
                id       : 'district',
                header   : 'District', 
                width    : 100, 
                sortable : true, 
                dataIndex: 'district'
            },
            {
            	id		 : 'startDate',
            	header	 : 'Start Date', 
            	width	 : 100, 
            	sortable : true, 
            	dataIndex: 'startDate',
            	renderer : Ext.util.Format.dateRenderer('d-m-Y')
            },
            {
                id       : 'applesPicked',
                header   : 'Apples Picked', 
                width    : 100, 
                sortable : true, 
                dataIndex: 'applesPicked'
            },
			{
            	id		 : 'average',
            	header	 : 'Average', 
            	width	 : 100, 
            	sortable : true, 
            	dataIndex: 'average',
            	renderer : handleZeroAvg
            }
        ],
        viewConfig: {
 			getRowClass: function(rec, idx, rowPrms, ds) {
        		return rec.data.topApplePicker === true ? 'yellow-row' : '';
    		}
		},
        stripeRows: true,
        height: 350,
        width: 740,
        title: currentDistrict,
        // config options for stateful behavior
        stateful: true,
        stateId: 'grid'
    });


    // render the grid to the specified div in the page
    grid.render('grid-example');
});