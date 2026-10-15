$headers = @{
  'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  'Referer'    = 'https://en.wikipedia.org/'
}

$outDir = "C:\Users\GMT\Downloads\masewera265\public\logos"

$logos = @(
  @{ url = 'https://upload.wikimedia.org/wikipedia/en/2/24/Malawi_FA_%28logo%29.png';      file = 'flames.png' },
  @{ url = 'https://upload.wikimedia.org/wikipedia/en/2/24/Malawi_FA_%28logo%29.png';      file = 'scorchers.png' },
  @{ url = 'https://upload.wikimedia.org/wikipedia/en/e/e5/Nyasa_Big_Bullets_FC_logo.png'; file = 'nyasa-big-bullets.png' },
  @{ url = 'https://upload.wikimedia.org/wikipedia/en/b/b3/Wanderers_FC_%28logo%29.png';   file = 'mighty-wanderers.png' },
  @{ url = 'https://upload.wikimedia.org/wikipedia/en/5/57/Silverstrikers.gif';             file = 'silver-strikers.gif' },
  @{ url = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg';       file = 'malawi-flag.svg' }
)

foreach ($logo in $logos) {
  $dest = Join-Path $outDir $logo.file
  try {
    Invoke-WebRequest -Uri $logo.url -OutFile $dest -Headers $headers -TimeoutSec 30
    $size = (Get-Item $dest).Length
    Write-Host "OK: $($logo.file) ($size bytes)"
  } catch {
    Write-Host "FAIL: $($logo.file) - $_"
  }
}

Write-Host "Done."
