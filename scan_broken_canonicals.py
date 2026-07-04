#!/usr/bin/env python3
"""
Comprehensive scan for all files that still have incorrect canonicals
"""

import os
from pathlib import Path

def scan_all_files():
    root_path = Path(r"d:\sufyan\SolvevareSite-HTML\SolvevareSite-HTML")
    locations_dir = root_path / "locations"
    
    broken_files = {
        'old_domain': [],  # Files with https://solvevare.com (no www)
        'bad_path': [],    # Files with capitalized/spaced paths
        'both': []         # Both issues
    }
    
    print("\n" + "="*70)
    print("SCANNING ALL LOCATION FILES FOR INCORRECT CANONICALS")
    print("="*70 + "\n")
    
    for html_file in sorted(locations_dir.glob("*.html")):
        filename = html_file.name
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_old_domain = 'https://solvevare.com' in content
        has_bad_path = f"locations/{filename.upper()}" in content or " in " in content.replace("serving ", "")
        
        # More precise check for capitalized paths
        has_capitalized_path = False
        if '<meta property="og:url"' in content or '<link rel="canonical"' in content:
            # Check for patterns like "North Carolina-in-Pikeville"
            lines = content.split('\n')
            for line in lines:
                if ('/locations/' in line) and (line[line.find('/locations/')+11] in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
                    has_capitalized_path = True
                    break
        
        if has_old_domain and has_capitalized_path:
            broken_files['both'].append(filename)
        elif has_old_domain:
            broken_files['old_domain'].append(filename)
        elif has_capitalized_path:
            broken_files['bad_path'].append(filename)
    
    print(f"Files with old domain (https://solvevare.com): {len(broken_files['old_domain'])}")
    print(f"Files with capitalized/spaced paths: {len(broken_files['bad_path'])}")
    print(f"Files with BOTH issues: {len(broken_files['both'])}")
    print(f"\nTOTAL BROKEN FILES: {sum(len(v) for v in broken_files.values())}")
    
    if broken_files['both']:
        print(f"\nFirst 20 files with BOTH issues:")
        for fname in broken_files['both'][:20]:
            print(f"  - {fname}")
    
    if broken_files['old_domain']:
        print(f"\nFirst 20 files with old domain only:")
        for fname in broken_files['old_domain'][:20]:
            print(f"  - {fname}")
    
    if broken_files['bad_path']:
        print(f"\nFirst 20 files with bad paths only:")
        for fname in broken_files['bad_path'][:20]:
            print(f"  - {fname}")
    
    # Write detailed report to file
    with open(root_path / "BROKEN_CANONICALS_REPORT.txt", 'w') as f:
        f.write("BROKEN CANONICALS REPORT\n")
        f.write("="*70 + "\n\n")
        f.write(f"Files with old domain: {len(broken_files['old_domain'])}\n")
        f.write(f"Files with bad paths: {len(broken_files['bad_path'])}\n")
        f.write(f"Files with BOTH: {len(broken_files['both'])}\n\n")
        
        if broken_files['both']:
            f.write("BOTH ISSUES:\n")
            for fname in broken_files['both']:
                f.write(f"  {fname}\n")
            f.write("\n")
        
        if broken_files['old_domain']:
            f.write("OLD DOMAIN ONLY:\n")
            for fname in broken_files['old_domain']:
                f.write(f"  {fname}\n")
            f.write("\n")
        
        if broken_files['bad_path']:
            f.write("BAD PATH ONLY:\n")
            for fname in broken_files['bad_path']:
                f.write(f"  {fname}\n")
    
    print(f"\n✓ Detailed report saved to: BROKEN_CANONICALS_REPORT.txt")

if __name__ == "__main__":
    scan_all_files()
