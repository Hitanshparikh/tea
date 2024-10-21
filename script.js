document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    
    fetch('upload.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json()).then(data => {
        if (data.success) {
            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');
            const filterOptions = document.getElementById('filterOptions');

            tableHead.innerHTML = '';
            tableBody.innerHTML = '';
            filterOptions.innerHTML = '';

            // Display the first row as filter options
            const headers = data.headers;
            const rows = data.rows;

            let filterRow = '<tr>';
            headers.forEach((header, index) => {
                filterRow += `<th>${header}</th>`;
                filterOptions.innerHTML += `
                    <label>
                        <input type="checkbox" class="columnCheckbox" data-index="${index}" checked>
                        ${header}
                    </label><br>
                `;
            });
            filterRow += '</tr>';
            tableHead.innerHTML = filterRow;

            // Group rows by name and display
            const groupedRows = groupByName(rows);
            groupedRows.forEach(group => {
                group.forEach(row => {
                    const tr = document.createElement('tr');
                    row.forEach(cell => {
                        const td = document.createElement('td');
                        td.textContent = cell;
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                });
            });

            document.getElementById('filterSection').style.display = 'block';
        }
    });
});

document.getElementById('applyFilter').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.columnCheckbox');
    const columnsToShow = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.getAttribute('data-index')));
    
    const rows = document.querySelectorAll('#excelTable tr');
    rows.forEach(row => {
        row.querySelectorAll('td, th').forEach((cell, index) => {
            if (columnsToShow.includes(index)) {
                cell.style.display = '';
            } else {
                cell.style.display = 'none';
            }
        });
    });
});

// Function to group rows by the name in the first column
function groupByName(rows) {
    const grouped = {};
    rows.forEach(row => {
        const name = row[0]; // Assuming name is in the first column
        if (!grouped[name]) grouped[name] = [];
        grouped[name].push(row);
    });
    return Object.values(grouped);
}

// Handle send email and preview email buttons
document.getElementById('sendEmail').addEventListener('click', function() {
    alert('Send Email functionality to be implemented');
});

document.getElementById('previewEmail').addEventListener('click', function() {
    alert('Preview Email functionality to be implemented');
});
