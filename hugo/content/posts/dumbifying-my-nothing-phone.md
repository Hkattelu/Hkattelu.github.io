---
title: "Dumbifying my Nothing Phone"
date: 2025-11-30T00:00:00-05:00
draft: false
slug: "dumbifying-my-nothing-phone"
tags: ["Android", "Mobile", "Minimalism"]
categories: ["blog"]
---

Recently i spoke with a friend who shared me an interesting article about [digital minimalism and reducing screentime.](https://blog.superhuman.com/digital-minimalism-summary/)

The discussion dug me down a moderately deep rabbit hole of trying to "dumbify" my [Nothing Phone 3A](https://us.nothing.tech/products/phone-3a?Colour=White&Capacity=12%2B256GB). This blog post basically outlines what I did and what I think is a good way to dumbify your phone, fast!

For me, this is essentially the "Digital Declutter" step of digital minimalism. 

Broadly speaking, there are three basic steps:

1. **Reduce Bloat**: Remove as much unnecessary bloat as possible.
1. **Force intentionality**: Make the phone less "addicting"
1. **Simplify whats left**: Refine the functionality to be just what you need

---

## Reducing Bloat: Shizuku + Canta

When it comes to android, the most common approach cited by technical forums and youtubers is to use the [universal android debloater tool](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation). It's basically just a software that allows you mass delete apps off of your phone, and
provide backups in case something accidentally breaks and your phone gets bricked. 

For some strange reason, this app just did not work for me, no matter how closely i followed the instructions. I noticed the last release was on 3/10/25, so I suspect
that the tool could actually just be broken. While it was frustrating, it did make aware of the [universal debloat list](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation/blob/main/resources/assets/uad_lists.json). 

This is a cool find. A bunch of people essentially create a list of apps that are considered fine to delete without endangering the phone itself. It is considered
safe to delete apps in that list with `removal=Recommended`. The other modes are Safe, Risky, Nuclear (avoid):

* Green/Recommended: Remove freely (social media, streaming, carriers)
* Yellow/Safe: Usually OK but test
* Red/Risky: Can break features
* Black/Nuclear: Core system, don't touch

I dug a bit more around this tool and found another method - **Shizuku + Canta**.

**Shizuku** is [a tool to turn android system APIs](https://github.com/RikkaApps/Shizuku) easily. We use it to run commands on behalf of Canta.

**Canta** is [an android debloating tool](https://github.com/samolego/Canta?tab=readme-ov-file) with access to the universal debloat list that can delete apps that
are normally difficult to delete such as Chrome, Youtube, and some system packages.

I prepared the below script to delete a few common apps and then instantiate Canta + Shizuku to delete all of the recommended debloat apps:

```bash
<#
.SYNOPSIS
    Nothing Phone (3a) Dumbification Protocol.
.DESCRIPTION
    Debloats addiction apps, forces system monochrome, and installs Canta/Shizuku.
    Requires ADB in the system PATH and USB Debugging enabled on the device.
.AUTHOR
    Himanshu Kattelu
.DATE
    2025-11-29
#>

# --- Define a Reliable Script Root Variable ---
if ($PSScriptRoot) {
    # Scenario 1: Script is executed from a .ps1 file
    $ScriptDir = $PSScriptRoot
} else {
    # Scenario 2: Code is pasted directly into the console
    # Fallback: Use the current working directory.
    # NOTE: This assumes the user is running the console from the directory
    # containing the canta.apk and shizuku.apk files.
    $ScriptDir = Get-Location
}

$ErrorActionPreference = "Stop" # Stop script on command failure
$AdbPath = (Get-Command adb).Path # Get full path to ADB

# List of packages to remove for User 0
$Packages = @(
    "com.facebook.katana" # Facebook app
    "com.facebook.lite" # Facebook Lite (if present)
    "com.instagram.android" # Instagram
    "com.twitter.android" # X/Twitter (if present)
    "com.reddit.frontpage" # Reddit
    "com.snapchat.android" # Snapchat
    "com.whatsapp" # WhatsApp (only if you explicitly want it gone)
    "com.google.android.youtube" # YouTube main app
    "com.google.android.youtube.music" # YouTube Music
    "com.netflix.mediaclient" # Netflix
    "com.spotify.music" # Spotify
    "com.zhiliaoapp.musically" # TikTok
    "com.ss.android.ugc.trill" # TikTok variant on some devices
    "com.amazon.mShop.android.shopping" # Amazon Shopping
    "com.amazon.kindle" # Kindle
    "com.ebay.mobile" # eBay
    "com.booking" # Booking.com
)

Write-Host "`n--- [1/4] Checking ADB Connection ---"

try {
    # Check if ADB is in a 'device' state
    $AdbState = & $AdbPath get-state 2>$null
    if ($AdbState -eq "device") {
        Write-Host "Device connected." -ForegroundColor Green
    }
    else {
        Write-Host "Error: Device not found or unauthorized. ADB State: $AdbState" -ForegroundColor Red
        Write-Host "Please connect your Nothing Phone (3a), enable USB Debugging, and authorize this PC." -ForegroundColor Yellow
        exit 1
    }
}
catch {
    Write-Host "Error: ADB command failed. Is ADB installed and in your PATH?" -ForegroundColor Red
    exit 1
}

Write-Host "`n--- [2/4] Removing Distraction and Bloat Packages ---"

foreach ($Pkg in $Packages) {
    try {
        Write-Host "Attempting to remove $Pkg..." -NoNewline
        $ListResult = & $AdbPath shell pm list packages | Select-String -Pattern $Pkg -Quiet
        if (-not $ListResult) {
            Write-Host "NOT FOUND (Skipping)" -ForegroundColor Yellow
            continue
        }
        $UninstallResult = & $AdbPath shell pm uninstall --user 0 $Pkg | Out-Null
        if ($UninstallResult) {
            Write-Host "REMOVED" -ForegroundColor Green
        }
        else {
            Write-Host "FAILED (Might be a necessary system package)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
        continue
    }
}


Write-Host "`n--- [3/4] Enforcing System-Level Grayscale ---"

Write-Host "Setting accessibility_display_daltonizer to 0 (Monochrome)..."
& $AdbPath shell settings put secure accessibility_display_daltonizer 0 | Out-Null

Write-Host "Enabling accessibility_display_daltonizer_enabled..."
& $AdbPath shell settings put secure accessibility_display_daltonizer_enabled 1 | Out-Null

Write-Host "Display is now Monochrome." -ForegroundColor Green


Write-Host "`n--- [4/4] Fetching and Installing Maintenance Tools ---"

# URLs for latest APKs. You must download these.
$CantaUrl = "C:\Users\himan\Downloads\app-release.apk" 
$ShizukuUrl = "C:\Users\himan\Downloads\shizuku-v13.6.0.r1086.2650830c-release.apk"

# Set file paths in the script root directory
$CantaPath = Join-Path -Path $ScriptDir -ChildPath "canta.apk"
$ShizukuPath = Join-Path -Path $ScriptDir -ChildPath "shizuku.apk"

# Download Canta
Write-Host "Downloading Canta..."
Invoke-WebRequest -Uri $CantaUrl -OutFile $CantaPath

# Download Shizuku
Write-Host "Downloading Shizuku..."
Invoke-WebRequest -Uri $ShizukuUrl -OutFile $ShizukuPath

# Install
Write-Host "Installing Shizuku..."
& $AdbPath install -r $ShizukuPath | Out-Null
Write-Host "Installing Canta..."
& $AdbPath install -r $CantaPath | Out-Null

# Cleanup (Remove downloaded APKs)
Write-Host "Cleaning up downloaded APKs..."
Remove-Item -Path $CantaPath -Force
Remove-Item -Path $ShizukuPath -Force

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "PROTOCOL COMPLETE" -ForegroundColor Green
Write-Host "1. Open 'Shizuku' on your phone and start it (via Wireless Debugging)."
Write-Host "2. Open 'Canta' and grant it Shizuku access."
Write-Host "3. Enjoy your boring phone."
Write-Host "========================================`n" -ForegroundColor Green
```

After that, i had successfully deleted a ton of bloat off my phone! I also switched the phone to
use monochrome colors to make it less addicting.

---

## Olauncher for launching + simplifying

After a bit of digging, i discovered [Olauncher](https://play.google.com/store/apps/details?id=app.olauncher&hl=en_US&pli=1), a great minimalistic
android launcher. Its cool because it simplifies the android launcher UI and forces you to be much more intentional about it.

I picked 4 "important" apps that I have quick access to, and the rest are only accessible by typing out the app name. While this does seem a little
annoying, it was remarkably easy to set up, and looks super clean!

![art](https://play-lh.googleusercontent.com/6JtrvJiLBJZqh_yvz0xdXNlw5F7uu1_xjgGEm2Q5mSp5HgfDUMJ7oOBIe6jGSiT-yQ=w5120-h2880-rw)

For me, I made my apps - Notion, Notion Calendar, Gemini, and Youtube Music. 

I really enjoy this setup. It looks clean and feels intentional. It forced me to actually think about what apps I use, what apps I want to use, and
what I don't need.

---

## Configuring the glyphs for Nothing Phone

A unique thing about the nothing phone is that it has these light up glyphs that you configure. It lets the back of the phone light up
according to some user-defined conditions.

For the sake of digital minimalism, this is very useful because you can configure "Essential notifications" that light up the phone if you
have something important. It lets me make sure that I have nothing important without actually having to unlock my phone and look at the screen.

It also interestingly forced me to think not only in terms of apps, but in terms of notifications, which tend to be intrusive.

Thanks to the in-built software, I was able to configure the lights to light up only when I have a text message from certain close friends and
family. That way I don't ever need to pull up and unlock my phone thinking "Oh what if something important is happening".

---

And thats the guide! Hopefully this comes out as useful to anyone reading. Feel free to email me if you have any questions.

I encourage the reader to read more about digital minimalism and take on the next steps to being intentional with technology after doing the declutter.
