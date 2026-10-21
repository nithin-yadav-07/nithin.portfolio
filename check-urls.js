const fs = require('fs');
const path = require('path');

let githubUrls = new Set();
let linkedinUrls = new Set();

function checkUrls(dirOrFile) {
  const stat = fs.statSync(dirOrFile);
  if (stat.isDirectory()) {
    for (const f of fs.readdirSync(dirOrFile)) {
      checkUrls(path.join(dirOrFile, f));
    }
  } else {
    const content = fs.readFileSync(dirOrFile, 'utf8');
    const ghMatches = content.match(/https?:\/\/(?:www\.)?github\.com\/[^\s"'<>)]+/g) || [];
    ghMatches.forEach(u => githubUrls.add(u));
    const liMatches = content.match(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s"'<>)]+/g) || [];
    liMatches.forEach(u => linkedinUrls.add(u));
  }
}

checkUrls('src');
checkUrls('README.md');

console.log('GitHub URLs found:', Array.from(githubUrls));
console.log('LinkedIn URLs found:', Array.from(linkedinUrls));
