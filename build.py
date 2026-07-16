import os
import shutil
import re
import base64
import random
import string

# =========================================================================
# CONFIGURATION
# =========================================================================
DIST_DIR = 'dist'
ASSETS_DIR = 'assets'
DOWNLOADS_DIR = 'downloads'
MAP_FILE = os.path.join(DIST_DIR, 'build_map.txt')

# List of common names to MANGLE (feel free to add more)
# We avoid mangling standard browser APIs (document, window, etc.)
MANGLE_TARGETS = [
    'initCanvas', 'initRouter', 'initHamburger', 'initAuthToggle', 
    'initGoogleLogin', 'navigateTo', 'closeMobileNav', 'handleCredentialResponse',
    'PAGE_MAP', 'currentPage', 'scrollObserver', 'particles', 'draw', 
    'scanY', 'resize', 'W', 'H', 'ctx', 'canvas', 'W', 'H'
]

def create_dirs():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)
    os.makedirs(os.path.join(DIST_DIR, ASSETS_DIR), exist_ok=True)
    os.makedirs(os.path.join(DIST_DIR, DOWNLOADS_DIR), exist_ok=True)

# =========================================================================
# HIGH-SECURITY OBFUSCATOR LOGIC
# =========================================================================

def generate_mangle_name(original):
    """Generates a random hex-like string for mangling"""
    return '_0x' + ''.join(random.choices(string.hexdigits.lower(), k=6))

def minify_html(html):
    """Deep minification for HTML"""
    html = re.sub(r'<!--[\s\S]*?-->', '', html)
    html = html.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    html = re.sub(r'\s{2,}', ' ', html)
    html = re.sub(r'>\s+<', '><', html)
    return html.strip()

def minify_css(css):
    """Deep minification for CSS"""
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    css = css.replace('\n', '').replace('\r', '').replace('\t', '')
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};:,])\s*', r'\1', css)
    return css.strip()

def shred_string(match):
    """Advanced anti-search: Shreds a string into decoded pieces.
       Skips non-ASCII strings to prevent encoding errors (e.g. u/2014)."""
    s = match.group(1)
    if len(s) < 3: return match.group(0) # Don't shred very short strings
    
    # Check if the string has non-ASCII characters (e.g. em-dash)
    if any(ord(c) > 127 for c in s):
        return match.group(0) # Skip shredding for Unicode-heavy strings
    
    # Base64 then Shred
    encoded = base64.b64encode(s.encode()).decode()
    # Split the base64 string into 2-3 pieces
    mid = len(encoded) // 2
    part1, part2 = encoded[:mid], encoded[mid:]
    
    # Create the runtime reassembly
    return f"atob('{part1}' + '{part2}')"

def obfuscate_js(js, map_callback):
    """High-Security JS Obfuscation"""
    # 1. Strip comments
    js = re.sub(r'//.*', '', js)
    js = re.sub(r'/\*[\s\S]*?\*/', '', js)
    
    # 2. String Shredding
    js = re.sub(r'"((?:[^"\\]|\\.)*)"', shred_string, js)
    js = re.sub(r"'((?:[^'\\]|\\.)*)'", shred_string, js)
    
    # 3. Code Mangling (Functions & Variables)
    mangle_map = {}
    for target in MANGLE_TARGETS:
        new_name = generate_mangle_name(target)
        mangle_map[target] = new_name
        # Match word boundaries to avoid partial replacement
        js = re.sub(r'\b' + target + r'\b', new_name, js)
    
    # 4. Save the map for debugging
    map_callback(mangle_map)
    
    # 5. Clean whitespace (Keep some newlines for safety but collapse spaces)
    js = re.sub(r'\n\s*', '\n', js)
    js = re.sub(r'[ \t]+', ' ', js)
    
    return js.strip()

# =========================================================================
# BUILD RUNNER
# =========================================================================

def build():
    print("--- [AOTSUKI LABS] HIGH-SECURITY BUILD SYSTEM ---")
    create_dirs()
    
    mangle_debug_info = ""

    def save_map(m_map):
        nonlocal mangle_debug_info
        mangle_debug_info = "\n".join([f"{v} -> {k}" for k, v in m_map.items()])

    # index.html
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        print("DONE: Obfuscating index.html...")
        with open(os.path.join(DIST_DIR, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(minify_html(content))

    # style.css
    if os.path.exists('style.css'):
        with open('style.css', 'r', encoding='utf-8') as f:
            content = f.read()
        print("DONE: Obfuscating style.css...")
        with open(os.path.join(DIST_DIR, 'style.css'), 'w', encoding='utf-8') as f:
            f.write(minify_css(content))

    # script.js
    if os.path.exists('script.js'):
        with open('script.js', 'r', encoding='utf-8') as f:
            content = f.read()
        print("DONE: [SHREDDING] script.js (Protection: HIGH)...")
        protected_js = obfuscate_js(content, save_map)
        with open(os.path.join(DIST_DIR, 'script.js'), 'w', encoding='utf-8') as f:
            f.write(protected_js)

    # Assets & Downloads
    for d in [ASSETS_DIR, DOWNLOADS_DIR]:
        if os.path.exists(d):
            print(f"DONE: Copying {d}/...")
            for item in os.listdir(d):
                src = os.path.join(d, item)
                dst = os.path.join(DIST_DIR, d, item)
                if os.path.isfile(src): shutil.copy2(src, dst)

    # Final Debug Map
    with open(MAP_FILE, 'w', encoding='utf-8') as f:
        f.write("AOTSUKI LABS - OBFUSCATION KEY (DO NOT UPLOAD)\n")
        f.write("=============================================\n")
        f.write(mangle_debug_info)
    
    print("\n[SUCCESS] Production build complete!")
    print(f"DEBUG KEY: See {MAP_FILE} to decode the scrambled code.")

if __name__ == "__main__":
    build()

