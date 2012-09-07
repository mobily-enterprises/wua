




var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


// *********************************************************
// Schema definitions
// *********************************************************


// *************************
// LOGGER
// *************************
var Log = new Schema({
  workspaceId    : { type: ObjectId, index: true },
  workspaceName  : { type: String, index: true },
  userId         : { type: ObjectId, index: true },
  login          : { type: String, index: true },
  token          : { type: String, index: true },
  logLevel       : { type: Number, enum:[1,5] },
  errorName      : { type: String, index: true },
  message        : { type: String, index: true },
  reqInfo        : { type: String },
  data           : { type: String },
  loggedOn       : { type: Date, index: true },
});
mongoose.model('Log', Log);

// *************************
// BASICS (USERS, WS, ETC.)
// *************************

var Country =  new Schema({
  name     : String
});
mongoose.model('Country', Country);


var Access = new Schema({
  userId         : { type: ObjectId, index: true },
  token          : { type: String, index: true },
  isOwner        : { type: Boolean, index: true }, 
});
mongoose.model('Access', Access);

var Workspace = new Schema({
  name           : { type: String, lowercase: true, unique: true},
  description    : String,
  isActive       : Boolean,
  settings       : { 
    longName        : String,
    welcomeMessage  : String,
    countryId       : { type: ObjectId, index: true },
  },
  access          : [ Access ],
 
});
mongoose.model('Workspace', Workspace);

var City = new Schema({
  workspaceId        : { type: ObjectId, index: true },
  description        : { type: String, index: true },
});
mongoose.model('City', City);


// ***************************************************
// CONTACT AND PRODUCTS (IMPLEMENTED AS AN EXAMPLE
// ***************************************************

var Contact = new Schema({
  workspaceId        : { type: ObjectId, index: true },
  isReseller         : { type: Boolean, index: true },
  isBookable           : { type: Boolean, index: true },
  createdTime        : { type: Date, index: true },
  productIds         : [ { type: ObjectId, index: true}],
  firstName          : { type: String, index: true },
  middleName         : { type: String, index: true },
  lastName           : { type: String, index: true },
  email              : { type: String, index: true },
  address1           : String,
  address2           : String,
  town               : String,
  state              : String,
  postcode           : { type: String, index: true },
  country            : { type: ObjectId, index: true },
  landLineNumber1    : { type: String, index: true },
  landLineNumber2    : { type: String, index: true },
  mobileNumber       : { type: String, index: true },
  ownerUserId        : { type: ObjectId, index: true },
  createdByUserId    : { type: ObjectId, index: true },
});
mongoose.model('Contact', Contact);


var User = new Schema({
  login         : { type: String, unique: true, lowercase: true },
  password      : { type: String },
  email         : { type: String, lowercase:true },
});
mongoose.model('User', User);


// *************** 
// MESSAGES
// ***************

var DeliveryLog = new Schema({
  message       : String,
  teaserCalc    : String,
  addedOn       : Date,
});
//
var Message = new Schema({
  workspaceId       : { type: ObjectId, index: true },
  subsystem         : { type: String, enum: ['sms', 'email'] },
  subject           : String,
  body              : String,
  sentByUserId      : ObjectId,
  SentOn            : { type: Date, index: true },
  isDelivered       : { type: Boolean, index: true },
  deliveryLog       : [DeliveryLog],
});
mongoose.model('Message',Message);
  

var MessageTemplate = new Schema({
  workspaceId       : { type: ObjectId, index: true },
  subsystem         : { type: String, enum: ['sms', 'email'], index: true },
  name              : String,
  subject           : String,
  body              : String,
});
mongoose.model('MessageTemplate',MessageTemplate);
