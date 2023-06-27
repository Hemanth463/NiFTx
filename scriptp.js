// Responsive sidebar
function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
  }
  
  // Responsive table sorting
  var tableHeaders = document.querySelectorAll('.table th');
  for (var i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].addEventListener('click', function() {
      var index = Array.prototype.indexOf.call(tableHeaders, this);
      sortTable(index);
    });
  }
  
  function sortTable(column) {
    var table = document.querySelector('.table');
    var tbody = table.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');
    var newRows = Array.from(rows);
    newRows.sort(function(row1, row2) {
      var cell1 = row1.querySelectorAll('td')[column];
      var cell2 = row2.querySelectorAll('td')[column];
      var value1 = cell1.textContent.trim();
      var value2 = cell2.textContent.trim();
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    });
    tbody.innerHTML = '';
    for (var i = 0; i < newRows.length; i++) {
      tbody.appendChild(newRows[i]);
    }
  }
  
  