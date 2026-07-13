#!/usr/bin/env powershell
# Remove corrupted <span>€º</span> from all HTML files

$rootDir = "d:\sufyan\SolvevareSite-HTML\SolvevareSite-HTML"
$files = Get-ChildItem -Path $rootDir -Filter "*.html" -File -Recurse

$count = 0
$totalRemoved = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Count matches before
    $matchesBefore = ([regex]::Matches($content, '<span>€º</span>') | Measure-Object).Count
    
    if ($matchesBefore -gt 0) {
        # Remove the corrupted span
        $newContent = $content -replace '<span>€º</span>', ''
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        $count++
        $totalRemoved += $matchesBefore
        Write-Host "Fixed: $($file.FullName -replace [regex]::Escape($rootDir), '') [$matchesBefore removed]"
    }
}

Write-Host ""
Write-Host "✅ Total files fixed: $count"
Write-Host "✅ Total corrupted spans removed: $totalRemoved"
Write-Host "Done!"
