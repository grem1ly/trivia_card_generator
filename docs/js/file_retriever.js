/* File Retriever */

// Create XMLHttpRequest request in order to read trivia card tsv files
function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function() {
      if(req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}

// Extract trivia card information in the desired format (i.e. split along tabs)
async function read_trivia_content(filename) {
  var rawdata = await get(filename);
  var lines = rawdata.split("\n");
  lines.shift();
  let content = lines.map(item => item.replaceAll("\r", "").split("\t"));
  return content;
}
