console.log('Client side javscript file is loaded');

fetch('http://puzzle.mead.io/puzzle')
.then((response) => {
    response.json()
    .then(data => {
        console.log(data);
    })
})

fetch("http://localhost:3000/weather?address=boston")
.then(response => {
    response.json()
    .then(data  => console.log(data));
})