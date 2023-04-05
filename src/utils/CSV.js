export function fromArray(array) {
    var rows = [];

    var fields = [];
    for (var key in array[0]) {
        if (key[0] !== '$') {
            fields.push(escape(key));
        }
    }
    rows.push(
        fields
            .map(function(f) {
                return '"' + f + '"';
            })
            .join(',')
    );

    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        var row = [];
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            row.push('"' + escape(item[field]) + '"');
        }
        rows.push(row.join(','));
    }

    return rows.join('\n');
}

export function download(array, filename) {
    var data = fromArray(array);
    var a = document.createElement('a');
    a.href = 'data:attachment/csv;charset=utf-8,' + encodeURIComponent(data);
    a.target = '_blank';
    a.download = filename + '.csv';
    document.body.appendChild(a);
    a.click();
}

export function escape(value) {
    return value ? ('' + value).replace('"', '"') : '<null>';
}
