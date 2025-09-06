# Ragdoll Physics Game

A fun interactive 3D ragdoll physics game built with React Three Fiber and Cannon.js physics engine.

## Features

- Interactive ragdoll character that responds to mouse interactions
- Realistic physics simulation using Cannon.js
- 3D environment with furniture and objects
- Drag and drop mechanics
- Reflective floor surface
- Dynamic lighting and shadows

## Technologies Used

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Cannon.js** - Physics engine for realistic physics simulation

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

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

## How to Play

- **Click and drag** the ragdoll character to move it around
- **Mouse wheel** to zoom in and out
- Watch the ragdoll interact with the furniture and environment
- Enjoy the realistic physics simulation!

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
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
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