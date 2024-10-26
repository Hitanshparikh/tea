document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('upload.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json()).then(data => {
            if (data.success) {
                const tableContainer = document.querySelector('.table-container');
                tableContainer.innerHTML = ''; // Clear previous tables

                const headers = data.headers;
                const rows = data.rows;

                // Display filter options based on headers
                const filterOptions = document.getElementById('filterOptions');
                filterOptions.innerHTML = ''; // Clear previous filter options

                headers.forEach((header, index) => {
                    const label = document.createElement('label');
                    label.classList.add('filter-checkbox');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = index;
                    checkbox.checked = true; // Checked by default

                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(header));
                    filterOptions.appendChild(label);
                });

                console.log("Raw rows from the server: ", rows); // Debug: Check raw rows

                // Grouping rows by the 2nd column (index 1)
                const groupedRows = groupRowsByColumn(rows, 1); 
                console.log("Grouped rows by the 4th column: ", groupedRows); // Debug: Check grouped rows

                Object.keys(groupedRows).forEach(garden => {
                    const gardenHeader = document.createElement('h3');
                    gardenHeader.textContent = `Garden: ${garden}`;
                    tableContainer.appendChild(gardenHeader);

                    const table = createTable(headers, groupedRows[garden]);
                    tableContainer.appendChild(table);
                });

                document.getElementById('filterSection').style.display = 'block';
                adjustTableColumns();
            } else {
                console.error("Data fetch failed: ", data.error);
            }
        }).catch(err => {
            console.error("Error in fetch: ", err);
        });
    });

    document.getElementById('applyFilter').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('#filterOptions input[type="checkbox"]');
        const selectedColumns = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedColumns.push(index);
            }
        });

        // Rebuild tables using selected columns
        const tables = document.querySelectorAll('.table-container table');
        tables.forEach(table => {
            const rows = Array.from(table.querySelectorAll('tr'));

            rows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('th, td'));
                cells.forEach((cell, index) => {
                    cell.style.display = selectedColumns.includes(index) ? '' : 'none';
                });
            });
        });
    });

    function createTable(headers, rows) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table headers
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create table body with rows
        rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }

    function groupRowsByColumn(rows, columnIndex) {
        const grouped = {};
        rows.forEach(row => {
            const key = row[columnIndex]; // 4th column (index 3)
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(row);
        });
        return grouped;
    }

    function adjustTableColumns() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const headerCells = table.querySelectorAll('th');

            // Reset any previously set widths
            headerCells.forEach(cell => cell.style.width = '');

            // Calculate and set new widths
            const tableWidth = table.offsetWidth;
            const columnCount = headerCells.length;
            const columnWidth = tableWidth / columnCount;

            headerCells.forEach(cell => {
                cell.style.width = `${columnWidth}px`;
            });
        });
    }
});
