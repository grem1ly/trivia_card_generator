/* File Retriever */

function parse(file) {
  return new Promise((resolve, reject) => {
    let content = '';
    const reader = new FileReader();
    reader.onloadend = function(e) {
      content = e.target.result;
      const result = content.split(/\r\n|\n/);
      resolve(result);
    };
    reader.onerror = function(e) {
      reject(e);
    };
    reader.readAsText(file);
  });
}

function read_trivia_content2(file) {
  file.shift();
  let content = file.map(item => item.split("\t"));
  get_questions(content);
}
