import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function TableGen({ rows, columns, height, width }) {
  return (
    <div style={{ height, width }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default TableGen;
