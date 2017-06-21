//list of items stored in record shop

//date syntax: Date(<year>, <month>, <day>, <hours>, <minutes>, <seconds>, <milliseconds>)
//date syntax: <month> goes from 0 to 11
var disks = [
    {
		ID: 1,
        price: 11,
        quantity: 20,
		genre: "classic",
		date: new Date(2000, 0, 1, 0, 0, 0, 0) // Start of 2000
	},
    {
		ID: 2,
        price: 210,
        quantity: 1,
		genre: "classic",
		date: new Date(2015, 6, 15, 0, 0, 0, 0)
	},
    {
		ID: 3,
        price: 13,
        quantity: 50,
		genre: "rap",
		date: new Date(2012, 11, 22, 0, 0, 0, 0)
	},
    {
		ID: 4,
        price: 10,
        quantity: 4,
		genre: "cross over",
		date: new Date(2017, 3, 21, 0, 0, 0, 0)
	},
    {
		ID: 5,
        price: 15,
        quantity: 14,
		genre: "lounge",
		date: new Date(2007, 8, 30, 0, 0, 0, 0)
	},
];


/** 
 * @brief getter of disks
 * @return the disks
 */
var getDisks = function getDisks(){
    return disks;
}


/** 
 * @brief it searches one elements in disks
 * @param diskID
 * @return the element searched, null otherwise
 */
var searchDisk = function searchDisk(diskID)
{
    //search for the elements
    var position = searchPos(diskID);
    
    if (position == null)
        return position
    else
        return disks[position];
}

/** 
 * @brief it searches one elements in disks
 * @param diskID
 * @return the position of the element searched, null otherwise
 */
var searchPos = function searchPos(diskID)
{
    //search for the elements
    for (i=0; i < disks.length; i++)
	{
		if (disks[i].ID == diskID)
		{
			return i;
		}
    }
    
    //if this point is reached the element is not found
    return null;
}

/**
 * @brief This function increase the quantity of an element, given its ID. The maximum capacity is 100. 
 * @param itemID
 * @return the item if it is restocket, null if the item does not exist or the new capacity is highier than 100
 */
var remaster = function remaster(item)
{
    //search for the element
    var position = searchPos(item.ID);
    
    if (position!=null && (disks[position].quantity+item.quantity)<=100)
        {
            disks[position].quantity=disks[position].quantity+item.quantity;
            disks[position].date= new Date();
            return disks[position];
        }
    else
        return null;
}

//export functions
exports.getDisks = getDisks; 
exports.searchDisk = searchDisk; 
exports.remaster = remaster; 