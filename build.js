const fs = require('fs');
const path = require('path');

// =========================================================================
// CONFIGURATION
// =========================================================================
const DIST_DIR = path.join(__dirname, 'dist');
const ASSETS_DIR = path.join(__dirname, 'assets');
const DOWNLOADS_DIR = path.join(__dirname, 'downloads');

function createDirs() {
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(DIST_DIR, { recursive: true });
    fs.mkdirSync(path.join(DIST_DIR, 'assets'), { recursive: true });
    fs.mkdirSync(path.join(DIST_DIR, 'downloads'), { recursive: true });
}

// =========================================================================
// OBFUSCATOR LOGIC (BALANCED)
// =========================================================================

function minifyHtml(html) {
    return html
        .replace(/<!--[\s\S]*?-->/g, '') // remove comments
        .replace(/\r?\n|\r/g, ' ')      // remove newlines
        .replace(/\s{2,}/g, ' ')         // collapse whitespace
        .replace(/>\s+</g, '><')         // remove space between tags
        .trim();
}

function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\r?\n|\r/g, '')         // remove newlines
        .replace(/\s+/g, ' ')             // collapse whitespace
        .replace(/\s*([{};:,])\s*/g, '$1') // remove space around separators
        .replace(/;}/g, '}')              // remove last semicolon
        .trim();
}

/**
 * Balanced JS Obfuscation: Minification + String Hiding
 */
function protectJs(js) {
    // 1. Remove comments
    js = js.replace(/\/\/.*/g, '');
    js = js.replace(/\/\*[\s\S]*?\*\//g, '');

    // 2. Simple String Hiding: Base64 encode all strings in single/double quotes
    js = js.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)\1/g, (match, quote, s) => {
        if (s.length < 3) return match; // Don't encode short strings
        const encoded = Buffer.from(s).toString('base64');
        return `atob('${encoded}')`;
    });

    // 3. Collapse whitespace
    js = js.replace(/\r?\n\s*/g, '\n').replace(/[ \t]{2,}/g, ' ');

    return js.trim();
}

// =========================================================================
// BUILD RUNNER
// =========================================================================

function build() {
    console.log('--- AOTSUKI LABS: SECURE BUILD START (Node.js) ---');
    createDirs();

    // 1. index.html
    const htmlPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(htmlPath)) {
        console.log('✓ Obfuscating index.html...');
        const html = fs.readFileSync(htmlPath, 'utf8');
        fs.writeFileSync(path.join(DIST_DIR, 'index.html'), minifyHtml(html));
    }

    // 2. style.css
    const cssPath = path.join(__dirname, 'style.css');
    if (fs.existsSync(cssPath)) {
        console.log('✓ Obfuscating style.css...');
        const css = fs.readFileSync(cssPath, 'utf8');
        fs.writeFileSync(path.join(DIST_DIR, 'style.css'), minifyCss(css));
    }

    // 3. script.js
    const jsPath = path.join(__dirname, 'script.js');
    if (fs.existsSync(jsPath)) {
        console.log('✓ Obfuscating script.js (String Protection Level: Balanced)...');
        const js = fs.readFileSync(jsPath, 'utf8');
        fs.writeFileSync(path.join(DIST_DIR, 'script.js'), protectJs(js));
    }

    // 4. Assets
    if (fs.existsSync(ASSETS_DIR)) {
        console.log(`✓ Copying ${ASSETS_DIR}/...`);
        const assets = fs.readdirSync(ASSETS_DIR);
        for (const file of assets) {
            fs.copyFileSync(path.join(ASSETS_DIR, file), path.join(DIST_DIR, 'assets', file));
        }
    }

    // 5. Downloads
    if (fs.existsSync(DOWNLOADS_DIR)) {
        console.log(`✓ Copying ${DOWNLOADS_DIR}/...`);
        const dlFiles = fs.readdirSync(DOWNLOADS_DIR);
        for (const file of dlFiles) {
            fs.copyFileSync(path.join(DOWNLOADS_DIR, file), path.join(DIST_DIR, 'downloads', file));
        }
    }

    console.log('\n[SUCCESS] Production build complete in /dist folder!');
    console.log('This version is now protected against simple inspection and ready for deployment.');
}

build();
