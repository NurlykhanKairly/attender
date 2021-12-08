function getYMD(d) {  // YYYY-MM-DD format
    let day = d.getDate().toString();
    if(day.length !== 2) day = '0' + day;
    let month = (d.getMonth() + 1).toString();
    if(month.length !== 2) month = '0' + month;
    return `${d.getFullYear()}-${month}-${day}`;
}

export { getYMD };