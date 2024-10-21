document.getElementById('toggleFilter').addEventListener('click', function() {
    const table = document.getElementById('excelTable');
    const headers = table.querySelectorAll('th');
    const filterDiv = document.getElementById('filterOptions');
    
    filterDiv.innerHTML = '';
    
    headers.forEach((header, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.dataset.column = index;
        checkbox.addEventListener('change', function() {
            toggleColumn(this.dataset.column);
        });
        filterDiv.appendChild(checkbox);
        filterDiv.appendChild(document.createTextNode(header.innerText));
        filterDiv.appendChild(document.createElement('br'));
    });

    filterDiv.style.display = filterDiv.style.display === 'none' ? 'block' : 'none';
});

function toggleColumn(columnIndex) {
    const table = document.getElementById('excelTable');
    const rows = table.rows;
    
    for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].cells[columnIndex];
        cell.style.display = cell.style.display === 'none' ? '' : 'none';
    }
}

function previewEmail() {
    const table = document.getElementById('excelTable');
    const data = [];
    
    for (let i = 1; i < table.rows.length; i++) {
        const row = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].style.display !== 'none') {
                row.push(table.rows[i].cells[j].innerText);
            }
        }
        data.push(row);
    }
    
    document.getElementById('tableData').value = JSON.stringify(data);
    document.getElementById('sendEmailForm').style.display = 'block';
}
