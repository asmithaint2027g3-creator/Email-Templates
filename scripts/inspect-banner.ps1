Add-Type -AssemblyName System.Drawing

$bannerPath = "C:\Users\DELL\.gemini\antigravity-ide\brain\d864c269-80ec-449a-9756-bb5dac34e0e5\.user_uploaded\media_1792753813609.png"
$logoPath = "d:\Email-Templates\images\trustgrid-logo.png"

$banner = [System.Drawing.Bitmap]::FromFile($bannerPath)
$logo = [System.Drawing.Bitmap]::FromFile($logoPath)

Write-Host "Banner Width: $($banner.Width), Height: $($banner.Height)"
Write-Host "Logo Width: $($logo.Width), Height: $($logo.Height)"

# Sample background around top-left (e.g. x=30, y=25 to y=65)
$tl_bg = $banner.GetPixel(30, 45)
Write-Host "Top-Left BG Color: R=$($tl_bg.R), G=$($tl_bg.G), B=$($tl_bg.B)"

# Sample background around bottom-right (e.g. x=620, y=385)
$br_bg = $banner.GetPixel(620, 390)
Write-Host "Bottom-Right BG Color: R=$($br_bg.R), G=$($br_bg.G), B=$($br_bg.B)"

$banner.Dispose()
$logo.Dispose()
