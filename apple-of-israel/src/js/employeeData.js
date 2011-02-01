    /**
     * Object that represents an employee
     * @param id 		= employee id
     * @param last 		= employee last name
     * @param first 	= employee first name  
     * @param a			= employee area
     * @param d			= employee district
     * @param date		= date employee started working
     * @param picked	= number of apples employee picked since his starting date    
     */
function Employee(id, last, first, a, d, date, picked)
{
	this.employeeId = id;
    this.lastName = last;
    this.firstName = first;
    this.area = a;
    this.district = d;
    this.startDate = date;
    this.applesPicked = picked;
    this.monthlyAverage;
    this.topApplePicker = false;
    
    var today = new Date();
    var diff = today - this.startDate //unit is milliseconds
	diff = Math.round(diff/1000/60/60/24) //contains days passed since Year 2000
	if (diff <= 31)
		this.monthlyAverage = 0;
	else 
		this.monthlyAverage = Math.round(this.applesPicked*31 / diff);
}


// find the best apple picker in a group
function findTopApplePicker(employeeObjectsArray)
{
	var topApplePickerEmployee = employeeObjectsArray[0];
	
	for (var i = 1, len = employeeObjectsArray.length; i < len; i++)
	{
		if (employeeObjectsArray[i].applesPicked > topApplePickerEmployee.applesPicked)
		{
			topApplePickerEmployee = employeeObjectsArray[i];
		} 
	}
	topApplePickerEmployee.topApplePicker = true;
}


	/**
	*	creating mock JSON-like data for North District employees 	
	*/
function createMockDataObjectsNorth()
{
	var returnArray = [
	new Employee("1", "Levy", "Jacob", "Haifa", "North", new Date(2009,7,15), 527),
	new Employee("2", "Cohen", "Isaac", "Upper Galilee", "North", new Date(2010,1,1), 125),
	new Employee("3", "Moshe", "Rachel", "Haifa", "North", new Date(1999,10,25), 5362),
	new Employee("4", "Cohen", "Idan", "Golan Heights", "North", new Date(2011,3,1), 78),
	new Employee("5", "Levy", "Dannie", "Haifa", "North", new Date(2007,2,1), 200)
	]
	
	return returnArray;
}

	/**
	*	creating mock JSON-like data for Center District employees 	
	*/
function createMockDataObjectsCenter()
{
	var returnArray = [
	new Employee("6", "Durden", "Tyler", "Tel-Aviv", "Center", new Date(2011,7,15), 22),
	new Employee("7", "Oneill", "April", "Jerusalem", "Center", new Date(2011,1,1), 125),
	new Employee("8", "Squarepants", "Bob", "HaSharon", "Center", new Date(2000,11,24), 4362),
	new Employee("9", "Tyson", "Mike", "Judea and Samaria", "Center", new Date(2006,4,1), 528),
	new Employee("10", "Morrison", "Jim", "Tel-Aviv", "Center", new Date(2002,2,3), 2222)
	]
	
	return returnArray;
}

	/**
	*	creating mock JSON-like data for South District employees 	
	*/
function createMockDataObjectsSouth()
{
	var returnArray = [
	new Employee("11", "Hill", "Benny", "Eilat", "South", new Date(2009,7,11), 232),
	new Employee("12", "Bieber", "Justin", "Beer Sheva", "South", new Date(2001,9,11), 1425),
	new Employee("13", "X", "Malcolm", "Northern Negev", "South", new Date(2000,12,24), 4362),
	new Employee("14", "Stone", "Sharon", "Southern Negev", "South", new Date(2004,4,1), 1578),
	new Employee("15", "Vega", "Suzan", "Eilat", "South", new Date(2008,11,3), 352)
	]
	
	return returnArray;
}

function convertMockDataObjectToArray(employee)
{
	var stringifiedDate = employee.startDate.getDate() + "/" + (employee.startDate.getMonth() + 1) + "/" +  employee.startDate.getFullYear();
	var test = formatDate(employee.startDate, "DD-MM-YYYY");  
	return [
		employee.employeeId,
	    employee.lastName,
	    employee.firstName,
	    employee.area,
	    employee.district,
	    test,
	    employee.applesPicked,
	    employee.monthlyAverage,
	    employee.topApplePicker
    ]
}

function convertMockDataObjectsTo2DimArray(objectsArray)
{
	var returnArray = [];
	for (var i = 0, len = objectsArray.length; i < len; i++) 
	{
		returnArray.push(convertMockDataObjectToArray(objectsArray[i]));
	}
	
	return returnArray;
}

function initializeEmployeeData()
{
	var mockObjectsNorth = createMockDataObjectsNorth();
	findTopApplePicker(mockObjectsNorth);
	localStorage.setItem('North', JSON.stringify(convertMockDataObjectsTo2DimArray(mockObjectsNorth)));
	
	var mockObjectsCenter = createMockDataObjectsCenter();
	findTopApplePicker(mockObjectsCenter);
	localStorage.setItem('Center', JSON.stringify(convertMockDataObjectsTo2DimArray(mockObjectsCenter)));
	
	var mockObjectsSouth = createMockDataObjectsSouth();
	findTopApplePicker(mockObjectsSouth);
	localStorage.setItem('South', JSON.stringify(convertMockDataObjectsTo2DimArray(mockObjectsSouth)));
	
}

initializeEmployeeData();

function searchEmployees(searchString)
{
	var searchResults = [];
	
	var NorthEmployees = JSON.parse(localStorage.getItem('North'));
	var CenterEmployees = JSON.parse(localStorage.getItem('Center'));
	var SouthEmployees = JSON.parse(localStorage.getItem('South'));

	
	var allEmployees = NorthEmployees.concat(CenterEmployees, SouthEmployees);

	
	for (var i = 0, len = allEmployees.length; i < len; i++) 
	{

		if ((allEmployees[i][1].indexOf(searchString) != -1) 	||
			(allEmployees[i][2].indexOf(searchString) != -1) ||
			(allEmployees[i][3].indexOf(searchString) != -1))
			{
				searchResults.push(allEmployees[i]);
			}
	}
	
	// serialize and save search results to localStorage
	localStorage.removeItem('SearchResults');
	localStorage.setItem('currentDistrictViewed', 'SearchResults');
	localStorage.setItem('SearchResults', JSON.stringify(searchResults));
	
	self.location = "static/searchResults.html";
}