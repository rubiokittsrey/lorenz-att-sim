# Lorenz Attractor 3D Simulation

A real-time 3D visualization of the Lorenz attractor demonstrating chaotic dynamics and the butterfly effect through an interactive WebGL experience.

## Overview

This interactive web application visualizes the famous Lorenz system of differential equations in real-time 3D. Built with React, Next.js, and Three.js, it allows users to explore chaos theory by adjusting parameters, controlling simulation speed, and viewing the evolving trajectory from any angle. The application maintains 60 FPS performance while rendering up to 30,000 trajectory points with dynamic color aging.

## Features

- Real-time 3D rendering with WebGL acceleration using Three.js
- Interactive orbital camera controls with pan and zoom
- Live parameter adjustment (σ, ρ, β, dt) with immediate visual feedback
- Variable simulation speed (0.5x to 2x) and steps-per-frame control
- Dynamic trail length up to 30,000 points with circular buffer optimization
- Six color gradient schemes with age-based fading
- Responsive design supporting desktop and mobile devices
- Dark and light theme support
- Optional grid and coordinate axes helpers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
   git clone https://github.com/yourusername/lorenz-attractor-simulation.git
   cd lorenz-attractor-simulation
```

2. Install dependencies

```bash
   npm install
```

3. Start the development server

```bash
   npm run dev
```

4. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Camera Controls

- **Rotate**: Click and drag to orbit around the attractor
- **Pan**: Shift + drag to pan the camera
- **Zoom**: Scroll wheel to zoom in/out

### Simulation Controls

- **Play/Pause**: Toggle simulation running state
- **Reset**: Clear trajectory and restart from initial conditions
- **Speed**: Adjust simulation speed from 0.5x to 2x
- **Parameters**: Modify σ (sigma), ρ (rho), β (beta), and dt using sliders

### Visualization Options

- **Color Scheme**: Choose from 6 gradient options
- **Trail Length**: Set maximum points (2,500 to 30,000)
- **Render Mode**: Toggle between line and point display
- **Helpers**: Show/hide grid and coordinate axes

### Parameter Exploration

The classic parameters (σ=10, ρ=28, β=8/3) produce the iconic butterfly shape. Experiment with different values:

- ρ < 1: Fixed point behavior
- 1 < ρ < 24.74: Periodic orbits
- ρ > 24.74: Chaotic behavior
- ρ ≈ 99.65: Period-doubling cascade

## Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main simulation page
│   └── globals.css        # Global styles
├── components/
│   ├── simulation/        # 3D visualization components
│   ├── panel/             # Control panel components
│   └── ui/                # Reusable UI components (shadcn/ui)
└── lib/
    └── simulation/        # Core simulation logic
        ├── engine.ts      # Update loop
        ├── lorenz-utils.ts # Lorenz equations
        ├── store.ts       # Zustand state management
        └── three-utils.ts # Three.js helpers
```

### Technologies

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **Zustand** - State management
- **shadcn/ui** - Re-usable component library
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Mathematics

The simulation implements the Lorenz system:

```
dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y
dz/dt = xy - βz
```

Numerical integration uses Euler's method for efficient real-time calculation.

## Performance

The application employs several optimizations to maintain 60 FPS:

- Circular buffer prevents memory leaks with fixed-size storage
- WebGL instancing for efficient point cloud rendering
- Selective geometry updates only when necessary
- Pre-computed color gradients reduce CPU overhead
- Efficient state management with Zustand

## Use Cases

- **Education**: Visualize chaos theory and differential equations
- **Research**: Explore parameter spaces and trajectory characteristics
- **Art**: Create aesthetic mathematical visualizations
- **Demonstrations**: Interactive exhibits for museums or classrooms

## Contributing

Contributions welcome! Potential improvements include:

- WebGPU implementation for enhanced performance
- Additional attractors (Rössler, Chen, etc.)
- Trajectory export as data or images
- Enhanced mobile touch controls
- Audio sonification of dynamics

To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Edward Lorenz for discovering the Lorenz system in 1963
- Three.js and React Three Fiber communities
- Open source contributors and maintainers

## Further Reading

- [The Lorenz System](https://en.wikipedia.org/wiki/Lorenz_system) - Wikipedia
- [Chaos: Making a New Science](https://en.wikipedia.org/wiki/Chaos:_Making_a_New_Science) - James Gleick
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)

---

**Author**: Kitts Rey Rubio - [GitHub](https://github.com/rubiokittsrey)
