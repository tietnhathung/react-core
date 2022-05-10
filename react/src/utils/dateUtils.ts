const dateUtils = {
    datetimeFormat: (datetime?: string): string => {
        if (datetime) {
            return new Date(datetime).toLocaleString();
        }
        return ""
    },
    timeFormat: (time?: string): string => {
        if (!time) {
            return ""
        }
        return new Date(time).toTimeString();
    },
    dateFormat: (date?: string): string => {
        if (!date) {
            return ""
        }
        return new Date(date).toDateString();
    }
}

export default dateUtils;
