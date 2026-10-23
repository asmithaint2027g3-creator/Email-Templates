Add-Type -AssemblyName System.Drawing

$bannerPath = "C:\Users\DELL\.gemini\antigravity-ide\brain\d864c269-80ec-449a-9756-bb5dac34e0e5\.user_uploaded\media_1792753813609.png"
$logoPath = "d:\Email-Templates\images\trustgrid-logo.png"
$outputPath = "d:\Email-Templates\images\trustgrid-promo-footer.png"
$outputJpg = "d:\Email-Templates\images\trustgrid-promo-footer.jpg"

$banner = [System.Drawing.Bitmap]::FromFile($bannerPath)
$logo = [System.Drawing.Bitmap]::FromFile($logoPath)

$newBmp = [System.Drawing.Bitmap]::new($banner.Width, $banner.Height)
$g = [System.Drawing.Graphics]::FromImage($newBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# 1. Draw base banner
$g.DrawImage($banner, 0, 0, $banner.Width, $banner.Height)

# 2. Cover top-left logo area (X: 38 to 240, Y: 30 to 70) with background color
# Background color in top-left is R:241, G:249, B:252
$brushTL = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 241, 249, 252))
$g.FillRectangle($brushTL, 38, 30, 205, 42)

# Draw authentic logo at top-left:
# Target height: 28px -> width: 28 * (210/45) = 131px
$targetH1 = 28
$targetW1 = [int]($targetH1 * 210 / 45)
$g.DrawImage($logo, 42, 36, $targetW1, $targetH1)

# 3. Cover bottom-right logo area (X: 620 to 740, Y: 375 to 415)
$brushBR = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 241, 249, 252))
$g.FillRectangle($brushBR, 620, 375, 120, 40)

# Draw authentic logo at bottom-right:
# Target height: 18px -> width: 18 * (210/45) = 84px
$targetH2 = 18
$targetW2 = [int]($targetH2 * 210 / 45)
$g.DrawImage($logo, 638, 384, $targetW2, $targetH2)

$g.Dispose()
$brushTL.Dispose()
$brushBR.Dispose()

# Save PNG
$newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Save JPG
$jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
$encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]95)
$newBmp.Save($outputJpg, $jpgEncoder, $encoderParams)

$banner.Dispose()
$logo.Dispose()
$newBmp.Dispose()

Write-Host "Updated promotional footer banner saved successfully!"
