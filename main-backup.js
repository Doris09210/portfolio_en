// 粒子背景系统
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.6';
        
        document.getElementById('particle-bg').appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(96, 165, 250, ',
            'rgba(167, 139, 250, ',
            'rgba(244, 114, 182, ',
            'rgba(34, 197, 94, ',
            'rgba(251, 191, 36, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 边界检测
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
            
            // 绘制连接线
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 滚动动画系统
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.skill-item, .project-card');
        this.init();
    }
    
    init() {
        this.observeElements();
        this.animateOnScroll();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => observer.observe(el));
    }
    
    animateElement(element) {
        if (element.classList.contains('skill-item')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutQuart',
                delay: Math.random() * 200
            });
        } else if (element.classList.contains('project-card')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.9, 1],
                duration: 800,
                easing: 'easeOutElastic(1, .8)',
                delay: Math.random() * 300
            });
        }
    }
    
    animateOnScroll() {
        let ticking = false;
        
        const updateAnimations = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // 视差效果
            const hero = document.querySelector('#home');
            if (hero) {
                hero.style.transform = `translateY(${rate * 0.1}px)`;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
}

// 技能雷达图
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: '人因工程', max: 100 },
                { name: '交互设计', max: 100 },
                { name: '用户研究', max: 100 },
                { name: '数据分析', max: 100 },
                { name: '编程开发', max: 100 },
                { name: '学术论文', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 14
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        series: [{
            name: '技能水平',
            type: 'radar',
            data: [{
                value: [95, 90, 88, 85, 80, 92],
                name: '我的技能',
                areaStyle: {
                    color: 'rgba(96, 165, 250, 0.3)'
                },
                lineStyle: {
                    color: '#60a5fa',
                    width: 2
                },
                itemStyle: {
                    color: '#60a5fa'
                }
            }]
        }]
    };
    
    myChart.setOption(option);
    
    // 响应式
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}



// 按钮交互效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('.glass-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('click', (e) => {
            // 波纹效果
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            anime({
                targets: ripple,
                scale: 2,
                opacity: [0.5, 0],
                duration: 600,
                easing: 'easeOutQuart',
                complete: () => ripple.remove()
            });
        });
    });
}

// 移动端菜单
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // 这里可以添加移动端菜单逻辑
            console.log('Mobile menu clicked');
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化系统
    new ParticleSystem();
    new ScrollAnimations();
    
    // 初始化图表
    setTimeout(() => {
        initSkillsChart();
    }, 500);
    
    // 初始化交互
    initButtonEffects();
    initMobileMenu();
    initSmoothScroll();
    
    // 页面加载动画
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutQuart',
        delay: 300
    });
    
    anime({
        targets: '.hero-title + h2',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuart',
        delay: 500
    });
    
    anime({
        targets: '.hero-title + h2 + p',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuart',
        delay: 700
    });
});

// 导出函数供其他页面使用
window.DuYaoPortfolio = {
    ParticleSystem,
    ScrollAnimations,
    initSkillsChart,
    initTechChart,
    initButtonEffects
};