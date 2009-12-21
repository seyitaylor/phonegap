/**
 * This class provides access to the device contacts.
 * @constructor
 */

function Contact(jsonObject) {
    this.name = {
		formatted:''
	};
    this.phones = [];
    this.emails = [];
  	this.id = "";
}

Contact.prototype.displayName = function() {
	return this.name.formatted;
}

function Contacts() {
	// Dummy object to hold array of contacts
	this.contacts = [];
	this.timestamp = new Date().getTime();
	this.onError = null;
	this.onSuccess = null;
}

if (typeof navigator.contacts == "undefined") navigator.contacts = new Contacts();

Contacts.prototype.formParams = function(options, startArray) {
	var params = [];
	if (startArray) params = startArray;
	if (options.limit && options.limit > 0) params.push("pageSize:" + options.limit);
	if (options.page) params.push("pageNumber:" + options.page);
	return params;	
};
Contacts.prototype.find = function(filter, successCallback, errorCallback, options) {
	if (typeof(filter) != 'object') {
		alert('[PhoneGap Error] filter parameter passed into navigator.contacts.find must be of type object.');
		return;
	}
	if (filter.name && filter.name.formatted && filter.name.formatted.length > 0) {
		var params = ["search"];
		params.push('nameFilter:' + filter.name);
		params = this.formParams(options,params);
		this.onSuccess = successCallback;
		this.onError = errorCallback;
		PhoneGap.exec("contacts", params);
	} else {
		this.getAllContacts(successCallback,errorCallback,options);
	}
};
Contacts.prototype.getAllContacts = function(successCallback, errorCallback, options) {
	this.onSuccess = successCallback;
	this.onError = errorCallback;
	var params = ["getall"];
	params = this.formParams(options,params);
	PhoneGap.exec("contacts", params);
};