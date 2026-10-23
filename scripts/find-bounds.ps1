Add-Type -AssemblyName System.Drawing

$bannerPath = "C:\Users\DELL\.gemini\antigravity-ide\brain\d864c269-80ec-449a-9756-bb5dac34e0e5\.user_uploaded\media_1792753813609.png"
$banner = [System.Drawing.Bitmap]::FromFile($bannerPath)

# Top left region: x from 20 to 500, y from 10 to 80
$minX = 1000; $maxX = 0; $minY = 1000; $maxY = 0
for ($y = 15; $y -lt 80; $y++) {
    for ($x = 20; $x -lt 520; $x++) {
        $c = $banner.GetPixel($x, $y)
        # dark pixel check (R < 150 or B > 150 and R < 100)
        if ($c.R -lt 180 -and $c.G -lt 180) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Top-Left Logo Text Bounds: X=[$minX, $maxX], Y=[$minY, $maxY]"

# Bottom right region: x from 600 to 740, y from 360 to 415
$minX2 = 1000; $maxX2 = 0; $minY2 = 1000; $maxY2 = 0
for ($y = 360; $y -lt 415; $y++) {
    for ($x = 600; $x -lt 740; $x++) {
        $c = $banner.GetPixel($x, $y)
        if ($c.R -lt 180 -and $c.G -lt 180) {
            if ($x -lt $minX2) { $minX2 = $x }
            if ($x -gt $maxX2) { $maxX2 = $x }
            if ($y -lt $minY2) { $minY2 = $y }
            if ($y -gt $maxY2) { $maxY2 = $y }
        }
    }
}
Write-Host "Bottom-Right Logo Text Bounds: X=[$minX2, $maxX2], Y=[$minY2, $maxY2]"

$banner.Dispose()
