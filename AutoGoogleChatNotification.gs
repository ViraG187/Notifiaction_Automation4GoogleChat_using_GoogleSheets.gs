function deliverydayemail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log(sheet.getCurrentCell());
  var datarange = sheet.getDataRange();
  var data = datarange.getValues();
  var today = new Date();
  today.setHours(0,0,0,0);

  var messages = [];

  for (var i = 1; i < data.length ; i++) {
    Logger.log("len: " + data.length);
    var deliverydate = data[i][10];
    Logger.log(i);
    var task = data[i][2];
    var owner = data[i][1];

    // validate value is date
    if(deliverydate instanceof Date){
      deliverydate.setHours(0,0,0,0); // formating to match

      if(deliverydate.getTime() == today.getTime()){
        Logger.log(deliverydate);
        messages.push('Reminder: Today is the delivery date for task "' + task + " /" + owner +'", due on ' + deliverydate.toDateString() + '.');
      }
    }
  }  
  if (messages.length > 0){
    send_notification_chat(messages);
  }
}

function send_notification_chat(messages){
  var webhook = "https://chat.googleapis.com/v1/spaces/AAAAi0kCz8k/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=lJ-ZR-5jdInyTPmdT0Q8Q68hqaXK-pliEo4AntTw10g" ;

  var message = { 'text' : messages.join('\n\n')};

  var option = { 'method' : 'post', 'contentType' : 'application/json', 'payload' : JSON.stringify(message), 'muteHttpExpectations' : true};

  try {
    var response =  UrlFetchApp.fetch(webhook,option);
    Logger.log(response.getContentText());
  } catch(e) {
    Logger.log(" Error sending notify :"+ e.message)
    if ( e.message.includeds('429')){
      Logger.log("hitting limit start delay");
      Utilities.sleep(60000);
      send_notification_chat(messages);
    }
  }
} 
