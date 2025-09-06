# Ragdoll Physics Game

A fun interactive 3D ragdoll physics game built with React Three Fiber and Cannon.js physics engine.

**Available as both a web application and Windows desktop app!**

## Features

- Interactive ragdoll character that responds to mouse interactions
- Realistic physics simulation using Cannon.js
- 3D environment with furniture and objects
- Drag and drop mechanics
- Reflective floor surface
- Dynamic lighting and shadows

## Technologies Used

### Core Game Engine
- **React** - UI framework
- **Three.js** - 3D graphics library  
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Cannon.js** - Physics engine for realistic physics simulation

### Desktop App
- **Electron** - Cross-platform desktop app framework
- **electron-builder** - Application packaging and distribution

## Getting Started

### 🎮 Play the Game

#### Option 1: Windows Desktop App (Recommended)
1. Download the latest release from the [Releases](../../releases) page
2. Run `RagdollPhysics-Portable.exe` - no installation required!
3. Enjoy the game with native desktop performance

#### Option 2: Web Version (Development)
1. Clone the repository:
```bash
git clone <repository-url>
cd ragdoll-physics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### 🔧 Development Setup

**Prerequisites:**
- Node.js (version 14 or higher)
- npm or yarn

## How to Play

- **Click and drag** the ragdoll character to move it around
- **Mouse wheel** to zoom in and out
- Watch the ragdoll interact with the furniture and environment
- Enjoy the realistic physics simulation!

## Desktop App Features

The Windows desktop version includes:
- **Portable executable** - No installation required (102MB)
- **Native performance** - Optimized for desktop systems
- **Application menu** - File, View, Window, and Help menus
- **Keyboard shortcuts** - Ctrl+N (new game), F11 (fullscreen), etc.
- **About dialog** - Game information and version details
- **Offline play** - No internet connection required

See the [desktop-app/README.md](desktop-app/README.md) for detailed desktop app documentation.

## Project Structure

```
src/
├── components/
│   ├── Guy.js          # Ragdoll character component
│   └── Furniture.js    # Furniture and environment objects
├── helpers/
│   ├── Block.js        # Basic block physics component
│   ├── createRagdoll.js # Ragdoll creation utilities
│   └── Drag.js         # Mouse interaction and dragging logic
├── App.js              # Main application component
├── index.js            # Application entry point
└── styles.css          # Global styles

desktop-app/
├── RagdollPhysics-Portable.exe  # Main desktop executable
├── Launch-RagdollPhysics.bat    # Launcher script
├── README.md                    # Desktop app documentation
└── win-unpacked/               # Development build (excluded from git)

public/
└── electron.js                 # Electron main process
```

## Available Scripts

### Web Development
- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

### Desktop App Development
- `npm run electron` - Run the desktop app in development mode
- `npm run build-desktop` - Build unpacked desktop app for testing
- `npm run dist-desktop` - Create portable executable for distribution

### Other
- `npm eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Physics simulation powered by [Cannon.js](https://github.com/schteppe/cannon.js/)
- 3D graphics with [Three.js](https://threejs.org/)
- React integration via [React Three Fiber](https://github.com/pmndrs/react-three-fiber)