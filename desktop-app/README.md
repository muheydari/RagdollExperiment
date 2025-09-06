# Ragdoll Physics - Windows Desktop App

## 🎮 How to Run

### ⭐ Recommended: Portable Executable
**Simply double-click `RagdollPhysics-Portable.exe`** (102MB) - This is a self-contained executable that doesn't require installation!

### Alternative Options:
1. **Unpacked version**: Navigate to the `win-unpacked` folder and double-click `Ragdoll Physics.exe`
2. **Batch file**: Double-click `Run-RagdollPhysics.bat` in this directory

## 📁 What's Included

- **RagdollPhysics-Portable.exe** - ⭐ **Main portable executable (102MB)** - Run this!
- **win-unpacked/**: Complete desktop application folder (development build)
  - `Ragdoll Physics.exe` - Alternative executable file
  - All required Electron runtime files and dependencies
  - Localization files in `locales/` folder
- **Run-RagdollPhysics.bat** - Batch file launcher for unpacked version

## 🎯 Game Controls

- **Click and drag** the ragdoll character to move it around
- **Mouse wheel** to zoom in and out
- **Menu bar** for additional options (File > New Game, View options, etc.)

## 📋 System Requirements

- **OS**: Windows 10 or later (64-bit)
- **RAM**: 4GB minimum, 8GB recommended
- **Graphics**: DirectX 11 compatible graphics card
- **Storage**: ~200MB free space

## 🔧 Troubleshooting

### App won't start
- Make sure you have Windows 10 or later
- Try running as administrator
- Check Windows Defender/antivirus isn't blocking the app

### Performance issues
- Close other applications to free up memory
- Update your graphics drivers
- Try running in windowed mode instead of fullscreen

### Missing files error
- Make sure all files in the `win-unpacked` folder are present
- Don't move the .exe file outside of its folder

## 📦 Distribution

### Portable Executable (Recommended)
The `RagdollPhysics-Portable.exe` file is completely self-contained:
- **No installation required** - just run the .exe file
- Can be copied to any Windows computer and run immediately
- Perfect for USB drives or sharing with friends
- Single file distribution (~102MB)

### Unpacked Version (Alternative)
- Copy the entire `win-unpacked` folder to any Windows computer
- All files must stay together in the same folder
- Larger file count but same functionality

## 🛠️ Technical Details

- **Framework**: Electron + React Three Fiber
- **Physics Engine**: Cannon.js
- **3D Graphics**: Three.js
- **Build Tool**: electron-builder
- **Architecture**: x64 (64-bit)

Enjoy playing with the ragdoll physics! 🎉