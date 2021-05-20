function updataDatabase(tableName, updateColumn, selectRow, rowId ){

    idx = 1;
    const colums = [];
  
    for(let col in updateColumn){
      colums.push(`${col} = $${idx}`)
      idx++
    }
  
    const updateCol = colums.join(', ')
    const query = 
      `UPDATE ${tableName} 
      SET ${updateCol} 
      WHERE ${selectRow} = $${idx}
      RETURNING *`
  
    const values = Object.values(updateColumn)
    values.push(rowId)
    return {query, values}
  }

module.exports = updataDatabase;