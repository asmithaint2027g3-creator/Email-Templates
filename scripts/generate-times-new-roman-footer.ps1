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
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# 1. Draw base banner
$g.DrawImage($banner, 0, 0, $banner.Width, $banner.Height)

# 2. Inpaint top-left text area (covers old 'T logo, old font TRUSTGRID.AI, and SECURE. SCALABLE. INTELLIGENT.)
# Sample gradient from top-left (X: 35 to 500, Y: 20 to 110)
$pt1 = [System.Drawing.Point]::new(35, 20)
$pt2 = [System.Drawing.Point]::new(500, 110)
$c1 = [System.Drawing.Color]::FromArgb(255, 240, 249, 252)
$c2 = [System.Drawing.Color]::FromArgb(255, 245, 251, 254)
$gradBrushTL = [System.Drawing.Drawing2D.LinearGradientBrush]::new($pt1, $pt2, $c1, $c2)
$g.FillRectangle($gradBrushTL, 35, 20, 480, 95)
$gradBrushTL.Dispose()

# 3. Crop just the (><) icon from logo (X: 0 to 52, Y: 0 to 45)
$iconRect = [System.Drawing.Rectangle]::new(0, 0, 52, 45)
$iconBmp = $logo.Clone($iconRect, $logo.PixelFormat)

# Draw (><) icon at (42, 32) scaled to height 26px -> width: 26 * 52 / 45 = 30px
$targetIconW = [int](26 * 52 / 45)
$g.DrawImage($iconBmp, 42, 33, $targetIconW, 26)
$iconBmp.Dispose()

# 4. Render Brand Line in Times New Roman
$fontBrand = [System.Drawing.Font]::new("Times New Roman", [float]16, [System.Drawing.FontStyle]::Bold)
$fontSub = [System.Drawing.Font]::new("Times New Roman", [float]11.5, [System.Drawing.FontStyle]::Bold)
$fontDiv = [System.Drawing.Font]::new("Times New Roman", [float]14, [System.Drawing.FontStyle]::Regular)

$brushNavy = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
$brushCyan = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 2, 132, 199))
$brushSlate = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 51, 65, 85))
$brushMuted = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 148, 163, 184))

# "TRUSTGRID"
$x = 42 + $targetIconW + 8
$g.DrawString("TRUSTGRID", $fontBrand, $brushNavy, [float]$x, [float]33)
$sizeTG = $g.MeasureString("TRUSTGRID", $fontBrand)

# ".AI"
$x = $x + $sizeTG.Width - 4
$g.DrawString(".AI", $fontBrand, $brushCyan, [float]$x, [float]33)
$sizeAI = $g.MeasureString(".AI", $fontBrand)

# " | "
$x = $x + $sizeAI.Width + 6
$g.DrawString("|", $fontDiv, $brushMuted, [float]$x, [float]35)
$sizeDiv = $g.MeasureString("|", $fontDiv)

# "ENTERPRISE AI INFRASTRUCTURE"
$x = $x + $sizeDiv.Width + 6
$g.DrawString("ENTERPRISE AI INFRASTRUCTURE", $fontSub, $brushSlate, [float]$x, [float]36)

# 5. Render Headline in Times New Roman: "SECURE. SCALABLE. INTELLIGENT."
$fontH1 = [System.Drawing.Font]::new("Times New Roman", [float]19, [System.Drawing.FontStyle]::Bold)
$g.DrawString("SECURE. SCALABLE. INTELLIGENT.", $fontH1, $brushNavy, [float]42, [float]72)

# 6. Inpaint and Render Bottom-Right Headline: "DRIVING THE FUTURE OF ENTERPRISE INTELLIGENCE"
$cBR1 = [System.Drawing.Color]::FromArgb(255, 243, 250, 253)
$cBR2 = [System.Drawing.Color]::FromArgb(255, 247, 252, 254)
$ptBR1 = [System.Drawing.Point]::new(510, 310)
$ptBR2 = [System.Drawing.Point]::new(740, 370)
$gradBrushBR = [System.Drawing.Drawing2D.LinearGradientBrush]::new($ptBR1, $ptBR2, $cBR1, $cBR2)
$g.FillRectangle($gradBrushBR, 510, 310, 230, 60)
$gradBrushBR.Dispose()

$fontH2 = [System.Drawing.Font]::new("Times New Roman", [float]13.5, [System.Drawing.FontStyle]::Bold)
$formatRight = [System.Drawing.StringFormat]::new()
$formatRight.Alignment = [System.Drawing.StringAlignment]::Far
$g.DrawString("DRIVING THE FUTURE OF`nENTERPRISE INTELLIGENCE", $fontH2, $brushNavy, [float]730, [float]320, $formatRight)

# 7. Inpaint and Render Bottom-Right Logo in Times New Roman
$brushBRLogo = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 244, 250, 253))
$g.FillRectangle($brushBRLogo, 600, 376, 140, 38)
$brushBRLogo.Dispose()

$iconRect2 = [System.Drawing.Rectangle]::new(0, 0, 52, 45)
$iconBmp2 = $logo.Clone($iconRect2, $logo.PixelFormat)
$targetIconW2 = [int](18 * 52 / 45)
$g.DrawImage($iconBmp2, 630, 384, $targetIconW2, 18)
$iconBmp2.Dispose()

$fontBRLogo = [System.Drawing.Font]::new("Times New Roman", [float]11, [System.Drawing.FontStyle]::Bold)
$xBR = 630 + $targetIconW2 + 5
$g.DrawString("TRUSTGRID", $fontBRLogo, $brushNavy, [float]$xBR, [float]384)
$sizeTG2 = $g.MeasureString("TRUSTGRID", $fontBRLogo)
$xBR = $xBR + $sizeTG2.Width - 3
$g.DrawString(".AI", $fontBRLogo, $brushCyan, [float]$xBR, [float]384)

# 8. Clean up
$fontBrand.Dispose()
$fontSub.Dispose()
$fontDiv.Dispose()
$fontH1.Dispose()
$fontH2.Dispose()
$fontBRLogo.Dispose()
$brushNavy.Dispose()
$brushCyan.Dispose()
$brushSlate.Dispose()
$brushMuted.Dispose()
$formatRight.Dispose()
$g.Dispose()

# Save PNG
$newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Save JPG
$jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
$encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]96)
$newBmp.Save($outputJpg, $jpgEncoder, $encoderParams)

$banner.Dispose()
$logo.Dispose()
$newBmp.Dispose()

Write-Host "Banner with Times New Roman typography generated successfully!"
