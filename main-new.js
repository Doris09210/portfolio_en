// 新版本的JavaScript功能
class ModernPortfolio {
    constructor() {
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initParticleEffect();
        this.initSkillBars();
        this.initButtonEffects();
        this.initNavigation();
    }
    
    // 滚动动画
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // 观察所有需要动画的元素
        const animatedElements = document.querySelectorAll('.project-card, .glass-card, .skill-item');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    animateElement(element) {
        if (element.classList.contains('project-card')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [50, 0],
                scale: [0.9, 1],
                duration: 800,
                easing: 'easeOutElastic(1, .8)',
                delay: Math.random() * 200
            });
        } else if (element.classList.contains('glass-card')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutQuart',
                delay: Math.random() * 100
            });
        } else if (element.classList.contains('skill-item')) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 500,
                easing: 'easeOutQuart',
                delay: Math.random() * 150
            });
        }
    }
    
    // 粒子效果
    initParticleEffect() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.floating-shapes');
        
        if (!container) return;
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.3';
        
        container.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 50;
        
        // 创建粒子
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})`
            });
        }
        
        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // 更新位置
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // 边界检测
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // 绘制粒子
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // 技能条动画
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
            });
        };
        
        // 使用Intersection Observer触发动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const skillsSection = document.querySelector('.glass-card:has(.skill-progress)');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
    
    // 按钮效果
    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            });
            
            button.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            });
            
            // 点击波纹效果
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
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
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
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
    
    // 导航功能
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化现代作品集
    new ModernPortfolio();
    
    // 初始化技能雷达图
    initSkillsChart();
    
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
                color: '#6b7280',
                fontSize: 14
            },
            splitLine: {
                lineStyle: {
                    color: '#d1d5db'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#d1d5db'
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
                    color: 'rgba(59, 130, 246, 0.3)'
                },
                lineStyle: {
                    color: '#3b82f6',
                    width: 2
                },
                itemStyle: {
                    color: '#3b82f6'
                }
            }]
        }]
    };
    
    myChart.setOption(option);
    
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}