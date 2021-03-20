

export function save(paramId, flowData) {
    axios.post('/flow/store', {
        id:paramId,
        flowData:flowData,
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    })
}

// Comiple the code
export function compile(paramId) {
    axios.get('/flow/compile/'+paramId, {
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    })
}
