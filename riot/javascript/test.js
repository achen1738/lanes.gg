var https = require("https");

var url = "https://jsonmock.hackerrank.com/api/countries/search?name=in&page=1";

async function hacker(s, p) {
  const uri = "https://jsonmock.hackerrank.com/api/countries/search?name=";
  const prom = new Promise(function(resolve, reject) {
    https
      .get(uri + s, res => {
        let data = "";

        // A chunk of data has been recieved.
        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", e => {
        reject(e);
      });
  });
  const res = await prom;
  //   console.log(res);
  const numPages = res.total_pages;
  var counter = 0;
  if (numPages < 1) {
    var promises = [];
    for (let i = 1; i < numPages; i++) {
      promises.push(
        new Promise(function(resolve, reject) {
          https
            .get(uri + s + "&page=" + i.toString(), res => {
              let data = "";

              // A chunk of data has been recieved.
              res.on("data", chunk => {
                data += chunk;
              });

              res.on("end", () => {
                resolve(JSON.parse(data));
              });
            })
            .on("error", e => {
              reject(e);
            });
        })
      );
    }
    const promResps = await Promise.all(promises);

    promResps.forEach(prom => {
      prom.data.forEach(country => {
        counter += country.population > p ? 1 : 0;
      });
    });
    console.log(counter);
  } else {
    res.data.forEach(country => {
      counter += country.population > p ? 1 : 0;
    });
    console.log(counter);
  }
}

hacker("un", 109000);
