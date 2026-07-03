# Fix canonical URLs to match exact file paths in lowercase with hyphens
$locationsDir = "d:\sufyan\SolvevareSite-HTML\SolvevareSite-HTML\locations"
$count = 0

Get-ChildItem -Path $locationsDir -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name  # e.g., "wyoming-in-ranchester.html"
    $relativePath = "/locations/$fileName"  # e.g., "/locations/wyoming-in-ranchester.html"
    
    # The correct canonical URL
    $correctCanonical = "https://www.solvevare.com$relativePath"
    
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Replace any canonical href pattern with the correct one
        # Pattern matches: rel="canonical" href="[anything]"
        $newContent = $content -replace 'rel="canonical"\s+href="https://[^"]+/locations/[^"]*"', "rel=`"canonical`" href=`"$correctCanonical`""
        
        if ($content -ne $newContent) {
            Set-Content -Path $filePath -Value $newContent -Encoding UTF8
            Write-Host "✅ Fixed: $fileName"
            $count++
        }
    } catch {
        Write-Host "❌ Error in $fileName : $_"
    }
}

Write-Host ""
Write-Host "✅ Total files fixed: $count"
