const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\sufyan\\SolvevareSite-HTML\\SolvevareSite-HTML';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.html')) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Remove the corrupted <span>â€º</span>
                const originalLength = content.length;
                content = content.replace(/<span>â€º<\/span>/g, '');
                
                if (content.length !== originalLength) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Fixed: ${filePath.replace(rootDir, '')}`);
                }
            } catch (err) {
                console.error(`Error processing ${filePath}: ${err.message}`);
            }
        }
    });
}

console.log('Starting cleanup...\n');
walkDir(rootDir);
console.log('\n✅ Done! All corrupted characters removed.');
