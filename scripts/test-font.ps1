Add-Type -AssemblyName System.Drawing
$f = [System.Drawing.Font]::new("Times New Roman", [float]18, [System.Drawing.FontStyle]::Bold)
Write-Host "Font Loaded Successfully:" $f.Name
$f.Dispose()
