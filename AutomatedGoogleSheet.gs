function onEdit(e) {
  Logger.log(JSON.stringify(e));
  var sheet = e.source.getActiveSheet();
  var updatecell =  sheet.getActiveCell();

  var statusC = 6;
  var startdateC = 9;
  var enddateC = 10;
  var deliverydateC = 11;

  if ( updatecell.getColumn() == statusC) {
    var status = updatecell.getValue();
    var startdatecell = sheet.getRange(updatecell.getRow(), startdateC);
    var enddatedcell = sheet.getRange(updatecell.getRow(), enddateC);
    var deliverydatecell = sheet.getRange(updatecell.getRow(),deliverydateC);

    if ( status == "In progress" ) {
      startdatecell.setValue(new Date());
    }
    if ( status == "Completed") {
      enddatedcell.setValue(new Date());
    }
    if ( status == "Delivered" ) {
      deliverydatecell.setValue(new Date());

    }
  }
}
