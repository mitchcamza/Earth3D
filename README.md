# 🌍 Earth3D - Interactive 3D Earth Visualization

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://earth3d-seven.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-0.167.0-blue)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.5-646CFF)](https://vitejs.dev/)

An interactive 3D visualization of Earth built with Three.js, featuring custom GLSL shaders for realistic day/night cycles, atmospheric effects, and high-resolution textures. This project demonstrates modern WebGL development practices and shader programming techniques.

![earth-3d-demo-720p](https://github.com/user-attachments/assets/5f26ab5e-e73d-4224-b8e9-93c845d317ed)

## 🚀 Live Demo
**[View Live Project →](https://earth3d-seven.vercel.app)**

## 💡 About This Project
This project was developed to explore 3D graphics programming and demonstrate proficiency in modern web technologies. It showcases the ability to work with complex rendering pipelines, shader programming, and performance optimization in browser-based applications.

## ✨ Key Features & Technical Highlights

### Graphics & Rendering
- **Custom GLSL Shaders**: Hand-written vertex and fragment shaders for realistic lighting and atmospheric effects
- **Dynamic Day/Night Cycles**: Real-time shader-based lighting calculations that simulate Earth's day/night transitions
- **Atmospheric Scattering**: Custom atmosphere shader creating realistic glow effects around the planet
- **High-Resolution Textures**: Multi-layered texture mapping including diffuse, specular, and bump maps
- **Cloud Layer**: Separate transparent cloud layer with its own texture and alpha blending

### Performance & Optimization
- **Efficient Rendering**: Optimized render loop with requestAnimationFrame
- **Responsive Design**: Automatic viewport adjustment and pixel ratio optimization
- **Interactive Controls**: Smooth orbital camera controls with mouse/touch support
- **Performance Monitoring**: Integrated Stats.js for FPS tracking during development

### Technical Implementation
- **Modern ES6+ JavaScript**: Modular code structure with ES6 imports/exports
- **Vite Build System**: Fast development server with hot module replacement
- **WebGL/Three.js**: Advanced 3D graphics rendering using Three.js framework
- **Shader Pipeline**: Custom GLSL shader loading and compilation

## 🛠️ Tech Stack

- **Core Framework**: [Three.js](https://threejs.org/) v0.167.0 - 3D graphics library
- **Shader Language**: GLSL (OpenGL Shading Language) - Custom vertex and fragment shaders
- **Build Tool**: [Vite](https://vitejs.dev/) v5.3.5 - Fast build tool and dev server
- **Language**: JavaScript (ES6+)
- **Deployment**: Vercel
- **Additional Libraries**:
  - OrbitControls (Three.js) - Camera interaction
  - Stats.js - Performance monitoring
  - vite-plugin-glsl - GLSL shader loading

## 📦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone git@github.com:mitchcamza/Earth3D.git
   cd Earth3D
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Earth3D/
├── src/
│   ├── script.js              # Main application logic
│   ├── style.css              # Styling
│   ├── index.html             # HTML entry point
│   └── shaders/               # Custom GLSL shaders
│       ├── earth/             # Earth material shaders
│       │   ├── earth.vert     # Vertex shader
│       │   └── earth.frag     # Fragment shader
│       └── atmosphere/        # Atmosphere effect shaders
│           ├── atmosphere.vert
│           └── atmosphere.frag
├── static/                    # Static assets (textures)
├── vite.config.js            # Vite configuration
└── package.json              # Project dependencies
```

## 🎓 What I Learned

Through this project, I gained hands-on experience with:

- **3D Graphics Programming**: Understanding 3D coordinate systems, transformations, and rendering pipelines
- **Shader Programming**: Writing custom GLSL shaders for realistic lighting and visual effects
- **WebGL & Three.js**: Working with the Three.js API and understanding WebGL fundamentals
- **Texture Mapping**: Implementing multiple texture types (diffuse, specular, bump maps) for realistic surfaces
- **Performance Optimization**: Optimizing render loops and managing GPU resources efficiently
- **Build Tools**: Configuring modern build tools (Vite) for optimal development workflow
- **Version Control**: Managing a project with Git and deploying to production


## 📜 Attributions

This project uses the following textures, which are licensed under the Creative Commons Attribution 4.0 International License:

- **Earth Day Map and Cloud Textures**  
  By [Solar System Scope](http://solarsystemscope.com/textures)  
  [Licensed under CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

- **Earth Bump Map and Specular Map**  
  By James Hastings-Trew  
  [Planet Pixel Emporium](https://planetpixelemporium.com/planets.html)

- **Shader Techniques**  
  Learned from Bruno Simon's [Three.js Journey](https://threejs-journey.com) course

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/mitchcamza/Earth3D?tab=MIT-1-ov-file) file for more details.

## 🙏 Acknowledgments

Special thanks to the authors of the textures used in this project and to Bruno Simon for his excellent Three.js course. Your resources have been invaluable in bringing this project to life!

---

**Built with ❤️ by [mitchcamza](https://github.com/mitchcamza)**
