/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function(){

    Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();


    var employeeForm = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        title: 'Employee details',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',

        items:[{
                 name:'lastName'
                ,fieldLabel:'Last Name'
				,allowBlank:false
				,blankText: 'You have to provide a first name'
            },{
                 name:'firstName'
                ,fieldLabel:'First Name'
                ,allowBlank:true
            },{
                 name:'area'
                ,fieldLabel:'Area'
                ,allowBlank:true
            },{
                 name:'district'
                ,fieldLabel:'District'
                ,allowBlank:true
                ,xtype:'combo'
                ,triggerAction:'all'
                ,store:['North', 'Center', 'South']
            },{
                 name:'startDate'
                ,fieldLabel:'Start Date'
                ,vtype:'date'
            },{
                 name:'applesPicked'
                ,fieldLabel:'Apples Picked'
                ,allowblank: true
            }],

        buttons: [{
            text: 'Save',
            handler: function(){
               if(employeeForm.getForm().isValid()){
                    Ext.Msg.alert(employeeForm.getForm().findField('lastName').getValue());
                }
            }
        },{
            text: 'Load',
            handler: function(){
                employeeForm.getForm().reset();
            }
        }]
    });

    employeeForm.render('employeeForm');
});

function employeeExists(firstName, lastName)
{
	var searchResults = [];
	
	var NorthEmployees = JSON.parse(localStorage.getItem('North'));
	var CenterEmployees = JSON.parse(localStorage.getItem('Center'));
	var SouthEmployees = JSON.parse(localStorage.getItem('South'));

	
	var allEmployees = NorthEmployees.concat(CenterEmployees, SouthEmployees);

	
	for (var i = 0, len = allEmployees.length; i < len; i++) 
	{

		if ((allEmployees[i][1].indexOf(firstName) != -1) 	||
			(allEmployees[i][2].indexOf(lastName) != -1))
			{
				return(allEmployees[i]);
			}
	}
}


