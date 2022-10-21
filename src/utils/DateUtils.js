const DateUtils = {
    parseDateToString({ date, split, format = "br" }) {
        const day = String(date.getDate() + 1).padStart(2, 0);
        const month = String(date.getMonth() + 1).padStart(2, 0);
        const year = date.getFullYear();

        let formatDate = "";
        if (format === "br") formatDate = `${day}/${month}/${year}`;
        else formatDate = `${year}-${month}-${day}`

        if (split) formatDate = formatDate.replaceAll("/", split);
        return formatDate;
    },
}

export default DateUtils;