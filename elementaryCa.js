// columns and rows for grid
const columns = 10;
const rows = 8;

//code
var columnCA = [];
var rowData = [];
var configurationData = [];
for (let i = 0; i < columns; i++) {
  columnCA.push({
    headerName: 'c' + i.toString(),
    field: i.toString(),
    width: 40
  });
  configurationData[i.toString()] = "0";
}
rowData = [configurationData];


// let the grid know which columns and what data to use
var gridOptions = {
  onGridReady(params) {
    this.gridApi = params.api
  },
  columnDefs: columnCA,
  rowData: rowData,
  onCellClicked: function(event) {
    var colindex = event.column.getId();
    var rowindex = event.rowIndex;
    if (rowindex == 0) {
      row = this.api.getDisplayedRowAtIndex(rowindex);
      if (this.api.getValue(colindex.toString(), row) == '0') {
        row.setDataValue(colindex.toString(), '1');
      } else {
        row.setDataValue(colindex.toString(), '0');
      }
    };
  }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#caGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});