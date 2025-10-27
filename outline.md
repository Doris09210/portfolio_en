# Du Yao Personal Website Project Outline

## Website Structure

### Page Architecture
1. **index.html** - Home page
2. **projects.html** - Project details page
3. **research.html** - Academic research page
4. **about.html** - About me page

## Page Detailed Planning

### 1. Home Page (index.html)
**Layout Structure**:
- Navigation: Material Design top app bar
- Hero section: 
  - Shader background animation
  - Personal introduction and avatar
  - Core skills showcase
  - CTA buttons
- Project preview area:
  - Featured project cards grid
  - Hover effects and animations
- Skills visualization:
  - Radar chart display
  - Interactive skill labels
- Contact section:
  - Social links
  - Contact form

**Key Features**:
- Particle background animation
- Scroll parallax effects
- Skills radar chart interaction
- Project card hover effects

### 2. Project Details Page (projects.html)
**Content Structure**:
- Project overview grid
- CISDI Modeling & Drafting Project:
  - Video player
  - Project description
  - Technology stack showcase
  - Results display
- Leadership Dashboard Project:
  - Interface design showcase
  - Ergonomics analysis results
- Equipment Interface Platform:
  - Platform function demonstration
  - Interaction design cases

**Interactive Features**:
- Video playback controls
- Project filtering and search
- Image gallery carousel
- Technology tag filtering

### 3. Academic Research Page (research.html)
**Content Modules**:
- Academic papers:
  - HCII 2025 paper
  - RLHF interface design research
  - Preprint links
- Research results:
  - Visualization charts
  - Experimental data display
  - Methodology introduction
- Research interests:
  - Human factors engineering
  - AI interaction design
  - Cognitive science applications

**Visualization Elements**:
- Paper citation network graph
- Research timeline
- Methodology flowchart
- Experimental results charts

### 4. About Me Page (about.html)
**Personal Information**:
- Detailed personal introduction
- Education background timeline
- Internship experience details
- Skills and certificates showcase
- Personal hobbies and interests

**Interactive Components**:
- Education experience timeline
- Skills proficiency bar charts
- Certificate showcase gallery
- Personal photo carousel

## Technical Implementation

### Frontend Technology Stack
- **HTML5**: Semantic structure
- **CSS3**: Grid layout, Flexbox, animations
- **JavaScript ES6+**: Modern JS features
- **Tailwind CSS**: Utility-first CSS framework

### Core Libraries Integration
1. **Anime.js**: Smooth animations
2. **Matter.js**: Physics engine
3. **Shader-park**: Shader effects
4. **PIXI.js**: Graphics rendering
5. **ECharts.js**: Data visualization
6. **Splide**: Carousel components

### Responsive Design
- Mobile-first
- Breakpoints: 768px, 1024px, 1440px
- Touch-friendly interactions
- Performance optimization

## Content Strategy

### Image Assets
- Personal avatar: Generated cartoon avatar
- Project screenshots: Generated UI interface examples
- Background images: Abstract tech themes
- Icons: Material Design icons

### Copy Content
- Professional technical descriptions
- Quantified project achievements
- Personal brand story
- Contact information

## Performance Optimization

### Loading Strategy
- Critical CSS inlining
- Image lazy loading
- Code splitting
- CDN resources

### Animation Optimization
- GPU acceleration
- 60fps target
- Reduced reflow and repaint
- Smooth transitions

## Deployment Configuration

### File Structure
```
/
├── index.html
├── projects.html
├── research.html
├── about.html
├── main.js
├── resources/
│   ├── avatar.png
│   ├── project-images/
│   ├── research-charts/
│   └── backgrounds/
└── README.md
```

### Build Optimization
- Resource compression
- Caching strategy
- SEO optimization
- Accessibility compliance