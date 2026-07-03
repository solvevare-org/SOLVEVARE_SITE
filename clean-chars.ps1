#!/usr/bin/env powershell
# Remove corrupted characters from all HTML files

$rootDir = "d:\sufyan\SolvevareSite-HTML\SolvevareSite-HTML"
$files = Get-ChildItem -Path $rootDir -Filter "*.html" -File -Recurse

$count = 0
$totalRemoved = 0

# The corrupted character pattern - using hex representation
$corruptedPattern = [char]0xE2 + [char]0x80 + [char]0xBA  # UTF-8 for â€º

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if file contains the corrupted pattern
    if ($content.Contains("<span>" + $corruptedPattern + "</span>")) {
        $newContent = $content -replace ([regex]::Escape("<span>" + $corruptedPattern + "</span>")), ''
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        $count++
        Write-Host "Fixed: $($file.FullName -replace [regex]::Escape($rootDir), '')"
    }
}

Write-Host ""
Write-Host "✅ Total files cleaned: $count"
